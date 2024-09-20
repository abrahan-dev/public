import { expect, test, describe } from 'bun:test'
import { prime_factors } from '../../../problems/easy/prime_factors'

describe('Prime factors', function () {
    test('1 => []', function () {
        expect(prime_factors(1)).toEqual([])
    })

    test('2 => [2]', function () {
        expect(prime_factors(2)).toEqual([2])
    })

    test('3 => [3]', function () {
        expect(prime_factors(3)).toEqual([3])
    })

    test('4 => [2, 2]', function () {
        expect(prime_factors(4)).toEqual([2, 2])
    })

    test('6 => [2, 3]', function () {
        expect(prime_factors(6)).toEqual([2, 3])
    })

    test('8 => [2, 2, 2]', function () {
        expect(prime_factors(8)).toEqual([2, 2, 2])
    })

    test('9 => [3, 3]', function () {
        expect(prime_factors(9)).toEqual([3, 3])
    })

    test('100 => [2, 2, 5, 5]', function () {
        expect(prime_factors(100)).toEqual([2, 2, 5, 5])
    })
})
