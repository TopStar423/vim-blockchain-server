import {Request, Response} from "express";
import logger from "../log/logger";


const jwt = require('jsonwebtoken');

const privateKey: string = process.env.JWT_PRIVATE_KEY;

export class AuthorizationMiddleware {
    constructor() { }

    public async validateToken(req: Request, res: Response, next: any) {
        logger.info(`Get authorization from header`);
        const authorizationHeader = req.headers.authorization;
        let decoded: any;

        if (authorizationHeader) {
            // Get Bearer token
            logger.info('Get Bearer token');
            const token: string = req.headers.authorization.split(' ')[1];

            try {
                logger.info('Verify token');
                decoded = jwt.verify(token, privateKey);

                logger.info('Get wallet address from token');
                req.params.walletAddress = decoded.walletAddress;

                logger.info('Token is successfully verified');
                next();
            } catch (err) {
                logger.info('Token is successfully verified');
                res.status(403).send('Token is invalid. API request is forbidden.');
            }
        } else {
            logger.error('Token is missing.');
            res.status(401).send({
                status: 'Unauthorized',
                error: 'Authorization error. Token required'
            });
        }
    }
}