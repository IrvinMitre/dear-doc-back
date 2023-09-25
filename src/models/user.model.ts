import { UserInterface } from '../interfaces/user.interface';
import mongoose from '../database';

const schema = new mongoose.Schema({
  name: String,
  favorites: Array<String>,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model<UserInterface>('User', schema);

export default User;