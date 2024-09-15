import { expect, test, describe } from 'bun:test'
import { reverse_string } from '../../../problems/easy/reverse_string'

describe('Reverse String suite', function () {
    test('"hello" should return "olleh"', function () {
        expect(reverse_string('hello')).toEqual('olleh')
    })
})
