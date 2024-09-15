export function title_case(str: string) {
    let titleWords = str.split(' ').map(function (word) {
        var titleWord = ''

        for (var i = 0; i < word.length; i++) {
            titleWord += i === 0 ? word[i].toUpperCase() : word[i].toLowerCase()
        }

        return titleWord
    })

    return titleWords.join(' ')
}
