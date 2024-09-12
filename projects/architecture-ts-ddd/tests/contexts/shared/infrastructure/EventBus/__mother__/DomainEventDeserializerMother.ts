import { DomainEventDeserializer } from '../../../../../../src/contexts/shared/infrastructure/eventBus/DomainEventDeserializer';
import { DomainEventSubscribers } from '../../../../../../src/contexts/shared/infrastructure/eventBus/DomainEventSubscribers';
import { DomainEventSubscriberDummy } from '../__mocks__/DomainEventSubscriberDummy';

export class DomainEventDeserializerMother {
    static create(): DomainEventDeserializer {
        const dummySubscriber = new DomainEventSubscriberDummy();
        const subscribers = new DomainEventSubscribers([dummySubscriber]);

        return DomainEventDeserializer.configure(subscribers);
    }
}
