import axios from "axios";
import { PokemonPokeApi } from "../../interfaces/pokemonPokeApi.interface";
import { PokemonList } from "../../interfaces/pokemonList.interface";

export default class PokeApiService {
  constructor() {}

  async getPokemonDetail(pokemon: string): Promise<PokemonPokeApi> {
    try {
      const response = await axios.get(
        `${process.env.URL_POKE_API}/v2/pokemon/${pokemon}`
      );
      return response.data as PokemonPokeApi;
    } catch (error) {
      throw new Error(
        `Get request to pokemon/${pokemon} failed: ${(error as Error).message}`
      );
    }
  }

  async getPokemonList(limit: number, offset: number): Promise<PokemonList>  {
    try {
      const params = {
        access_key: process.env.API_ACCESS_KEY_MARKETSTACK,
        limit,
        offset,
      };
      const response = await axios.get(
        `${process.env.URL_POKE_API}/v2/pokemon/`,
        { params }
      );
      return response.data as PokemonList;
    } catch (error) {
      throw new Error(
        `Get request to pokemon/ failed: ${(error as Error).message}`
      );
    }
  }
}
