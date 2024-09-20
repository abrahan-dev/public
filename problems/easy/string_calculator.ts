class Human_String_Calculator {
    public add(input: string): number {
        const delimiter = this.extract_default_delimiter(input)
        const pattern = new RegExp(`[\\n${delimiter}]`)
        const numbers = input.split(pattern)
        return this.process_list_of(numbers)
    }

    private extract_default_delimiter(input: string): string {
        let delimiter = ','
        const matches = input.match(/\/\/(.*)\n(.*)/)
        if (matches && matches[1]) {
            delimiter = matches[1].replace('[', '(').replace(']', ')')
        }
        return delimiter
    }

    private process_list_of(numbers: string[]): number {
        let sum = 0
        const negatives: number[] = []

        for (const numberStr of numbers) {
            const number = parseInt(numberStr)
            if (isNaN(number)) {
                continue
            }
            if (number > 1000) {
                continue
            }
            if (number < 0) {
                negatives.push(number)
            }
            sum += number
        }

        if (negatives.length > 0) {
            throw new Error(`Negatives not allowed: ${negatives.join(',')}`)
        }

        return sum
    }
}

// ChatGpt Version created from the tests
export class String_Calculator {
    add(input: string): number {
        if (input === '') return 0

        let delimiters = [',', '\n']
        let customDelimiter = input.match(/^\/\/(\[.*\])\n|^\/\/(.+)\n/)

        if (customDelimiter) {
            input = input.split('\n')[1]
            if (customDelimiter[1]) {
                // Handle multiple custom delimiters of any length
                delimiters = customDelimiter[1].slice(1, -1).split('][')
            } else {
                // Single custom delimiter
                delimiters = [customDelimiter[2]]
            }
        }

        const delimiterRegex = new RegExp(
            `[${delimiters
                .map((d) => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
                .join('|')}]`
        )
        const numbers = input.split(delimiterRegex).map(Number)

        // Handle negative numbers
        const negatives = numbers.filter((n) => n < 0)
        if (negatives.length) {
            throw new Error(`Negatives not allowed: ${negatives.join(',')}`)
        }

        // Sum numbers, ignoring those greater than 1000
        return numbers.reduce((sum, num) => (num <= 1000 ? sum + num : sum), 0)
    }
}
