import { expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * Page object for the Sauce Demo inventory page.
 * Extends BasePage — inherits common page methods.
 * Encapsulates all product inventory interactions.
 */
export class InventoryPage extends BasePage {
  private readonly inventoryContainer = this.page.locator(
    '.inventory_container'
  );
  private readonly inventoryItems = this.page.locator('.inventory_item');
  private readonly cartBadge = this.page.locator('.shopping_cart_badge');
  private readonly cartIcon = this.page.locator('.shopping_cart_link');
  private readonly sortDropdown = this.page.locator(
    '[data-test="product-sort-container"]'
  );
  private readonly menuButton = this.page.locator('#react-burger-menu-btn');
  private readonly logoutLink = this.page.locator('#logout_sidebar_link');

  /**
   * Navigate to the inventory page directly.
   */
  async navigate(): Promise<void> {
    await this.page.goto('/inventory.html');
    await this.waitForPageLoad();
  }

  /**
   * Assert the inventory page is fully loaded.
   */
  async assertPageLoaded(): Promise<void> {
    await expect(this.inventoryContainer).toBeVisible();
  }

  /**
   * Get the total number of products displayed.
   */
  async getProductCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  /**
   * Add a product to the cart by its name.
   * @param productName - exact product name as displayed
   */
  async addProductToCart(productName: string): Promise<void> {
    const product = this.page.locator('.inventory_item').filter({
      hasText: productName,
    });
    await product.locator('button').click();
  }

  /**
   * Remove a product from the cart by its name.
   * @param productName - exact product name as displayed
   */
  async removeProductFromCart(productName: string): Promise<void> {
    const product = this.page.locator('.inventory_item').filter({
      hasText: productName,
    });
    await product.locator('button').click();
  }

  /**
   * Get the cart badge count as a number.
   * Returns 0 if badge is not visible.
   */
  async getCartCount(): Promise<number> {
    const isVisible = await this.cartBadge.isVisible();
    if (!isVisible) return 0;
    const text = await this.cartBadge.innerText();
    return parseInt(text, 10);
  }

  /**
   * Sort products using the sort dropdown.
   * @param option - sort option value
   */
  async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  /**
   * Navigate to the cart page.
   */
  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }

  /**
   * Log out of the application.
   */
  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  /**
   * Get all product names displayed on the page.
   */
  async getProductNames(): Promise<string[]> {
    const names = this.page.locator('.inventory_item_name');
    const count = await names.count();
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await names.nth(i).innerText();
      result.push(text);
    }
    return result;
  }

  /**
   * Get all product prices as numbers.
   */
  async getProductPrices(): Promise<number[]> {
    const prices = this.page.locator('.inventory_item_price');
    const count = await prices.count();
    const result: number[] = [];
    for (let i = 0; i < count; i++) {
      const text = await prices.nth(i).innerText();
      result.push(parseFloat(text.replace('$', '')));
    }
    return result;
  }
}
