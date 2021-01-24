import { model, Document, Schema } from 'mongoose';

export interface IAdoptVim extends Document {
    vim_type_id: Number;
    level: Number;
    price: Number;
    start_date: Date;
    end_date: Date;
}

export interface IAvailableVim {
    id: Number;
    name: String;
    level: Number;
    price: Number;
    image: String;
}

const AdoptVimSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        min: 0,
        default: 0
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    }
}, { collection: 'adopt_vims' });

const AdoptVimModel = model<IAdoptVim>('AdoptVim', AdoptVimSchema);

export default AdoptVimModel;
