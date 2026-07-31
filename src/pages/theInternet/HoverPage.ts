import { expect } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { BASE_URLS } from '@config/urls';

/**
 * Page object for The Internet - Hovers page.
 * Demonstrates hover() for triggering hiddern elements.
 * URL: https://the-internet.herokuapp.com/hovers
 */
export class HoverPage extends BasePage {
  private readonly avatars = this.page.locator('.figure');
  private readonly captions = this.page.locator('.figcaption');

  async navigate(): Promise<void> {
    await this.page.goto(`${BASE_URLS.THE_INTERNET}/hovers`);
    await this.waitForPageLoad();
  }
  async assertPageLoaded(): Promise<void> {
    await expect(this.avatars.first()).toBeVisible();
  }
  /**
   * Hover over an avatar by index (1-based).
   * Reveals the hidden caption with user infor.
   * @param index - 1, 2, or 3
   */
  async hoverAvatar(index: number): Promise<void> {
    await this.avatars.nth(index - 1).hover();
  }
  /**
   * Check if captions is visible after hovering.
   * @param index - 1, 2, or 3
   */
  async getCaptionText(index: number): Promise<string> {
    return this.captions.nth(index - 1).innerText();
  }

  /**
   * Check if caption is visible after hovering
   * @param index - 1, 2, or 3
   */
  async isCaptionVisible(index: number): Promise<boolean> {
    return this.captions.nth(index - 1).isVisible();
  }

  /**
   * Get total number of avatars on the page.
   */
  async getAvatarCount(): Promise<number> {
    return this.avatars.count();
  }
}
