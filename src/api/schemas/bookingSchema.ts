/**
 * JSON Schema for a booking object returned by Restful Booker.
 * Used with AJV to validate API response structure.
 *
 * Example booking object:
 * {
 *   "firstname": "Jane",
 *   "lastname": "Doe",
 *   "totalprice": 150,
 *   "depositpaid": true,
 *   "bookingdates": {
 *     "checkin": "2026-06-20",
 *     "checkout": "2026-06-25"
 *   },
 *   "additionalneeds": "Breakfast"
 * }
 */
export const bookingSchema = {
  type: 'object',
  properties: {
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    totalprice: { type: 'number' },
    depositpaid: { type: 'boolean' },
    bookingdates: {
      type: 'object',
      properties: {
        checkin: { type: 'string' },
        checkout: { type: 'string' },
      },
      required: ['checkin', 'checkout'],
    },
    additionalneeds: { type: 'string' },
  },
  required: [
    'firstname',
    'lastname',
    'totalprice',
    'depositpaid',
    'bookingdates',
  ],
} as const;

/**
 * JSON Schema for the POST /booking (create) response.
 * Restful Booker wraps the booking in a "booking" key,
 * alongside a generated "bookingid".
 */
export const createBookingResponseSchema = {
  type: 'object',
  properties: {
    bookingid: { type: 'number' },
    booking: bookingSchema,
  },
  required: ['bookingid', 'booking'],
} as const;

/**
 * JSON Schema for the POST /auth response.
 * Returns a single "token" field on success.
 */
export const authResponseSchema = {
  type: 'object',
  properties: {
    token: { type: 'string' },
  },
  required: ['token'],
} as const;
