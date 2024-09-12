import { Request, Response, Router } from 'express';

import { FoldersCounterGetController } from '../controllers/FoldersCounterGetController';
import container from '../createContainer';

export const register = (router: Router): void => {
    const foldersCounterGetController = container.get<FoldersCounterGetController>(
        'Apps.Frontoffice.controllers.FoldersCounterGetController'
    );

    router.get('/folders-counter', (req: Request, res: Response) => {
        void foldersCounterGetController.run(req, res);
    });
};
