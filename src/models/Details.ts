import { model, Document, Schema } from 'mongoose';

interface IDetails extends Document {
  uid: Number;
  reputation: Number;
  totalFed: Number;
  listedPrice: Number;
}

const DetailsSchema = new Schema({
  uid: Number,
  reputation: Number,
  totalFed: Number,
  listedPrice: Number,
});

const Details = model<IDetails>('Details', DetailsSchema);

export default Details;
