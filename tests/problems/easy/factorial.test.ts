import { expect, test, describe } from 'bun:test'
import { factorial } from '../../../problems/easy/factorial'

describe('Factorial', function () {
    test('5 => 25', () => {
        expect(factorial(5)).toEqual(120)
    })
})
