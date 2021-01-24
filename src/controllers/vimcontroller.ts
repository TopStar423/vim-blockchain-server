import { Request, Response } from 'express';
import { VIMInternalAPI } from '../lib/vim-internal-api'
import logger from '../log/logger';

export class VIMWorldController {

    private m_APIHandler: VIMInternalAPI;
    /* private m_dbHandle: DBProcessor = new DBProcessor();
    */
    constructor() {
        /*    ( async () => {
               await this.m_dbHandle.connectDb(DB_URL)
           })();  */
        this.m_APIHandler = new VIMInternalAPI();
    }

    public fetchWalletInfo = async (req: Request, res: Response, next: any) => {
        try {
            let walletAddress = req.params.walletaddress;

            if (!walletAddress) throw new Error(`Invalid wallet address provided in the route path`);

            // let balances = await VIMServices.getCompositeBalances(walletAddress);
            // let successMsg = `Successfully fetched balances for ${walletAddress}`;

            let walletInfo = await this.m_APIHandler.intAPIFetchWalletInfo(walletAddress);

            if (walletInfo.statuscode !== 200) throw new Error(`Could not retrieve wallet info. Error from handler: ${walletInfo.message}`);

            res.json({
                "status": walletInfo.status,
                "statuscode": walletInfo.statuscode,
                "message": walletInfo.message,
                "data": walletInfo.data
            });

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

    public fetchOwnedVimInfo = async (req: Request, res: Response, next: any) => {

        let SESSION_ID = req["sessionID"];
        
        try {
            let walletAddress = req.params.walletaddress;

            if (!walletAddress) throw new Error(`Invalid wallet address provided in the route path`);

            // Set the session ID
            
            logger.info(`Controller: Processing getVims request for wallet address ${walletAddress}`);

            /* let walletDto = new DBProcessorDto();
            let retObj = [];
            let source;

            // fetch this record from the database
            let dbRecord = await this.m_dbHandle.findAddress(walletAddress);

            if (dbRecord !== undefined && dbRecord !== null && (LocalDBCache.compareCacheAge(dbRecord.record_blockchain_access_dt, new Date(Date.now())))) // found locally
            {

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

                let vims = await VIMServices.getOwnedVims(walletAddress);

                let i = 0;

                for await (let vim of vims) {
                    let tier = await VIMServices.getTier(vim, 'old_tier');
                    retObj.push({
                        vim_id: vim,
                        vim_tier: tierMap[tier.decoded[0]]
                    });
                    let dbInventory = new DBVimVentory();
                    dbInventory.vim_id = vim;
                    dbInventory.vim_tier = tierMap[tier.decoded[0]];
                    walletDto.vimventory[i] = dbInventory;
                    i++;
                }
                walletDto.record_blockchain_access_dt = new Date(Date.now()); // last time we accessed the blockchain is updated

                await this.m_dbHandle.upsertRecord(walletDto);
                source = "blockchain";
            }

            let successMsg = `${source}: Successfully fetched VIM info for ${walletAddress}`;
 */
            let ownedVIMInfo = await this.m_APIHandler.intAPIFetchOwnedVimInfo(walletAddress);

            if (ownedVIMInfo.statuscode !== 200) throw new Error(`Could not retrieve wallet info. Error from handler: ${ownedVIMInfo.message}`);

            logger.info(`Controller: Finished processing getVims request for wallet address ${walletAddress}`);

            res.json({
                "status": ownedVIMInfo.status,
                "statuscode": ownedVIMInfo.statuscode,
                "message": ownedVIMInfo.message,
                "data": ownedVIMInfo.data
            });


        }
        catch (err) {
            let msg = err instanceof Error ? err.message : err;
            logger.error(`Error received in controller for fetching Owned VIMs: ${msg}`);
            res.send(JSON.parse(JSON.stringify({
                "status": "failure",
                "statuscode": 500,
                "message": msg
            })));

        }
    }

}