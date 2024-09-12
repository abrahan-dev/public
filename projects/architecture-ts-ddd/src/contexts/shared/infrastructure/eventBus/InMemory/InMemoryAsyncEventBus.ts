import { EventEmitter } from 'events';

import { DomainEvent } from '../../../domain/DomainEvent';
import { EventBus } from '../../../domain/EventBus';
import { DomainEventSubscribers } from '../DomainEventSubscribers';

export class InMemoryAsyncEventBus extends EventEmitter implements EventBus {
    async publish(events: DomainEvent[]): Promise<void> {
        await new Promise<void>(resolve => {
            events.map(event => this.emit(event.eventName, event));
            resolve();
        });
    }

    addSubscribers(subscribers: DomainEventSubscribers): void {
        subscribers.items.forEach(subscriber => {
            subscriber.subscribedTo().forEach(event => {
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                this.on(event.EVENT_NAME, subscriber.on.bind(subscriber));
            });
        });
    }
}
