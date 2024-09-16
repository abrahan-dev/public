import { expect, test, describe } from 'bun:test'
import { fizzbuzz } from '../../../problems/easy/fizzbuzz'

describe('Fizzbuzz', () => {
    test.each([
        [1, '1'],
        [2, '2'],
        [4, '4'],
    ])(
        'convert integers to strings: %p to %p',
        (number: number, result: string) => {
            expect(fizzbuzz(number)).toBe(result)
        }
    )

    test.each([
        [6, 'Fizz'],
        [9, 'Fizz'],
        [12, 'Fizz'],
    ])(
        'convert multiples of 3 to "Fizz": %p to %p',
        (number: number, result: string) => {
            expect(fizzbuzz(number)).toBe(result)
        }
    )

    test.each([
        [10, 'Buzz'],
        [100, 'Buzz'],
    ])(
        'convert multiples of 5 to "Buzz": %p to %p',
        (number: number, result: string) => {
            expect(fizzbuzz(number)).toBe(result)
        }
    )

    test.each([
        [3, 'FizzFizz'],
        [33, 'FizzFizzFizz'],
    ])(
        'convert multiples of 3 to "Fizz" + n times "Fizz" for each "3" in the number: %p to %p',
        (number: number, result: string) => {
            expect(fizzbuzz(number)).toBe(result)
        }
    )

    test.each([
        [55, 'BuzzBuzzBuzz'],
        [175, 'BuzzBuzz'],
    ])(
        'convert multiples of 5 to "Buzz" + n times "Buzz" for each "5" in the number: %p to %p',
        (number: number, result: string) => {
            expect(fizzbuzz(number)).toBe(result)
        }
    )

    test.each([
        [15, 'FizzBuzzBuzz'],
        [30, 'FizzBuzzFizz'],
        [375, 'FizzBuzzFizzBuzz'],
    ])(
        'convert multiples of 3 and 5 to "FizzBuzz" + n times "Fizz" for each "3" + n times "Buzz" for each "5": %p to %p',
        (number: number, result: string) => {
            expect(fizzbuzz(number)).toBe(result)
        }
    )
})
