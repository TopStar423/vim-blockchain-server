import { Request, Response } from 'express';
import mongoose from 'mongoose';
import logger from '../log/logger';

import {
    VIMS,
    HISTORICAL_DATA,
    BANNERS,
    POLICY,
    TERMS,
    TIER_MAP
} from '../constants/tiers';
import { VIMInternalAPI } from '../lib/vim-internal-api';
import { StandardResponseDto } from '../dto/standard-response.dto';


const Wallet = mongoose.model('Wallet')

interface VimInfo {
    vimId: number;
    tierId: number;
}

interface TierImageSize {
    [key: number]: string;
}

interface TierImage {
    tier: number;
    sizes: TierImageSize[];
}

interface TierInfo {
    id: number;
    name: string;
    images: TierImage[]
}

export class TiersController {
    private vimInternalApi: VIMInternalAPI;

    constructor() {
        this.vimInternalApi = new VIMInternalAPI();
    }

    public tiersRoot(req: Request, res: Response) {
        res.status(200).send("VIM Tier Images");
    }

    public getUserTiers = async (req: Request, res: Response) => {
        const { walletAddress }: any = req.params;

        try {
            // const wallet: any = await Wallet.findOne({
            //     address: walletAddress
            // });
            logger.info(`Get Tiers for wallet ${walletAddress}`);
            const walletInfo: StandardResponseDto = await this.vimInternalApi.intAPIFetchOwnedVimInfo(walletAddress);
            
            if (!walletInfo) {
                logger.error(`error ---> Can not find walletInfo`);
                return res.status(400).send('Cannot fetch wallet data');
            }

            if (walletInfo.status !== 'success') {
                logger.error(`error ---> walletInfo status is not success. ${walletInfo.status}`);
                return res.status(400).send('Failed to fetch wallet data');
            }

            const { data }: any = walletInfo;

            const userTiers: TierInfo[] = [];

            data.map((walletVim: any) => {
                logger.info(`Check with wallet vim id ${walletVim.vim_id}`);
                const vimId: number = Math.floor(walletVim.vim_id / Math.pow(10, 9));
                const vimInfo: VimInfo = {
                    vimId,
                    tierId: TIER_MAP[walletVim.vim_tier]
                }

                logger.info(`Look for vim with type id ${vimInfo.vimId}`);
                const vim: TierInfo = VIMS.find((item: TierInfo) => item.id === vimInfo.vimId);
                if (!vim) {
                    logger.info(`No vim found by the type id ${vimInfo.vimId}`);
                } else {
                    logger.info(`Found by the type id ${vimInfo.vimId}`);
                    const image: TierImage = vim.images.find((vimImage: TierImage) => vimImage.tier === vimInfo.tierId);

                    const tier = userTiers.find((item: TierInfo) => item.id === vim.id);

                    let userTier: TierInfo;
                    if (!tier) {
                        userTier = {
                            id: vim.id,
                            name: vim.name,
                            images: [image]
                        };

                        userTiers.push(userTier);
                    } else {
                        const { images }: { images: TierImage[] } = tier;
                        const tierImage = images.find(item => item.tier === image.tier);
                        if (!tierImage) {
                            tier.images.push(image);
                        }
                    }
                }
            })

            res.status(200).send(userTiers);
        } catch (err) {
            logger.error(`error ---> ${err}`);
            res.status(400).send(err);
        }
    }

    public getHistorical(req: Request, res: Response) {
        res.status(200).send(HISTORICAL_DATA);
    }

    public getBanners(req: Request, res: Response) {
        res.status(200).send(BANNERS);
    }

    public getPolicy(req: Request, res: Response) {
        res.status(200).send(POLICY);
    }

    public getTerms(req: Request, res: Response) {
        res.status(200).send(TERMS);
    }
}