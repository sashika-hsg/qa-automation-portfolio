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
  private readonly sortDropdown = this.page.getByTestId(
    'product-sort-container'
  );
  private readonly menuButton = this.page.getByRole('button', {
    name: 'Open Menu',
  });
  private readonly logoutLink = this.page.locator('#logout_sidebar_link');
  private readonly menuWrapper = this.page.locator('.bm-menu-wrap');
  private readonly closeMenuButton = this.page.getByRole('button', {
    name: 'Close Menu',
  });
  private readonly allItemsLink = this.page.getByRole('link', {
    name: 'All Items',
  });
  private readonly resetAppStateLink = this.page.getByRole('link', {
    name: 'Reset App State',
  });
  private readonly aboutLink = this.page.getByRole('link', { name: 'About' });
  private readonly inventoryItemImages = this.page.locator(
    '.inventory_item img'
  );
  private readonly addToCartButtons = this.page.locator(
    '.inventory_item button'
  );
  private readonly inventoryItemNames = this.page.locator(
    '.inventory_item_name'
  );

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
  /**
   * Open the hamburger menu
   */
  async openMenu(): Promise<void> {
    await this.menuButton.click();
    await this.menuWrapper.waitFor({ state: 'visible' });
  }

  /**
   * Close the hamburger menu
   */
  async closeMenu(): Promise<void> {
    await this.closeMenuButton.click();
    await this.menuWrapper.waitFor({ state: 'hidden' });
  }

  /**
   * Rests app state via hamburger menu.
   * Clears cart and resets all product buttons
   */
  async resetAppState(): Promise<void> {
    await this.openMenu();
    await this.resetAppStateLink.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.navigate();
  }

  /**
   * Navigate to All Items via hamburger menu
   */
  async goToAllItems(): Promise<void> {
    await this.openMenu();
    await this.allItemsLink.click();
  }

  /**
   * Navigate to About page via hamburger menu
   * Verfied Sauce Labs website opens.
   */
  async goToAbout(): Promise<void> {
    await this.openMenu();
    await this.aboutLink.click();
  }
  /**
   * Assert the sort dropdown is enabled.
   */
  async assertSortDropdownEnabled(): Promise<void> {
    await expect(this.sortDropdown).toBeEnabled();
  }
  /**
   * Assert cart badge shows expected count
   */
  async assertCartBadgeCount(expectedCount: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(expectedCount));
  }

  /**
   * Assert cart badge is not visible
   */
  async assertCartBadgeHidden(): Promise<void> {
    await expect(this.cartBadge).not.toBeVisible();
  }

  /**
   * Assert first product image has alt attribute
   */
  async assertProductImagesHaveAltAttributes(): Promise<void> {
    await expect(this.inventoryItemImages.first()).toHaveAttribute('alt', /.+/);
  }

  /**
   * Click a product name to navigate to detail page
   */
  async clickProductName(productName: string): Promise<void> {
    await this.inventoryItemNames.getByText(productName).click();
  }

  /**
   * Assert all products have add to cart button
   */
  async assertAllProductsHaveAddToCartButton(): Promise<void> {
    const count = await this.addToCartButtons.count();
    expect(count).toBe(6);
  }

  /**
   * Assert sort dropdown has expected value
   */
  async assertSortDropdownValue(expectedValue: string): Promise<void> {
    await expect(this.sortDropdown).toHaveValue(expectedValue);
  }

  /**
   * Assert hamburger menu is visible
   */
  async assertMenuVisible(): Promise<void> {
    await expect(this.menuWrapper).toBeVisible();
  }

  /**
   * Assert hamburger menu is hidden
   */
  async assertMenuHidden(): Promise<void> {
    await expect(this.menuWrapper).not.toBeVisible();
  }

  /**
   * Click a product name to navigate to detail page
   * @param productName - exact product name as displayed
   */
  async clickProductName(productName: string): Promise<void> {
    await this.inventoryItemNames.getByText(productName).click();
  }
}
