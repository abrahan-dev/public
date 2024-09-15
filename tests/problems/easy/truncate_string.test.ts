import { expect, test, describe } from 'bun:test'
import { truncate_string } from '../../../problems/easy/truncate_string'

describe('Truncate string suite', function () {
    let tisket = 'A-tisket a-tasket A green and yellow basket'
    let peppers = 'Peter Piper picked a peck of pickled peppers'
    let longer = 'Absolutely longer'

    test(tisket + ' with length "11" should return "A-tisket..."', function () {
        expect(truncate_string(tisket, 11)).toEqual('A-tisket...')
    })

    test(
        peppers + ' with length "14" should return "Peter Piper..."',
        function () {
            expect(truncate_string(peppers, 14)).toEqual('Peter Piper...')
        }
    )

    test(
        tisket + ' with its length should return the same string',
        function () {
            expect(truncate_string(tisket, tisket.length)).toEqual(tisket)
        }
    )

    test(
        tisket + ' with its length plus 2 should return the same string',
        function () {
            expect(truncate_string(tisket, tisket.length + 2)).toEqual(tisket)
        }
    )

    test('"A-" with length "1" should return "A..."', function () {
        var str = 'A-'
        expect(truncate_string(str, 1)).toEqual('A...')
    })

    test(longer + ' with length "2" should return "Ab..."', function () {
        expect(truncate_string(longer, 2)).toEqual('Ab...')
    })
})
