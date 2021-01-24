import mongoose from 'mongoose';
import WalletModel from '../models/wallet';
import DiscountModel from '../models/discount';
import { IDiscount } from '../models/discount';
import AdoptModel from '../models/Adopt';
import AdoptVimModel from '../models/AdoptVims';
import AdminWalletModel from '../models/AdminWallet';
import VWAccessLog from '../models/vimworld_access_log';
import { DBProcessorDto, DBAdopt } from '../dto/dbprocessor.dto'


export class DBProcessor {
    private m_connectString: String;

    constructor(connectStr?: String) { if (connectStr) this.m_connectString = connectStr; }

    public async connectDb(connectStr?: String): Promise<void> {
        if (connectStr) this.m_connectString = connectStr; // reset our connection string to this one in case we already set a connection string in constructor

        if (!this.m_connectString) throw new Error(`Cannot connect to the database. No connection parameters provided`);

        let connection = await mongoose.connect(this.m_connectString.toString(),
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            });

        if (!connection) throw new Error(`Could not connect to the database. Please check the connection parameters and ensure they are valid`);
    }

    public async upsertRecord(data: DBProcessorDto): Promise<void> {
        let wallet = new WalletModel();

        wallet.ehrt_balance = data.ehrt_balance;
        wallet.ehrts_in_vims = data.ehrts_in_vims;
        wallet.vet_balance = data.vet_balance;
        wallet.vims_owned = data.vims_owned;
        let i = 0;
        data.vimventory.forEach(d => wallet.vimventory[i++] = d);
        wallet.vtho_balance = data.vtho_balance;
        wallet.record_blockchain_access_dt = data.record_blockchain_access_dt;

        let existingDBRecord = await this.findAddress(data.address);

        if (!existingDBRecord || existingDBRecord === null) {
            wallet.address = data.address.toString(); // record does not exist in our database so we tack on the address
            await wallet.save();
        }
        else {
            await WalletModel.findOneAndUpdate(
                {
                    address: data.address.toString()
                },
                {
                    $set:
                    {
                        ehrt_balance: wallet.ehrt_balance,
                        ehrts_in_vims: wallet.ehrts_in_vims,
                        vet_balance: wallet.vet_balance,
                        vims_owned: wallet.vims_owned,
                        vimventory: wallet.vimventory,
                        vtho_balance: wallet.vtho_balance,
                        record_blockchain_access_dt: wallet.record_blockchain_access_dt
                    }
                }).exec();
        }

    }

    public async findAddress(walletAddress: String): Promise<any> {
        return await WalletModel.findOne({ address: walletAddress.toString() }).exec();
    }

    public async getDiscounts(): Promise<IDiscount> {
        return await DiscountModel.findOne({}, { "_id": 0, "recordInsertDt": 0, "recordUpdateDt": 0 }).exec();
    }
    
    public async getAvailableVims(): Promise<any> {
        const currentTime = new Date();

        return AdoptVimModel.find({
            start_date: {
                '$lte': currentTime
            },
            end_date: {
                '$gte': currentTime
            }
        })
    }

    public async getAllAdoptVims(): Promise<any> {
        return AdoptVimModel.find();
    }

    public async createAdopt(data: DBAdopt): Promise<any> {
        const adopt = new AdoptModel();
        adopt.adoptVIMId = data.adoptVIMId;
        adopt.emailAddress = data.emailAddress;
        adopt.receiveUpdate = data.receiveUpdate;
        adopt.telegramWechatName = data.telegramWechatName;
        adopt.walletAddress = data.walletAddress;
        adopt.timestamp = data.timestamp;

        adopt.save();
    }

    public async findAdopts(): Promise<any> {
        return AdoptModel.find();
    }

    public async getAdminWallets(): Promise<any> {
        return AdminWalletModel.find();
    }
}
