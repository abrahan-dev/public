import { Folder } from '../../../../../../src/contexts/frontoffice/folders/domain/Folder';
import { FolderName } from '../../../../../../src/contexts/frontoffice/folders/domain/FolderName';
import { FileFolderRepository } from '../../../../../../src/contexts/frontoffice/folders/infrastructure/persistence/FileFolderRepository';
import { FolderId } from '../../../../../../src/contexts/frontoffice/shared/domain/folders/FolderId';

describe('FileFolderRepository', () => {
    it('should save a folder', async () => {
        const id = new FolderId('d5609ac9-f000-461c-a0bd-b96ab3649280');
        const name = new FolderName('Asia');
        const expectedFolder = new Folder(id, name);
        const repository = new FileFolderRepository();

        await repository.save(expectedFolder);
        const folder = await repository.search(id.value);

        expect(folder).toEqual(expectedFolder);
    });
});
