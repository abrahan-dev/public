import { StringValueObject } from '../../../shared/domain/valueObject/StringValueObject';
import { FolderNameLengthExceeded } from './FolderNameLengthExceeded';

export class FolderName extends StringValueObject {
    static readonly MAX_LENGTH = 30;

    constructor(value: string) {
        super(value);
        this.ensureLengthIsLessThan30Characters(value);
    }

    private ensureLengthIsLessThan30Characters(value: string): void {
        if (value.length > FolderName.MAX_LENGTH) {
            throw new FolderNameLengthExceeded(
                `The Folder Name <${value}> has more than <${FolderName.MAX_LENGTH}> characters`
            );
        }
    }
}
