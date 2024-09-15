export function palindrome(str: string) {
    let cleanStr = str.replace(/[^0-9a-z]/gi, '').toLowerCase()
    let reverseStr = cleanStr.split('').reverse().join('')

    return reverseStr === cleanStr
}
