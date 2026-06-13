import { expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * Page obect for the Sauce Demo checkout flow.
 * Covers all three checkout steps.
 * -step One : customer information form
 * -step two: order overview
 * -step three : order confirmation
 *
 * Extends BasePage - inherits common page methods.
 */
export class CheckoutPage extends BasePage {
  //Step 1 - information form
  private readonly firstNameInput = this.page.locator(
    '[data-test = "firstName"]'
  );
  private readonly lastNameInput = this.page.locator('[data-test ="lastName"]');
  private readonly postalCodeInput = this.page.locator(
    '[data-test= "postalCode"]'
  );
  private readonly continueButton = this.page.locator('[data-test="continue"]');
  private readonly errorMessage = this.page.locator('[data-test="error"]');

  //Step 2 - overview
  private readonly finishButton = this.page.locator('[data-test ="finish"]');
  private readonly totalLabel = this.page.locator('.summary_total_label');
  private readonly itemPrices = this.page.locator('.inventory_item_price');
  private readonly subTotalLabel = this.page.locator('.summary_subtotal_label');
  private readonly taxLabel = this.page.locator('.summary_tax_label');

  //Step 3 - order confirmation
  private readonly completeHeader = this.page.locator('.complete-header');
  private readonly backHomeButton = this.page.locator(
    '[data-test="back-to-products"]'
  );

  /**
   * Navigate to the checkout information page (step one).
   */
  async navigate(): Promise<void> {
    await this.page.goto('/checkout-step-one.html');
    await this.waitForPageLoad();
  }

  /**
   * Fill in the checkout information form.
   * @param firstName - customer first name
   * @param lastName - customer last name
   * @param postalCode - customer postal code
   */
  async fillInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Click continue on the information step.
   */
  async continueToOverview(): Promise<void> {
    await this.continueButton.click();
  }
  /**
   * Get the error message text on the information step.
   */
  async getErrorMessage(): Promise<string> {
    return this.errorMessage.innerText();
  }
  /**
   * Assert the error message contains expected text.
   * @param expectedText - text the error message should contain
   */
  async assertErrorMessage(expectedText: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedText);
  }
  /**
   * Get the order total text from the overview step.
   */
  async getTotalText(): Promise<string> {
    return this.totalLabel.innerText();
  }
  /**
   * Get Subtotal (item total) from the overview page.
   * Returns the numeric value without the dollar sign
   */
  async getSubtotal(): Promise<number> {
    const subTotalText = await this.subTotalLabel.innerText();
    const priceMatch = subTotalText.match(/\$([\d.]+)/);
    return priceMatch ? parseFloat(priceMatch[1]) : 0;
  }

  /**
   * Get the tax amount from the overview page as a numeric value
   */
  async getTax(): Promise<number> {
    const taxText = await this.taxLabel.innerText();
    const taxMatch = taxText.match(/\$([\d.]+)/);
    return taxMatch ? parseFloat(taxMatch[1]) : 0;
  }
  /**
   * Get the total amount from the overview page as a numeric value
   */
  async getTotalAmount(): Promise<number> {
    const totalText = await this.totalLabel.innerText();
    const totalMatch = totalText.match(/\$([\d.]+)/);
    return totalMatch ? parseFloat(totalMatch[1]) : 0;
  }

  /**
   * Click finish on the overview step.
   */
  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }
  /**
   * Assert the order completion page is displayed
   */
  async assertOrderComplete(): Promise<void> {
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeHeader).toContainText(
      'Thank you for your order!'
    );
  }
  /**
   * Click Back Home on the completion page.
   */
  async backToProducts(): Promise<void> {
    await this.backHomeButton.click();
  }
}
