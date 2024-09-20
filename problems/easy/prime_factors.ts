export function prime_factors(number: number): number[] {
    const numbersList: number[] = []

    for (let maybePrime = 2; number > 1; maybePrime++) {
        while (number % maybePrime === 0) {
            numbersList.push(maybePrime)
            number /= maybePrime
        }
    }

    return numbersList
}
