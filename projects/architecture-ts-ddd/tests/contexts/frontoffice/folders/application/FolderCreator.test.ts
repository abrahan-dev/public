import { FolderCreator } from '../../../../../src/contexts/frontoffice/folders/application/FolderCreator';
import { FolderCreatorRequest } from '../../../../../src/contexts/frontoffice/folders/application/FolderCreatorRequest';
import { FolderName } from '../../../../../src/contexts/frontoffice/folders/domain/FolderName';
import EventBusMock from '../../shared/__mocks__/EventBusMock';
import { FolderRepositoryMock } from '../__mocks__/FolderRepositoryMock';
import { FolderCreatedDomainEventMother } from '../domain/FolderCreatedDomainEventMother';
import { FolderMother } from '../domain/FolderMother';
import { CreateFolderRequestMother } from './CreateFolderRequestMother';

let repository: FolderRepositoryMock;
let eventBus: EventBusMock;
let folderCreator: FolderCreator;

beforeEach(() => {
    repository = new FolderRepositoryMock();
    eventBus = new EventBusMock();
    folderCreator = new FolderCreator(repository, eventBus);
});

describe('FolderCreator', () => {
    it('should create a valid folder', async () => {
        const request: FolderCreatorRequest = CreateFolderRequestMother.random();
        const folder = FolderMother.fromRequest(request);
        const domainEvent = FolderCreatedDomainEventMother.fromFolder(folder);

        await folderCreator.run(request);
        repository.assertLastSavedIs(folder);
        eventBus.assertLastPublishedEventIs(domainEvent);
    });

    it('should throw an error if the folder id is not a valid uuid', async () => {
        const request: FolderCreatorRequest = CreateFolderRequestMother.withInvalidUuid();

        await expect(folderCreator.run(request)).rejects.toThrowError(
            '<FolderId> does not allow the value <invalid-uuid>'
        );
    });

    it('should throw an error if the folder name length is exceeded', async () => {
        const request: FolderCreatorRequest = CreateFolderRequestMother.withInvalidNameLengthExceeded();

        await expect(folderCreator.run(request)).rejects.toThrowError(
            `The Folder Name <${request.name}> has more than <${FolderName.MAX_LENGTH}> characters`
        );
    });
});
