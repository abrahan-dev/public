import { Folder } from '../../../../../src/contexts/frontoffice/folders/domain/Folder';
import { FolderRepository } from '../../../../../src/contexts/frontoffice/folders/domain/FolderRepository';
import { RepositoryMock } from '../../../shared/__mocks__/RepositoryMock';

export class FolderRepositoryMock implements FolderRepository, RepositoryMock<Folder> {
    private readonly mockSave = jest.fn();

    async save(folder: Folder): Promise<void> {
        await this.mockSave(folder);
    }

    assertLastSavedIs(expected: Folder): void {
        const mock = this.mockSave.mock;
        const lastSaved = (mock.calls[mock.calls.length - 1] as Folder[])[0];
        expect(lastSaved).toBeInstanceOf(Folder);
        expect(lastSaved.id).toEqual(expected.id);
    }
}
