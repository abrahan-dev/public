import { Folder } from '../../../../../src/contexts/frontoffice/folders/domain/Folder';
import { FolderCreatedDomainEvent } from '../../../../../src/contexts/frontoffice/folders/domain/FolderCreatedDomainEvent';

export class FolderCreatedDomainEventMother {
    static create(aggregateId: string, name: string, eventId?: string, occurredOn?: Date): FolderCreatedDomainEvent {
        return new FolderCreatedDomainEvent(aggregateId, name, eventId, occurredOn);
    }

    static fromFolder(folder: Folder): FolderCreatedDomainEvent {
        return new FolderCreatedDomainEvent(folder.id.value, folder.name.value);
    }
}
