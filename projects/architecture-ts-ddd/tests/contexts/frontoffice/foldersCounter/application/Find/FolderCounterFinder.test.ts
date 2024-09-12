import { FoldersCounterFinder } from '../../../../../../src/contexts/frontoffice/foldersCounter/application/find/FoldersCounterFinder';
import { FoldersCounterNotExist } from '../../../../../../src/contexts/frontoffice/foldersCounter/domain/FoldersCounterNotExist';
import { FoldersCounterRepositoryMock } from '../../__mocks__/FoldersCounterRepositoryMock';
import { FoldersCounterMother } from '../../domain/FoldersCounterMother';

describe('FolderCounterFinder', () => {
    let repository: FoldersCounterRepositoryMock;

    beforeEach(() => {
        repository = new FoldersCounterRepositoryMock();
    });

    it('should find an existing folders counter', async () => {
        const counter = FoldersCounterMother.random();
        repository.returnOnSearch(counter);
        const finder = new FoldersCounterFinder(repository);

        const response = await finder.run();

        repository.assertSearch();
        expect(counter.total.value).toEqual(response);
    });

    it('should throw an exception when folders counter does not exists', async () => {
        const finder = new FoldersCounterFinder(repository);

        await expect(finder.run()).rejects.toBeInstanceOf(FoldersCounterNotExist);
    });
});
