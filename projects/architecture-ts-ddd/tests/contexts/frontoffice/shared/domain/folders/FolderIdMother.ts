import { FolderId } from '../../../../../../src/contexts/frontoffice/shared/domain/folders/FolderId';
import { UuidMother } from '../../../../shared/domain/UuidMother';

export class FolderIdMother {
    static withInvalidUuid(): string {
        return 'invalid-uuid';
    }

    static create(value: string): FolderId {
        return new FolderId(value);
    }

    static random(): FolderId {
        return this.create(UuidMother.random());
    }
}
