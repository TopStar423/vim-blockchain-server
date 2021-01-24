import { vimsOfOwner, balanceOfEHRT } from "../abi/vims";
import { Framework } from '@vechain/connex-framework';
import { BigNumber } from 'bignumber.js';
import { Driver, SimpleNet, SimpleWallet } from '@vechain/connex.driver-nodejs';
import { CompositeBalanceDto } from '../dto/composite-balance.dto';
import { addresses, VECHAIN_LB_ERROR_TEXT } from '../config/config';
import { abi_tier } from '../abi/tier';
import { abi_vim } from '../abi/vims';
import logger from '../log/logger';
import { syncBuiltinESMExports } from "module";


export class VIMServices {
    public static static_m_Connex: Framework;
    private static static_m_e18: BigNumber = new BigNumber(1e18);

    constructor() { }

    public static async initialize(url: string) // must call this, and only once
    {
        let driver = await Driver.connect(new SimpleNet(url), new SimpleWallet());
        this.static_m_Connex = new Framework(Framework.guardDriver(driver));
    }

    private static fromWei(v: string) {
        return new BigNumber(v).div(this.static_m_e18).toString(10);
    }
    private static getContractMethod = (contractAddress: any, abiDefinition: any) => {
        return VIMServices.static_m_Connex.thor.account(contractAddress).method(abiDefinition);
    };

    public static getOwnedVims = async (walletAddress: any) => {
        if (!walletAddress) throw new Error(`Invalid wallet address provided`);
        let retryCounter = 1;

        for (let counter = 0; counter <= retryCounter; counter++) {
            try {
                const rawData = await VIMServices.getContractMethod(addresses.ownership, vimsOfOwner).call(walletAddress);

                return rawData.decoded![0];
            }
            catch (err) {
                let msg: String = err instanceof Error ? err.message : err;
                // handle load balancer vechain issue
                if (msg.includes(VECHAIN_LB_ERROR_TEXT)) {
                    logger.error(`Error from VIMServices::getOwnedVims for wallet address ${walletAddress}. Error: ${msg.toString()}`);
                    logger.info(`Retrying...`);
                    logger.info(`Going to sleep for 500 ms`);
                    await new Promise(resolve => setTimeout(resolve, 500));
                    logger.info(`Awake!`);
                }
                else {
                    logger.error(`Error from VIMServices::getOwnedVims for wallet address ${walletAddress}. Error: ${msg.toString()}`);
                    throw new Error(`Error from VIMServices::getOwnedVims for wallet address ${walletAddress}. Error: ${msg.toString()}`);
                }
            }
        }
    };

    public static getBalanceOfEHRT = async (walletAddress: any) => {
        if (!walletAddress) throw new Error(`Invalid wallet address provided`);

        return await VIMServices.getContractMethod(addresses.ehrt, balanceOfEHRT).call(
            walletAddress
        );
    };

    public static async getCompositeBalances(walletAddress: any): Promise<CompositeBalanceDto> {
        if (!walletAddress) throw new Error(`Invalid wallet address provided`);

        let accountDetails = await this.static_m_Connex.thor.account(walletAddress).get();
        let ehrts = await this.getBalanceOfEHRT(walletAddress);

        return await new CompositeBalanceDto(
            this.fromWei(accountDetails.balance),
            this.fromWei(accountDetails.energy),
            this.fromWei(ehrts.data));
    }

    public static async getTier(uid: number, contract: 'old_tier' | 'tier' = 'tier'): Promise<Connex.Thor.VMOutput> {
        return await VIMServices.getContractMethod(addresses[contract], abi_tier.getTierOfVim).call(uid);
    }

    public static async getTierOfVims(uids: number[], contract: 'old_tier' | 'tier' = 'tier'): Promise<Number[]> {
        const explainer = this.static_m_Connex.thor.explain();
        const getTierOfVimMethod = this.getContractMethod(addresses[contract], abi_tier.getTierOfVim);

        const clauses = [];

        for (const uid of uids) {
            clauses.push(getTierOfVimMethod.asClause(uid));
        }

        const res = await explainer.execute(clauses);

        if (res.length !== uids.length) {
            logger.error('Gas limit exceeded; Failed to get vim tiers');
            throw new Error('Gas limit exceeded');                
        }

        const tierNumbers = res.map((each) => {
            return parseInt(each['data'], 16)
        })

        return tierNumbers;  

    }

    public static async vimDetails(uid: number): Promise<any> {
        return await VIMServices.getContractMethod(addresses.ownership, abi_vim.getVim).call([uid]);
    }
}


