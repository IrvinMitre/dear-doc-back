import PokeApiService from "../pokeApi";
import Pokemon from "../../models/pokemon.model";
import { PokemonRegister } from "src/interfaces/pokemon.interfaces";
import { PokemonResponse } from "src/interfaces/pokemonResponse.interface";
import { sortByElementInJSON } from "../../utils/orderpokemons";
import UserService from "../users";

export default class PokemonService {
  private pokeApiService: PokeApiService;
  private userService: UserService;

  constructor() {
    this.pokeApiService = new PokeApiService();
    this.userService = new UserService();
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
        } else {
          const currentPokemon = await this.pokeApiService.GetdetailPokemon(
            pokemon.name
          );
          const pokemonForMongo: PokemonRegister = {
            name: pokemon.name,
            types: currentPokemon.types.map((type) => type["type"]["name"]),
            image: currentPokemon.sprites.front_default,
            id_poke_api: currentPokemon.id,
          };
          this.createPokemon(pokemonForMongo);
          pokemonMap.set(pokemon.name, pokemonForMongo);
        }
      })
    );
    const pokemonorder = Array.from(pokemonMap.values());
    sortByElementInJSON(pokemonorder, "id_poke_api");

    const pokemonResponse = {
      limit: limit,
      offset: offset,
      count: count,
      pokemons: pokemonorder,
    };
    return pokemonResponse;
  }

  async getFavoritesPokemons(name: string) {
    const user = await this.userService.getUserByName(name);
    let pokemons = [];
    if (user?.favorites) {
      for (const current of user?.favorites) {
        const pokemon = await this.getPokemon(current as string);
        pokemons.push(pokemon);
      }
    }
    return pokemons;
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
