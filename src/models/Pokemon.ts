/**
 * Type definitions for the Pokemon GraphQL API responses.
 * Single source of truth - omported by any test or utility
 * that works with Pokemon data.
 */
export interface Pokemon {
  id: string;
  name: string;
  classification: string;
  types: string[];
  maxHP: number;
  maxCP: number;
}
//Wrapper shape for a single pokemon query reponse
export interface singlePokemonResponse {
  data: {
    pokemon: Pokemon;
  };
}

//Wrapper shape for a pokemon list query response
export interface pokemonListReponse {
  data: {
    pokemons: Pokemon[];
  };
}
//wrapper shape for the pokemon not found response
export interface PokemonNotFoundResponse {
  data: { pokemon: null; error?: { message: string }[] };
}
