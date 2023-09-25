import { Pokemon } from 'src/interfaces/pokemon.interfaces';
import mongoose from '../database';

const schema = new mongoose.Schema({
  name: String,
  type: Array<String>,
  image: String,
  id_poke_api: Number,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model<Pokemon>('Pokemon', schema);

export default User;