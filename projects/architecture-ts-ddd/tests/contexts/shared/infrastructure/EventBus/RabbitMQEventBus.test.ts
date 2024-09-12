import { DataSource } from 'typeorm';

import container from '../../../../../src/apps/frontoffice/backend/createContainer';
import { DomainEvent } from '../../../../../src/contexts/shared/domain/DomainEvent';
import { DomainEventDeserializer } from '../../../../../src/contexts/shared/infrastructure/eventBus/DomainEventDeserializer';
import { DomainEventFailoverPublisher } from '../../../../../src/contexts/shared/infrastructure/eventBus/DomainEventFailoverPublisher/DomainEventFailoverPublisher';
import { DomainEventSubscribers } from '../../../../../src/contexts/shared/infrastructure/eventBus/DomainEventSubscribers';
import { RabbitMQConfigurator } from '../../../../../src/contexts/shared/infrastructure/eventBus/RabbitMQ/RabbitMQConfigurator';
import { RabbitMQConnection } from '../../../../../src/contexts/shared/infrastructure/eventBus/RabbitMQ/RabbitMQConnection';
import { RabbitMQConsumer } from '../../../../../src/contexts/shared/infrastructure/eventBus/RabbitMQ/RabbitMQConsumer';
import { RabbitMQEventBus } from '../../../../../src/contexts/shared/infrastructure/eventBus/RabbitMQ/RabbitMQEventBus';
import { RabbitMQueueFormatter } from '../../../../../src/contexts/shared/infrastructure/eventBus/RabbitMQ/RabbitMQueueFormatter';
import { TypeOrmDomainEventUnpublishedRepository } from '../../../../../src/contexts/shared/infrastructure/persistance/TypeOrmDomainEventUnpublishedRepository';
import { FoldersCounterIncrementedDomainEventMother } from '../../../frontoffice/foldersCounter/domain/FoldersCounterIncrementedDomainEventMother';
import { TypeOrmEnvironmentArranger } from '../typeorm/TypeOrmEnvironmentArranger';
import { DomainEventDummyMother } from './__mocks__/DomainEventDummy';
import { DomainEventSubscriberDummy } from './__mocks__/DomainEventSubscriberDummy';
import { DomainEventFailoverPublisherMother } from './__mother__/DomainEventFailoverPublisherMother';
import { RabbitMQConnectionMother } from './__mother__/RabbitMQConnectionMother';

describe('RabbitMQEventBus test', () => {
    let connection: RabbitMQConnection;
    let repository: TypeOrmDomainEventUnpublishedRepository;
    const exchange = 'test_domain_events';
    let arranger: TypeOrmEnvironmentArranger;
    const queueNameFormatter = new RabbitMQueueFormatter('frontoffice');

    beforeAll(async () => {
        arranger = container.get<TypeOrmEnvironmentArranger>('Context.Frontoffice.EnvironmentArranger');
        repository = container.get<TypeOrmDomainEventUnpublishedRepository>(
            'Contexts.Shared.DomainEventsUnpublished.domain.DomainEventUnpublishedRepository'
        );
        connection = container.get<RabbitMQConnection>('Contexts.Shared.RabbitMQConnection');
        await connection.connect();
    });

    afterAll(async () => {
        await connection.close();
        await container
            .get<Promise<DataSource>>('Contexts.Frontoffice.ConnectionManager')
            .then(async connectionManager => {
                await connectionManager.destroy();
            });
    });

    beforeEach(async () => {
        await arranger.arrange();
    });

    it('should publish events to RabbitMQ', async () => {
        const eventBus = new RabbitMQEventBus(
            connection,
            new DomainEventFailoverPublisher(repository),
            queueNameFormatter
        );
        await eventBus.publish([FoldersCounterIncrementedDomainEventMother.create()]);
    });

    describe('unit', () => {
        it('should use the failover publisher if publish to RabbitMQ fails', async () => {
            const connection = RabbitMQConnectionMother.failOnPublish();
            const failoverPublisher = DomainEventFailoverPublisherMother.failOverDouble();
            const eventBus = new RabbitMQEventBus(connection, failoverPublisher, queueNameFormatter, exchange, 3);
            const event = FoldersCounterIncrementedDomainEventMother.create();
            await eventBus.publish([event]);
            failoverPublisher.assertEventHasBeenPublished(event);
        });
    });

    describe('integration', () => {
        let connection: RabbitMQConnection;
        let dummySubscriber: DomainEventSubscriberDummy;
        let configurator: RabbitMQConfigurator;
        let failoverPublisher: DomainEventFailoverPublisher;
        let subscribers: DomainEventSubscribers;

        beforeEach(async () => {
            connection = await RabbitMQConnectionMother.create();
            failoverPublisher = DomainEventFailoverPublisherMother.create();
            configurator = new RabbitMQConfigurator(connection, queueNameFormatter, 50);
            await arranger.arrange();
            dummySubscriber = new DomainEventSubscriberDummy();
            subscribers = new DomainEventSubscribers([dummySubscriber]);
        });

        afterEach(async () => {
            await cleanEnvironment();
            await connection.close();
        });

        it('should consume the events published to RabbitMQ', async () => {
            await configurator.configure({ exchange, subscribers: [dummySubscriber] });
            const eventBus = new RabbitMQEventBus(connection, failoverPublisher, queueNameFormatter, exchange, 3);
            await eventBus.addSubscribers(subscribers);
            const event = DomainEventDummyMother.random();
            await eventBus.publish([event]);
            await dummySubscriber.assertConsumedEvents([event]);
        });

        it('should retry failed domain events', async () => {
            dummySubscriber = DomainEventSubscriberDummy.failsFirstTime();
            subscribers = new DomainEventSubscribers([dummySubscriber]);
            await configurator.configure({ exchange, subscribers: [dummySubscriber] });
            const eventBus = new RabbitMQEventBus(connection, failoverPublisher, queueNameFormatter, exchange, 3);
            await eventBus.addSubscribers(subscribers);
            const event = DomainEventDummyMother.random();
            await eventBus.publish([event]);
            await dummySubscriber.assertConsumedEvents([event]);
        });

        it('it should send events to dead letter after retry failed', async () => {
            dummySubscriber = DomainEventSubscriberDummy.alwaysFails();
            subscribers = new DomainEventSubscribers([dummySubscriber]);
            await configurator.configure({ exchange, subscribers: [dummySubscriber] });
            const eventBus = new RabbitMQEventBus(connection, failoverPublisher, queueNameFormatter, exchange, 3);
            await eventBus.addSubscribers(subscribers);
            const event = DomainEventDummyMother.random();
            await eventBus.publish([event]);
            await dummySubscriber.assertConsumedEvents([]);
            await assertDeadLetter([event]);
        });

        async function assertDeadLetter(events: Array<DomainEvent>) {
            const deadLetterQueue = queueNameFormatter.formatDeadLetter(dummySubscriber.constructor.name);
            const deadLetterSubscriber = new DomainEventSubscriberDummy();
            const deadLetterSubscribers = new DomainEventSubscribers([dummySubscriber]);
            const deserializer = DomainEventDeserializer.configure(deadLetterSubscribers);
            const consumer = new RabbitMQConsumer(
                deadLetterSubscriber,
                deserializer,
                connection,
                deadLetterQueue,
                exchange,
                3
            );
            await connection.consume(deadLetterQueue, consumer.onMessage.bind(consumer));
            await deadLetterSubscriber.assertConsumedEvents(events);
        }

        async function cleanEnvironment() {
            await connection.deleteQueue(queueNameFormatter.format(dummySubscriber.constructor.name));
            await connection.deleteQueue(queueNameFormatter.formatRetry(dummySubscriber.constructor.name));
            await connection.deleteQueue(queueNameFormatter.formatDeadLetter(dummySubscriber.constructor.name));
        }
    });
});
