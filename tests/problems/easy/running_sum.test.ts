import { expect, test, describe } from 'bun:test'
import { running_sum } from '../../../problems/easy/running_sum'

describe('Running sum', function () {
    test('[1, 2, 3, 4] => [1, 3, 6, 10]', () => {
        expect(running_sum([1, 2, 3, 4])).toEqual([1, 3, 6, 10])
    })

    test('[1, 1, 1, 1] => [1, 2, 3, 4]', () => {
        expect(running_sum([1, 1, 1, 1])).toEqual([1, 2, 3, 4])
    })

    test('[3, 1, 2, 10] => [3, 4, 6, 16]', () => {
        expect(running_sum([3, 1, 2, 10])).toEqual([3, 4, 6, 16])
    })
})
