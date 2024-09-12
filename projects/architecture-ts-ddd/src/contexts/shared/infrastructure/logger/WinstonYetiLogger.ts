import { Logger } from 'winston';

import { YetiLogger } from '../../domain/logger/YetiLogger';
import { CreateWinstonLogger } from './Winston/CreateWinstonLogger';

export class WinstonYetiLogger implements YetiLogger {
    private readonly logger: Logger;

    constructor(serviceName: string) {
        this.logger = CreateWinstonLogger(serviceName);
    }

    log(message: string): void {
        this.logger.log({
            level: 'info',
            message
        });
    }
}
