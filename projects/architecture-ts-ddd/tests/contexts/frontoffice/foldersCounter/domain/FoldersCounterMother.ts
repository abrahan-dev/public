import { FoldersCounter } from '../../../../../src/contexts/frontoffice/foldersCounter/domain/FoldersCounter';
import { FoldersCounterId } from '../../../../../src/contexts/frontoffice/foldersCounter/domain/FoldersCounterId';
import { FoldersCounterTotal } from '../../../../../src/contexts/frontoffice/foldersCounter/domain/FoldersCounterTotal';
import { FolderId } from '../../../../../src/contexts/frontoffice/shared/domain/folders/FolderId';
import { Repeater } from '../../../shared/domain/Repeater';
import { FolderIdMother } from '../../shared/domain/folders/FolderIdMother';
import { FoldersCounterTotalMother } from './FoldersCounterTotalMother';

export class FoldersCounterMother {
    static random(): FoldersCounter {
        const total = FoldersCounterTotalMother.random();

        return new FoldersCounter(
            FoldersCounterId.random(),
            total,
            Repeater.random(FolderIdMother.random.bind(FolderIdMother), total.value) as FolderId[]
        );
    }

    static withOne(folderId: FolderId): FoldersCounter {
        return new FoldersCounter(FoldersCounterId.random(), new FoldersCounterTotal(1), [folderId]);
    }

    static withNone(): FoldersCounter {
        return new FoldersCounter(FoldersCounterId.random(), new FoldersCounterTotal(0), []);
    }
}
