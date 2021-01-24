import { model, Document, Schema } from 'mongoose';

export interface IAdopt extends Document {
    adoptVIMId: Number;
    emailAddress: String;
    walletAddress: String;
    telegramWechatName: String;
    receiveUpdate: Boolean;
    timestamp: Number;
}

const AdoptSchema = new Schema({
    adoptVIMId: {
        type: Number,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    walletAddress: {
        type: String,
        required: true,
    },
    telegramWechatName: {
        type: String
    },
    receiveUpdate: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Number
    }
});

const AdoptModel = model<IAdopt>('Adopt', AdoptSchema);

export default AdoptModel;
