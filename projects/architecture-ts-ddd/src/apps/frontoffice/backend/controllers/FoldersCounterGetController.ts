import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { FoldersCounterFinder } from '../../../../contexts/frontoffice/foldersCounter/application/find/FoldersCounterFinder';
import { FoldersCounterNotExist } from '../../../../contexts/frontoffice/foldersCounter/domain/FoldersCounterNotExist';
import { Controller } from '../../../shared/Controller';

export class FoldersCounterGetController implements Controller {
    constructor(private readonly foldersCounterFinder: FoldersCounterFinder) {}

    async run(req: Request, res: Response): Promise<void> {
        try {
            const count = await this.foldersCounterFinder.run();

            res.json({ total: count });
        } catch (e) {
            if (e instanceof FoldersCounterNotExist) {
                res.sendStatus(httpStatus.NOT_FOUND);
            } else {
                res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}
