import container from '../../../../../../src/apps/frontoffice/backend/createContainer';
import { RabbitMQConfig } from '../../../../../../src/contexts/frontoffice/shared/infrastructure/RabbitMQ/RabbitMQConfigFactory';

export class RabbitMQConnectionConfigurationMother {
    static create(): RabbitMQConfig {
        return container.get<RabbitMQConfig>('Contexts.Shared.RabbitMQConfig');
    }
}
