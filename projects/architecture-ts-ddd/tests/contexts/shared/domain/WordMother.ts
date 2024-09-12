import MotherCreator from './MotherCreator';

export default class WordMother {
    static random(minLength: number, maxLength: number): string {
        return MotherCreator.string(minLength, maxLength);
    }
}
