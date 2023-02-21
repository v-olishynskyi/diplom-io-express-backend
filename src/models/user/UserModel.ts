import { Schema, Types, Document, model } from 'mongoose';
import { IUser } from '../../@types';

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    family_name: { type: String, required: true },
    username: { type: String, required: true },
    avatar: String,
    gender: {
      type: String,
      enum: ['male', 'female', ''],
    },
    email_verified: { type: Boolean },
    // @ts-ignore
    markers: [{ type: Types.ObjectId, ref: 'Marker' }],
    isAdmin: Boolean,
  },
  { collection: 'users', timestamps: true }
);

const UserModel = model<IUser & Document>('User', userSchema);

export default UserModel;
