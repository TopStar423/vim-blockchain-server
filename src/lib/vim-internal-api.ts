import logger from '../log/logger';
import { VIMServices } from '../lib/vimcontracts'
import { tierMap, DB_URL, LocalDBCache, THOR_URL } from '../config/config';
import { DBProcessor } from '../lib/dbprocessor';
import { DBProcessorDto, DBVimVentory } from '../dto/dbprocessor.dto';
import { StandardResponseDto } from '../dto/standard-response.dto';
import { VIMTierDetailsDto } from '../dto/vim-tier-details.dto';
import { IDiscount } from '../models/discount';

export class VIMInternalAPI {

    private m_dbHandle: DBProcessor = new DBProcessor();

    constructor() {
        (async () => {
            try {
                await this.m_dbHandle.connectDb(DB_URL);
            }
            catch (e) {
                throw new Error(e.message);
            }
        })();

    }

    public intAPIFetchWalletInfo = async (walletAddress: any): Promise<StandardResponseDto> => {
        try {
            if (!walletAddress) throw new Error(`Invalid wallet address provided intAPIFetchWalletInfo`);

            let balances = await VIMServices.getCompositeBalances(walletAddress);
            let successMsg = `Successfully fetched balances for ${walletAddress}`;

            return new StandardResponseDto(
                "success",
                200,
                successMsg,
                balances
            );

        }
        catch (err) {
            let msg = err instanceof Error ? err.message : err;
            return new StandardResponseDto(
                "failure",
                500,
                msg
            );
        }
    }

    public intAPIFetchOwnedVimInfo = async (walletAddress: any): Promise<StandardResponseDto> => {
        try {
            logger.info(`Entring Internal API function to fetch VIMs owned by ${walletAddress}`);

            if (!walletAddress) throw new Error(`Invalid wallet address provided in the route path`);

            let walletDto = new DBProcessorDto();

            let retObj = [];
            let source;

            // fetch this record from the database
            let dbRecord = await this.m_dbHandle.findAddress(walletAddress);

            if (dbRecord !== undefined && dbRecord !== null && (LocalDBCache.compareCacheAge(dbRecord.record_blockchain_access_dt, new Date(Date.now())))) // found locally
            {
                logger.debug(`Get record from DB ${walletAddress}`);
                // we are good to go with the found record as our cache value allows using locally stored values
                for (let vim of dbRecord.vimventory) {
                    retObj.push({
                        vim_id: vim.vim_id,
                        vim_tier: vim.vim_tier
                    });

                }
                source = "localdb";
            }
            else // we need to go to the blockchain
            {
                walletDto.address = walletAddress;
                logger.debug(`Before get getOwnedVims ${walletAddress}`);
                let vims = await VIMServices.getOwnedVims(walletAddress);
                logger.debug(`After get getOwnedVims ${walletAddress}`);
                let i = 0;

                // New method based on VIM-335 to get all tiers in one call

                if (vims && vims.length > 0) {
                    let tiers = await VIMServices.getTierOfVims(vims, 'old_tier');

                    for await (let vim of vims) {
                        //let tier = await VIMServices.getTier(vim, 'old_tier');
                        retObj.push({
                            vim_id: vim,
                            vim_tier: tierMap[tiers[i].toString()]
                            //vim_tier: tierMap[tier.decoded[0]]
                        });
                        let dbInventory = new DBVimVentory();
                        dbInventory.vim_id = vim;
                        //dbInventory.vim_tier = tierMap[tier.decoded[0]];
                        dbInventory.vim_tier = tierMap[tiers[i].toString()];
                        walletDto.vimventory[i] = dbInventory;
                        i++;
                    }
                }
                walletDto.record_blockchain_access_dt = new Date(Date.now()); // last time we accessed the blockchain is updated

                await this.m_dbHandle.upsertRecord(walletDto);
                source = "blockchain";
            }

            let successMsg = `${source}: Successfully fetched VIM info for ${walletAddress}`;

            logger.info(`Finished processing Internal API function to fetch VIMs owned by ${walletAddress}`);

            return new StandardResponseDto(
                "success",
                200,
                successMsg,
                retObj
            );


        }
        catch (err) {
            let msg = err instanceof Error ? err.message : err;
            logger.error(`error in intAPIFetchOwnedVimInfo ---> ${msg}`);
            return new StandardResponseDto(
                "failure",
                500,
                msg
            );

        }
    }

    public intAPIFetchVimTierInfo = async (vims: any[]): Promise<VIMTierDetailsDto[]> => {
        try {
            logger.info(`Entering Internal API function intAPIFetchVimTierInfo to get vim tier details`);

            if (!vims || vims.length === 0) throw new Error(`Invalid array of vims provided`);

            let retObj = [], i = 0;

            let tiers = await VIMServices.getTierOfVims(vims, 'old_tier');

            for await (let vim of vims) {
                let item = new VIMTierDetailsDto(vim, tierMap[tiers[i].toString()], Number(tiers[i]));
                logger.debug(`Processing item ${JSON.stringify(item)}`);
                retObj.push(item);
                i++;
            }

            logger.info(`Leaving Internal API function intAPIFetchVimTierInfo`);

            return retObj;
        }
        catch (err) {
            let msg = err instanceof Error ? err.message : err;
            logger.error(`error in intAPIFetchVimTierInfo ---> ${msg}`);
            throw new Error(`error in intAPIFetchVimTierInfo ---> ${msg}`);
        }
    }

    public intAPIFetchVimDiscounts = async (): Promise<IDiscount> => {
        try {
            logger.info(`Entering Internal API function intAPIFetchVimDiscounts to get vim discount details`);

            let discounts = await this.m_dbHandle.getDiscounts();

            logger.info(`Leaving Internal API function intAPIFetchVimDiscounts`);

            return discounts;
        }
        catch (err) {
            let msg = err instanceof Error ? err.message : err;
            logger.error(`error in intAPIFetchVimDiscounts ---> ${msg}`);
            throw new Error(`error in intAPIFetchVimDiscounts ---> ${msg}`);
        }

    }

}