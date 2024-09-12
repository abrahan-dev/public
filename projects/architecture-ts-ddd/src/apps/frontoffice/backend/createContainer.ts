import { ContainerBuilder, Definition, Reference } from 'node-dependency-injection';

import { TypeOrmEnvironmentArranger } from '../../../../tests/contexts/shared/infrastructure/typeorm/TypeOrmEnvironmentArranger';
import { FolderCreator } from '../../../contexts/frontoffice/folders/application/FolderCreator';
import { TypeOrmFolderRepository } from '../../../contexts/frontoffice/folders/infrastructure/persistence/TypeOrmFolderRepository';
import { FoldersCounterFinder } from '../../../contexts/frontoffice/foldersCounter/application/find/FoldersCounterFinder';
import { FoldersCounterIncrementor } from '../../../contexts/frontoffice/foldersCounter/application/Increment/FoldersCounterIncrementor';
import { IncrementFoldersCounterOnFolderCreated } from '../../../contexts/frontoffice/foldersCounter/application/Increment/IncrementFoldersCounterOnFolderCreated';
import { InMemoryFoldersCounterRepository } from '../../../contexts/frontoffice/foldersCounter/infrastructure/InMemoryFoldersCounterRepository';
import { TypeOrmConfigFactory } from '../../../contexts/frontoffice/shared/infrastructure/persistence/TypeOrmConfigFactory';
import { RabbitMQConfigFactory } from '../../../contexts/frontoffice/shared/infrastructure/RabbitMQ/RabbitMQConfigFactory';
import { InMemoryAsyncEventBus } from '../../../contexts/shared/infrastructure/eventBus/InMemory/InMemoryAsyncEventBus';
import { RabbitMQConfigurator } from '../../../contexts/shared/infrastructure/eventBus/RabbitMQ/RabbitMQConfigurator';
import { RabbitMQConnection } from '../../../contexts/shared/infrastructure/eventBus/RabbitMQ/RabbitMQConnection';
import { RabbitMQueueFormatter } from '../../../contexts/shared/infrastructure/eventBus/RabbitMQ/RabbitMQueueFormatter';
import { WinstonYetiLogger } from '../../../contexts/shared/infrastructure/logger/WinstonYetiLogger';
import { TypeOrmClientFactory } from '../../../contexts/shared/infrastructure/persistance/typeorm/TypeOrmClientFactory';
import { TypeOrmDomainEventUnpublishedRepository } from '../../../contexts/shared/infrastructure/persistance/TypeOrmDomainEventUnpublishedRepository';
import { FolderPutController } from './controllers/FolderPutController';
import { FoldersCounterGetController } from './controllers/FoldersCounterGetController';
import StatusGetController from './controllers/StatusGetController';

const container = new ContainerBuilder();

// INFRASTRUCTURE

container.register('Frontoffice.Shared.YetiLogger', WinstonYetiLogger).addArgument('frontoffice');

const typeOrmConfigDefinition = new Definition();
typeOrmConfigDefinition.setFactory(TypeOrmConfigFactory, 'createConfig');
container.setDefinition('Contexts.Frontoffice.TypeOrmConfig', typeOrmConfigDefinition);

const typeOrmClientFactoryDefinition = new Definition();
typeOrmClientFactoryDefinition.args = ['frontoffice', new Reference('Contexts.Frontoffice.TypeOrmConfig')];
typeOrmClientFactoryDefinition.setFactory(TypeOrmClientFactory, 'createClient');
container.setDefinition('Contexts.Frontoffice.ConnectionManager', typeOrmClientFactoryDefinition);

container
    .register('Contexts.Frontoffice.Folders.domain.FolderRepository', TypeOrmFolderRepository)
    .addArgument(new Reference('Contexts.Frontoffice.ConnectionManager'));

container
    .register(
        'Contexts.Shared.DomainEventsUnpublished.domain.DomainEventUnpublishedRepository',
        TypeOrmDomainEventUnpublishedRepository
    )
    .addArgument(new Reference('Contexts.Frontoffice.ConnectionManager'));

container.register(
    'Contexts.Frontoffice.FoldersCounter.domain.FoldersCounterRepository',
    InMemoryFoldersCounterRepository
);

container.register('Contexts.Shared.domain.EventBus', InMemoryAsyncEventBus);

const rabbitMQConfigDefinition = new Definition();
rabbitMQConfigDefinition.setFactory(RabbitMQConfigFactory, 'createConfig');
container.setDefinition('Contexts.Shared.RabbitMQConfig', rabbitMQConfigDefinition);

container
    .register('Contexts.Shared.RabbitMQConnection', RabbitMQConnection)
    .addArgument(new Reference('Contexts.Shared.RabbitMQConfig'));

container.register('Contexts.Shared.RabbitMQQueueFormatter', RabbitMQueueFormatter).addArgument('frontoffice');

container
    .register('Contexts.Shared.RabbitMQConfigurator', RabbitMQConfigurator)
    .addArgument(new Reference('Contexts.Shared.RabbitMQConnection'))
    .addArgument(new Reference('Contexts.Shared.RabbitMQQueueFormatter'));

if (process.env.NODE_ENV === 'test') {
    container
        .register('Context.Frontoffice.EnvironmentArranger', TypeOrmEnvironmentArranger)
        .addArgument(new Reference('Contexts.Frontoffice.ConnectionManager'));
}

// APPLICATION SERVICES

container
    .register('Contexts.Frontoffice.Folders.application.FolderCreator', FolderCreator)
    .addArgument(new Reference('Contexts.Frontoffice.Folders.domain.FolderRepository'))
    .addArgument(new Reference('Contexts.Shared.domain.EventBus'));

container
    .register('Contexts.Frontoffice.FoldersCounter.application.FoldersCounterFinder', FoldersCounterFinder)
    .addArgument(new Reference('Contexts.Frontoffice.FoldersCounter.domain.FoldersCounterRepository'));

container
    .register('Contexts.Frontoffice.FoldersCounter.application.FoldersCounterIncrementor', FoldersCounterIncrementor)
    .addArgument(new Reference('Contexts.Frontoffice.FoldersCounter.domain.FoldersCounterRepository'))
    .addArgument(new Reference('Contexts.Shared.domain.EventBus'));

// DOMAIN EVENTS SUBSCRIBERS

container
    .register(
        'Contexts.Frontoffice.FoldersCounter.application.IncrementFoldersCounterOnFolderCreated',
        IncrementFoldersCounterOnFolderCreated
    )
    .addArgument(new Reference('Contexts.Frontoffice.FoldersCounter.application.FoldersCounterIncrementor'))
    .addTag('domainEventSubscriber');

// CONTROLLERS

container.register('Apps.Frontoffice.controllers.StatusGetController', StatusGetController);

container
    .register('Apps.Frontoffice.controllers.FolderPutController', FolderPutController)
    .addArgument(new Reference('Contexts.Frontoffice.Folders.application.FolderCreator'));

container
    .register('Apps.Frontoffice.controllers.FoldersCounterGetController', FoldersCounterGetController)
    .addArgument(new Reference('Contexts.Frontoffice.FoldersCounter.application.FoldersCounterFinder'));

export default container;
