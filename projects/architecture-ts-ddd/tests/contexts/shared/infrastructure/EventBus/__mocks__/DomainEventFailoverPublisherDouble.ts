import { DomainEvent } from '../../../../../../src/contexts/shared/domain/DomainEvent';
import { DomainEventFailoverPublisher } from '../../../../../../src/contexts/shared/infrastructure/eventBus/DomainEventFailoverPublisher/DomainEventFailoverPublisher';
import { DomainEventUnpublishedRepositoryMock } from '../../../__mocks__/DomainEventUnpublishedRepositoryMock';

export class DomainEventFailoverPublisherDouble extends DomainEventFailoverPublisher {
    private readonly publishMock: jest.Mock;

    constructor() {
        super(new DomainEventUnpublishedRepositoryMock());
        this.publishMock = jest.fn();
    }

    async publish(event: DomainEvent): Promise<void> {
        await new Promise<void>(resolve => {
            this.publishMock(event);
            resolve();
        });
    }

    assertEventHasBeenPublished(event: DomainEvent): void {
        expect(this.publishMock).toHaveBeenCalledWith(event);
    }
}
