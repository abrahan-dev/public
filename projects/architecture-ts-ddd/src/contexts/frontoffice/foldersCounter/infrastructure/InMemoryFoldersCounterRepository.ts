import { FoldersCounter } from '../domain/FoldersCounter';
import { FoldersCounterId } from '../domain/FoldersCounterId';
import { FoldersCounterRepository } from '../domain/FoldersCounterRepository';
import { FoldersCounterTotal } from '../domain/FoldersCounterTotal';

export class InMemoryFoldersCounterRepository implements FoldersCounterRepository {
    private counter: FoldersCounter;

    constructor() {
        this.counter = new FoldersCounter(FoldersCounterId.random(), new FoldersCounterTotal(0), []);
    }

    async search(): Promise<FoldersCounter> {
        return await new Promise<FoldersCounter>(resolve => {
            resolve(this.counter);
        });
    }

    async save(counter: FoldersCounter): Promise<void> {
        this.counter = counter;

        await new Promise<void>(resolve => {
            resolve();
        });
    }
}
