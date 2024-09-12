import { faker } from '@faker-js/faker';

export default class MotherCreator {
    static number(max = 6): number {
        return faker.datatype.number(max);
    }

    static uuid(): string {
        return faker.datatype.uuid();
    }

    static string(minLength = 1, maxLength: number): string {
        const length = Math.floor(Math.random() * (maxLength - minLength)) + minLength;

        return faker.datatype.string(length);
    }
}
