export function fibonacci_memoized(
    number: number,
    memo: Record<number, number> = {}
): number {
    if (memo[number]) {
        return memo[number]
    } else if (number <= 2) {
        return 1
    } else {
        const fib =
            fibonacci_memoized(number - 1, memo) +
            fibonacci_memoized(number - 2, memo)
        memo[number] = fib
        return fib
    }
}
