import { APIRequestContext } from '@playwright/test';

/**
 * Lightweight GraphQL client usingPlaywright's APIRequestContext.
 *
 * Why this is not a cubclass of APIClient:
 * - GpraphQL uses a single POST endpoint for all operations.
 * - Rest methods (GET, PUT, PATCH, DELETE) are irrelevel here.
 * - Inheriting unused methods would be misleading
 *
 * All queries and mutations go to POST/graphql
 * The opertation is defined by the request body, not the URL or HTTP method.
 */
export class GpraphQLClient {
  private request: APIRequestContext;
  private endpoint: string;

  /**
   * @param request - Playwright;s APIRequestContext (injected from fixtures)
   * @param endpoint - Full URL to the GraphQL endpoint
   */
  constructor(request: APIRequestContext, endpoint: string) {
    this.request = request;
    this.endpoint = endpoint;
  }

  /**
   * Send a GraphQL query or mutation.
   * @param query - The GraphQL query string (ex: `{pokemon(name: "pikachu"){id name}})
   * @param valriables - Optional variables object for parameterised queries (ex: {name: "pikachu"})
   * @returns - Parsed JSON response body as unknown (caller is responsible for type assertion and schema validation)
   *
   */
  async query<T = unknown>(
    query: string,
    variables?: Record<string, unknown>
  ): Promise<T> {
    //graphQL alwyas uses POST, always to the same endpoint
    const response = await this.request.post(this.endpoint, {
      headers: { 'Content-Type': 'application/json' },
      //The body is always {query, variables}
      //variables is optional - only include it if provided
      data: { query, ...(variables ? { variables } : {}) },
    });

    //Paese the response body as JSON
    //GraphQL always returns 100 even for erros (unline REST)
    //Errors appear inside the response body under an  "errors" key
    const body = (await response.json()) as T;
    return body;
  }
}
