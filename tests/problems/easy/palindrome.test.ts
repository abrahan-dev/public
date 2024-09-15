import { palindrome } from '../../../problems/easy/palindrome'
import { expect, test, describe } from 'bun:test'

describe('Palindrome test suite', function () {
    test('"eye" should return true', function () {
        expect(palindrome('eye')).toBe(true)
    })

    test('"_eye" should return true', function () {
        expect(palindrome('_eye')).toBe(true)
    })

    test('"race car" should return true', function () {
        expect(palindrome('race car')).toBe(true)
    })

    test('"not a palindrome" should return false', function () {
        expect(palindrome('not a palindrome')).toBe(false)
    })
})
