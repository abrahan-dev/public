// time complexity: O(n)
// space complexity: O(n)
export function running_sum(numbers: number[]): number[] {
    let result: number[] = new Array(numbers.length)
    result[0] = numbers[0]

    for (let i = 1; i < numbers.length; i++) {
        result[i] = numbers[i] + result[i - 1]
    }

    return result
}

// time complexity: O(n)
// space complexity: O(1)
function running_sum_alternative(numbers: number[]): number[] {
    for (let i = 1; i < numbers.length; i++) {
        numbers[i] += numbers[i - 1]
    }

    return numbers
}
