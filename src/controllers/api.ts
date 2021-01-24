import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Certificate } from 'thor-devkit';
import logger from '../log/logger';


interface CertPayload {
    type: string;
    content: string;
}

interface Cert {
    purpose: string;
    payload: CertPayload;
    domain: string;
    timestamp: number;
    signer: string;
    signature: string;
}

const privateKey: string = process.env.JWT_PRIVATE_KEY;

export class APIController {

    constructor() { }

    public async generateToken(req: Request, res: Response) {
        const cert: Cert = req.body.cert;

        try {
            if (!cert) {
                return res.status(400).send('Cert should be provided');
            }

            Certificate.verify(cert);

            const APIToken = await jwt.sign({
                walletAddress: cert.signer
            }, privateKey);

            res.status(200).send(APIToken);
        } catch (err) {
            logger.error(err);
            res.status(400).send('Invalid cert');
        }
    }
}