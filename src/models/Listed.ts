import { Schema, model, Document } from 'mongoose';

interface IListed extends Document {
  id: number;
  name: string;
  price: number;
  uuid: string;
}

const ListedSchema = new Schema({
  id: Number,
  name: String,
  price: Number,
  uuid: String,
});

export const Listed = model<IListed>('Listed', ListedSchema);
