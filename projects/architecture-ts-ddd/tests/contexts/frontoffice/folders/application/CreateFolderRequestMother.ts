import { FolderCreatorRequest } from '../../../../../src/contexts/frontoffice/folders/application/FolderCreatorRequest';
import { FolderName } from '../../../../../src/contexts/frontoffice/folders/domain/FolderName';
import { FolderId } from '../../../../../src/contexts/frontoffice/shared/domain/folders/FolderId';
import { FolderIdMother } from '../../shared/domain/folders/FolderIdMother';
import { FolderNameMother } from '../domain/FolderNameMother';

export class CreateFolderRequestMother {
    static withInvalidNameLengthExceeded(): FolderCreatorRequest {
        return { id: FolderIdMother.random().value, name: FolderNameMother.withInvalidLengthExceeded() };
    }

    static withInvalidUuid(): FolderCreatorRequest {
        return { id: FolderIdMother.withInvalidUuid(), name: FolderNameMother.random().value };
    }

    static create(id: FolderId, name: FolderName): FolderCreatorRequest {
        return { id: id.value, name: name.value };
    }

    static random(): FolderCreatorRequest {
        return this.create(FolderIdMother.random(), FolderNameMother.random());
    }
}
