import BaseError from "../../shared/errors/base";
import PokemonService from "../../services/pokemons/pokemon.service";
import { Request, Response } from "express";
import { ErrorCodes, ErrorMessages } from "../../shared/errors/error";

class pokemonsController {
  private pokemonService: PokemonService;

  constructor() {
    this.pokemonService = new PokemonService();
  }

  getPokemons = async (
    req: Request,
    res: Response
  ): Promise<Response<void> | Error> => {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const pokemons = await this.pokemonService.getLisPokemons(
        Number(limit),
        Number(offset)
      );

      return res.status(200).send(pokemons);
    } catch (error) {
      return res.status(500).send({
        error: new BaseError(
          ErrorCodes.GENERIC_ERROR,
          500,
          ErrorMessages.GENERIC_ERROR
        ),
      });
    }
  };
}

export default pokemonsController;
