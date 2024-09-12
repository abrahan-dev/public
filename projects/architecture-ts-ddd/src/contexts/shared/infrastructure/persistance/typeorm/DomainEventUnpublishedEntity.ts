import { EntitySchema } from 'typeorm';

import { DomainEventUnpublished } from '../../../domain/domainEventsUnpublished/DomainEventUnpublished';
import { DomainEventUnpublishedEvent } from '../../../domain/domainEventsUnpublished/DomainEventUnpublishedEvent';
import { DomainEventUnpublishedId } from '../../../domain/domainEventsUnpublished/DomainEventUnpublishedId';
import { ValueObjectTransformer } from './ValueObjectTransformer';

export const DomainEventUnpublishedEntity = new EntitySchema<DomainEventUnpublished>({
    name: 'DomainEventUnpublished',
    tableName: 'domain_events_unpublished',
    target: DomainEventUnpublished,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: new ValueObjectTransformer(DomainEventUnpublishedId).getTransformer()
        },
        event: {
            type: String,
            transformer: new ValueObjectTransformer(DomainEventUnpublishedEvent).getTransformer()
        }
    }
});
