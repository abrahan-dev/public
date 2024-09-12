import { Given } from '@cucumber/cucumber';

import container from '../../../../../../src/apps/frontoffice/backend/createContainer';
import { EventBus } from '../../../../../../src/contexts/shared/domain/EventBus';
import { DomainEventDeserializer } from '../../../../../../src/contexts/shared/infrastructure/eventBus/DomainEventDeserializer';
import { DomainEventSubscribers } from '../../../../../../src/contexts/shared/infrastructure/eventBus/DomainEventSubscribers';

const eventBus = container.get<EventBus>('Contexts.Shared.domain.EventBus');
const domainEventDeserializer = buildDomainEventDeserializer();

Given('I have sent an event to the event bus:', async (event: string) => {
    const domainEvent = domainEventDeserializer.deserialize(event);

    await eventBus.publish([domainEvent]);
    await wait(100);
});

function buildDomainEventDeserializer(): DomainEventDeserializer {
    const subscribers = DomainEventSubscribers.from(container);

    return DomainEventDeserializer.configure(subscribers);
}

async function wait(milliseconds: number) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}
