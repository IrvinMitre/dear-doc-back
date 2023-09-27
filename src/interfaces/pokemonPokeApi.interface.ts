interface pokemonType {
  type: {
    name: string;
  };
}

export interface PokemonPokeApi {
  id: number;
  name: string;
  types: Array<pokemonType>;
  sprites: {
    front_default: string;
  };
}
