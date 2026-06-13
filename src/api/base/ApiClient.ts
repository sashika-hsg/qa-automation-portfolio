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

  /**
   * @param request - Playwright's APIRequestContect (from fixtures)
   * @param baseUrl - base URL for this API (ex: http://reqres.in)
   */
  constructor(request: APIRequestContext, baseUrl: string) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  /**
   * Perform a GET request.
   * @param endpoint - path relative to the baseUrl (ex: '/api/user/2' )
   */
  async get(endpoint: string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}${endpoint}`);
  }

  /**
   * Performa POST request with a JSON body.
   * @param endpoint - path relative to the baseUrl
   * @param data - request body, sent as JSON
   */
  async post(endpoint: string, data: object): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}${endpoint}`, { data });
  }

  /**
   * Perform a PUT request with a JSON body.
   * @param endpoint - path relative to the baseUrl
   * @param data - request body, sent as JSON
   */
  async put(endpoint: string, data: object): Promise<APIResponse> {
    return this.request.put(`${this.baseUrl}${endpoint}`, { data });
  }

  /**
   * Perform a PATCH request with a JSON body.
   * Used for partial updates - only the provided fields are changed.
   * @param endpoint - path relative to the baseUrl
   * @param data - request body, sent as JSON
   */
  async patch(endpoint: string, data: object): Promise<APIResponse> {
    return this.request.patch(`${this.baseUrl}${endpoint}`, { data });
  }

  /**
   * Perform a Delete request.
   * @param endpoint - path relative to the baseUrl
   */
  async delete(endpoint: string): Promise<APIResponse> {
    return this.request.delete(`${this.baseUrl}${endpoint}`);
  }
}
