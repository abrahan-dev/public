import { expect, test } from 'bun:test'
import { factorial } from '../../../problems/easy/factorial'

test('Factorial of 5', () => {
    expect(factorial(5)).toEqual(120)
})
