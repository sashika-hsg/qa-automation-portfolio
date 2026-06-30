import { Booking } from '@models/Booking';

/**
 * DataUtils - utility functions demonstrating array methods.
 *
 * Why these methods matter:
 * - filter() - returns a new array of elements matching a condition
 * - find() - returns the first element matching a condition
 * - reduce() - transforms an array into a single value
 */

export class DataUtils {
  /**
   * Filter bookings by deposit paid status.
   * Returns only bookings where depoistpaid matches the given value.
   *
   * filter() - iterates even element, keeps those where callback returns true.
   * Allways return an array (empty if nothing matches).
   *
   * @param bookings - array of bookings to filter
   * @param depositPaid - filter by this depoit status
   */

  static filterByDepositStatus(
    bookings: Booking[],
    depositPaid: boolean
  ): Booking[] {
    return bookings.filter((booking) => booking.depositpaid === depositPaid);
  }

  /**
   * Find the first booking matching a guest name.
   * Returns undefined if no match is found.
   *
   * find() - iternates until the first match, then stops.
   * More efficient than filter() when you only need one result.
   *
   * @param bookings - array of bbookings to search
   * @param firstName - guest first name to search for
   */
  static findByFirstName(
    bookings: Booking[],
    firstName: string
  ): Booking | undefined {
    return bookings.find(
      (booking) => booking.firstname.toLowerCase() === firstName.toLowerCase()
    );
  }
  /**
   * Calcualte the total price of all booking.
   *
   * reduce () - accumulates a single value from an array.
   * All values are summed into total Price
   *
   * The callback recreives:
   * - accululator(running total)
   * - current element(current booking)
   * The second arguement (0) is the initial value of the accumulator.
   *
   * @param bookings - array of bookings to sum
   */
  static calculateTotalRevenue(bookings: Booking[]): number {
    return bookings.reduce((total, booking) => total + booking.totalprice, 0);
  }
  /**
   * Get the most expensive booking from an arry.
   * Combines reduce() with comparison logic.
   *
   * @param booking - array of bookings
   * @returns the bookings with the highest totalprice
   */
  static getMostExpensiveBooking(booking: Booking[]): Booking | undefined {
    if (booking.length === 0) return undefined;
    return booking.reduce((most, current) =>
      current.totalprice > most.totalprice ? current : most
    );
  }

  /**
   * Group bookings by deposit status.
   * Uses reduce() to build an object from an array.
   *
   * @param bookings - array of bookings
   * @returns object with 'paid' and 'unpaid' arrays
   */
  static groupByDepositStatus(bookings: Booking[]): {
    paid: Booking[];
    unpaid: Booking[];
  } {
    return bookings.reduce(
      (groups, booking) => {
        if (booking.depositpaid) {
          groups.paid.push(booking);
        } else {
          groups.unpaid.push(booking);
        }
        return groups;
      },
      { paid: [] as Booking[], unpaid: [] as Booking[] }
    );
  }
}
