import { IntegerMother } from './IntegerMother';

export class Repeater {
    static random(callable: CallableFunction, iterations: number): Array<unknown> {
        return Array(iterations || IntegerMother.random(20))
            .fill({})
            .map((): unknown => {
                return callable();
            });
    }
}
