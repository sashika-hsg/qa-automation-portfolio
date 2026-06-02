import { Page, Locator } from '@playwright/test';
/**
 * Abstract base class for all page objects.
 * Implements Page Object Model design pattern.
 *
 * All page objects extend this class and inherit
 * common navigation and interaction methods.
 */
export abstract class BasePage {
  protected readonly page: Page;
  /**
   *  @param page - Playwright Page instance injected via fixtures
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the page.
   * Each subclass defines its own URL path.
   */
  abstract navigate(): Promise<void>;

  /**
   * Wait for the page to fully load
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Get current page Title.
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Get current page URL.
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Get a Playwright Locator for a given selector.
   * Protected = only accessible within page objects.
   */
  protected getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }
}
