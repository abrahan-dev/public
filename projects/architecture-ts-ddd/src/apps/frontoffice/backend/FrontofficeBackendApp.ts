import { DataSource } from 'typeorm';

import { EventBus } from '../../../contexts/shared/domain/EventBus';
import { DomainEventSubscribers } from '../../../contexts/shared/infrastructure/eventBus/DomainEventSubscribers';
import container from './createContainer';
import { Server } from './server';

export class FrontofficeBackendApp {
    server?: Server;

    async start(): Promise<void> {
        const port = process.env.PORT ?? '35001';
        this.server = new Server(port);
        this.configureEventBus();

        return this.server.listen();
    }

    get httpServer(): Server['httpServer'] | undefined {
        return this.server?.getHTTPServer();
    }

    async stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            container
                .get<Promise<DataSource>>('Contexts.Frontoffice.ConnectionManager')
                .then(async connectionManager => {
                    await this.server?.stop();
                    await connectionManager.destroy();
                    resolve();
                })
                .catch(reject);
        });
    }

    private configureEventBus() {
        const eventBus = container.get<EventBus>('Contexts.Shared.domain.EventBus');
        eventBus.addSubscribers(DomainEventSubscribers.from(container));
    }
}
