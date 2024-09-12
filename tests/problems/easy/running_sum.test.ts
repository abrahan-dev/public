import { expect, test } from 'bun:test'
import { running_sum } from '../../../problems/easy/running_sum'

test('Running sum of [1,2,3,4]', () => {
    expect(running_sum([1, 2, 3, 4])).toEqual([1, 3, 6, 10])
})

test('Running sum of [1,1,1,1]', () => {
    expect(running_sum([1, 1, 1, 1])).toEqual([1, 2, 3, 4])
})

test('Running sum of [3,1,2,10]', () => {
    expect(running_sum([3, 1, 2, 10])).toEqual([3, 4, 6, 16])
})
