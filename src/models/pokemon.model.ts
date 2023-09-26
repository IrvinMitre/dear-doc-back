import { PokemonRegister } from 'src/interfaces/pokemon.interfaces';
import mongoose from '../database';

const schema = new mongoose.Schema({
  name: String,
  types: Array<String>,
  image: String,
  id_poke_api: Number,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Pokemon = mongoose.model<PokemonRegister>('Pokemon', schema);

export default Pokemon;