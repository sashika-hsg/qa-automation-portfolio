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
/**
 * Utility types - demonstrates Typescritps's built in type manipulation.
 *
 * These are derived from the Booking interface using TypeScript utility types.
 * They avoid duplication -if Booking changes these updates automatically.
 */

/**
 * Pick <T, K> - creates a type with only the specified fields.
 * Use case: when you only need guest name fields, not the complete booking.
 *
 * pick select K fields FROM T.
 */
export type GuestName = Pick<Booking, 'firstname' | 'lastname'>;

/**
 * Omit <T, K> - create a type with all fields EXCEPT the specified ones.
 * Use case - creating a booking without dates - dates added separately.
 *
 *Omit removes K FROM T.
 */
export type BookingWithoutDates = Omit<Booking, 'bookingdates'>;

/**
 * Required<T> - makes all optional fields mandatory.
 * Use case - when submitting a final booking, all fields must be present
 * including additional needs which is option
 *
 * Contrast with Partial<T> which makes all fields optional.
 */
export type CompleteBooking = Required<Booking>;

/**
 * Readonly<T> - makes all fields immutable after creation.
 * User case: confirmed bookings should never be mutated in tests.
 * TypeScript will throw a compile error if you try to change and field.
 */
export type ConfirmedBooking = Readonly<Booking>;
