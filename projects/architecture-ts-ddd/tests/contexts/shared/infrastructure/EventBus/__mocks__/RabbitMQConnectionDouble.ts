import { RabbitMQConnection } from '../../../../../../src/contexts/shared/infrastructure/eventBus/RabbitMQ/RabbitMQConnection';

export class RabbitMQConnectionDouble extends RabbitMQConnection {
    // eslint-disable-next-line @typescript-eslint/require-await
    async publish(_params: {
        exchange: string;
        routingKey: string;
        content: Buffer;
        options: { messageId: string; contentType: string; contentEncoding: string };
    }): Promise<void> {
        throw new Error();
    }
}
