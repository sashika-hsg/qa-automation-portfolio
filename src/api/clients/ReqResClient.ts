import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from '@api/base/ApiClient';
import { BASE_URLS } from '@config/urls';

/**
 * API client for ReqRes (https://reqres.in)
 * Extends ApiClient with ReqRes-specific endpoints for user management.
 *
 * ReqRes is a mock API -resonses are simulated but follows a
 * realistic REST conventiosn(status codes response shapes)._
 */

export class ReqResClient extends ApiClient {
  /**
   * @param request - Playwright's APIRequestContext (from fixtures)
   */
  constructor(request: APIRequestContext) {
    super(request, BASE_URLS.REQRES, {
      'x-api-key': process.env.REQRES_API_KEY ?? '',
    });
  }

  /**
   * Get a paginated list of users
   * @param page - page number to retrieve
   */
  async getUsers(page: number): Promise<APIResponse> {
    return this.get(`/api/user?page=${page}`);
  }

  /**
   * Get a single user by ID.
   * @param id - user ID
   */
  async getUserById(id: number): Promise<APIResponse> {
    return this.get(`/api/users/${id}`);
  }

  /**
   * Create a new user.
   * @param name - user's name
   * @param job - user's job title
   */
  async createUser(name: string, job: string): Promise<APIResponse> {
    return this.post(`/api/users`, { name, job });
  }

  /**
   * Fully update a user (replaces name and job).
   * @param id - userId
   * @param name - new name
   * @param job - new job title
   */
  async updateUser(
    id: number,
    name: string,
    job: string
  ): Promise<APIResponse> {
    return this.put(`/api/users/${id}`, { name, job });
  }

  /**
   * Partially update a user (only the provided fields changes).
   * @param id - user Id
   * @param job - new job title
   */
  async updateUserJob(id: number, job: string): Promise<APIResponse> {
    return this.patch(`/api/users/${id}`, { job });
  }

  /**
   * Delete a user by ID.
   * @param id - user Id.
   */
  async deleteUser(id: number): Promise<APIResponse> {
    return this.delete(`/api/users/${id}`);
  }
}
