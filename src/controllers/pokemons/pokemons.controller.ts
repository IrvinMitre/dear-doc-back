import BaseError from "../../shared/errors/base";
import PokemonService from "../../services/pokemons/pokemon.service";
import { Request, Response } from "express";
import { ErrorCodes, ErrorMessages } from "../../shared/errors/error";
import { isValidObject } from "../../guards/isValidObject.guard";
import { FavroitePokemon } from "../../dtos/pokemon/favoritePokemon.dto";

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
      const { limit = 9, offset = 0 } = req.query;
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

  getFavoritesPokemons = async (
    req: Request,
    res: Response
  ): Promise<Response<void> | Error> => {
    try {
      const { name = "" } = req.query;
      const pokemons = await this.pokemonService.getFavoritesPokemons(
        name as string
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

  addFavoritePokemon = async (
    req: Request,
    res: Response
  ): Promise<Response<void> | Error> => {
    if (
      !isValidObject<FavroitePokemon>(req.body, ["nameUser", "namePokemon"])
    ) {
      return res
        .status(400)
        .send(
          new BaseError(ErrorCodes.BAD_REQUEST, 400, ErrorMessages.BAD_REQUEST)
        );
    }
    try {
     const responseFavorites = await this.pokemonService.addFavorites(
        req.body.nameUser,
        req.body.namePokemon
      );

      if(!responseFavorites){
        return res
        .status(290)
        .send(
          new BaseError(ErrorCodes.POKE_EXIST, 290, ErrorMessages.POKE_EXIST)
        );

      }

      return res.status(200).send(req.body.nameUser);
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
