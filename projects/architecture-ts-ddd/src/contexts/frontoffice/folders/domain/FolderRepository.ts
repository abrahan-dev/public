import { Folder } from './Folder';

export interface FolderRepository {
    save(folder: Folder): Promise<void>;
}
