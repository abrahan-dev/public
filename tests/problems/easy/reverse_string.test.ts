import { expect, test, describe } from 'bun:test'
import { reverse_string } from '../../../problems/easy/reverse_string'

describe('Reverse string', function () {
    test('"hello" => "olleh"', function () {
        expect(reverse_string('hello')).toEqual('olleh')
    })
})
