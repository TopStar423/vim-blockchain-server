import { Schema, model, Document, Model } from 'mongoose';
import { hash, compare } from 'bcrypt';

// Type declarations for properties and methods
interface IUserSchema extends Document {
  username: string;
  password: string;
  level: number;
  checkPassword: (password: string) => Promise<boolean>;
}

// Schema declaration
const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  level: Number,
});

// Method to compare password hash with provided password
UserSchema.methods.checkPassword = async function (password: string) {
  return await compare(password, this.password);
};

// pre save hook to hash password every time there's a change to the password
UserSchema.pre<IUserSchema>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  next();
});

export const User: Model<IUserSchema> = model<IUserSchema>('User', UserSchema);
