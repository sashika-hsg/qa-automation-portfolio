import { expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * Page object for the Sauce Demo cart page.
 * Extends BasePage - inherits common page methods.
 * Encapsulates cart item dispaly and checkout navigation.
 */
export class CartPage extends BasePage {
  private readonly cartItems = this.page.locator('.cart_item');
  private readonly checoutButton = this.page.locator('[data-test= "checkout"]');
  private readonly continueShoppingButton = this.page.locator(
    '[data-test = "continue-shopping"]'
  );

  /***
   * Naviage to the cart page directly
   */
  async navigate(): Promise<void> {
    await this.page.goto('/cart.html');
    await this.waitForPageLoad();
  }

  /**
   * Assert the cart page is loaded.
   */
  async assertPageLoaded(): Promise<void> {
    await expect(this.checoutButton).toBeVisible();
  }

  /**
   * Get the item count in the cart
   */
  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  /**
   * Get all item names currntly in the cart
   */
  async getItemNames(): Promise<string[]> {
    const names = this.page.locator('.inventory_item_name');
    const count = await names.count();
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      const itemName = await names.nth(i).innerText();
      result.push(itemName);
    }
    return result;
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout(): Promise<void> {
    await this.checoutButton.click();
  }

  /**
   * Return to inventory page
   */
  async continueToShop(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}
