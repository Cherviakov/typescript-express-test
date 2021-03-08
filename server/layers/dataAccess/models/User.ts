import { Schema, model, Model, Document } from 'mongoose';

const UserSchema = new Schema ({
  _id: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, requried: true },
}, {
  versionKey: false,
});

export interface User extends Record<string, unknown> {
  email: string,
  password: string,
}

export interface UserDocument extends User, Document {}

// eslint-disable-next-line
export interface IUserModel extends Model<UserDocument> {}

export const UserModel: IUserModel = model('User', UserSchema);
