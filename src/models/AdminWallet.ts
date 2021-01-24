import { model, Document, Schema } from 'mongoose';

export interface IAdminWallet extends Document {
    walletAddress: String;
}

const AdminWalletSchema = new Schema({
    walletAddress: {
        type: String,
        required: true
    }
}, { collection: 'admin_wallets' });

const AdminWalletModel = model<IAdminWallet>('AdminWallet', AdminWalletSchema);

export default AdminWalletModel;
