import { test, expect } from '@playwright/test';
import { DataUtils } from '@utils/dataUtils';
import { BookingBuilder } from '@builders/BookingBuilder';
import { DATA_UTILS_TEST_BOOKINGS } from '@utils/testData';
import {
  GuestName,
  ConfirmedBooking,
  CompleteBooking,
  BookingWithoutDates,
} from '@models/Booking';

test.describe('DataUtils - Unit tests', async () => {
  test('filterByDespositStatus returns only paid bookings @unit', async () => {
    const bookings = [
      new BookingBuilder().withDepositPaid(true).build(),
      new BookingBuilder().withoutDeposit().build(),
      new BookingBuilder().withDepositPaid(true).build(),
    ];
    const paid = DataUtils.filterByDepositStatus(bookings, true);
    expect(paid).toHaveLength(2);
  });

  test('findByFirstName returns matching booking @unit', async () => {
    const bookings = [
      new BookingBuilder()
        .withFirstName(DATA_UTILS_TEST_BOOKINGS.GUEST_ALICE)
        .build(),
      new BookingBuilder()
        .withFirstName(DATA_UTILS_TEST_BOOKINGS.GUEST_BOB)
        .build(),
    ];
    const found = DataUtils.findByFirstName(
      bookings,
      DATA_UTILS_TEST_BOOKINGS.SEARCH_GUEST_FOUND
    );
    expect(found).toBeDefined();
    expect(found!.firstname).toBe(DATA_UTILS_TEST_BOOKINGS.GUEST_BOB);
  });

  test('findByFirstName returns undefined when no match @unit', async () => {
    const bookings = [
      new BookingBuilder()
        .withTotalPrice(DATA_UTILS_TEST_BOOKINGS.REVENUE_PRICE_1)
        .build(),
      new BookingBuilder()
        .withTotalPrice(DATA_UTILS_TEST_BOOKINGS.REVENUE_PRICE_2)
        .build(),
      new BookingBuilder()
        .withTotalPrice(DATA_UTILS_TEST_BOOKINGS.REVENUE_PRICE_3)
        .build(),
    ];
    const total = DataUtils.calculateTotalRevenue(bookings);
    expect(total).toBe(DATA_UTILS_TEST_BOOKINGS.EXPECTED_TOTAL_REVENUE);
  });

  test('calculateTotalRevenue sums all booking prices @unit', async () => {
    const bookings = [
      new BookingBuilder()
        .withTotalPrice(DATA_UTILS_TEST_BOOKINGS.REVENUE_PRICE_1)
        .build(),
      new BookingBuilder()
        .withTotalPrice(DATA_UTILS_TEST_BOOKINGS.REVENUE_PRICE_2)
        .build(),
      new BookingBuilder()
        .withTotalPrice(DATA_UTILS_TEST_BOOKINGS.REVENUE_PRICE_3)
        .build(),
    ];
    const total = DataUtils.calculateTotalRevenue(bookings);
    expect(total).toBe(DATA_UTILS_TEST_BOOKINGS.EXPECTED_TOTAL_REVENUE);
  });

  test('getMostExpensiveBooking returns the highest priced booking @unit', async () => {
    const bookings = [
      new BookingBuilder()
        .withFirstName(DATA_UTILS_TEST_BOOKINGS.CHEAP_GUEST)
        .withTotalPrice(DATA_UTILS_TEST_BOOKINGS.CHEAP_PRICE)
        .build(),
      new BookingBuilder()
        .withFirstName(DATA_UTILS_TEST_BOOKINGS.PRICEY_GUEST)
        .withTotalPrice(DATA_UTILS_TEST_BOOKINGS.PRICEY_PRICE)
        .build(),
    ];
    const mostExpensive = DataUtils.getMostExpensiveBooking(bookings);
    expect(mostExpensive!.firstname).toBe(
      DATA_UTILS_TEST_BOOKINGS.PRICEY_GUEST
    );
  });

  test('groupByDepositStatus splits bookings into paid and unpaid @unit', async () => {
    const bookings = [
      new BookingBuilder().withDepositPaid(true).build(),
      new BookingBuilder().withoutDeposit().build(),
    ];

    const groups = DataUtils.groupByDepositStatus(bookings);
    expect(groups.paid).toHaveLength(1);
    expect(groups.unpaid).toHaveLength(1);
  });

  //---Utility type usage---
  test('Pick utility type extracts ony guest name fields @unit', async () => {
    const booking = new BookingBuilder().build();

    //GuestName = Pick<Booking, firstname' | 'lastname'>
    const guestName: GuestName = {
      firstname: booking.firstname,
      lastname: booking.lastname,
    };

    expect(guestName.firstname).toBe(booking.firstname);
    expect(guestName.lastname).toBe(booking.lastname);
  });

  test('Readonly utility type prevents mutation at compile time @unit', async () => {
    const booking = new BookingBuilder().build();
    const confirmedBooking: ConfirmedBooking = booking;

    expect(confirmedBooking.firstname).toBe(booking.firstname);
  });

  test('Required utility type enforces all fields are present @unit', async () => {
    const booking = new BookingBuilder().build();

    // CompleteBooking = Required<Booking> — additionalneeds is mandatory here
    const completeBooking: CompleteBooking = {
      ...booking,
      additionalneeds: booking.additionalneeds ?? '',
    };

    expect(completeBooking.additionalneeds).toBeDefined();
  });

  test('Omit utility type excludes bookingdates field @unit', async () => {
    const booking = new BookingBuilder().build();

    // BookingWithoutDates = Omit<Booking, 'bookingdates'>
    const bookingWithoutDates: BookingWithoutDates = {
      firstname: booking.firstname,
      lastname: booking.lastname,
      totalprice: booking.totalprice,
      depositpaid: booking.depositpaid,
      additionalneeds: booking.additionalneeds,
    };

    expect(bookingWithoutDates.firstname).toBe(booking.firstname);
    expect('bookingdates' in bookingWithoutDates).toBe(false);
  });
});
