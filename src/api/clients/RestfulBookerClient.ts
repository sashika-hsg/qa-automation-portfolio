import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from '@api/base/ApiClient';
import { BASE_URLS } from '@config/urls';

/**
 * Bookingdata type used for create/update requests.
 */
export type BookingData = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additonalneeds?: string;
};

/**
 * API client for Restful Booker (http://restful-booker.herokuapp.com).
 * Extends ApiClient with booking management and authentication.
 *
 * Auth flow:
 * 1. POST /auth with username/password returns a token
 * 2. THat token is sent as a Cookie header on PUT/PATHC/DELETE requests
 * 3. Read operations (GET) or create (POST) do not require auth
 */
export class RestfulBookerClient extends ApiClient {
  /**
   *@param request - Playwright's APIRequestContext (from fixtures)
   */
  constructor(request: APIRequestContext) {
    super(request, BASE_URLS.RESTFUL_BOOKER, {});
  }
  /**
   * Send an aunthentication request and return the raw response
   * Useful for testing the /auth endpoint itself.
   * @param username - Restful Booker admin username
   * @param password - Restful Booker admin password
   */
  async login(username: string, password: string): Promise<APIResponse> {
    return this.post(`/auth`, { username, password });
  }

  /**
   * Authenticate and store the token as a cookie header for
   * subsequent write request (PUT, PATCH, DELETE).
   * @param username - Restful Booker admin username
   * @param password - Restful Booker admin password
   */
  async authenticate(username: string, password: string): Promise<void> {
    const response = await this.login(username, password);
    const responseBody = await response.json();
    this.setHeader('Cookie', `token=${responseBody.token}`);
  }

  /**
   * Create a new booking. Does not require authentication.
   * @param booking - booking details
   */
  async createBooking(booking: BookingData): Promise<APIResponse> {
    return this.post('/booking', booking);
  }

  /**
   * Get a booking by ID. Does not require authentication.
   * @param id - booking ID
   */
  async getBookingById(id: number): Promise<APIResponse> {
    return this.get(`/booking/${id}`);
  }

  /**
   * Fully update a booking(replaces all fields).
   * Requires authentication (call authenticate() first).
   * @param id - booking ID
   * @param booking - updated booking details
   */
  async updateBooking(id: number, booking: BookingData): Promise<APIResponse> {
    return this.put(`/booking/${id}`, booking);
  }
  /**
   * Partially update a booking (only specified fields are updated.
   * Requires authentication (call authenticate() first).
   */
  async updateBookingPartial(
    id: number,
    partialBooking: Partial<BookingData>
  ): Promise<APIResponse> {
    return this.patch(`/booking/${id}`, partialBooking);
  }

  /**
   * Delete a booking by ID.
   * Requires authentication (call authenticate() first).
   * @param id - booking ID
   */
  async deleteBooking(id: number): Promise<APIResponse> {
    return this.delete(`/booking/${id}`);
  }
}
