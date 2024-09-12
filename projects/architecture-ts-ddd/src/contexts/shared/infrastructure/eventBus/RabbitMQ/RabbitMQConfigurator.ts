import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../../domain/DomainEventSubscriber';
import { RabbitMQConnection } from './RabbitMQConnection';
import { RabbitMQExchangeNameFormatter } from './RabbitMQExchangeNameFormatter';
import { RabbitMQueueFormatter } from './RabbitMQueueFormatter';

export class RabbitMQConfigurator {
    constructor(
        private readonly connection: RabbitMQConnection,
        private readonly queueNameFormatter: RabbitMQueueFormatter,
        private readonly messageRetryTtl: number = 10000
    ) {}

    async configure(params: {
        exchange: string;
        subscribers: Array<DomainEventSubscriber<DomainEvent>>;
    }): Promise<void> {
        const retryExchange = RabbitMQExchangeNameFormatter.retry(params.exchange);
        const deadLetterExchange = RabbitMQExchangeNameFormatter.deadLetter(params.exchange);

        await this.connection.exchange({ name: params.exchange });
        await this.connection.exchange({ name: retryExchange });
        await this.connection.exchange({ name: deadLetterExchange });

        const promises: Promise<unknown>[] = [];

        for (const subscriber of params.subscribers) {
            promises.push(this.addQueue(subscriber, params.exchange));
        }

        await Promise.all(promises);
    }

    private async addQueue(subscriber: DomainEventSubscriber<DomainEvent>, exchange: string) {
        const retryExchange = RabbitMQExchangeNameFormatter.retry(exchange);
        const deadLetterExchange = RabbitMQExchangeNameFormatter.deadLetter(exchange);
        const routingKeys = this.getRoutingKeysFor(subscriber);
        const queue = this.queueNameFormatter.format(subscriber.constructor.name);
        const deadLetterQueue = this.queueNameFormatter.formatDeadLetter(subscriber.constructor.name);
        const retryQueue = this.queueNameFormatter.formatRetry(subscriber.constructor.name);

        await this.connection.queue({ routingKeys, name: queue, exchange });
        await this.connection.queue({
            routingKeys: [queue],
            name: retryQueue,
            exchange: retryExchange,
            messageTtl: this.messageRetryTtl,
            deadLetterExchange: exchange,
            deadLetterQueue: queue
        });
        await this.connection.queue({ routingKeys: [queue], name: deadLetterQueue, exchange: deadLetterExchange });
    }

    private getRoutingKeysFor(subscriber: DomainEventSubscriber<DomainEvent>) {
        const routingKeys = subscriber.subscribedTo().map(event => event.EVENT_NAME);
        const queue = this.queueNameFormatter.format(subscriber.constructor.name);

        routingKeys.push(queue);

        return routingKeys;
    }
}
