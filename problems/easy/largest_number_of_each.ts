export function largest_number_of_each(arr: number[][]) {
    return arr.map(function (current) {
        return current.reduce(function (previous, current) {
            return previous > current ? previous : current
        })
    })
}
