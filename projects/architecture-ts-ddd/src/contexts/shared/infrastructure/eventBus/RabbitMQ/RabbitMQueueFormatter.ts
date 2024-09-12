export class RabbitMQueueFormatter {
    constructor(private readonly moduleName: string) {}

    format(value: string): string {
        const name = value
            .split(/(?=[A-Z])/)
            .join('_')
            .toLowerCase();

        return `${this.moduleName}.${name}`;
    }

    formatRetry(subscriber: string): string {
        const name = this.format(subscriber);

        return `retry.${name}`;
    }

    formatDeadLetter(subscriber: string): string {
        const name = this.format(subscriber);

        return `dead_letter.${name}`;
    }
}
