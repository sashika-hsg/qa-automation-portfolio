import { Booking, BookingDates } from '@models/Booking';

/**
 * BookingBuilder - Builder pattern for constructing Booking test data.
 *
 * Why Builder pattern:
 * - Booking has 6 fields including a nexted object (bookingdates)
 * - Tests need differnt combination of fields
 * - Makes test intent explicit
 * - Replaces static constants in testData.ts for complex objects
 *
 * Usage:
 *  const booking = new BookingBuilder().build();
 *  const booking = new BookingBuilder().withFirstName('Jane).build();
 *  const booking = new BookingBuilder().asPremiumStay().build();
 */
export class BookingBuilder {
  private firstname: string = 'Jane';
  private lastname: string = 'Doe';
  private totalprice: number = 150;
  private depositpaid: boolean = true;
  private bookingdates: BookingDates = {
    checkin: ' 2026-08-01',
    checkout: '2026-08-10',
  };
  private additionalneeds: string = 'Breakfast';

  withFirstName(firstname: string): this {
    this.firstname = firstname;
    return this;
  }

  withLastName(lastname: string): this {
    this.lastname = lastname;
    return this;
  }

  withTotalPrice(totalprice: number): this {
    this.totalprice = totalprice;
    return this;
  }

  withDepositPaid(depositpaid: boolean): this {
    this.depositpaid = depositpaid;
    return this;
  }

  withCheckin(checkin: string): this {
    this.bookingdates.checkin = checkin;
    return this;
  }

  withCheckout(checkout: string): this {
    this.bookingdates.checkout = checkout;
    return this;
  }

  withAdditionalNeeds(additionalneeds: string): this {
    this.additionalneeds = additionalneeds;
    return this;
  }

  withoutDeposit(): this {
    this.depositpaid = false;
    return this;
  }

  withoutAdditionalNeeds(): this {
    this.additionalneeds = '';
    return this;
  }

  asPremiumStay(): this {
    this.totalprice = 1500;
    this.bookingdates = {
      checkin: '2026-09-10',
      checkout: '2026-09-30,',
    };
    this.additionalneeds = 'Breakfast, Lunch, Dinner, Spa';
    return this;
  }

  asMinimalBooking(): this {
    this.additionalneeds = '';
    this.totalprice = 100;
    return this;
  }

  build(): Booking {
    return {
      firstname: this.firstname,
      lastname: this.lastname,
      totalprice: this.totalprice,
      depositpaid: this.depositpaid,
      bookingdates: { ...this.bookingdates },
      additionalneeds: this.additionalneeds,
    };
  }
}
