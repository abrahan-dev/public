import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { Uuid } from '../../../shared/domain/valueObject/Uuid';
import { FolderId } from '../../shared/domain/folders/FolderId';
import { FoldersCounterId } from './FoldersCounterId';
import { FoldersCounterIncrementedDomainEvent } from './FoldersCounterIncrementedDomainEvent';
import { FoldersCounterTotal } from './FoldersCounterTotal';

export type FoldersCounterPrimitives = { id: string; total: number; existingFolders: string[] };

export class FoldersCounter extends AggregateRoot<FoldersCounterPrimitives> {
    constructor(
        readonly id: FoldersCounterId,
        private _total: FoldersCounterTotal,
        readonly existingFolders: Array<FolderId> = []
    ) {
        super();
    }

    public get total(): FoldersCounterTotal {
        return this._total;
    }

    static initialize(id: Uuid): FoldersCounter {
        return new FoldersCounter(id, FoldersCounterTotal.initialize());
    }

    static fromPrimitives(primitives: FoldersCounterPrimitives): FoldersCounter {
        return new FoldersCounter(
            new FoldersCounterId(primitives.id),
            new FoldersCounterTotal(primitives.total),
            primitives.existingFolders.map(entry => new FolderId(entry))
        );
    }

    increment(folderId: FolderId): void {
        this._total = this.total.increment();
        this.existingFolders.push(folderId);

        this.record(new FoldersCounterIncrementedDomainEvent(this.id.value, this.total.value));
    }

    hasIncremented(folderId: FolderId): boolean {
        const exists = this.existingFolders.find(entry => entry.value === folderId.value);

        return exists !== undefined;
    }

    toPrimitives(): FoldersCounterPrimitives {
        return {
            id: this.id.value,
            total: this._total.value,
            existingFolders: this.existingFolders.map(folderId => folderId.value)
        };
    }
}
