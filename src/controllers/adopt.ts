import { Request, Response } from 'express';
import axios from 'axios';
import { IAdoptVim, IAvailableVim } from '../models/AdoptVims';
import { IAdopt } from '../models/Adopt';
import { IAdminWallet } from '../models/AdminWallet';
import { DBProcessor } from '../lib/dbprocessor';
import logger from '../log/logger';

interface MetaData {
    id: number;
    name: string;
    description: string;
    image: string;
    attributes: any;
    supply: number;
}

interface AdoptVim {
    name: string;
    price: number;
    level: number;
    image: string;
}

interface AdoptData {
    adoptVIMId: Number;
    emailAddress: String;
    walletAddress: String;
    telegramWechatName: String;
    receiveUpdate: Boolean;
    timestamp: Number;
    adoptVIM: AdoptVim;
}

export class AdoptController {
    private m_dbHandle: DBProcessor = new DBProcessor();

    constructor() { }

    public getAvailableVims = async (req: Request, res: Response) => {
        try {
            const metaDataUrl = 'https://data.testnet.8hoursfoundation.org/metadata/types';
            logger.info(`Fetching meta data types from ${metaDataUrl}`);
            const metaRes: any = await axios.get(metaDataUrl);
            logger.info('Fetching meta data types success')
            const metaData: MetaData[] = metaRes.data;

            logger.info('Get all adopt available vims from database');
            const adoptVims: IAdoptVim[] = await this.m_dbHandle.getAvailableVims();

            logger.info('Formatting adopt available vims');
            const availableVims: IAvailableVim[] = [];
            for (const vim of adoptVims) {
                const vim_type_id: number = vim.toObject().vim_type_id;
                logger.info(`checking vim meta data for vim type id ${vim_type_id}`);
                const vimMeta: MetaData = metaData.find((item: MetaData) => item.id === vim_type_id);
                if (!vimMeta) {
                    logger.error(`no vim meta exists with vim type id ${vim_type_id}`);
                } else {
                    const availableVim: IAvailableVim = {
                        id: vim_type_id,
                        name: vimMeta.name,
                        level: vim.level,
                        price: vim.price,
                        image: vimMeta.image
                    }

                    availableVims.push(availableVim);
                }
            }

            res.status(200).send(availableVims);
        } catch (err) {
            logger.error(`error ---> ${err}`);
            res.status(400).send(err);
        }
    }

    public createAdopt = async (req: Request, res: Response) => {
        try {
            logger.info('Get adopt from request body');
            const adopt = req.body;
            if (!adopt) {
                logger.error('Adopt is not provided!');
                return res.status(400).send('Adopt should be provided!');
            }

            logger.info('Create adopt');
            await this.m_dbHandle.createAdopt(adopt);

            res.status(200).send('Adopt saved!');
        } catch (err) {
            logger.error(`error ---> ${err}`);
            res.status(400).send(err);
        }
    }

    public getAdopts = async (req: Request, res: Response) => {
        try {
            const { walletAddress }: any = req.params;

            logger.info('Get all admin wallet addresses');
            const adminWallets: IAdminWallet[] = await this.m_dbHandle.getAdminWallets();

            logger.info('Check if wallet address is admin wallet');
            const adminWallet = adminWallets.findIndex((item: IAdminWallet) => item.walletAddress.toLowerCase() === walletAddress.toLowerCase());

            if (adminWallet < 0) {
                logger.error('Wallet is not an admin wallet');
                return res.status(403).send('Forbidden to retrieve adopts data');
            }

            logger.info('get all adopts');
            const adopts: IAdopt[] = await this.m_dbHandle.findAdopts();

            const metaDataUrl = 'https://data.testnet.8hoursfoundation.org/metadata/types';
            logger.info(`Fetching meta data types from ${metaDataUrl}`);
            const metaRes: any = await axios.get(metaDataUrl);
            logger.info('Fetching meta data types success')
            const metaData: MetaData[] = metaRes.data;

            logger.info('Get all adopt vims from database');
            const adoptVims: IAdoptVim[] = await this.m_dbHandle.getAllAdoptVims();

            const adoptListData: AdoptData[] = [];

            for (const adopt of adopts) {
                const vimMeta = metaData.find((item: MetaData) => item.id === adopt.adoptVIMId);
                const vim = adoptVims.find((item: IAdoptVim) => item.toObject().vim_type_id === adopt.adoptVIMId);

                if (!vim) {
                    logger.error('No available vims for the adopt vim');
                } else {
                    const adoptData: AdoptData = {
                        adoptVIMId: adopt.adoptVIMId,
                        adoptVIM: {
                            name: vimMeta.name,
                            price: +vim.price,
                            level: +vim.level,
                            image: vimMeta.image
                        },
                        emailAddress: adopt.emailAddress,
                        walletAddress: adopt.walletAddress,
                        telegramWechatName: adopt.telegramWechatName,
                        receiveUpdate: adopt.receiveUpdate,
                        timestamp: adopt.timestamp,
                    }

                    adoptListData.push(adoptData);
                }
            }

            res.status(200).send(adoptListData);
        } catch (err) {
            logger.error(`error ---> ${err}`);
            res.status(400).send(err);
        }
    }
}