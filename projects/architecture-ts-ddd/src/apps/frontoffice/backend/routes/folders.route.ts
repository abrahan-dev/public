import { Request, Response, Router } from 'express';
import { body, param } from 'express-validator';

import { FolderPutController } from '../controllers/FolderPutController';
import container from '../createContainer';
import { validateReqSchema } from '.';

export const register = (router: Router): void => {
    const reqSchema = [
        param('id').exists().isUUID(), //
        body('id').exists().isUUID(),
        body('name').exists().isString()
    ];

    const folderPutController = container.get<FolderPutController>('Apps.Frontoffice.controllers.FolderPutController');

    router.put(
        '/folders/:id',
        reqSchema,
        validateReqSchema,
        (req: Request, res: Response) => void folderPutController.run(req, res)
    );
};
