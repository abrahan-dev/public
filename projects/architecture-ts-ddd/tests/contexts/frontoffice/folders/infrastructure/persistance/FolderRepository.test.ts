import container from '../../../../../../src/apps/frontoffice/backend/createContainer';
import { FolderRepository } from '../../../../../../src/contexts/frontoffice/folders/domain/FolderRepository';
import { EnvironmentArranger } from '../../../../shared/infrastructure/arranger/EnvironmentArranger';
import { FolderMother } from '../../domain/FolderMother';

const repository: FolderRepository = container.get('Contexts.Frontoffice.Folders.domain.FolderRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get('Context.Frontoffice.EnvironmentArranger');

beforeEach(async () => {
    await (await environmentArranger).arrange();
});

afterAll(async () => {
    await (await environmentArranger).arrange();
    await (await environmentArranger).close();
});

describe('FolderRepository', () => {
    describe('#save', () => {
        it('should save a folder', async () => {
            const folder = FolderMother.random();

            await repository.save(folder);
        });
    });
});
