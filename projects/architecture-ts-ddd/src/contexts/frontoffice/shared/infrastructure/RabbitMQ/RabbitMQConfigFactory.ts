import { ConnectionSettings } from '../../../../shared/infrastructure/eventBus/RabbitMQ/ConnectionSettings';
import { ExchangeSetting } from '../../../../shared/infrastructure/eventBus/RabbitMQ/ExchangeSetting';
import config from '../config';

export type RabbitMQConfig = {
    exchangeSettings: ExchangeSetting;
    connectionSettings: ConnectionSettings;
};

export class RabbitMQConfigFactory {
    static createConfig(): RabbitMQConfig {
        return config.get('rabbitmq');
    }
}
