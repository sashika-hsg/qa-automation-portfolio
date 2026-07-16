import { expect } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { BASE_URLS } from '@config/urls';

/**
 * Page object for The Internet - iFrame page.
 * Demonstrates frmLocator() for switching into iframe context.
 *
 * Why iframes require special handiling:
 * - An iframe is a separate HTML document embeded inside the main page
 * - Playwright cannot interact with elements inside the main page
 * - frameLocator() switches the content into the iframe's document
 * - After frameLocator(), all locators are scoped to the iframe content
 *
 * URL: https://the-internet.herokuapp.com/iframe
 */
export class IframePage extends BasePage {
  //framelocator() targets the iframe by its id
  //All subsequent locators are scoped inside this iframe
  private readonly editorFrame = this.page.frameLocator('#mce_0_ifr');

  //this locator is INSIDE the iframe - only accessible via editorFrame
  private readonly editorBody = this.editorFrame.locator('#tinymce');

  //This locator is OUTSIDE the iframe - on the main page
  private readonly heading = this.page.locator('h3');

  async navigate(): Promise<void> {
    await this.page.goto(`${BASE_URLS.THE_INTERNET}/iframe`);
    await this.waitForPageLoad();
  }

  async assertPageLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }
  /**
   * Clear the editor content and type new text.
   * @param text - text to type into the editor
   */
  async typeInEditor(text: string): Promise<void> {
    // Wait for TinyMCE to fully initialise
    await this.page.waitForTimeout(2000);
    // Use TinyMCE's JavaScript API to set content directly
    // This bypasses iframe interaction issues entirely
    await this.page.evaluate((content) => {
      (window as any).tinymce.activeEditor.setContent(content);
    }, text);
  }
  /**
   * Get the current text content of the editor.
   */
  async getEditorText(): Promise<string> {
    return this.editorBody.innerText();
  }

  /**
   * Get the page heading text - outside the iframe.
   */
  async getHeadingText(): Promise<string> {
    return this.heading.innerText();
  }
}
