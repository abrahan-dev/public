import { DomainEventUnpublished } from '../../../../src/contexts/shared/domain/domainEventsUnpublished/DomainEventUnpublished';
import { DomainEventUnpublishedRepository } from '../../../../src/contexts/shared/domain/domainEventsUnpublished/DomainEventUnpublishedRepository';
import { RepositoryMock } from './RepositoryMock';

export class DomainEventUnpublishedRepositoryMock
    implements DomainEventUnpublishedRepository, RepositoryMock<DomainEventUnpublished>
{
    private readonly mockSave = jest.fn();

    async save(domainEventUnpublished: DomainEventUnpublished): Promise<void> {
        await this.mockSave(domainEventUnpublished);
    }

    assertLastSavedIs(expected: DomainEventUnpublished): void {
        const mock = this.mockSave.mock;
        const lastSaved = (mock.calls[mock.calls.length - 1] as DomainEventUnpublished[])[0];
        expect(lastSaved).toBeInstanceOf(DomainEventUnpublished);
        expect(lastSaved.id).toEqual(expected.id);
    }
}
