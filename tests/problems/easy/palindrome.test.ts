import { palindrome } from '../../../problems/easy/palindrome'
import { expect, test, describe } from 'bun:test'

describe('Palindrome', function () {
    test('"eye" => true', function () {
        expect(palindrome('eye')).toBe(true)
    })

    test('"_eye" => true', function () {
        expect(palindrome('_eye')).toBe(true)
    })

    test('"race car" => true', function () {
        expect(palindrome('race car')).toBe(true)
    })

    test('"not a palindrome" => false', function () {
        expect(palindrome('not a palindrome')).toBe(false)
    })
})
