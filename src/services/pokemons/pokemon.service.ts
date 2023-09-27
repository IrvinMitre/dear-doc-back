import PokeApiService from "../pokeApi";
import Pokemon from "../../models/pokemon.model";
import { PokemonRegister } from "src/interfaces/pokemon.interfaces";
import { PokemonResponse } from "../../interfaces/pokemonResponse.interface";
import { sortByElementInJSON } from "../../utils/orderpokemons";
import UserService from "../users";

export default class PokemonService {
  private pokeApiService: PokeApiService;
  private userService: UserService;

  constructor() {
    this.pokeApiService = new PokeApiService();
    this.userService = new UserService();
  }

  async getPokemonsList(
    limit: number,
    offset: number
  ): Promise<PokemonResponse> {
    const pokemons = await this.pokeApiService.getPokemonList(limit, offset);
    const { results, count } = pokemons;

    const pokemonMap = new Map<string, PokemonRegister>();
    await Promise.all(
      results.map(async (pokemon) => {
        const pokemonMongo = await this.getPokemon(pokemon.name);
        if (pokemonMongo) {
          pokemonMap.set(pokemon.name, pokemonMongo);
        } else {
          const currentPokemon = await this.pokeApiService.getPokemonDetail(
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
    const pokemonOrder = Array.from(pokemonMap.values());
    sortByElementInJSON(pokemonOrder, "id_poke_api");

    const pokemonResponse = {
      limit: limit,
      offset: offset,
      count: count,
      pokemons: pokemonOrder,
    };
    return pokemonResponse;
  }

  async getFavoritesPokemons(name: string) {
    const user = await this.userService.getUserByName(name);
    let pokemons = [];

    if (user?.favorites) {
      for (const current of user?.favorites) {
        const pokemon = await this.getPokemon(current as string);
        pokemons.push(pokemon as PokemonRegister);
      }
    }
    sortByElementInJSON(pokemons, "id_poke_api");
    return pokemons;
  }

  async addFavoritePokemon(nameUser: string, namePokemon: string) {
    const user = await this.userService.getUserByName(nameUser);
    const newFavorites = user?.favorites;
    if ((newFavorites as Array<String>).includes(namePokemon)) {
      return false;
    } else {
      newFavorites?.push(namePokemon);
      await this.userService.updatePokemons(
        newFavorites as Array<String>,
        user?._id as string
      );
      return true;
    }
  }

  async getPokemon(name: string) {
    return await Pokemon.findOne({
      name,
    });
  }

  async createPokemon(pokemon: PokemonRegister) {
    return await Pokemon.create(pokemon);
  }

  async searchPokemon(name: string) {
    const query = { name: { $regex: name } };
    const documents = await Pokemon.find(query).limit(9);
    return documents;
  }
}
