import { model, Document, Schema } from 'mongoose';

export interface IWallet extends Document {
    address: String;
    vims_owned: Number;
    ehrt_balance: Number;
    vet_balance: Number;
    vtho_balance: Number;
    ehrts_in_vims: Number;
    vimventory: [
        {
            vim_id: Number;
            vim_name: String;
            vim_tier: String;
            vim_tier_id: Number;
            vim_blessings: Number;
            vim_treasures: Number;
            vim_companions: Number;
            vim_age: String;
            vim_image: Buffer;
            vim_created_at: Date;
            vim_lore: String;
        }
    ];
    record_blockchain_insert_dt: Date;
    record_blockchain_update_dt: Date;
    record_blockchain_access_dt: Date;
}

const WalletSchema = new Schema({
    address: { type: String, unique: true, index: true, required: true },  /* Wallet Address */
    vims_owned: { type: Number, min: 0 },                     /* Count of VIMs owned by this wallet address */
    ehrt_balance: { type: Number, min: 0 },                   /* EHRTs balance of this wallet address */
    vet_balance: { type: Number, min: 0 },                    /* VET Balance of this wallet address */
    vtho_balance: { type: Number, min: 0 },                   /* VTHO balance of this wallet address */
    ehrts_in_vims: { type: Number, min: 0 },                  /* Number of EHRTs in VIMs */
    vimventory: [                                       /* Array of VIMs owned by this wallet address represented as an Object */
        {
            vim_id: { type: Number },                 /* VIM ID */
            vim_name: { type: String },               /* Name of the VIM e.g. GrOwn  */
            vim_tier: { type: String },               /* Tier of the VIM ID e.g. F */
            vim_tier_id: { type: Number, min: 0 },            /* VIM Tier ID corresponding to the VIM Tier e.g. F is 0, E = 1 and so on, based on existing mapping in frontend */
            vim_blessings: { type: Number, min: 0 },          /* VIM's blessings [I do not have suffecient information on this right now so this representation may change ]*/
            vim_treasures: { type: Number, min: 0 },          /* VIM's treasures [I do not have suffecient information on this right now so this representation may change ]*/
            vim_companions: { type: Number, min: 0 },         /* VIM's companions [I do not have suffecient information on this right now so this representation may change ]*/
            vim_age: { type: String },                /* VIM's age e.g. 30d, 100d etc. Currently, on the front end, this is represented in days */
            vim_image: { type: Buffer },              /* VIM's image. Not sure right now if this is the image name or we will store the actual image here. TBD */
            vim_created_at: { type: Date },           /* Date the VIM was created */
            vim_lore: { type: String }                /* Lore associated with the VIM [I do not have suffecient information on this right now so this representation may change ] */
        }
    ],
    record_blockchain_insert_dt: { type: Date, default: Date.now },      /* DateTime stamp this wallet address related record was created in our database i.e. when this API is live, the first time the backend API is invoked for this wallet */
    record_blockchain_update_dt: { type: Date },      /* DateTime stamp this wallet address related record sent an update transaction to the blockchain e.g. purchase a VIM. This will be used in caching algorithm. */
    record_blockchain_access_dt: { type: Date }       /* DateTime stamp this wallet address related record last accessed blockchain data. This will be used in caching algorithm. */
});

const WalletModel = model<IWallet>('Wallet', WalletSchema);

export default WalletModel;
