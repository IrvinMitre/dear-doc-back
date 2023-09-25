import { Router } from 'express';
import pokemonsController from '../../controllers/pokemons/pokemons.controller';

export class PokemonRouter {
  pokemon = new pokemonsController();
  router: Router;
  constructor() {
    this.router = Router();
    this.init();
  }

  init = () => {
    this.router.get('/getPokemons', this.pokemon.getPokemons);
  };
}

const pokemonRoutes = new PokemonRouter();
pokemonRoutes.init();
export default pokemonRoutes.router;