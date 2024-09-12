import { RabbitMQConfig } from '../../../../contexts/frontoffice/shared/infrastructure/RabbitMQ/RabbitMQConfigFactory';
import { DomainEventSubscribers } from '../../../../contexts/shared/infrastructure/eventBus/DomainEventSubscribers';
import { RabbitMQConfigurator } from '../../../../contexts/shared/infrastructure/eventBus/RabbitMQ/RabbitMQConfigurator';
import { RabbitMQConnection } from '../../../../contexts/shared/infrastructure/eventBus/RabbitMQ/RabbitMQConnection';
import container from '../createContainer';

export class ConfigureRabbitMQCommand {
    static async run(): Promise<void> {
        const connection = container.get<RabbitMQConnection>('Contexts.Shared.RabbitMQConnection');
        const { name: exchange } = container.get<RabbitMQConfig>('Contexts.Shared.RabbitMQConfig').exchangeSettings;
        await connection.connect();

        const configurator = container.get<RabbitMQConfigurator>('Contexts.Shared.RabbitMQConfigurator');
        const subscribers = DomainEventSubscribers.from(container).items;

        await configurator.configure({ exchange, subscribers });
        await connection.close();
    }
}
