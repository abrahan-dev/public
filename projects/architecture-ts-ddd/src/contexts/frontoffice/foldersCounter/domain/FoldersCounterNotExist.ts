export class FoldersCounterNotExist extends Error {
    constructor() {
        super('The folders counter does not exist');
    }
}
