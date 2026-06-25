/**
 * AJV JSON schemas for Pokémon GraphQL API response validation.
 *
 * Why we validate GraphQL responses with schemas:
 * - GraphQL returns HTTP 200 even for errors — status code alone is not enough
 * - The API can silently drop fields or change types without breaking HTTP
 * - Schema validation catches contract changes that assertions alone would miss
 *
 * Response shape from graphql-pokemon2.vercel.app:
 * {
 *   data: {
 *     pokemon: { ... }   ← single query
 *     pokemons: [ ... ]  ← list query
 *   },
 *   errors: [ ... ]      ← present only when something went wrong
 * }
 */

/**
 * Schema for a single Pokémon object.
 * Used inside both the single-pokemon and list-of-pokemon schemas.
 *
 * We define this separately so it can be reused — this is the
 * same idea as a $ref in JSON Schema, but inlined here for simplicity.
 */
export const pokemonObjectSchema = {
  type: 'object',
  required: ['id', 'name', 'classification', 'types', 'maxHP', 'maxCP'],
  additionalProperties: true, // allow extra fields we didn't ask for
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    classification: { type: 'string' },
    types: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1,
    },
    maxHP: { type: 'integer' },
    maxCP: { type: 'integer' },
  },
};

/**
 * Schema for a single-pokemon query response.
 *
 * Expected shape:
 * {
 *   data: {
 *     pokemon: { id, name, classification, types, maxHP, maxCP, ... }
 *   }
 * }
 */
export const singlePokemonResponseSchema = {
  type: 'object',
  required: ['data'],
  properties: {
    data: {
      type: 'object',
      required: ['pokemon'],
      properties: {
        pokemon: pokemonObjectSchema,
      },
    },
  },
};

/**
 * Schema for a pokemons list query response.
 *
 * Expected shape:
 * {
 *   data: {
 *     pokemons: [{ id, name, ... }, ...]
 *   }
 * }
 */
export const pokemonListResponseSchema = {
  type: 'object',
  required: ['data'],
  properties: {
    data: {
      type: 'object',
      required: ['pokemons'],
      properties: {
        pokemons: {
          type: 'array',
          minItems: 1,
          items: pokemonObjectSchema,
        },
      },
    },
  },
};

/**
 * Schema for a GraphQL error response.
 *
 * When GraphQL can't resolve a query (e.g. unknown pokemon name),
 * it returns HTTP 200 with this shape — NOT a 4xx status.
 *
 * Expected shape:
 * {
 *   data: { pokemon: null },
 *   errors: [{ message: "..." }]   ← may or may not be present
 * }
 *
 * Note: Some APIs return null data without an errors array.
 * We validate both possibilities here.
 */
export const pokemonNotFoundSchema = {
  type: 'object',
  required: ['data'],
  properties: {
    data: {
      type: 'object',
      required: ['pokemon'],
      properties: {
        pokemon: { type: 'null' }, // null means not found
      },
    },
    errors: {
      type: 'array',
      items: {
        type: 'object',
        required: ['message'],
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
};
