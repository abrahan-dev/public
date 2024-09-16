// https://www.codurance.com/katalyst/fizzbuzz

export function fizzbuzz(number: number) {
    const isFizz = number % 3 === 0
    const isBuzz = number % 5 === 0
    const numberOfFizzs = (number.toString().split("3").length - 1)
    const numberOfBuzzs = (number.toString().split("5").length - 1)
    let result = number.toString()

    if (isFizz && isBuzz) {
        result = "FizzBuzz"
    } else if (isFizz) {
        result = "Fizz"
    } else if (isBuzz) {
        result = "Buzz"
    }

    return result
        + "Fizz".repeat(numberOfFizzs)
        + "Buzz".repeat(numberOfBuzzs)
}
