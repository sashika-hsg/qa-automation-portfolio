/**
 * @fileoverview GraphQL models for the Pokemon GraphQL API.
 * Used across GraphQL tests and schema validation.
 */

/**
 * Represents a standard GraphQL response wrapper.
 * All GraphQL responses follow this structure — data or errors.
 *
 * @template T - The type of data returned by the query
 */
export interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

/**
 * Represents a GraphQL error object.
 * Returned when a query fails or is invalid.
 */
export interface GraphQLError {
  message: string;
  locations: GraphQLErrorLocation[];
  path?: string[];
}

/**
 * Represents the location of a GraphQL error in the query.
 */
export interface GraphQLErrorLocation {
  line: number;
  column: number;
}

/**
 * Represents a Pokemon returned by the GraphQL API.
 * Matches the exact shape of the Pokemon GraphQL response.
 */
export interface Pokemon {
  id: string;
  number: string;
  name: string;
  weight: PokemonDimension;
  height: PokemonDimension;
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  image: string;
}

/**
 * Represents a dimension value with minimum and maximum.
 * Used for weight and height of a Pokemon.
 */
export interface PokemonDimension {
  minimum: string;
  maximum: string;
}

/**
 * Represents the response shape for a single Pokemon query.
 */
export interface PokemonQueryResponse {
  pokemon: Pokemon;
}

/**
 * Represents the response shape for a list of Pokemon query.
 */
export interface PokemonsQueryResponse {
  pokemons: Pokemon[];
}
