import container from '../../../../../src/apps/frontoffice/backend/createContainer';
import { FoldersCounterRepository } from '../../../../../src/contexts/frontoffice/foldersCounter/domain/FoldersCounterRepository';
import { EnvironmentArranger } from '../../../shared/infrastructure/arranger/EnvironmentArranger';
import { FoldersCounterMother } from '../domain/FoldersCounterMother';

const repository: FoldersCounterRepository = container.get(
    'Contexts.Frontoffice.FoldersCounter.domain.FoldersCounterRepository'
);
const environmentArranger: Promise<EnvironmentArranger> = container.get('Context.Frontoffice.EnvironmentArranger');

beforeEach(async () => {
    await (await environmentArranger).arrange();
});

afterAll(async () => {
    await (await environmentArranger).arrange();
    await (await environmentArranger).close();
});

describe('FoldersCounterRepository', () => {
    describe('#save', () => {
        it('should save a folders counter', async () => {
            const folder = FoldersCounterMother.random();

            await repository.save(folder);
        });
    });

    describe('#search', () => {
        it('should return an existing folder', async () => {
            const expectedCounter = FoldersCounterMother.random();
            await repository.save(expectedCounter);

            const counter = await repository.search();

            expect(expectedCounter).toEqual(counter);
        });

        it('should return 0 existing folders if there is no folders counter', async () => {
            const emptyCounter = FoldersCounterMother.withNone();
            await repository.save(emptyCounter);
            const counter = await repository.search();
            expect(counter?.existingFolders).toHaveLength(emptyCounter.existingFolders.length);
        });
    });
});
