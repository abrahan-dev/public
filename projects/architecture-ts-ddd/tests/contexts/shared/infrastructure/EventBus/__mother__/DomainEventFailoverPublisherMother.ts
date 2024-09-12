import container from '../../../../../../src/apps/frontoffice/backend/createContainer';
import { DomainEventUnpublishedRepository } from '../../../../../../src/contexts/shared/domain/domainEventsUnpublished/DomainEventUnpublishedRepository';
import { DomainEventFailoverPublisher } from '../../../../../../src/contexts/shared/infrastructure/eventBus/DomainEventFailoverPublisher/DomainEventFailoverPublisher';
import { DomainEventFailoverPublisherDouble } from '../__mocks__/DomainEventFailoverPublisherDouble';

export class DomainEventFailoverPublisherMother {
    static create(): DomainEventFailoverPublisher {
        const domainEventUnpublishedRepository = container.get<DomainEventUnpublishedRepository>(
            'Contexts.Shared.DomainEventsUnpublished.domain.DomainEventUnpublishedRepository'
        );

        return new DomainEventFailoverPublisher(domainEventUnpublishedRepository);
    }

    static failOverDouble(): DomainEventFailoverPublisherDouble {
        return new DomainEventFailoverPublisherDouble();
    }
}
