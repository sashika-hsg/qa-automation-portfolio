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
/**
 * Test data for Database layer tests.
 * Matches the seed data inserted by src/db/seed/seed.ts
 */
export const DB_USERS = {
  SEEDED_COUNT: 3,
  JANE: {
    name: 'Jane Doe',
    job: 'QA Engineer',
  },
  JOHN: {
    name: 'John Smith',
    job: 'Software Engineer',
  },
  ALICE: {
    name: 'Alice Brown',
    job: 'Product Manager',
  },
  NEW_USER: {
    name: 'Test User',
    job: 'Test Engineer',
  },
  DELETE_USER: {
    name: 'Delete Me',
    job: 'Temporary',
  },
  NON_EXISTENT: {
    name: 'Non Existent User',
  },
} as const;

/**
 * Default values used by BookingBuilder.
 * Single source of truth — if defaults change, update here only.
 */
export const BOOKING_BUILDER_DEFAULTS = {
  FIRSTNAME: 'Jane',
  LASTNAME: 'Doe',
  TOTAL_PRICE: 150,
  DEPOSIT_PAID: true,
  CHECKIN: '2026-08-01',
  CHECKOUT: '2026-08-10',
  ADDITIONAL_NEEDS: 'Breakfast',
} as const;

export const BOOKING_BUILDER_PREMIUM = {
  TOTAL_PRICE: 1500,
  CHECKIN: '2026-09-01',
  CHECKOUT: '2026-09-30',
  ADDITIONAL_NEEDS: 'Breakfast, Lunch, Dinner, Spa',
} as const;

export const BOOKING_BUILDER_MINIMAL = {
  TOTAL_PRICE: 100,
  ADDITIONAL_NEEDS: '',
} as const;

export const BOOKING_BUILDER_CHAINED_TEST = {
  FIRSTNAME: 'Alice',
  LASTNAME: 'Smith',
  TOTAL_PRICE: 300,
  DEPOSIT_PAID: false,
} as const;

/**
 * Test data for DataUtils unit tests.
 * Single source of truth for booking aggregation test scenarios.
 */
export const DATA_UTILS_TEST_BOOKINGS = {
  CHEAP_GUEST: 'Cheap',
  PRICEY_GUEST: 'Pricey',
  CHEAP_PRICE: 50,
  PRICEY_PRICE: 500,
  REVENUE_PRICE_1: 100,
  REVENUE_PRICE_2: 200,
  REVENUE_PRICE_3: 300,
  EXPECTED_TOTAL_REVENUE: 600,
  SEARCH_GUEST_FOUND: 'Bob',
  SEARCH_GUEST_NOT_FOUND: 'Zoe',
  GUEST_ALICE: 'Alice',
  GUEST_BOB: 'Bob',
} as const;

/**
 * Test data for The Internet application tests.
 */
export const THE_INTERNET_DROPDOWN = {
  OPTIONS: ['Option 1', 'Option 2'],
  OPTION_1: 'Option 1',
  OPTION_2: 'Option 2',
  OPTION_1_VALUE: '1',
  OPTION_2_VALUE: '2',
  TOTAL_OPTIONS: 3,
  // Please select + Option 1 + Option 2
} as const;

export const THE_INTERNET_ALERTS = {
  ALERT_MESSAGE: 'I am a JS Alert',
  CONFIRM_MESSAGE: 'I am a JS Confirm',
  PROMPT_MESSAGE: 'I am a JS prompt',
  PROMPT_INPUT: 'Hello World',
  RESULT_ALERT_ACCEPTED: 'You successfully clicked an alert',
  RESULT_CONFIRM_ACCEPTED: 'You clicked: Ok',
  RESULT_CONFIRM_DISMISSED: 'You clicked: Cancel',
  RESULT_PROMPT_ACCEPTED: 'You entered: Hello World',
} as const;

export const THE_INTERNET_CHECKBOXES = {
  TOTAL_CHECKBOXES: 2,
  CHECKBOX_1_INDEX: 1,
  CHECKBOX_2_INDEX: 2,
  // Checkbox 1 is unchecked by default on page load
  CHECKBOX_1_DEFAULT_STATE: false,
  // Checkbox 2 is checked by default on page load
  CHECKBOX_2_DEFAULT_STATE: true,
} as const;

export const THE_INTERNET_HOVERS = {
  TOTAL_AVATARS: 3,
  AVATAR_1_INDEX: 1,
  AVATAR_2_INDEX: 2,
  AVATAR_3_INDEX: 3,
  AVATAR_1_CAPTION: 'name: user1',
  AVATAR_2_CAPTION: 'name: user2',
  AVATAR_3_CAPTION: 'name: user3',
} as const;

export const THE_INTERNET_IFRAME = {
  HEADING: 'An iFrame containing the TinyMCE WYSIWYG Editor',
  DEFAULT_TEXT: 'Your content goes here.',
  TYPED_TEXT: 'Hello from Playwright!',
} as const;

export const SAUCE_DEMO_NETWORK = {
  TOTAL_PRODUCTS: 6,
  TEST_HEADER_KEY: 'x-test-header',
  TEST_HEADER_VALUE: 'playwright-intercept',
  BLOCKED_RESOURCE: '**/*.png',
  INVENTORY_URL_PATTERN: '**/inventory.html',
  BASE_URL_PATTERN: '**/saucedemo.com**',
  BLOCKED_PRODUCT_COUNT: 0,
} as const;
