export interface RepositoryMock<T> {
    assertLastSavedIs(expected: T): void;
}
