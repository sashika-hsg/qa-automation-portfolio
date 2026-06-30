import { test, expect } from '@playwright/test';
import { BookingBuilder } from '@builders/BookingBuilder';
import {
  BOOKING_BUILDER_DEFAULTS,
  BOOKING_BUILDER_MINIMAL,
  BOOKING_BUILDER_PREMIUM,
  BOOKING_BUILDER_CHAINED_TEST,
} from '@utils/testData';
/**
 * Unit tests for BookingBuilder.
 *
 * Why unit tests:
 * - Tests the builder in isolation - no API, no browser, no database.
 * - Catches builder bugs before they surface in integration tests
 * - Demonstrates the testing pyramid - unit, integration, E2E
 * - Runs in milliseconds vs seconds for API tests
 */
test.describe('BookingBuilder - unit tests', () => {
  //---get accessors---

  test('get accessor returns default firstname @unit', async () => {
    const builder = new BookingBuilder();
    expect(builder.currentFirstName).toBe(BOOKING_BUILDER_DEFAULTS.FIRSTNAME);
  });

  test('get accessor returns default total price @unit', async () => {
    const builder = new BookingBuilder();
    expect(builder.currentTotalPrice).toBe(
      BOOKING_BUILDER_DEFAULTS.TOTAL_PRICE
    );
  });

  // --- set accessors ---

  test('set assessors throws in empty firstname @unit', async () => {
    const builder = new BookingBuilder();
    expect(() => {
      builder.currentFirstName = '';
    }).toThrow('firstname cannot be empty');
  });

  test('set accessor throws in negative total @unit', async () => {
    const builder = new BookingBuilder();
    expect(() => {
      builder.currentTotalPrice = -1;
    }).toThrow('price cannot be negative');
  });

  //--- method chaining ---
  test('method chaining builds correct booking @unit', async () => {
    const booking = new BookingBuilder()
      .withFirstName(BOOKING_BUILDER_CHAINED_TEST.FIRSTNAME)
      .withLastName(BOOKING_BUILDER_CHAINED_TEST.LASTNAME)
      .withTotalPrice(BOOKING_BUILDER_CHAINED_TEST.TOTAL_PRICE)
      .withDepositPaid(BOOKING_BUILDER_CHAINED_TEST.DEPOSIT_PAID)
      .build();

    expect(booking.firstname).toBe(BOOKING_BUILDER_CHAINED_TEST.FIRSTNAME);
    expect(booking.lastname).toBe(BOOKING_BUILDER_CHAINED_TEST.LASTNAME);
    expect(booking.totalprice).toBe(BOOKING_BUILDER_CHAINED_TEST.TOTAL_PRICE);
    expect(booking.depositpaid).toBe(BOOKING_BUILDER_CHAINED_TEST.DEPOSIT_PAID);
  });

  // ---presents---

  test('asPremiumStay preset builds correctly booking @unit', async () => {
    const booking = new BookingBuilder().asPremiumStay().build();
    expect(booking.totalprice).toBe(BOOKING_BUILDER_PREMIUM.TOTAL_PRICE);
    expect(booking.additionalneeds).toBe(
      BOOKING_BUILDER_PREMIUM.ADDITIONAL_NEEDS
    );
    expect(booking.bookingdates.checkin).toBe(BOOKING_BUILDER_PREMIUM.CHECKIN);
    expect(booking.bookingdates.checkout).toBe(
      BOOKING_BUILDER_PREMIUM.CHECKOUT
    );
  });

  test('asMinimalBooking preset builds correct booking @unit', async () => {
    const booking = new BookingBuilder().asMinimalBooking().build();
    expect(booking.totalprice).toBe(BOOKING_BUILDER_MINIMAL.TOTAL_PRICE);
    expect(booking.additionalneeds).toBe(
      BOOKING_BUILDER_MINIMAL.ADDITIONAL_NEEDS
    );
  });

  test('withoutDeposit builds bookng with depositpaid false @unit', async () => {
    const booking = new BookingBuilder().withoutDeposit().build();
    expect(booking.depositpaid).toBe(false);
  });

  //--- default values ---

  test('default build produces a valid booking unit', async () => {
    const booking = new BookingBuilder().build();
    expect(booking.firstname).toBe(BOOKING_BUILDER_DEFAULTS.FIRSTNAME);
    expect(booking.lastname).toBe(BOOKING_BUILDER_DEFAULTS.LASTNAME);
    expect(booking.totalprice).toBe(BOOKING_BUILDER_DEFAULTS.TOTAL_PRICE);
    expect(booking.depositpaid).toBe(BOOKING_BUILDER_DEFAULTS.DEPOSIT_PAID);
    expect(booking.bookingdates.checkin).toBe(BOOKING_BUILDER_DEFAULTS.CHECKIN);
    expect(booking.bookingdates.checkout).toBe(
      BOOKING_BUILDER_DEFAULTS.CHECKOUT
    );
    expect(booking.additionalneeds).toBe(
      BOOKING_BUILDER_DEFAULTS.ADDITIONAL_NEEDS
    );
  });
});
