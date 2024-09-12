import { FoldersCounter } from '../../../../../src/contexts/frontoffice/foldersCounter/domain/FoldersCounter';
import { FoldersCounterRepository } from '../../../../../src/contexts/frontoffice/foldersCounter/domain/FoldersCounterRepository';
import { Nullable } from '../../../../../src/contexts/shared/domain/Nullable';

export class FoldersCounterRepositoryMock implements FoldersCounterRepository {
    private readonly mockSave = jest.fn();
    private readonly mockSearch = jest.fn();
    private foldersCounter: Nullable<FoldersCounter> = null;

    async search(): Promise<Nullable<FoldersCounter>> {
        await this.mockSearch();

        return this.foldersCounter;
    }

    async save(counter: FoldersCounter): Promise<void> {
        await this.mockSave(counter);
    }

    returnOnSearch(counter: FoldersCounter): void {
        this.foldersCounter = counter;
    }

    assertSearch(): void {
        expect(this.mockSearch).toHaveBeenCalled();
    }

    assertNotSave(): void {
        expect(this.mockSave).toHaveBeenCalledTimes(0);
    }

    assertLastFoldersCounterSaved(counter: FoldersCounter): void {
        const mock = this.mockSave.mock;
        const lastFoldersCounters = mock.calls[mock.calls.length - 1] as FoldersCounter[];
        const lastFoldersCounter = lastFoldersCounters[0];
        const { id: _id1, ...counterPrimitives } = counter.toPrimitives();
        const { id: _id2, ...lastSavedPrimitives } = lastFoldersCounter.toPrimitives();

        expect(lastFoldersCounter).toBeInstanceOf(FoldersCounter);
        expect(lastSavedPrimitives).toEqual(counterPrimitives);
    }
}
