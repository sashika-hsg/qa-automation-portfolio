import { test, expect } from '../../../src/fixtures/fixtures';
import { CHECKOUT_DATA, EXPECTED_MESSAGES } from '../../../src/utils/testData';

test.describe('Sauce Demo - Checkout', () => {
  test('Successfully complete the checkout flow @smoke @critical', async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillInformation(
      CHECKOUT_DATA.VALID.firstName,
      CHECKOUT_DATA.VALID.lastName,
      CHECKOUT_DATA.VALID.postalCode
    );
    await checkoutPage.continueToOverview();
    await checkoutPage.finishOrder();
    await checkoutPage.assertOrderComplete();
  });

  test('Display the order total on overview page calculated from subtotal and tax @regression', async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillInformation(
      CHECKOUT_DATA.VALID.firstName,
      CHECKOUT_DATA.VALID.lastName,
      CHECKOUT_DATA.VALID.postalCode
    );
    await checkoutPage.continueToOverview();
    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotalAmount();

    const exepectedTotal = Math.round((subtotal + tax) * 100) / 100;
    expect(total).toBeCloseTo(exepectedTotal, 2);
  });

  test('Display an error when first name is missing @negative @regression', async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillInformation(
      CHECKOUT_DATA.MISSING_FIRST_NAME.firstName,
      CHECKOUT_DATA.MISSING_FIRST_NAME.lastName,
      CHECKOUT_DATA.MISSING_FIRST_NAME.postalCode
    );
    await checkoutPage.continueToOverview();
    await checkoutPage.assertErrorMessage(
      EXPECTED_MESSAGES.MISSING_FIRST_NAME_ERROR
    );
  });

  test('Display an error when the last name is missing @regression @negative', async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillInformation(
      CHECKOUT_DATA.MISSING_LAST_NAME.firstName,
      CHECKOUT_DATA.MISSING_LAST_NAME.lastName,
      CHECKOUT_DATA.MISSING_LAST_NAME.postalCode
    );
    await checkoutPage.continueToOverview();
    await checkoutPage.assertErrorMessage(
      EXPECTED_MESSAGES.MISSING_LAST_NAME_ERROR
    );
  });

  test('Display an error when the postal code is missing @regression @negative', async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillInformation(
      CHECKOUT_DATA.MISSING_POSTAL_CODE.firstName,
      CHECKOUT_DATA.MISSING_POSTAL_CODE.lastName,
      CHECKOUT_DATA.MISSING_POSTAL_CODE.postalCode
    );
    await checkoutPage.continueToOverview();
    await checkoutPage.assertErrorMessage(
      EXPECTED_MESSAGES.MISSING_POSTAL_CODE_ERROR
    );
  });

  test('Validate the return to producs page after order completion @regression', async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillInformation(
      CHECKOUT_DATA.VALID.firstName,
      CHECKOUT_DATA.VALID.lastName,
      CHECKOUT_DATA.VALID.postalCode
    );
    await checkoutPage.continueToOverview();
    await checkoutPage.finishOrder();
    await checkoutPage.assertOrderComplete();
    await checkoutPage.backToProducts();

    await expect(checkoutPage['page']).toHaveURL(/inventory/);
  });
});
