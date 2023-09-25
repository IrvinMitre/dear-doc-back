interface typePokemon {
  type: {
    name: string;
  };
}

export interface PokemonPokeApi {
  id: string;
  name: string;
  type: Array<typePokemon>;
  sprites: {
    front_default: string;
  };
}
