import { Request, Response } from 'express';
import { VIMInternalAPI } from '../lib/vim-internal-api';
import { VIMTierDetailsDto } from '../dto/vim-tier-details.dto';
import { VIMS } from '../constants/tiers';
import logger from '../log/logger';


interface TierImageSize {
    [key: number]: string;
}

interface TierImage {
    tier: number;
    sizes: TierImageSize[];
}

interface VimType {
    id: number;
    name: string;
    images: TierImage[]
}

interface MarketplaceVim {
    id: number;
    vim_type_id: number;
    name: string;
    image: TierImageSize[];
}

export class MarketplaceController {
    private vimInternalApi: VIMInternalAPI;

    constructor() {
        this.vimInternalApi = new VIMInternalAPI();
    }

    public getVims = async (req: Request, res: Response) => {
        try {
            logger.info(`Get vim ids from request`);
            const vimIds: number[] = req.body;

            if (!vimIds || !vimIds.length) {
                logger.info('No vim ids from the request');
                return res.status(400).send('Vim id list should be provided');
            }

            logger.info('Start fetching vim tier information from interal API');
            const vimTiersDetails: VIMTierDetailsDto[] = await this.vimInternalApi.intAPIFetchVimTierInfo(vimIds);

            const marketplaceVims: MarketplaceVim[] = [];
            vimTiersDetails.map((vimTierDetail: VIMTierDetailsDto) => {
                const vimTypeId: number = Math.floor(+vimTierDetail.vim_id / Math.pow(10, 9));
                const vim: VimType = VIMS.find((item: VimType) => item.id === vimTypeId);

                if (!vim) {
                    logger.error(`No vim for vim id ${vimTierDetail.vim_id}`);
                    marketplaceVims.push({
                        id: +vimTierDetail.vim_id,
                        vim_type_id: vimTypeId,
                        name: '',
                        image: []
                    });
                } else {
                    const tierImage: TierImage = vim.images.find((item: TierImage) => item.tier === vimTierDetail.vim_tier_id);
                    marketplaceVims.push({
                        id: +vimTierDetail.vim_id,
                        vim_type_id: vimTypeId,
                        name: vim.name,
                        image: tierImage.sizes
                    })
                }
            })

            res.status(200).send(marketplaceVims);
        } catch (err) {
            logger.error(`error ---> ${err}`);
            res.status(400).send(err);
        }
    }
}