import { AggregateRoot } from '../AggregateRoot';
import { DomainEventUnpublishedEvent } from './DomainEventUnpublishedEvent';
import { DomainEventUnpublishedId } from './DomainEventUnpublishedId';

export type DomainEventUnpublishedPrimitives = { id: string; event: string };

export class DomainEventUnpublished extends AggregateRoot<DomainEventUnpublishedPrimitives> {
    readonly id: DomainEventUnpublishedId;
    readonly event: DomainEventUnpublishedEvent;

    constructor(id: DomainEventUnpublishedId, event: DomainEventUnpublishedEvent) {
        super();
        this.id = id;
        this.event = event;
    }

    static fromPrimitives(primitives: DomainEventUnpublishedPrimitives): DomainEventUnpublished {
        return new DomainEventUnpublished(
            new DomainEventUnpublishedId(primitives.id),
            new DomainEventUnpublishedEvent(primitives.event)
        );
    }

    toPrimitives(): DomainEventUnpublishedPrimitives {
        return {
            id: this.id.value,
            event: this.event.value
        };
    }
}
