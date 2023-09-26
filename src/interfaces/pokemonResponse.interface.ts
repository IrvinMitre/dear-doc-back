import { PokemonRegister } from "./pokemon.interfaces";

export interface PokemonResponse {
    limit: number;
    offset: number;
    count: number;
    pokemons: Array<PokemonRegister>;
  }