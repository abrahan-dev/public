import { YetiLogger } from '../../domain/logger/YetiLogger';

export class ConsoleYetiLogger implements YetiLogger {
    log(message: string): void {
        // eslint-disable-next-line no-console
        console.log(message);
    }
}
