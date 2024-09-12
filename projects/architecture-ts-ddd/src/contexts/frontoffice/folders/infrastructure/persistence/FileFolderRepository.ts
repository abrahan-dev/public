import { deserialize, serialize } from 'bson';
import * as fs from 'fs';

import { Uuid } from '../../../../shared/domain/valueObject/Uuid';
import { Folder } from '../../domain/Folder';
import { FolderRepository } from '../../domain/FolderRepository';

export class FileFolderRepository implements FolderRepository {
    private readonly FILE_PATH = `${__dirname}/../../../../../../tests/apps/frontoffice/backend/files/`;

    async search(folderId: string): Promise<Folder> {
        const folderData = await fs.promises.readFile(this.filePath(folderId));
        const { id, name } = deserialize(folderData) as Folder;

        return new Folder(new Uuid(id.value), name);
    }

    async save(folder: Folder): Promise<void> {
        await fs.promises.writeFile(this.filePath(folder.id.value), serialize(folder));
    }

    private filePath(folderId: string): string {
        return `${this.FILE_PATH}${folderId}.repo`;
    }
}
