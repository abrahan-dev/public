export function fibonacci_naive(number: number): number {
    if (number <= 1) {
        return number
    } else if (number === 2) {
        return 1
    } else {
        return fibonacci_naive(number - 1) + fibonacci_naive(number - 2)
    }
}
