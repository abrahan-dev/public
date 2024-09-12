import { DataSource, EntitySchema, Repository } from 'typeorm';

import { FolderPrimitives } from '../../../../frontoffice/folders/domain/Folder';
import { AggregateRoot } from '../../../domain/AggregateRoot';
import { DomainEventUnpublishedPrimitives } from '../../../domain/domainEventsUnpublished/DomainEventUnpublished';

type AggregateRootPrimitives = FolderPrimitives | DomainEventUnpublishedPrimitives;

export abstract class TypeOrmRepository<T extends AggregateRoot<AggregateRootPrimitives>> {
    constructor(private readonly client: Promise<DataSource>) {}

    protected abstract entitySchema(): EntitySchema<T>;

    protected async repository(): Promise<Repository<T>> {
        return (await this.client).getRepository(this.entitySchema());
    }

    protected async persist(aggregateRoot: T): Promise<void> {
        const repository = await this.repository();
        await repository.save(aggregateRoot);
    }
}
