import { expect, test, beforeEach, describe } from 'bun:test'
import { title_case } from '../../../problems/easy/title_case'

describe('titleCase test suite', function () {
    let sentence: string

    beforeEach(function () {
        sentence = "I'm a little tea pot"
    })

    test('should return "I\'m A Little Tea Pot"', function () {
        expect(title_case(sentence)).toEqual("I'm A Little Tea Pot")
    })
})
