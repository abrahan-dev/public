import { EntitySchema } from 'typeorm';

import { Nullable } from '../../../../shared/domain/Nullable';
import { TypeOrmRepository } from '../../../../shared/infrastructure/persistance/typeorm/TypeOrmRepository';
import { FolderId } from '../../../shared/domain/folders/FolderId';
import { Folder } from '../../domain/Folder';
import { FolderRepository } from '../../domain/FolderRepository';
import { FolderEntity } from './typeorm/FolderEntity';

export class TypeOrmFolderRepository extends TypeOrmRepository<Folder> implements FolderRepository {
    public async save(folder: Folder): Promise<void> {
        return this.persist(folder);
    }

    public async search(folderId: FolderId): Promise<Nullable<Folder>> {
        const repository = await this.repository();

        return await repository.findOneBy({ id: folderId.value });
    }

    protected entitySchema(): EntitySchema<Folder> {
        return FolderEntity;
    }
}
