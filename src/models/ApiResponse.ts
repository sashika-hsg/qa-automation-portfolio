/**
 * @fileoverview API response models for the QA Automation Portfolio.
 * Uses TypeScript generics tocreate reusable response wrappters
 * that works with any data type = User, Booking, GraphQL etc.
 */

/**
 * Represents a standard API response wrapper.
 *
 * The <T> is a generic type parameter - a placeholder that gets
 * replaced with a real type when you use this interface.
 *
 * @template T - The type of data contained in the response.
 *
 * @example
 * //T becomes User - data field is typed as User
 * const response: ApiResponse<User> ={
 * data: {id: 1, email: 'jane@test.com',..},
 * status: 200,
 * message:'Success'
 * };
 *
 * @example
 * // T becomes Booking = - data field is typed as Booking
 * const reponse: ApiResponse<Booking> ={
 * data: {firstname: 'John',...},
 * status: 201,
 * message:'Created'
 * };
 */
export interface ApiResponse<T> {
  data: T; //The actual data returned by the API, typed as T
  status: number; //HTTP status code of the response
  message?: string; //A human-readable message about the response
}
/**
 * Represents a paginated API response.
 * Used when the API retuens multiple items with pagination info.
 * ReqRes uses this format for GET /api/users.
 *
 * @template T - The type of items in the data array.
 *
 * @example
 * const reposne: PaginatedApiResponse<User> = {
 * data: [user1, user2, user3],
 * page: 1,
 * perPage: 6,
 * total: 12,
 * totalPages: 2
 * };
 */
export interface PaginatedApiResponse<T> {
  data: T[]; //An array of items of type T
  page: number; //Current page number
  perPage: number; //Number of items per page
  total: number; //Total number of items across all pages
  totalPages: number; //Total number of pages available
}
/**
 * Represent the result of an API operation.
 * This is a discriminated union - the shape changes based
 * on whether the operation succceeded or failed.
 *
 * The 'success' field is the discriminant - TypeScript uses
 * it to narrow the type in if/else blocks.
 *
 *@template T - The type of data returned on success.
 *
 *@example
 * const result: ApiResult<User> = await client.getUser(1);
 * if(result.success){
 *  console.log(result.data.email); //TypeScript knows data is User
 * } else {
 *  console.error(result.error); //TypeScript knows error is string
 * }
 */
export type ApiResult<T> =
  | { success: true; data: T; statusCode: number }
  | { success: false; error: string; statusCode: number };

/**
 * Represents an API error reponse.
 * Used when an API call fails - captures error details.
 */
export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}

/**
 * Represents HTTP methods used in API calls.
 * Using an enum prevents typos when specifying request methods.
 */
export enum HttpMethod {
  GET = `GET`,
  POST = `POST`,
  PUT = `PUT`,
  PATCH = `PATCH`,
  DELETE = `DELETE`,
}
/**
 * Represents the status codes used across API tests.
 * Named constants prevent magic numbers in test assertions.
 *
 * Instead of : expect (response.status()).toBe(200)
 * You can write: expect (response.status()).toBe(HttpStatus.OK)
 */
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
}
