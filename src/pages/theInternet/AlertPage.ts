import { expect } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { BASE_URLS } from '@config/urls';

/**
 * Page object for the Internet - JavaScript alerts page.
 * Deomonstrates dialog handling  - accept(), dismiss(), and prompts input.
 * URL: https://the-internet.herokuapp.com/javascript_alerts
 */
export class AlertPage extends BasePage {
  private readonly alertButton = this.page.locator(
    'button[onclick = "jsAlert()"]'
  );
  private readonly confirmButton = this.page.locator(
    'button[onclick="jsConfirm()"]'
  );
  private readonly promptButton = this.page.locator(
    'button[onclick="jsPrompt()"]'
  );
  private readonly resunt = this.page.locator('#result');

  async navigate(): Promise<void> {
    await this.page.goto(`${BASE_URLS.THE_INTERNET}/javascript_alerts`);
    await this.waitForPageLoad();
  }

  async assertPageLoaded(): Promise<void> {
    await expect(this.alertButton).toBeVisible();
  }

  /**
   * Click the JS Alert button an accept the dialog.
   * Reutns the dialog message text.
   */
  async acceptAlert(): Promise<string> {
    let dialogMessage = '';
    this.page.once('dialog', async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });
    await this.alertButton.click();
    return dialogMessage;
  }

  /**
   * Clicks the JS confirm message and accepts the dialog.
   */
  async acceptConfirm(): Promise<string> {
    let dialogMessage = '';
    this.page.once('dialog', async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });
    await this.confirmButton.click();
    return dialogMessage;
  }

  /**
   * Clicks the JS Confirm buttoon and dismiss the dialog.
   */
  async dismissConfirm(): Promise<string> {
    let dialogMessage = '';
    this.page.once('dialog', async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.dismiss();
    });
    await this.confirmButton.click();
    return dialogMessage;
  }

  /**
   * Clicks the JS Prompt button, type input and accept.
   * @param input - text to type into the prompt
   */
  async accpetPrompt(input: string): Promise<string> {
    let dialogMessage = '';
    this.page.once('dialog', async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.accept(input);
    });
    await this.promptButton.click();
    return dialogMessage;
  }

  /**
   * Get the result text shown after a dialog interaction.
   */
  async getResultText(): Promise<string> {
    return this.resunt.innerText();
  }
}
