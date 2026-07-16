import { expect } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { BASE_URLS } from '@config/urls';

/**object for the Intenet - Checkboxes page.
 * Demonstrates check(), uncheck(), and state assertions.
 * URL : https://the-internet.herokuapp.com/checkboxes
 */

export class CheckboxPage extends BasePage {
  private readonly checkboxes = this.page.locator('input[type="checkbox"]');
  private readonly checkbox1 = this.page.locator(
    'input[type ="checkbox"]:nth-of-type(1)'
  );
  private readonly checkbox2 = this.page.locator(
    'input[type="checkbox"]:nth-of-type(2)'
  );

  async navigate(): Promise<void> {
    await this.page.goto(`${BASE_URLS.THE_INTERNET}/checkboxes`);
    await this.waitForPageLoad();
  }

  async assertPageLoaded(): Promise<void> {
    await expect(this.checkboxes.first()).toBeVisible();
  }
  /**
   * Check checkbox by index (1-based).
   * @param index - 1 is for first check box, 2 for second
   */
  async checkByIndex(index: number): Promise<void> {
    await this.checkboxes.nth(index - 1).check();
  }

  /**
   * Uncheck checbox by index (1-based).
   * @param index - 1- for first index, 2 for second
   */
  async uncheckByINdex(index: number): Promise<void> {
    await this.checkboxes.nth(index - 1).uncheck();
  }

  /**
   * Reutns true if the checkbox at the given index is checked
   * @param index - 1- based index
   */
  async isChecked(index: number): Promise<boolean> {
    return this.checkboxes.nth(index - 1).isChecked();
  }

  /**
   * Reutn the total number of checkboxes on the page.
   */
  async getCheckboxCount(): Promise<number> {
    return this.checkboxes.count();
  }
}
