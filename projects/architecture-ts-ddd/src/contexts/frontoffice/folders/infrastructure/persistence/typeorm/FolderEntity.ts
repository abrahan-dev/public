import { EntitySchema } from 'typeorm';

import { ValueObjectTransformer } from '../../../../../shared/infrastructure/persistance/typeorm/ValueObjectTransformer';
import { FolderId } from '../../../../shared/domain/folders/FolderId';
import { Folder } from '../../../domain/Folder';
import { FolderName } from '../../../domain/FolderName';

export const FolderEntity = new EntitySchema<Folder>({
    name: 'Folder',
    tableName: 'folders',
    target: Folder,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: new ValueObjectTransformer(FolderId).getTransformer()
        },
        name: {
            type: String,
            transformer: new ValueObjectTransformer(FolderName).getTransformer()
        }
    }
});
