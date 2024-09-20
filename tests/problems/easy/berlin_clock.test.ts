import { expect, test, describe } from 'bun:test'
import { berlin_clock } from '../../../problems/easy/berlin_clock'

describe('Berlin clock', function () {
    test('00:00:00', () => {
        expect(berlin_clock('00:00:00', 0)).toBe('OOOO')
    })

    test('23:59:59', () => {
        expect(berlin_clock('23:59:59', 0)).toBe('YYYY')
    })

    test('12:32:00', () => {
        expect(berlin_clock('12:32:00', 0)).toBe('YYOO')
    })

    test('12:34:00', () => {
        expect(berlin_clock('12:34:00', 0)).toBe('YYYY')
    })

    test('12:35:00', () => {
        expect(berlin_clock('12:35:00', 0)).toBe('OOOO')
    })
})
