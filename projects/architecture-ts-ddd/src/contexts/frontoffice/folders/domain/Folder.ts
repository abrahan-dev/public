import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { FolderId } from '../../shared/domain/folders/FolderId';
import { FolderCreatedDomainEvent } from './FolderCreatedDomainEvent';
import { FolderName } from './FolderName';

export type FolderPrimitives = { id: string; name: string };

export class Folder extends AggregateRoot<FolderPrimitives> {
    readonly id: FolderId;
    readonly name: FolderName;

    constructor(id: FolderId, name: FolderName) {
        super();
        this.id = id;
        this.name = name;
    }

    static create(folderId: FolderId, folderName: FolderName): Folder {
        const folder = new Folder(folderId, folderName);

        folder.record(new FolderCreatedDomainEvent(folder.id.value, folder.name.value));

        return folder;
    }

    static fromPrimitives(primitives: FolderPrimitives): Folder {
        return new Folder(new FolderId(primitives.id), new FolderName(primitives.name));
    }

    toPrimitives(): FolderPrimitives {
        return {
            id: this.id.value,
            name: this.name.value
        };
    }
}
