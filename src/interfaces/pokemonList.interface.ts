export interface results {
  name: string;
  url: string;
}

export interface PokemonList {
  count: number;
  results: Array<results>;
}
