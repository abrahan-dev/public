import { FoldersCounterIncrementor } from '../../../../../../src/contexts/frontoffice/foldersCounter/application/Increment/FoldersCounterIncrementor';
import { FoldersCounter } from '../../../../../../src/contexts/frontoffice/foldersCounter/domain/FoldersCounter';
import EventBusMock from '../../../shared/__mocks__/EventBusMock';
import { FolderIdMother } from '../../../shared/domain/folders/FolderIdMother';
import { FoldersCounterRepositoryMock } from '../../__mocks__/FoldersCounterRepositoryMock';
import { FoldersCounterIncrementedDomainEventMother } from '../../domain/FoldersCounterIncrementedDomainEventMother';
import { FoldersCounterMother } from '../../domain/FoldersCounterMother';

describe('FoldersCounter Incrementor', () => {
    let incrementor: FoldersCounterIncrementor;
    let eventBus: EventBusMock;
    let repository: FoldersCounterRepositoryMock;

    beforeEach(() => {
        eventBus = new EventBusMock();
        repository = new FoldersCounterRepositoryMock();
        incrementor = new FoldersCounterIncrementor(repository, eventBus);
    });

    it('should initialize a new counter', async () => {
        const folderId = FolderIdMother.random();
        const counter = FoldersCounterMother.withOne(folderId);

        await incrementor.run(folderId);

        repository.assertLastFoldersCounterSaved(counter);
    });

    it('should increment an existing counter', async () => {
        const existingCounter = FoldersCounterMother.random();
        repository.returnOnSearch(existingCounter);
        const folderId = FolderIdMother.random();
        const expected = FoldersCounter.fromPrimitives(existingCounter.toPrimitives());
        expected.increment(folderId);
        const expectedEvent = FoldersCounterIncrementedDomainEventMother.fromFolderCounter(expected);

        await incrementor.run(folderId);

        repository.assertLastFoldersCounterSaved(expected);
        eventBus.assertLastPublishedEventIs(expectedEvent);
    });

    it('should not increment an already incremented counter', async () => {
        const existingCounter = FoldersCounterMother.random();
        repository.returnOnSearch(existingCounter);
        const folderId = existingCounter.existingFolders[0];

        await incrementor.run(folderId);

        repository.assertNotSave();
    });
});
