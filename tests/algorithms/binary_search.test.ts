import { expect, test, describe } from 'bun:test'
import { binary_search } from '../../algorithms/binary_search'

describe('Binary search', function () {
    test('empty input', () => {
        expect(binary_search(3, [])).toEqual(-1)
    })

    test('item found on single element array', () => {
        expect(binary_search(3, [3])).toEqual(0)
    })

    test('item not found on single element array', () => {
        expect(binary_search(3, [1])).toEqual(-1)
    })

    test('item not found on multiple element array', () => {
        expect(binary_search(3, [1, 5, 96])).toEqual(-1)
    })

    test('item found on last position', () => {
        expect(binary_search(12, [1, 5, 9, 12])).toEqual(3)
    })

    test('item found on first position', () => {
        expect(binary_search(1, [1, 5, 9, 12])).toEqual(0)
    })
})
