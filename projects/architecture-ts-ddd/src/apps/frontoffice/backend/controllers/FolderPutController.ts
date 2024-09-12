import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { FolderCreator } from '../../../../contexts/frontoffice/folders/application/FolderCreator';
import { Controller } from '../../../shared/Controller';

export class FolderPutController implements Controller {
    constructor(private readonly folderCreator: FolderCreator) {}

    async run(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.body as { name: string };
            await this.folderCreator.run({ id: req.params.id, name });
            res.status(httpStatus.CREATED).send();
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }
}
