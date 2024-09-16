// Given an integer array nums, return true if any value appears
// at least twice in the array, and return false if every element
// is distinct.

export function contains_duplicate(nums: number[]): boolean {
    const set = new Set<number>(nums)
    return set.size < nums.length
}
