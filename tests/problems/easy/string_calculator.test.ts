import { expect, test, describe } from 'bun:test'
import { String_Calculator } from '../../../problems/easy/string_calculator'

describe('String calculator', function () {
    const string_calculator: String_Calculator = new String_Calculator()

    test('empty string => zero', function () {
        expect(string_calculator.add('')).toEqual(0)
    })

    test('sum of "2" => 2', function () {
        expect(string_calculator.add('2')).toEqual(2)
    })

    test('sum of "1,2" => 3', function () {
        expect(string_calculator.add('1,2')).toEqual(3)
    })

    test('sum of "1,2,2,2,2" => 9', function () {
        expect(string_calculator.add('1,2,2,2,2')).toEqual(9)
    })

    test('sum with break lines of "1\\n2,3" => 6', function () {
        expect(string_calculator.add('1\n2,3')).toEqual(6)
    })

    test('default delimiter', function () {
        expect(string_calculator.add('//*\n1*2')).toEqual(3)
    })

    test('numbers greater than 1000 are ignored', function () {
        expect(string_calculator.add('//*\n1*2000')).toEqual(1)
    })

    test('delimiters have any length', function () {
        expect(string_calculator.add('//[***]\n1***2***3')).toEqual(6)
    })

    test('allow different delimiters', function () {
        expect(string_calculator.add('//[*][%]\n1*2%3')).toEqual(6)
    })

    test('allow different delimiters of any length', function () {
        expect(string_calculator.add('//[*+][%LO<]\n1*+2%LO<3')).toEqual(6)
    })

    test('throw error if negative numbers are found', function () {
        expect(() => string_calculator.add('//;\n1;-12;-9;5')).toThrow(
            'Negatives not allowed: -12,-9'
        )
    })
})
