export class Tamagotchi {
    private _hungriness: number = 0
    private _fullness: number = 0

    get hungriness(): number {
        return this._hungriness
    }

    get fullness(): number {
        return this._fullness
    }

    public feed(quantity: number): void {
        this._hungriness -= quantity
        this._fullness += quantity
    }
}
