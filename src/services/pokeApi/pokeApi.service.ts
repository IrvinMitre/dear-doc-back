import axios from "axios";
import { Pokemon } from "../../interfaces/pokemon.interface";

export default class PokeApi {
  constructor() {}

  async GetdetailPokemon(pokemon: string | number): Promise<Pokemon> {
    try {
      const response = await axios.get(
        `${process.env.URL_POKE_API}/v2/pokemon/${pokemon}`
      );
      return response.data as Pokemon;
    } catch (error) {
      console.log(error);
      throw new Error(
        `Get request to pokemon/${pokemon} failed: ${(error as Error).message}`
      );
    }
  }
}
