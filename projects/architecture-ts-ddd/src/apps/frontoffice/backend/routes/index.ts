import { NextFunction, Request, Response, Router } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import glob from 'glob';
import httpStatus from 'http-status';

export function registerRoutes(router: Router): void {
    const env = process.env.NODE_ENV ?? 'development';
    const routePaths = glob.sync(`**/*.route.${env === 'production' ? 'js' : 'ts'}`, { ignore: 'node_modules/**' });
    routePaths.map(routePath => register(routePath, router));
}

function register(routePath: string, router: Router) {
    const rootPath: string = __dirname + routePath.substring(routePath.indexOf('/routes') + '/routes'.length);
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const { register } = require(rootPath) as { register: (router: Router) => void };
    register(router);
}

type validationErrorResult = {
    [key: string]: string;
};

export function validateReqSchema(req: Request, res: Response, next: NextFunction): Response | void {
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
        next();

        return;
    }

    const errors: validationErrorResult[] = validationErrors.array().map((err: ValidationError) => {
        return { [err.param]: err.msg as string };
    });

    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ errors });
}
