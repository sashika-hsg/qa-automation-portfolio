/**
 * Cerntalized base URLs for all applications under test.
 * Single source of truth - referenced by playwright.config.ts
 * (for UI baseURL) andby API Clients (for request URLs).
 */
export const BASE_URLS = {
  SAUCE_DEMO: 'https://www.saucedemo.com',
  THE_INTERNET: 'https://the-internet.herokuapp.com',
  RESTFUL_BOOKER: 'https://restful-booker.herokuapp.com',
  REQRES: 'https://reqres.in',
  GRAPHQL_POKEMON: 'https://graphql-pokemon2.vercel.app',
} as const;
