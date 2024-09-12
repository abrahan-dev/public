import { DomainEvent, DomainEventAttributes } from '../../../shared/domain/DomainEvent';
import { FolderPrimitives } from './Folder';

export class FolderCreatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = 'folder.created';

    readonly aggregateId: string;
    readonly name: string;

    constructor(aggregateId: string, name: string, eventId?: string, occurredOn?: Date) {
        super(FolderCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn);

        this.aggregateId = aggregateId;
        this.name = name;
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): DomainEvent {
        const folderPrimitives = attributes as FolderPrimitives;

        return new FolderCreatedDomainEvent(aggregateId, folderPrimitives.name, eventId, occurredOn);
    }

    toPrimitives(): FolderPrimitives {
        const { aggregateId, name } = this;

        return {
            id: aggregateId,
            name
        };
    }
}
