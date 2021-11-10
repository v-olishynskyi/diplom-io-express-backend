import { Schema } from 'mongoose';
import { IUser } from '../../@types';

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  family_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  avatar: String,
  gender: {
    type: String,
    enum: ['male', 'female', ''],
  },
});

export default userSchema;
