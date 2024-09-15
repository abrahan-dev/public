import { expect, test, beforeEach, describe } from 'bun:test'
import { largest_number_of_each } from '../../../problems/easy/largest_number_of_each'

describe('test group', () => {
    let arrays: number[][]

    beforeEach(() => {
        arrays = [
            [13, 27, 18, 26],
            [4, 5, 1, 3],
            [32, 35, 37, 39],
            [1000, 1001, 857, 1],
        ]
    })

    test('should return an array', function () {
        var response = largest_number_of_each(arrays)
        expect(Array.isArray(response)).toBe(true)
    })

    test('should return [27,5,39,1001]', function () {
        expect(largest_number_of_each(arrays)).toEqual([27, 5, 39, 1001])
    })
})
