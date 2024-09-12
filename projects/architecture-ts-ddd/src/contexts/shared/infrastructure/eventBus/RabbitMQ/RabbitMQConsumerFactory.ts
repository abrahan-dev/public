import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../../domain/DomainEventSubscriber';
import { DomainEventDeserializer } from '../DomainEventDeserializer';
import { RabbitMQConnection } from './RabbitMQConnection';
import { RabbitMQConsumer } from './RabbitMQConsumer';

export class RabbitMQConsumerFactory {
    constructor(
        private readonly deserializer: DomainEventDeserializer,
        private readonly connection: RabbitMQConnection,
        private readonly maxRetries: number
    ) {}

    build(subscriber: DomainEventSubscriber<DomainEvent>, exchange: string, queueName: string): RabbitMQConsumer {
        return new RabbitMQConsumer(
            subscriber,
            this.deserializer,
            this.connection,
            queueName,
            exchange,
            this.maxRetries
        );
    }
}
