/**
 * @fileoverview User models for the QA Automation Portfolio
 * Used across UI tests, API tests, and database validation.
 */

/**
 * Represents all user roles available in Sauce Demo.
 * Using an enum prevents typos and provides autocomplete.
 * @example
 * const role = UserRole.STANDARD;
 */
export enum UserRole {
  STANDARD = 'standard_user',
  LOCKED = 'locked_out_user',
  PROBLEM = 'problem_user',
  PERFORMANCE = 'performance_glitch_user',
  ERROR = 'error_user',
  VISUAL = 'visual_user',
  ADMIN = 'admin',
}
/**
 * Represents the status of a user account.
 * Union type - value can only be one of the three strings.
 */
export type UserStatus = 'active' | 'inactive' | 'locked';

/**
 * Represents a user in the system.
 *
 * Used by:
 * -UserBuilder - creates test data
 * -SQLiteUserRepository - persists to database
 * -Login tests- Sauce Demo UI scenarios
 * - API tests- Req/Res user endpoints
 */
export interface User {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  password?: string;
  status: UserStatus;
}
/**
 * Reppresents login credentials for an application.
 * Separated from User - login only needs username and password.
 * readonly ensures credentials cannot be changed after being set.
 */
export interface LoginCredentials {
  readonly username: string;
  readonly password: string;
}
/**
 * Represents a user as retuned by the ReqRes API.
 * Separate from the internal User interface because
 * external APIs have throir own naming conventions.
 */
export interface ReqResUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
