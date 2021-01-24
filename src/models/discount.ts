import { model, Document, Schema } from 'mongoose';

export interface IDiscount extends Document {
    originalPrice: Number;
    isDiscount: Boolean;
    discountPercentage: Number;
    showAnyVims: Boolean;
    recordInsertDt: Date;
    recordUpdateDt: Date;
}

const DiscountSchema = new Schema({
    originalPrice: { type: Number, min: 0 },     
    isDiscount: { type: Boolean, default: false },
    discountPercentage: { type: Number, min: 0 }, 
    showAnyVims: { type: Boolean, default: false },
    recordInsertDt: { type: Date, default: Date.now },
    recordUpdateDt: { type: Date }
    
});

const DiscountModel = model<IDiscount>('Discount', DiscountSchema);

export default DiscountModel;
