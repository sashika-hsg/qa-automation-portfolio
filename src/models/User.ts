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
  STANDARD = 'standard_user', //can login and buy items
  LOCKED = 'locked_out_user', //cannot login - tests the locked account error
  PROBLEM = 'problem_user', //images are broke - tests visual defects
  PERFORMANCE = 'performance_glitch_user', // app runs slowly - tests for performance issues
  ERROR = 'error_user', //Throws errors on actions - tests error handling
  VISUAL = 'visual_user', // Has visual diffrences - tests visual regression
  ADMIN = 'admin', //Admin access = reserved for admin scenarios
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
 * - API tests- ReqRes user endpoints
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
