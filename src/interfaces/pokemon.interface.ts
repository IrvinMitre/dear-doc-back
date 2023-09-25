interface typePokemon {
  type: {
    name: string;
  };
}

export interface Pokemon {
  id: string;
  name: string;
  type: Array<typePokemon>
  sprites: {
    front_default: string;
  };
}
