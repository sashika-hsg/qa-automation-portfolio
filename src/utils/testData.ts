/**
 * Test data constants for Sauce Demo application.
 * Centralised test data — change once, updates everywhere.
 */

export const SAUCE_DEMO_USERS = {
  STANDARD: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  LOCKED: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  PROBLEM: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  PERFORMANCE: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  INVALID: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
} as const;

export const SAUCE_DEMO_PRODUCTS = {
  BACKPACK: 'Sauce Labs Backpack',
  BIKE_LIGHT: 'Sauce Labs Bike Light',
  BOLT_SHIRT: 'Sauce Labs Bolt T-Shirt',
  FLEECE_JACKET: 'Sauce Labs Fleece Jacket',
  ONESIE: 'Sauce Labs Onesie',
  RED_SHIRT: 'Test.allTheThings() T-Shirt (Red)',
} as const;

export const EXPECTED_MESSAGES = {
  LOCKED_USER_ERROR: 'Sorry, this user has been locked out',
  INVALID_CREDENTIALS_ERROR: 'Username and password do not match',
  MISSING_USERNAME_ERROR: 'Username is required',
  MISSING_PASSWORD_ERROR: 'Password is required',
  MISSING_FIRST_NAME_ERROR: 'Error: First Name is required',
  MISSING_LAST_NAME_ERROR: 'Error: Last Name is required',
  MISSING_POSTAL_CODE_ERROR: 'Error: Postal Code is required',
} as const;

export const CHECKOUT_DATA = {
  VALID: {
    firstName: 'Jane',
    lastName: 'Doe',
    postalCode: '3000',
  },
  MISSING_FIRST_NAME: {
    firstName: '',
    lastName: 'Doe',
    postalCode: '3000',
  },
  MISSING_LAST_NAME: {
    firstName: 'Jane',
    lastName: '',
    postalCode: '3000',
  },
  MISSING_POSTAL_CODE: {
    firstName: 'Jane',
    lastName: 'Doe',
    postalCode: '',
  },
} as const;
/**
 * Test data for ReqRes API tests.
 * ReqRes is a mock API — these IDs correspond to its known
 * fixed dataset (users 1-12 exist, others return 404).
 */
export const REQRES_USERS = {
  EXISTING_USER_ID: 2,
  NON_EXISTENT_USER_ID: 23,
} as const;

export const REQRES_TEST_USER = {
  NAME: 'Sashika',
  JOB: 'QA Engineer',
  UPDATED_JOB_FULL: 'Senior QA Engineer',
  UPDATED_JOB_PARTIAL: 'QA Lead',
} as const;

/**
 * Test credentials for Restful Booker — these are the standard
 * public sandbox credentials documented at restful-booker.herokuapp.com
 */
export const RESTFUL_BOOKER_AUTH = {
  USERNAME: 'admin',
  PASSWORD: 'password123',
} as const;

/**
 * Test data for Restful Booker booking CRUD tests.
 */
export const RESTFUL_BOOKER_BOOKING = {
  VALID: {
    firstname: 'Jane',
    lastname: 'Doe',
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-07-01',
      checkout: '2026-07-10',
    },
    additionalneeds: 'Breakfast',
  },
  UPDATED: {
    firstname: 'Janet',
    lastname: 'Smith',
    totalprice: 200,
    depositpaid: false,
    bookingdates: {
      checkin: '2026-08-01',
      checkout: '2026-08-10',
    },
    additionalneeds: 'Lunch',
  },
  PARTIAL_UPDATE: {
    firstname: 'Janice',
  },
} as const;
