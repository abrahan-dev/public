import { YetiLogger } from '../../../contexts/shared/domain/logger/YetiLogger';
import container from './createContainer';
import { FrontofficeBackendApp } from './FrontofficeBackendApp';

const logger: YetiLogger = container.get<YetiLogger>('Frontoffice.Shared.YetiLogger');

try {
    const frontOfficeBackendApp = new FrontofficeBackendApp();

    frontOfficeBackendApp.start().catch((e: unknown) => {
        logger.log(e as string);
        process.exit(1);
    });
} catch (e: unknown) {
    logger.log(e as string);
    process.exit(1);
}

process.on('uncaughtException', (e: unknown) => {
    logger.log(e as string);
    process.exit(1);
});
