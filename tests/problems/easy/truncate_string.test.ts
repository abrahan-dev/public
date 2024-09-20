import { expect, test, describe } from 'bun:test'
import { truncate_string } from '../../../problems/easy/truncate_string'

describe('Truncate string', function () {
    let tisket = 'A-tisket a-tasket A green and yellow basket'
    let peppers = 'Peter Piper picked a peck of pickled peppers'
    let longer = 'Absolutely longer'

    test(tisket + ' with length "11" => "A-tisket..."', function () {
        expect(truncate_string(tisket, 11)).toEqual('A-tisket...')
    })

    test(peppers + ' with length "14" => "Peter Piper..."', function () {
        expect(truncate_string(peppers, 14)).toEqual('Peter Piper...')
    })

    test(tisket + ' with its length => the same string', function () {
        expect(truncate_string(tisket, tisket.length)).toEqual(tisket)
    })

    test(tisket + ' with its length plus 2 => the same string', function () {
        expect(truncate_string(tisket, tisket.length + 2)).toEqual(tisket)
    })

    test('"A-" with length "1" => "A..."', function () {
        var str = 'A-'
        expect(truncate_string(str, 1)).toEqual('A...')
    })

    test(longer + ' with length "2" => "Ab..."', function () {
        expect(truncate_string(longer, 2)).toEqual('Ab...')
    })
})
