import { FolderName } from '../../../../../src/contexts/frontoffice/folders/domain/FolderName';
import WordMother from '../../../shared/domain/WordMother';

export class FolderNameMother {
    static withInvalidLengthExceeded(): string {
        return 'a'.repeat(FolderName.MAX_LENGTH + 1);
    }

    static create(value: string): FolderName {
        return new FolderName(value);
    }

    static random(): FolderName {
        return this.create(WordMother.random(1, FolderName.MAX_LENGTH));
    }
}
