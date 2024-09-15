// time complexity: O(n)
// space complexity: O(1)
export function factorial(num: number): number {
    let factor = 1,
        response = 1

    while (factor <= num) {
        response *= factor
        factor++
    }

    return response
}
