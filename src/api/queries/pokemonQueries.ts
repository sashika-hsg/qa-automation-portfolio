/**
 * GraphQL query string for the Pokemon API.
 * SIngle source of truth - imported by any test or utility
 * that queries pokemon data.
 */
export const GET_POKEMON_QUERY = `
query GetPokemon($name: String){
pokemon(name: $name){
id
name
classification
types
maxHP
maxCP
}}`;

export const GET_POKEMONS_LIST_QUERY = `
query GetPokemons($first: Int!){
pokemons(first: $first){
id
name
classification
types
maxHP
maxCP
}}`;

export const GET_POKEMON_ATTACKS_QUERY = `
  query GetPokemonAttacks {
    pokemon(name: "charmander") {
      name
      attacks {
        fast {
          name
          type
        }
      }
    }
  }
`;
