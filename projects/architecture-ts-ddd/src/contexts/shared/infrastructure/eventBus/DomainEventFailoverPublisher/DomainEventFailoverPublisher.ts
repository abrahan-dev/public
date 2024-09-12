import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventUnpublished } from '../../../domain/domainEventsUnpublished/DomainEventUnpublished';
import { DomainEventUnpublishedEvent } from '../../../domain/domainEventsUnpublished/DomainEventUnpublishedEvent';
import { DomainEventUnpublishedId } from '../../../domain/domainEventsUnpublished/DomainEventUnpublishedId';
import { DomainEventUnpublishedRepository } from '../../../domain/domainEventsUnpublished/DomainEventUnpublishedRepository';
import { DomainEventJsonSerializer } from '../DomainEventJsonSerializer';

export class DomainEventFailoverPublisher {
    constructor(private readonly repository: DomainEventUnpublishedRepository) {}

    async publish(event: DomainEvent): Promise<void> {
        const eventSerialized = DomainEventJsonSerializer.serialize(event);

        return this.repository.save(
            new DomainEventUnpublished(
                new DomainEventUnpublishedId(event.eventId),
                new DomainEventUnpublishedEvent(eventSerialized)
            )
        );
    }

    // TODO: Implement this method
    // async consume(): Promise<Array<DomainEvent>> {
    // get, deserialize, send and delete all unpublished events
    // }
}
