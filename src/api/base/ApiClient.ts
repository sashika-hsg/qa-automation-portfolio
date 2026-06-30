import { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * Base APIclient wrapping Playwright's APIRequestContext.
 * Provides common HTTP methods used by all API clients.
 *
 * Why this exists:
 * -Centralises base URL and header configuration
 * Provides a consistent interface for GET/POST/PUT/DELETE
 * Subclasses (e.g.) add endpoint-specific methods
 */
export class ApiClient {
  protected request: APIRequestContext;
  protected baseUrl: string;
  protected headers: Record<string, string>;

  /**
   * @param request - Playwright's APIRequestContect (from fixtures)
   * @param baseUrl - base URL for this API (ex: http://reqres.in)
   */
  constructor(
    request: APIRequestContext,
    baseUrl: string,
    headers: Record<string, string>
  ) {
    this.request = request;
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  /**
   * Set uor update a single header - used for adding auth tokens
   * after authentication, since headers are otherwise fixed
   * at construction time.
   * @param key - header name (ex: 'Cookie', 'Authorization')
   * @param value - header value
   */
  setHeader(key: string, value: string): void {
    this.headers[key] = value;
  }

  /**
   * Perform a GET request.
   * @param endpoint - path relative to the baseUrl (ex: '/api/user/2' )
   * @throws Error with contextif the request fails at the network level
   */
  async get(endpoint: string): Promise<APIResponse> {
    try {
      return this.request.get(`${this.baseUrl}${endpoint}`, {
        headers: this.headers,
      });
    } catch (error) {
      throw new Error(
        `GET ${this.baseUrl}${endpoint} failed: ${(error as Error).message}`
      );
    }
  }

  /**
   * Performa POST request with a JSON body.
   * @param endpoint - path relative to the baseUrl
   * @param data - request body, sent as JSON
   * @throws Error with context if the request fails at the network level
   */
  async post(endpoint: string, data: object): Promise<APIResponse> {
    try {
      return this.request.post(`${this.baseUrl}${endpoint}`, {
        data,
        headers: this.headers,
      });
    } catch (error) {
      throw new Error(
        `GET ${this.baseUrl}${endpoint} failed: ${(error as Error).message}`
      );
    }
  }

  /**
   * Perform a PUT request with a JSON body.
   * @param endpoint - path relative to the baseUrl
   * @param data - request body, sent as JSON
   * @throws Error with context if the request fails at the network level
   */
  async put(endpoint: string, data: object): Promise<APIResponse> {
    try {
      return this.request.put(`${this.baseUrl}${endpoint}`, {
        data,
        headers: this.headers,
      });
    } catch (error) {
      throw new Error(
        `GET ${this.baseUrl}${endpoint} failed: ${(error as Error).message}`
      );
    }
  }

  /**
   * Perform a PATCH request with a JSON body.
   * Used for partial updates - only the provided fields are changed.
   * @param endpoint - path relative to the baseUrl
   * @param data - request body, sent as JSON
   * @throws Error with context if the request fails at the network level
   */
  async patch(endpoint: string, data: object): Promise<APIResponse> {
    try {
      return this.request.patch(`${this.baseUrl}${endpoint}`, {
        data,
        headers: this.headers,
      });
    } catch (error) {
      throw new Error(
        `GET ${this.baseUrl}${endpoint} failed: ${(error as Error).message}`
      );
    }
  }

  /**
   * Perform a Delete request.
   * @param endpoint - path relative to the baseUrl
   * @throws Error with context if the request fails at the network level
   */
  async delete(endpoint: string): Promise<APIResponse> {
    try {
      return this.request.get(`${this.baseUrl}${endpoint}`, {
        headers: this.headers,
      });
    } catch (error) {
      throw new Error(
        `GET ${this.baseUrl}${endpoint} failed: ${(error as Error).message}`
      );
    }
  }
}
