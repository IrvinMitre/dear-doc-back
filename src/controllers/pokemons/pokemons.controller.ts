import BaseError from "../../shared/errors/base";
import PokeApiService from "../../services/pokeApi";
import { Request, Response } from "express";
import { ErrorCodes, ErrorMessages } from "../../shared/errors/error";

class pokemonsController {
  private pokeApiService: PokeApiService;

  constructor() {
    this.pokeApiService = new PokeApiService();
  }

  getPokemons = async (
    req: Request,
    res: Response
  ): Promise<Response<void> | Error> => {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const pokemons = await this.pokeApiService.getListPokemon(
        Number(limit),
        Number(offset)
      );

      return res.status(200).send({ pokemons });
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
