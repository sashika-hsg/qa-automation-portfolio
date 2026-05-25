/**
 * @fileoverview Booking models for the Restful Booker API tests
 * Used across API tests, UI tests, and database validation.
 */
/**
 * Represents the status of a booking.
 * Union type - value can only be one of these strings.
 */
export type BookingStatus = 'confirmed' | 'pending' | 'cancelled';

/**
 * Represents the check-in and check-out dates of a booking.
 * Separated into its own interface because it is reused.
 * in multiple places - the full booking and search filters.
 *
 * @example
 * const dates: BookingDates = {
 *  checkin: '2024-04-16',
 * checkout: '2024-04-19',
 * }
 */
export interface BookingDates {
  checkin: string; //ISO date string
  checkout: string; //ISO date string
}
/**
 * Represents a complete booking in the Restful Booker system.
 * Matches the exact shape returned by the Restful Booker API.
 *
 * Used by:
 * -RestfulBookerClient - types API responses
 * -BookingBuilder - creates test data
 * -SQLiteBookingRepository - persists to database
 * -API tests- validates booking CRUD operations
 *
 * @example
 * const booking: Booking = {
 *  firstname : 'John',
 *  lastname : 'Doe',
 *  totalprice : 150,
 *  depositpaid : true,
 *  bookingdates : {
 *  checkin: '2024-04-16',
 *  checkout: '2024-04-19',
 *  },
 *  additionalneeds : 'Breakfast',
 * };
 */
export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds?: string;
}

/**
 * Represnets a booking returned by the API with its ID.
 * The API wraps the booking object with a bookingId field.
 * This is what you get back when you call GET /booking/{id}.
 *
 */
export interface BookingResponse {
  bookingid: number;
  booking: Booking;
}
/**
 * Represents the request body for creating a new booking.
 * Identical to Booking but named separately for clarity -
 * it is what you send to the API, not what you RECEIVE.
 */
export type CreateBookingRequest = Booking;

/**
 * Represents a partial booking update.
 * Uses the Typescript Partial Utility type - makes every
 * field of Booking optional so you can update just any one field.
 *
 * Used for PATCH requests - upldate only what changed.
 * @example
 * const update: UpdateBookingRequest = {
 *  totalprice: 200, //only update the price
 * };
 */
export type UpdateBookingRequest = Partial<Booking>;

/**
 * Represents the authentication token returned by the API>
 * Restful Booker reqires a token for create, update and delete.
 */
export interface AuthToken {
  token: string;
}

/**
 * Represents the credentials for Restful Booker authentication.
 * Both fields are readonly - credentials never changed after being set.
 */
export interface BookerCredentials {
  readonly username: string;
  readonly password: string;
}
