import { FoldersCounter } from '../../../../../src/contexts/frontoffice/foldersCounter/domain/FoldersCounter';
import { FoldersCounterIncrementedDomainEvent } from '../../../../../src/contexts/frontoffice/foldersCounter/domain/FoldersCounterIncrementedDomainEvent';
import { DomainEvent } from '../../../../../src/contexts/shared/domain/DomainEvent';
import { FoldersCounterMother } from './FoldersCounterMother';

export class FoldersCounterIncrementedDomainEventMother {
    static create(): DomainEvent {
        return FoldersCounterIncrementedDomainEventMother.fromFolderCounter(FoldersCounterMother.random());
    }

    static fromFolderCounter(counter: FoldersCounter): FoldersCounterIncrementedDomainEvent {
        return new FoldersCounterIncrementedDomainEvent(counter.id.value, counter.total.value);
    }
}
