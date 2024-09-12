import { RabbitMQConfig } from '../../../../../../src/contexts/frontoffice/shared/infrastructure/RabbitMQ/RabbitMQConfigFactory';
import { RabbitMQConnection } from '../../../../../../src/contexts/shared/infrastructure/eventBus/RabbitMQ/RabbitMQConnection';
import { RabbitMQConnectionDouble } from '../__mocks__/RabbitMQConnectionDouble';
import { RabbitMQConnectionConfigurationMother } from './RabbitMQConnectionConfigurationMother';

export class RabbitMQConnectionMother {
    static async create(): Promise<RabbitMQConnection> {
        const config: RabbitMQConfig = RabbitMQConnectionConfigurationMother.create();
        const connection: RabbitMQConnection = new RabbitMQConnection(config);
        await connection.connect();

        return connection;
    }

    static failOnPublish(): RabbitMQConnectionDouble {
        return new RabbitMQConnectionDouble(RabbitMQConnectionConfigurationMother.create());
    }
}
