import { ContainerBuilder } from 'node-dependency-injection';

import { DomainEvent } from '../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../domain/DomainEventSubscriber';

export class DomainEventSubscribers {
    public constructor(public items: Array<DomainEventSubscriber<DomainEvent>>) {}

    static from(container: ContainerBuilder): DomainEventSubscribers {
        const taggedServicesGenerator = container.findTaggedServiceIds('domainEventSubscriber');

        const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

        [...taggedServicesGenerator].forEach(taggedService => {
            const key: string = taggedService.id;
            const domainEventSubscriber = container.get<DomainEventSubscriber<DomainEvent>>(key);
            subscribers.push(domainEventSubscriber);
        });

        return new DomainEventSubscribers(subscribers);
    }
}
