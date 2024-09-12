import { FolderCreatorRequest } from '../../../../../src/contexts/frontoffice/folders/application/FolderCreatorRequest';
import { Folder } from '../../../../../src/contexts/frontoffice/folders/domain/Folder';
import { FolderName } from '../../../../../src/contexts/frontoffice/folders/domain/FolderName';
import { FolderId } from '../../../../../src/contexts/frontoffice/shared/domain/folders/FolderId';
import { FolderIdMother } from '../../shared/domain/folders/FolderIdMother';
import { FolderNameMother } from './FolderNameMother';

export class FolderMother {
    static create(id: FolderId, name: FolderName): Folder {
        return new Folder(id, name);
    }

    static fromRequest(request: FolderCreatorRequest): Folder {
        return this.create(FolderIdMother.create(request.id), FolderNameMother.create(request.name));
    }

    static random(): Folder {
        return this.create(FolderIdMother.random(), FolderNameMother.random());
    }
}
