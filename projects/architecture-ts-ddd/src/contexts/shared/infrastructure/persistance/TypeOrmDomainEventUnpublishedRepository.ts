import { EntitySchema } from 'typeorm';

import { DomainEventUnpublished } from '../../domain/domainEventsUnpublished/DomainEventUnpublished';
import { DomainEventUnpublishedRepository } from '../../domain/domainEventsUnpublished/DomainEventUnpublishedRepository';
import { DomainEventUnpublishedEntity } from './typeorm/DomainEventUnpublishedEntity';
import { TypeOrmRepository } from './typeorm/TypeOrmRepository';

export class TypeOrmDomainEventUnpublishedRepository
    extends TypeOrmRepository<DomainEventUnpublished>
    implements DomainEventUnpublishedRepository
{
    async save(domainEventUnpublished: DomainEventUnpublished): Promise<void> {
        return this.persist(domainEventUnpublished);
    }

    protected entitySchema(): EntitySchema<DomainEventUnpublished> {
        return DomainEventUnpublishedEntity;
    }
}
