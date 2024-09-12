import { Nullable } from '../../../shared/domain/Nullable';
import { FoldersCounter } from './FoldersCounter';

export interface FoldersCounterRepository {
    search(): Promise<Nullable<FoldersCounter>>;

    save(counter: FoldersCounter): Promise<void>;
}
