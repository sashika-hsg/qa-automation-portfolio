import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import { BASE_URLS } from '@config/urls';
import { GpraphQLClient } from '@api/clients/GraphQLClient';
import {
  singlePokemonResponseSchema,
  pokemonListResponseSchema,
  pokemonNotFoundSchema,
} from '@api/schemas/pokemonSchemas';
import {
  singlePokemonResponse,
  pokemonListReponse,
  PokemonNotFoundResponse,
} from '@models/Pokemon';
import {
  GET_POKEMON_ATTACKS_QUERY,
  GET_POKEMON_QUERY,
  GET_POKEMONS_LIST_QUERY,
} from '@api/queries/pokemonQueries';

const ajv = new Ajv();

test.describe('GraphQL - Pokemon API', () => {
  let client: GpraphQLClient;
  //create a fresh client before each test
  //request is Playwright's builtin API context = avaialbe in all tests
  test.beforeEach(({ request }) => {
    client = new GpraphQLClient(request, BASE_URLS.GRAPHQL_POKEMON);
  });

  test('A valid Pokemon is returnd when queries by name @smoke @graphql', async () => {
    const response = await client.query<singlePokemonResponse>(
      GET_POKEMON_QUERY,
      { name: 'pikachu' }
    );
    //Schema validation - confirms the reponse matches the contract
    const validateSchema = ajv.compile(singlePokemonResponseSchema);
    const isSchemeValid = validateSchema(response);
    expect(isSchemeValid, JSON.stringify(validateSchema.errors)).toBe(true);

    //field level assertions - confirms actual values are correct
    expect(response.data.pokemon.name).toBe('Pikachu');
    expect(response.data.pokemon.id).toBeTruthy();
    expect(response.data.pokemon.types).toContain('Electric');
  });

  test('A correct classification is returned for a known pokemon @smoke @graphql', async () => {
    const response = await client.query<singlePokemonResponse>(
      GET_POKEMON_QUERY,
      { name: 'Bulbasaur' }
    );
    expect(response.data.pokemon.name).toBe('Bulbasaur');
    expect(response.data.pokemon.classification).toBe('Seed Pokémon');
    expect(response.data.pokemon.types).toContain('Grass');
    expect(response.data.pokemon.types).toContain('Poison');
  });

  test('validate returned maxHP and maxCP are intgers @regression @graphql', async () => {
    const response = await client.query<singlePokemonResponse>(
      GET_POKEMON_QUERY,
      { name: 'charizard' }
    );

    const { maxHP, maxCP } = response.data.pokemon;
    //Number.isInteger() is strictier than typeof === 'number'
    //It will catch 1.5 or NaN, which typeof would not
    expect(Number.isInteger(maxHP)).toBe(true);
    expect(Number.isInteger(maxCP)).toBe(true);
    expect(maxHP).toBeGreaterThan(0);
    expect(maxCP).toBeGreaterThan(0);
  });

  test('validate return of mmultiple types for dual-type pokemon @regression @grapql', async () => {
    const response = await client.query<singlePokemonResponse>(
      GET_POKEMON_QUERY,
      { name: 'geodude' }
    );

    const types = response.data.pokemon.types;
    expect(types.length).toBeGreaterThanOrEqual(2);
    expect(types).toContain('Rock');
    expect(types).toContain('Ground');
  });

  test('validate whether list of pokemons are returned with correct count @smoke @graphql', async () => {
    const response = await client.query<pokemonListReponse>(
      GET_POKEMONS_LIST_QUERY,
      { first: 5 }
    );
    const validateSchema = ajv.compile(pokemonListResponseSchema);
    const isSchemeValid = validateSchema(response);
    expect(isSchemeValid, JSON.stringify(validateSchema.errors)).toBe(true);
    expect(response.data.pokemons).toHaveLength(5);
  });

  test('validate whether all pokemons are returned in a list with all required fields @regression @graphql', async () => {
    const response = await client.query<pokemonListReponse>(
      GET_POKEMONS_LIST_QUERY,
      { first: 3 }
    );

    //check every pokemon in the list has the fields we expect
    //This catches partial data issues where some items are malformed
    for (const pokemon of response.data.pokemons) {
      expect(pokemon.id).toBeTruthy();
      expect(pokemon.name).toBeTruthy();
      expect(Array.isArray(pokemon.types)).toBe(true);
      expect(pokemon.types.length).toBeGreaterThan(0);
    }
  });

  test('validate whether Bulasaur is returned as the first pokemon when listing from start @regression @graphql', async () => {
    const response = await client.query<pokemonListReponse>(
      GET_POKEMONS_LIST_QUERY,
      { first: 1 }
    );
    expect(response.data.pokemons[0].name).toBe('Bulbasaur');
  });

  test('validate whether a nested attack data is returned when queried @regression @graphql', async () => {
    /**
     *Inline query - requests the attachs field which is not in the shared
     *GET_POKEMON_QUERY. Kept here becosuse it's a one-ff field set
     *not needed by any other test.
     */
    const response = await client.query<{
      data: {
        pokemon: {
          name: string;
          attacks: { fast: { name: string; type: string }[] };
        };
      };
    }>(GET_POKEMON_ATTACKS_QUERY);

    const attacks = response.data.pokemon.attacks.fast;
    expect(Array.isArray(attacks)).toBe(true);
    expect(attacks.length).toBeGreaterThan(0);
    attacks.forEach((attack) => {
      expect(attack.name).toBeTruthy();
      expect(attack.type).toBeTruthy();
    });
  });
  //Negative /error cases

  test('validate whether a null is returned for an unknown pokemon name @negative @graphql', async () => {
    const response = await client.query<PokemonNotFoundResponse>(
      GET_POKEMON_QUERY,
      { name: 'notarealpokemon' }
    );
    const validateSchema = ajv.compile(pokemonNotFoundSchema);
    const isSchemeValid = validateSchema(response);
    expect(isSchemeValid, JSON.stringify(validateSchema.errors)).toBe(true);
    expect(response.data.pokemon).toBeNull();
  });

  test('tvalidate whether null is returned for an empty string pokemon name @negative @graphql', async () => {
    const response = await client.query<PokemonNotFoundResponse>(
      GET_POKEMON_QUERY,
      { name: '' }
    );
    expect(response.data.pokemon).toBeNull();
  });
});
