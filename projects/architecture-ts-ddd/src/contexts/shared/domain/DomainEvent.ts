import { FolderPrimitives } from '../../frontoffice/folders/domain/Folder';
import { FoldersCounterPrimitives } from '../../frontoffice/foldersCounter/domain/FoldersCounter';
import { Uuid } from './valueObject/Uuid';

export type DomainEventAttributes = FolderPrimitives | FoldersCounterPrimitives;

export abstract class DomainEvent {
    static EVENT_NAME: string;
    static fromPrimitives: (
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
        // eslint-disable-next-line no-use-before-define
    ) => DomainEvent;

    readonly aggregateId: string;
    readonly eventId: string;
    readonly occurredOn: Date;
    readonly eventName: string;

    constructor(eventName: string, aggregateId: string, eventId?: string, occurredOn?: Date) {
        this.eventName = eventName;
        this.aggregateId = aggregateId;
        this.eventId = eventId ?? Uuid.random().value;
        this.occurredOn = occurredOn ?? new Date();
    }

    abstract toPrimitives(): DomainEventAttributes;
}

export type DomainEventClass = {
    EVENT_NAME: string;

    fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): DomainEvent;
};
