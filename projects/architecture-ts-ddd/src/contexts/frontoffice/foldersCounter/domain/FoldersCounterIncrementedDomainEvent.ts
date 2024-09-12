import { DomainEvent, DomainEventAttributes } from '../../../shared/domain/DomainEvent';
import { FoldersCounterPrimitives } from './FoldersCounter';

export class FoldersCounterIncrementedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = 'folders_counter.incremented';
    readonly total: number;

    constructor(aggregateId: string, total: number, eventId?: string, occurredOn?: Date) {
        super(FoldersCounterIncrementedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
        this.total = total;
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): DomainEvent {
        const folderCounterIncrementedDomainEventAttributes = attributes as FoldersCounterPrimitives;

        return new FoldersCounterIncrementedDomainEvent(
            aggregateId,
            folderCounterIncrementedDomainEventAttributes.total,
            eventId,
            occurredOn
        );
    }

    toPrimitives(): FoldersCounterPrimitives {
        return {
            id: this.aggregateId,
            total: this.total,
            existingFolders: []
        };
    }
}
