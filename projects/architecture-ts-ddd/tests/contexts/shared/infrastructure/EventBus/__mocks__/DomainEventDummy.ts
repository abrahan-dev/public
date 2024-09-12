import { DomainEvent, DomainEventAttributes } from '../../../../../../src/contexts/shared/domain/DomainEvent';
import { UuidMother } from '../../../domain/UuidMother';

export class DomainEventDummy extends DomainEvent {
    static readonly EVENT_NAME = 'dummy';

    constructor(aggregateId: string, eventId?: string, occurredOn?: Date) {
        super(DomainEventDummy.EVENT_NAME, aggregateId, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        _attributes: DomainEventAttributes
    ): DomainEventDummy {
        return new DomainEventDummy(aggregateId, eventId, occurredOn);
    }

    toPrimitives(): DomainEventAttributes {
        return {} as DomainEventAttributes;
    }
}

export class DomainEventDummyMother {
    static random(): DomainEventDummy {
        return new DomainEventDummy(UuidMother.random(), UuidMother.random(), new Date());
    }
}
