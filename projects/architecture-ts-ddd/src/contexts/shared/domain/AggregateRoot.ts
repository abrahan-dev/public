import { DomainEvent } from './DomainEvent';

export abstract class AggregateRoot<PRIMITIVES> {
    private domainEvents: Array<DomainEvent>;

    constructor() {
        this.domainEvents = [];
    }

    abstract toPrimitives(): PRIMITIVES;

    static fromPrimitives(_primitives: unknown): AggregateRoot<unknown> {
        throw new Error('Not implemented exception');
    }

    pullDomainEvents(): Array<DomainEvent> {
        const domainEvents = this.domainEvents.slice();
        this.domainEvents = [];

        return domainEvents;
    }

    record(event: DomainEvent): void {
        this.domainEvents.push(event);
    }
}
