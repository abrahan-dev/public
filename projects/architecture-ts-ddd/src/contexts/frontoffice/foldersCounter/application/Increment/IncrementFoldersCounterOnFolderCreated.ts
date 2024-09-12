import { DomainEventClass } from '../../../../shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../shared/domain/DomainEventSubscriber';
import { FolderCreatedDomainEvent } from '../../../folders/domain/FolderCreatedDomainEvent';
import { FolderId } from '../../../shared/domain/folders/FolderId';
import { FoldersCounterIncrementor } from './FoldersCounterIncrementor';

export class IncrementFoldersCounterOnFolderCreated implements DomainEventSubscriber<FolderCreatedDomainEvent> {
    constructor(private readonly incrementor: FoldersCounterIncrementor) {}

    subscribedTo(): DomainEventClass[] {
        return [FolderCreatedDomainEvent];
    }

    async on(domainEvent: FolderCreatedDomainEvent): Promise<void> {
        await this.incrementor.run(new FolderId(domainEvent.aggregateId));
    }
}
