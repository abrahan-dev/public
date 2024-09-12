import { NewableClass } from '../../../domain/NewableClass';
import { Primitives, ValueObject } from '../../../domain/valueObject/ValueObject';

export class ValueObjectTransformer<T extends Primitives> {
    constructor(private readonly ValueObject: NewableClass<ValueObject<T>>) {}

    getTransformer(): { to: (valueObject: ValueObject<T>) => T; from: (primitive: T) => ValueObject<T> } {
        return {
            to: (valueObject: ValueObject<T>): T => this.to(valueObject),
            from: (primitive: T): ValueObject<T> => this.from(primitive)
        };
    }

    private to(valueObject: ValueObject<T>): T {
        return valueObject.value;
    }

    private from(value: T): ValueObject<T> {
        return new this.ValueObject(value);
    }
}
