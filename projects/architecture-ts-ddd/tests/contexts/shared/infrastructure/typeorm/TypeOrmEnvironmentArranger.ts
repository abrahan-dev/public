import { DataSource, EntityMetadata } from 'typeorm';

import { EnvironmentArranger } from '../arranger/EnvironmentArranger';

export class TypeOrmEnvironmentArranger extends EnvironmentArranger {
    constructor(private readonly dataSource: Promise<DataSource>) {
        super();
    }

    public async arrange(): Promise<void> {
        await this.cleanDatabase();
    }

    public async close(): Promise<void> {
        return (await this.client()).destroy();
    }

    protected async cleanDatabase(): Promise<void> {
        try {
            const promises: Promise<unknown>[] = [];
            const dataSource = await this.dataSource;

            for (const entity of await this.entities()) {
                promises.push(dataSource.getRepository(entity.name).query(`TRUNCATE TABLE ${entity.tableName};`));
            }

            await Promise.all(promises);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Unable to clean test database: ${error.message}`);
            }
            if (typeof error === 'string') {
                throw new Error(`Unable to clean test database: ${error}`);
            }
        }
    }

    protected async client(): Promise<DataSource> {
        return this.dataSource;
    }

    private async entities(): Promise<EntityMetadata[]> {
        return (await this.dataSource).entityMetadatas;
    }
}
