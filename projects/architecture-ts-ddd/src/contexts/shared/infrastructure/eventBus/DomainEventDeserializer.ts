import { DomainEvent, DomainEventAttributes, DomainEventClass } from '../../domain/DomainEvent';
import { DomainEventSubscribers } from './DomainEventSubscribers';

type DomainEventJSON = {
    data: {
        type: string;
        aggregateId: string;
        attributes: DomainEventAttributes;
        id: string;
        occurredOn: string;
    };
};

export class DomainEventDeserializer extends Map<string, DomainEventClass> {
    static configure(subscribers: DomainEventSubscribers): DomainEventDeserializer {
        const mapping = new DomainEventDeserializer();

        subscribers.items.forEach(subscriber => {
            subscriber.subscribedTo().forEach(mapping.registerEvent.bind(mapping));
        });

        return mapping;
    }

    deserialize(event: string): DomainEvent {
        const jsonEvent = JSON.parse(event) as DomainEventJSON;
        const { type, aggregateId, attributes, id, occurredOn } = jsonEvent.data;
        const EventClass: DomainEventClass | undefined = super.get(type);

        if (!EventClass) {
            throw Error(`DomainEvent mapping not found for event ${type}`);
        }

        return EventClass.fromPrimitives(aggregateId, id, new Date(occurredOn), attributes);
    }

    private registerEvent(domainEvent: DomainEventClass): void {
        const eventName = domainEvent.EVENT_NAME;
        this.set(eventName, domainEvent);
    }
}
