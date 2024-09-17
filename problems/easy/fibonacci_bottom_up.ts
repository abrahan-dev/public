export function fibonacci_bottom_up(num: number): number {
    const sequence: number[] = []

    for (let k = 1; k <= num; k++) {
        let f: number

        if (k <= 2) {
            f = 1
        } else {
            f = sequence[k - 1] + sequence[k - 2]
        }
        sequence[k] = f
    }

    return sequence[num]
}
