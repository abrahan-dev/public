import { FoldersCounterTotal } from '../../../../../src/contexts/frontoffice/foldersCounter/domain/FoldersCounterTotal';
import { IntegerMother } from '../../../shared/domain/IntegerMother';

export class FoldersCounterTotalMother {
    static random(): FoldersCounterTotal {
        return new FoldersCounterTotal(IntegerMother.random());
    }
}
