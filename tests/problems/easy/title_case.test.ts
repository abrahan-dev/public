import { expect, test, describe } from 'bun:test'
import { title_case } from '../../../problems/easy/title_case'

describe('Title case', function () {
    let sentence: string = "I'm a little tea pot"

    test('"I\'m a little tea pot" => "I\'m A Little Tea Pot"', function () {
        expect(title_case(sentence)).toEqual("I'm A Little Tea Pot")
    })
})
