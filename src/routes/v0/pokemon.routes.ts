import { Router } from 'express';
import PokemonsController from '../../controllers/pokemons/pokemons.controller';

export class PokemonRouter {
  pokemon = new PokemonsController();
  router: Router;
  constructor() {
    this.router = Router();
    this.init();
  }

  init = () => {
    this.router.get('/getPokemons', this.pokemon.getPokemons);
    this.router.get('/getFavoritesPokemons', this.pokemon.getFavoritePokemons);
    this.router.post('/addFavoritesPokemons', this.pokemon.addFavoritePokemon);
    this.router.get('/searchPokemons', this.pokemon.searchPokemon);
  };
}

const pokemonRoutes = new PokemonRouter();
pokemonRoutes.init();
export default pokemonRoutes.router;
