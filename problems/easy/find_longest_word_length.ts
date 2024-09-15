export function find_longest_word_length(str: string) {
    return str.split(' ').reduce(function (previous, current) {
        return previous.length > current.length ? previous : current
    }).length
}
