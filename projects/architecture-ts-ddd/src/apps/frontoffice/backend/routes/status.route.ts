import { Request, Response, Router } from 'express';

import StatusGetController from '../controllers/StatusGetController';
import container from '../createContainer';

export const register = (router: Router): void => {
    const statusGetController = container.get<StatusGetController>('Apps.Frontoffice.controllers.StatusGetController');
    router.get('/status', (req: Request, res: Response) => {
        statusGetController.run(req, res);
    });
};
