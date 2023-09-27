import { describe, expect, test, jest } from "@jest/globals";
import PokeApiService from "../services/pokeApi";
import axios from "axios";

describe("PokeApiService", () => {
  test("getListPokemon() should return a Object", async () => {
    const pokeApiService = new PokeApiService();
    const pokemonPokeApi = {
      data: {
        count: 1292,
        next: "https://pokeapi.co/api/v2/pokemon?offset=14&limit=5",
        previous: "https://pokeapi.co/api/v2/pokemon?offset=4&limit=5",
        results: [
          {
            name: "caterpie",
            url: "https://pokeapi.co/api/v2/pokemon/10/",
          },
          {
            name: "metapod",
            url: "https://pokeapi.co/api/v2/pokemon/11/",
          },
          {
            name: "butterfree",
            url: "https://pokeapi.co/api/v2/pokemon/12/",
          },
          {
            name: "weedle",
            url: "https://pokeapi.co/api/v2/pokemon/13/",
          },
          {
            name: "kakuna",
            url: "https://pokeapi.co/api/v2/pokemon/14/",
          },
        ],
      },
    };

    jest.spyOn(axios, "get").mockResolvedValue({
      data: pokemonPokeApi,
    });
    const pokeApi = await pokeApiService.getPokemonList(5, 0);
    expect(pokeApi).toEqual(pokemonPokeApi);
  });
});
