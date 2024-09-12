import { EventBus } from '../../../shared/domain/EventBus';
import { FolderId } from '../../shared/domain/folders/FolderId';
import { Folder } from '../domain/Folder';
import { FolderName } from '../domain/FolderName';
import { FolderRepository } from '../domain/FolderRepository';
import { FolderCreatorRequest } from './FolderCreatorRequest';

export class FolderCreator {
    constructor(private readonly repository: FolderRepository, private readonly eventBus: EventBus) {}

    async run(request: FolderCreatorRequest): Promise<void> {
        const folder = Folder.create(new FolderId(request.id), new FolderName(request.name));
        await this.repository.save(folder);
        await this.eventBus.publish(folder.pullDomainEvents());
    }
}
