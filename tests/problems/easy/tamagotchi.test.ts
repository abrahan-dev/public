import { expect, test, describe } from 'bun:test'
import { Tamagotchi } from '../../../problems/easy/tamagotchi'

describe('Tamagotchi', function () {
    const tamagotchi: Tamagotchi = new Tamagotchi()

    test('hungriness is 0', function () {
        expect(tamagotchi.hungriness).toEqual(0)
    })

    test('fullness is 0', function () {
        expect(tamagotchi.fullness).toEqual(0)
    })

    test('hungriness is decreased when fed', function () {
        const hungriness = tamagotchi.hungriness
        tamagotchi.feed(50)
        expect(tamagotchi.hungriness).toBeLessThan(hungriness)
    })

    test('fullness is increased when fed', function () {
        const fullness = tamagotchi.fullness
        tamagotchi.feed(50)
        expect(tamagotchi.fullness).toBeGreaterThan(fullness)
    })
})
