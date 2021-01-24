import {Request, Response} from "express";
import logger from '../log/logger';

const jwt = require('jsonwebtoken');

const privateKey: string = process.env.JWT_PRIVATE_KEY_SERVER;

export class ServerAuthMiddleware {
    constructor() { }

    public async validateToken(req: Request, res: Response, next: any) {
        logger.info(`Get authorization from header`);
        const authorizationHeader = req.headers.authorization;
        let decoded: any;

        if (authorizationHeader) {
            // Get Bearer token
            logger.info(`Get Bearer token`);
            const token: string = req.headers.authorization.split(' ')[1];

            try {
                logger.info(`Verify token`);
                decoded = jwt.verify(token, privateKey);
                logger.info(`Token is successfully verified`);
                next();
            } catch (err) {
                logger.error(`Token is invalid`);
                res.status(403).send('Token is invalid. API request is forbidden.');
            }
        } else {
            logger.error(`Token is not provided`);
            res.status(401).send({
                status: 'Unauthorized',
                error: 'Authorization error. Token required'
            });
        }
    }
}