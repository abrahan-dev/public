import { createLogger, format, Logger, transports } from 'winston';

export function CreateWinstonLogger(serviceName: string): Logger {
    const logger: Logger = createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.errors({ stack: true }),
            format.splat(),
            format.json()
        ),
        defaultMeta: { service: serviceName },
        transports: [
            // - Write to all logs with level `info` and below to `combined.log`.
            new transports.File({ filename: `logs/${serviceName}-error.log`, level: 'error' }),
            // - Write all logs error (and below) to `error.log`.
            new transports.File({ filename: `logs/${serviceName}-combined.log` })
        ]
    });

    // If we're not in production then **ALSO** log to the `console`
    // with the colorized simple format.
    if (process.env.NODE_ENV !== 'production') {
        logger.add(
            new transports.Console({
                format: format.combine(format.colorize(), format.simple())
            })
        );
    }

    return logger;
}
