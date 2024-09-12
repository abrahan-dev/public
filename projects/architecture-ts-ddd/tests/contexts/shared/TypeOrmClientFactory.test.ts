import { DataSource } from 'typeorm';

import { TypeOrmClientFactory } from '../../../src/contexts/shared/infrastructure/persistance/typeorm/TypeOrmClientFactory';

describe('TypeOrmClientFactory', () => {
    const factory = TypeOrmClientFactory;
    let dataSource: DataSource;

    beforeEach(async () => {
        dataSource = await factory.createClient('test-1', {
            host: 'localhost',
            port: 33062,
            username: 'root',
            password: 'yeti',
            database: 'db_frontoffice_backend_test'
        });
    });

    afterEach(async () => {
        await dataSource.destroy();
    });

    it('creates a new client with the connection already established', () => {
        expect(dataSource).toBeInstanceOf(DataSource);
        expect(dataSource.isInitialized).toBe(true);
    });

    it('creates a new client if it does not exist a client with the given name', async () => {
        const newClient = await factory.createClient('test-2', {
            host: 'localhost',
            port: 33062,
            username: 'root',
            password: 'yeti',
            database: 'db_frontoffice_backend_test'
        });

        expect(newClient).toBeInstanceOf(DataSource);
        expect(newClient).not.toBe(dataSource);
        expect(newClient.isInitialized).toEqual(true);

        await newClient.destroy();
    });

    it('returns a client if it already exists', async () => {
        const existingDataSource = await factory.createClient('test-1', {
            host: 'localhost',
            port: 33062,
            username: 'root',
            password: 'yeti',
            database: 'db_frontoffice_backend_test'
        });

        expect(existingDataSource).toBeInstanceOf(DataSource);
        expect(dataSource).toBeInstanceOf(DataSource);
        expect(existingDataSource.options).toEqual(dataSource.options);
        await existingDataSource.destroy();
    });
});
