interface typePokemon {
  type: {
    name: string;
  };
}

export interface PokemonPokeApi {
  id: number;
  name: string;
  types: Array<typePokemon>;
  sprites: {
    front_default: string;
  };
}
