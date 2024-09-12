import { FoldersCounterNotExist } from '../../domain/FoldersCounterNotExist';
import { FoldersCounterRepository } from '../../domain/FoldersCounterRepository';

export class FoldersCounterFinder {
    constructor(private readonly repository: FoldersCounterRepository) {}

    async run(): Promise<number> {
        const counter = await this.repository.search();

        if (!counter) {
            throw new FoldersCounterNotExist();
        }

        return counter.total.value;
    }
}
