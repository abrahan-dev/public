import { DomainEvent } from '../../../domain/DomainEvent';
import { EventBus } from '../../../domain/EventBus';
import { DomainEventDeserializer } from '../DomainEventDeserializer';
import { DomainEventFailoverPublisher } from '../DomainEventFailoverPublisher/DomainEventFailoverPublisher';
import { DomainEventSubscribers } from '../DomainEventSubscribers';
import { RabbitMQConnection } from './RabbitMQConnection';
import { RabbitMQConsumerFactory } from './RabbitMQConsumerFactory';
import { RabbitMQueueFormatter } from './RabbitMQueueFormatter';

export class RabbitMQEventBus implements EventBus {
    constructor(
        private readonly connection: RabbitMQConnection,
        private readonly failoverPublisher: DomainEventFailoverPublisher,
        private readonly queueNameFormatter: RabbitMQueueFormatter,
        private readonly exchange: string = 'amq.topic',
        private readonly maxRetries: number = 3
    ) {}

    async addSubscribers(subscribers: DomainEventSubscribers): Promise<void> {
        const deserializer = DomainEventDeserializer.configure(subscribers);
        const consumerFactory = new RabbitMQConsumerFactory(deserializer, this.connection, this.maxRetries);
        const promises: Promise<unknown>[] = [];

        for (const subscriber of subscribers.items) {
            const queueName = this.queueNameFormatter.format(subscriber.constructor.name);
            const rabbitMQConsumer = consumerFactory.build(subscriber, this.exchange, queueName);

            promises.push(this.connection.consume(queueName, rabbitMQConsumer.onMessage.bind(rabbitMQConsumer)));
        }

        await Promise.all(promises);
    }

    async publish(events: Array<DomainEvent>): Promise<void> {
        for (const domainEvent of events) {
            try {
                const routingKey = domainEvent.eventName;
                const content = this.serialize(domainEvent);
                const options = this.options(domainEvent);
                const eventToPublish = { routingKey, content, options, exchange: this.exchange };
                // eslint-disable-next-line no-await-in-loop
                await this.connection.publish(eventToPublish);
            } catch (error: unknown) {
                // eslint-disable-next-line no-await-in-loop
                await this.failoverPublisher.publish(domainEvent);
            }
        }
    }

    private options(event: DomainEvent) {
        return {
            messageId: event.eventId,
            contentType: 'application/json',
            contentEncoding: 'utf-8'
        };
    }

    private serialize(event: DomainEvent): Buffer {
        const eventPrimitives = {
            data: {
                id: event.eventId,
                type: event.eventName,
                occurredOn: event.occurredOn.toISOString(),
                aggregateId: event.aggregateId,
                attributes: event.toPrimitives()
            }
        };

        return Buffer.from(JSON.stringify(eventPrimitives));
    }
}
