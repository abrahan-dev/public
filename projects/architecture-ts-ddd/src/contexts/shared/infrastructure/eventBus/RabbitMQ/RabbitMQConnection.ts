import amqplib, { ConsumeMessage } from 'amqplib';

import { RabbitMQConfig } from '../../../../frontoffice/shared/infrastructure/RabbitMQ/RabbitMQConfigFactory';
import { ConnectionSettings } from './ConnectionSettings';
import { RabbitMQExchangeNameFormatter } from './RabbitMQExchangeNameFormatter';

type MessageOptions = {
    messageId: string;
    contentType: string;
    contentEncoding: string;
    priority?: number;
    headers?: amqplib.MessagePropertyHeaders;
};

export class RabbitMQConnection {
    private readonly connectionSettings: ConnectionSettings;
    private channel?: amqplib.ConfirmChannel;
    private connection?: amqplib.Connection;

    constructor(params: RabbitMQConfig) {
        this.connectionSettings = params.connectionSettings;
    }

    async connect(): Promise<void> {
        this.connection = await this.amqpConnect();
        this.channel = await this.amqpChannel();
    }

    async exchange(params: { name: string }): Promise<void> {
        await this.channel?.assertExchange(params.name, 'topic', { durable: true });
    }

    async queue(params: {
        exchange: string;
        name: string;
        routingKeys: string[];
        deadLetterExchange?: string;
        deadLetterQueue?: string;
        messageTtl?: number;
    }): Promise<void> {
        if (!this.channel) {
            throw new Error('Unable to bind queue: Probably missing channel.');
        }

        const durable = true;
        const exclusive = false;
        const autoDelete = false;
        const args = this.getQueueArguments(params);

        await this.channel.assertQueue(params.name, {
            exclusive,
            durable,
            autoDelete,
            arguments: args
        });

        const promises: Promise<unknown>[] = [];

        for (const routingKey of params.routingKeys) {
            promises.push(this.channel.bindQueue(params.name, params.exchange, routingKey));
        }

        await Promise.all(promises);
    }

    async deleteQueue(queue: string): Promise<void> {
        await this.channel?.deleteQueue(queue);
    }

    async publish(params: {
        exchange: string;
        routingKey: string;
        content: Buffer;
        options: MessageOptions;
    }): Promise<void> {
        const { routingKey, content, options, exchange } = params;

        return new Promise((resolve, reject) => {
            if (!this.channel) {
                reject(new Error('Unable to publish message: Missing channel.'));

                return;
            }

            this.channel.publish(exchange, routingKey, content, options, (error: unknown) =>
                error ? reject(error) : resolve()
            );
        });
    }

    async close(): Promise<void> {
        await this.channel?.close();
        await this.connection?.close();
    }

    async consume(queue: string, onMessage: (message: ConsumeMessage) => object): Promise<void> {
        await this.channel?.consume(queue, (message: ConsumeMessage | null) => {
            if (!message) {
                return;
            }
            onMessage(message);
        });
    }

    ack(message: ConsumeMessage): void {
        this.channel?.ack(message);
    }

    noAck(message: ConsumeMessage): void {
        this.channel?.nack(message);
    }

    async retry(message: ConsumeMessage, queue: string, exchange: string): Promise<void> {
        const retryExchange = RabbitMQExchangeNameFormatter.retry(exchange);
        const options = this.getMessageOptions(message);

        await this.publish({ exchange: retryExchange, routingKey: queue, content: message.content, options });
    }

    async deadLetter(message: ConsumeMessage, queue: string, exchange: string): Promise<void> {
        const deadLetterExchange = RabbitMQExchangeNameFormatter.deadLetter(exchange);
        const options = this.getMessageOptions(message);

        await this.publish({
            exchange: deadLetterExchange,
            routingKey: queue,
            content: message.content,
            options
        });
    }

    private getQueueArguments(params: {
        exchange: string;
        name: string;
        routingKeys: string[];
        deadLetterExchange?: string;
        deadLetterQueue?: string;
        messageTtl?: number;
    }): object {
        let args: object = {};
        if (params.deadLetterExchange) {
            args = { ...args, 'x-dead-letter-exchange': params.deadLetterExchange };
        }
        if (params.deadLetterQueue) {
            args = { ...args, 'x-dead-letter-routing-key': params.deadLetterQueue };
        }
        if (params.messageTtl) {
            args = { ...args, 'x-message-ttl': params.messageTtl };
        }

        return args;
    }

    private async amqpConnect() {
        const { hostname, port, secure } = this.connectionSettings.connection;
        const { username, password, vhost } = this.connectionSettings;
        const protocol = secure ? 'amqps' : 'amqp';

        const connection = await amqplib.connect({
            protocol,
            hostname,
            port,
            username,
            password,
            vhost
        });

        connection.on('error', (err: unknown) => {
            void Promise.reject(err);
        });

        return connection;
    }

    private async amqpChannel(): Promise<amqplib.ConfirmChannel> {
        const channel = await this.connection?.createConfirmChannel();

        if (!channel) {
            throw new Error('Unable to create channel: Probably missing connection.');
        }

        await channel.prefetch(1);

        return channel;
    }

    private getMessageOptions(message: ConsumeMessage): MessageOptions {
        const { messageId, contentType, contentEncoding, priority } = message.properties as MessageOptions;

        const options: MessageOptions = {
            messageId,
            contentType,
            contentEncoding,
            priority,
            headers: this.incrementRedeliveryCount(message)
        };

        return options;
    }

    private incrementRedeliveryCount(message: ConsumeMessage) {
        if (this.hasBeenRedelivered(message)) {
            const count: number = parseInt(message.properties.headers['redelivery_count'] as string, 10);
            message.properties.headers['redelivery_count'] = count + 1;
        } else {
            message.properties.headers['redelivery_count'] = 1;
        }

        return message.properties.headers;
    }

    private hasBeenRedelivered(message: ConsumeMessage) {
        return message.properties.headers['redelivery_count'] !== undefined;
    }
}
