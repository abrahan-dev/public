import { expect, test } from 'bun:test'
import { fibonacci_naive } from '../../../problems/easy/fibonacci_naive'
import { fibonacci_bottom_up } from '../../../problems/easy/fibonacci_bottom_up'
import { fibonacci_memoized } from '../../../problems/easy/fibonacci_memoized'

test('F(0) = 0', () => {
    expect(fibonacci_naive(0)).toBe(0)
})

test('F(1) = 1', () => {
    expect(fibonacci_memoized(1)).toBe(1)
    expect(fibonacci_naive(1)).toBe(1)
    expect(fibonacci_bottom_up(1)).toBe(1)
})

test('F(2) = F(1) + F(0) = 1 + 0 = 1', () => {
    expect(fibonacci_memoized(2)).toBe(1)
    expect(fibonacci_naive(2)).toBe(1)
    expect(fibonacci_bottom_up(2)).toBe(1)
})

test('F(3) = F(2) + F(1) = 1 + 1 = 2', () => {
    expect(fibonacci_memoized(3)).toBe(2)
    expect(fibonacci_naive(3)).toBe(2)
    expect(fibonacci_bottom_up(3)).toBe(2)
})

test('F(4) = F(3) + F(2) = 2 + 1 = 3', () => {
    expect(fibonacci_memoized(4)).toBe(3)
    expect(fibonacci_naive(4)).toBe(3)
    expect(fibonacci_bottom_up(4)).toBe(3)
})

test('F(10) = F(9) + F(8) ... = 55', () => {
    expect(fibonacci_memoized(10)).toBe(55)
    expect(fibonacci_naive(10)).toBe(55)
    expect(fibonacci_bottom_up(10)).toBe(55)
})
