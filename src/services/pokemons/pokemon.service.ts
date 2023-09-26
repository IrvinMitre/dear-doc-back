import PokeApiService from "../pokeApi";
import Pokemon from "../../models/pokemon.model";
import { PokemonRegister } from "src/interfaces/pokemon.interfaces";
import { PokemonResponse } from "src/interfaces/pokemonResponse.interface";

export default class PokemonService {
  private pokeApiService: PokeApiService;

  constructor() {
    this.pokeApiService = new PokeApiService();
  }

  async getLisPokemons(
    limit: number,
    offset: number
  ): Promise<PokemonResponse> {
    const pokemons = await this.pokeApiService.getListPokemon(limit, offset);
    const { results, count } = pokemons;

    const pokemonMap = new Map<string, PokemonRegister>();
    await Promise.all(
      results.map(async (pokemon) => {
        const pokemonMongo = await this.getPokemon(pokemon.name);
        if (pokemonMongo) {
          pokemonMap.set(pokemon.name, pokemonMongo);
        }
        else{
          const currentPokemon = await this.pokeApiService.GetdetailPokemon(
            pokemon.name
          );
          const pokemonForMongo: PokemonRegister = {
            name: pokemon.name,
            types: currentPokemon.types.map((type) => type["type"]["name"]),
            image: currentPokemon.sprites.front_default,
            id_poke_api: currentPokemon.id,
          };
          const registerMongoPokemon = this.createPokemon(pokemonForMongo);
          console.log(registerMongoPokemon)
          pokemonMap.set(pokemon.name, pokemonForMongo);
        }
      })
    );

    const pokemonResponse = {
      limit: limit,
      offset: offset,
      count: count,
      pokemons: Array.from(pokemonMap.values()),
    };
    return pokemonResponse;
  }

  async getPokemon(name: string) {
    return await Pokemon.findOne({
      name,
    });
  }

  async createPokemon(pokemon: PokemonRegister) {
    return await Pokemon.create(pokemon);
  }
}
