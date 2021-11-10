import { model } from 'mongoose';
import userSchema from './UserSchema';

const UserModel = model('User', userSchema);

export default UserModel;
