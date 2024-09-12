import { NumberValueObject } from '../../../shared/domain/valueObject/NumberValueObject';

export class FoldersCounterTotal extends NumberValueObject {
    static initialize(): FoldersCounterTotal {
        return new FoldersCounterTotal(0);
    }

    increment(): FoldersCounterTotal {
        return new FoldersCounterTotal(this.value + 1);
    }
}
