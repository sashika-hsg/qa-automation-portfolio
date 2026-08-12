import { test as base } from '@playwright/test';
import {
  LoginPage,
  InventoryPage,
  CartPage,
  CheckoutPage,
} from '../pages/sauceDemo';
import { SAUCE_DEMO_USERS, SAUCE_DEMO_PRODUCTS } from '../utils/testData';
import { BASE_URLS } from '@config/urls';

/**
 * Custom fixture types for the QA Automation Portfolio.
 * Extends Playwright's base test with pre-configured page objects.
 *
 * Using fixtures eliminates repetitive setup code in every test.
 * Each test declares what it needs — fixtures provide it automatically.
 */
type SauceDemoFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  authenticatedPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

/**
 * Extended test object with Sauce Demo fixtures.
 * Import this instead of the default Playwright test.
 *
 * @example
 * import { test } from '../../fixtures/fixtures';
 * test('my test', async ({ loginPage }) => { ... });
 */
export const test = base.extend<SauceDemoFixtures>({
  /**
   * Provides a LoginPage instance — navigated to login page.
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await use(loginPage);
  },

  /**
   * Provides an InventoryPage instance — not logged in.
   */
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  /**
   * Provides an InventoryPage instance — already logged in.
   * Use this fixture for tests that need to start on the inventory page.
   */
  authenticatedPage: async ({ browser }, use) => {
    // Load saved auth state — no UI login needed
    // global-setup.ts ran once before all tests and saved
    // cookies + localStorage to .auth/user.json
    const context = await browser.newContext({
      storageState: '.auth/user.json',
    });
    const page = await context.newPage();
    const inventoryPage = new InventoryPage(page);
    await page.goto(`${BASE_URLS.SAUCE_DEMO}/inventory.html`);
    await inventoryPage.assertPageLoaded();
    await use(inventoryPage);
    await context.close();
  },

  /**
   * Provides a CartsPage instance - no  pre-populated.
   * */
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  /**
   * Provides a CheckoutPage instance - logged in with one item
   * already added to the car,
   * and navigated to checkout step one.
   * Use this fixture for checkout flow tests.
   */
  checkoutPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(
      SAUCE_DEMO_USERS.STANDARD.username,
      SAUCE_DEMO_USERS.STANDARD.password
    );
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.assertPageLoaded();
    await inventoryPage.addProductToCart(SAUCE_DEMO_PRODUCTS.BACKPACK);
    await inventoryPage.goToCart();

    const cartPage = new CartPage(page);
    await cartPage.assertPageLoaded();
    await cartPage.proceedToCheckout();

    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

export { expect } from '@playwright/test';
