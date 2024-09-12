import { json, urlencoded } from 'body-parser';
import compress from 'compression';
import errorHandler from 'errorhandler';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import httpStatus from 'http-status';

import { YetiLogger } from '../../../contexts/shared/domain/logger/YetiLogger';
import container from './createContainer';
import { registerRoutes } from './routes';

export class Server {
    private readonly express: express.Express;
    private readonly port: string;
    private httpServer?: http.Server;
    private readonly logger: YetiLogger = container.get<YetiLogger>('Frontoffice.Shared.YetiLogger');

    constructor(port: string) {
        this.port = port;
        this.express = express();
        this.express.use(json());
        this.express.use(urlencoded({ extended: true }));
        this.express.use(helmet.xssFilter());
        this.express.use(helmet.noSniff());
        this.express.use(helmet.hidePoweredBy());
        this.express.use(helmet.frameguard({ action: 'deny' }));
        this.express.use(compress());
        const router = Router();
        router.use(errorHandler());
        this.express.use(router);
        registerRoutes(router);

        router.use((err: Error, req: Request, res: Response, _next: () => void) => {
            this.logger.log(err.toString());
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
        });
    }

    async listen(): Promise<void> {
        return new Promise(resolve => {
            const env = this.express.get('env') as string;
            this.httpServer = this.express.listen(this.port, () => {
                this.logger.log(`Frontoffice Backend App is running at http://localhost:${this.port} in ${env} mode`);
                this.logger.log('Press CTRL-C to stop');
                resolve();
            });
        });
    }

    getHTTPServer(): Server['httpServer'] {
        return this.httpServer;
    }

    async stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.httpServer) {
                this.httpServer.close(error => {
                    if (error) {
                        reject(error);

                        return;
                    }

                    resolve();
                });
            }

            resolve();
        });
    }
}
