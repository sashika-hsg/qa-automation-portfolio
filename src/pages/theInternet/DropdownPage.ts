import { expect } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { BASE_URLS } from '@config/urls';

/**
 * Page object for The Internet - Dropdown page.
 * Demonstrates selectOption() for dropdown interaction.
 * URL: https://the-internet.herokuapp.com/dropdown
 */
export class DropdownPage extends BasePage {
  private readonly dropdown = this.page.locator('#dropdown');

  async navigate(): Promise<void> {
    await this.page.goto(`${BASE_URLS.THE_INTERNET}/dropdown`);
    await this.waitForPageLoad();
  }

  async assertPageLoaded(): Promise<void> {
    await expect(this.dropdown).toBeVisible();
  }

  /**
   * Select an option by its visible text
   * @param option - visible text of the option ex: 'Option 1'
   */
  async selectOption(option: string): Promise<void> {
    await this.dropdown.selectOption({ label: option });
  }

  /**
   * Get the currently selected option text
   */
  async getSelectedOption(): Promise<string> {
    return this.dropdown.inputValue();
  }

  /**
   * Get all avaialbe option texts from the dropdwon.
   */
  async getAllOptions(): Promise<string[]> {
    return this.dropdown.locator('option').allTextContents();
  }
}
