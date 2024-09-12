import { EventBus } from '../../../../shared/domain/EventBus';
import { FolderId } from '../../../shared/domain/folders/FolderId';
import { FoldersCounter } from '../../domain/FoldersCounter';
import { FoldersCounterId } from '../../domain/FoldersCounterId';
import { FoldersCounterRepository } from '../../domain/FoldersCounterRepository';

export class FoldersCounterIncrementor {
    constructor(private readonly repository: FoldersCounterRepository, private readonly bus: EventBus) {}

    async run(folderId: FolderId): Promise<void> {
        const counter = (await this.repository.search()) ?? this.initializeCounter();

        if (!counter.hasIncremented(folderId)) {
            counter.increment(folderId);

            await this.repository.save(counter);
            await this.bus.publish(counter.pullDomainEvents());
        }
    }

    private initializeCounter(): FoldersCounter {
        return FoldersCounter.initialize(FoldersCounterId.random());
    }
}
