import { expect, test } from 'bun:test'
import { contains_duplicate } from '../../../problems/easy/contains_duplicate'

test('Returns false if does not contain duplicates', () => {
    expect(contains_duplicate([1, 2, 3, 4])).toBe(false)
})

test('Returns true if does contain duplicates', () => {
    expect(contains_duplicate([1, 2, 3, 1])).toBe(true)
})

test('Returns true if does contain duplicates', () => {
    expect(contains_duplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])).toBe(true)
})
