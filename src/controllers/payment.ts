import { Request, Response } from 'express';
import { read } from '../lib';
import { readFileSync } from 'fs';
import { IDiscount } from '../models/discount';
import { VIMInternalAPI } from '../lib/vim-internal-api';

export class PaymentController {
    private m_intAPIHandler:VIMInternalAPI = new VIMInternalAPI();

    constructor() { }

    /* public getDiscounts(req: Request, res: Response) {
        const discounts = readFileSync('config.json', 'utf-8');
        res.status(200).send(JSON.parse(discounts));
    } */

    public getDiscounts = async (req: Request, res: Response, next: any) => {
        try {
            let discounts = await this.m_intAPIHandler.intAPIFetchVimDiscounts();

            res.json(discounts);

        }
        catch (err) {
            let msg = err instanceof Error ? err.message : err;
            res.send(JSON.parse(JSON.stringify({
                "status": "failure",
                "statuscode": 500,
                "message": msg
            })));
        }
    }

    public getPrice(req: Request, res: Response) {
        res.status(200).send(read('price').toString());
    }
}