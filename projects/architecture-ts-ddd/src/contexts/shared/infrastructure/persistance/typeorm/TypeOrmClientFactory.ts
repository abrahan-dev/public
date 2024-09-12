import { DataSource } from 'typeorm';

import { TypeOrmConfig } from './TypeOrmConfig';

export class TypeOrmClientFactory {
    static async createClient(contextName: string, config: TypeOrmConfig): Promise<DataSource> {
        const dataSource = new DataSource({
            name: contextName,
            type: 'mysql',
            host: config.host,
            port: config.port,
            username: config.username,
            password: config.password,
            database: config.database,
            entities: [`${__dirname}/../../../../**/**/infrastructure/persistence/typeorm/*{.js,.ts}`],
            synchronize: process.env.NODE_ENV !== 'production',
            logging: false
        });

        if (dataSource.isInitialized) {
            return dataSource;
        }

        await dataSource.initialize();

        return dataSource;
    }
}
