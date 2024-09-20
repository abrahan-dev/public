import { expect, test, describe } from 'bun:test'
import { find_longest_word_length } from '../../../problems/easy/find_longest_word_length'

describe('Find longest word length', function () {
    test('The quick brown fox jumped over the lazy dog => 6', () => {
        const sentence = 'The quick brown fox jumped over the lazy dog'
        expect(find_longest_word_length(sentence)).toEqual(6)
    })
})
