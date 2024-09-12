import { DomainEvent, DomainEventClass } from '../../../../../../src/contexts/shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../../../src/contexts/shared/domain/DomainEventSubscriber';
import { DomainEventDummy } from './DomainEventDummy';

export class DomainEventSubscriberDummy implements DomainEventSubscriber<DomainEventDummy> {
    private readonly events: Array<DomainEvent> = [];
    private alreadyFailed = false;

    constructor(private readonly failsFirstTime: boolean = false, private readonly alwaysFails: boolean = false) {}

    static failsFirstTime(): DomainEventSubscriberDummy {
        return new DomainEventSubscriberDummy(true);
    }

    static alwaysFails(): DomainEventSubscriberDummy {
        return new DomainEventSubscriberDummy(false, true);
    }

    subscribedTo(): DomainEventClass[] {
        return [DomainEventDummy];
    }

    async on(domainEvent: DomainEventDummy): Promise<void> {
        if (this.alwaysFails) {
            throw new Error();
        }

        if (!this.alreadyFailed && this.failsFirstTime) {
            this.alreadyFailed = true;
            throw new Error();
        }

        return new Promise<void>(resolve => {
            this.events.push(domainEvent);
            resolve();
        });
    }

    async assertConsumedEvents(events: Array<DomainEvent>): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    expect(this.events.length).toEqual(events.length);
                    expect(this.events).toEqual(events);
                    resolve();
                } catch (error: unknown) {
                    reject(error);
                }
            }, 400);
        });
    }
}
