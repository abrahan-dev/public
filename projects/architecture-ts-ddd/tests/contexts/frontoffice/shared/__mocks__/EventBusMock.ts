import { DomainEvent } from '../../../../../src/contexts/shared/domain/DomainEvent';
import { EventBus } from '../../../../../src/contexts/shared/domain/EventBus';
import { DomainEventSubscribers } from '../../../../../src/contexts/shared/infrastructure/eventBus/DomainEventSubscribers';

export default class EventBusMock implements EventBus {
    private readonly publishSpy = jest.fn();

    async publish(events: DomainEvent[]): Promise<void> {
        await new Promise<void>(resolve => {
            this.publishSpy(events);
            resolve();
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    addSubscribers(_subscribers: DomainEventSubscribers): void {}

    assertLastPublishedEventIs(expectedEvent: DomainEvent): void {
        const publishSpyCalls = this.publishSpy.mock.calls;

        expect(publishSpyCalls.length).toBeGreaterThan(0);

        const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1] as Array<Array<DomainEvent>>;
        const lastPublishedEvent = lastPublishSpyCall[0][0];

        const expected = this.getDataFromDomainEvent(expectedEvent);
        const published = this.getDataFromDomainEvent(lastPublishedEvent);
        expected.eventId = published.eventId;

        expect(expected).toMatchObject(published);
    }

    private getDataFromDomainEvent(event: DomainEvent) {
        const { ...attributes } = event;

        return attributes;
    }
}
