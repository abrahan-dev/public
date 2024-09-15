import { expect, test } from 'bun:test'
import { find_longest_word_length } from '../../../problems/easy/find_longest_word_length'

test('Find longest word length', () => {
    const sentence = 'The quick brown fox jumped over the lazy dog'
    expect(find_longest_word_length(sentence)).toEqual(6)
})
