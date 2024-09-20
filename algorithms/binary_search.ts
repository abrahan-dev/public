export function binary_search(search: number, haystack: number[]): number {
    return search_recursive(0, haystack.length - 1, search, haystack)
}

function search_recursive(
    left: number,
    right: number,
    search: number,
    haystack: number[]
): number {
    let key = -1
    const middle = Math.floor((left + right) / 2)

    if (left <= right && middle in haystack) {
        if (haystack[middle] < search) {
            key = search_recursive(middle + 1, right, search, haystack)
        } else if (haystack[middle] > search) {
            key = search_recursive(left, middle - 1, search, haystack)
        } else if (haystack[middle] === search) {
            key = middle
        }
    }

    return key
}
