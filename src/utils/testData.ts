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
