import { expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * Page object for the Sauce Demp login page.
 * Extends BasePage- inherits navigation and utility methods.
 * Encapsulates all login page selectors and actions.
 */
export class LoginPage extends BasePage {
  //selectors - private so nothing outside this touches them.
  private readonly usernameInput = this.page.locator('[data-test="username"]');
  private readonly passwordInput = this.page.locator('[data-test="password"]');
  private readonly loginButton = this.page.locator(
    '[data-test="login-button"]'
  );
  private readonly errorMessage = this.page.locator('[data-test="error"]');
  private readonly errorButton = this.page.locator('.error-button');

  /**
   *
   * Navigate to Sauce Demo login page.
   */
  async navigate(): Promise<void> {
    await this.page.goto('/');
    await this.waitForPageLoad();
  }
  /**
   * Login with provided credentals.
   * @param username - Sauce Demo username
   * @param password - sauce Demo password
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Get the error message text shown after a failed login
   */
  async getErrorMessage(): Promise<string> {
    return this.errorMessage.innerText();
  }

  /**
   * Assert the error message contains the expected text
   * @param expectedText - the text that is contained in the error message
   */
  async assertErrorMessage(expectedText: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedText);
  }

  /**
   * Assert the login page is visible.
   */
  async assertPageLoaded(): Promise<void> {
    await expect(this.loginButton).toBeVisible();
  }

  /**
   * Clear the error message by clicking the X button
   */
  async dismissError(): Promise<void> {
    await this.errorButton.click();
  }

  /**
   * Check if the error message is visble
   */
  async isErrorVisible(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }
}
