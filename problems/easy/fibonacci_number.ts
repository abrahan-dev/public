// The Fibonacci numbers, commonly denoted F(n) form a sequence,
// called the Fibonacci sequence, such that each number is the
// sum of the two preceding ones, starting from 0 and 1

export function fibonacci_number(
    n: number,
    memo: Map<number, number> = new Map()
): number {
    if (n <= 1) {
        return n
    }

    if (n === 2) {
        return 1
    }

    if (memo.has(n)) {
        return memo.get(n) as number
    }

    memo.set(n, fibonacci_number(n - 1, memo) + fibonacci_number(n - 2, memo))

    return memo.get(n) as number
}
