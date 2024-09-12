import { DomainEventUnpublished } from './DomainEventUnpublished';

export interface DomainEventUnpublishedRepository {
    save(domainEventUnpublished: DomainEventUnpublished): Promise<void>;
}
