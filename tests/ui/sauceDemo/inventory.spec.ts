import { test, expect } from '../../../src/fixtures/fixtures';
import { SAUCE_DEMO_PRODUCTS } from '../../../src/utils/testData';
import { BASE_URLS } from '@config/urls';

test.describe('Sauce Demo - Inventory', () => {
  test('validate whether 6 products are displayed on page load @smoke @critical', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.assertPageLoaded();

    const count = await authenticatedPage.getProductCount();
    expect(count).toBe(6);
  });

  test('validate whether a product can be addedto the cart @smoke @critical', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.addProductToCart(SAUCE_DEMO_PRODUCTS.BACKPACK);

    const cartCount = await authenticatedPage.getCartCount();
    expect(cartCount).toBe(1);
  });

  test('validate whether multiple products can be added to the cart @smoke @critical', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.addProductToCart(SAUCE_DEMO_PRODUCTS.BACKPACK);
    await authenticatedPage.addProductToCart(SAUCE_DEMO_PRODUCTS.BIKE_LIGHT);
    const cartCount = await authenticatedPage.getCartCount();
    expect(cartCount).toBe(2);
  });

  test('validate whether a product can be removed from the cart @regression', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.addProductToCart(SAUCE_DEMO_PRODUCTS.BACKPACK);
    await authenticatedPage.removeProductFromCart(SAUCE_DEMO_PRODUCTS.BACKPACK);
    const cartCount = await authenticatedPage.getCartCount();
    expect(cartCount).toBe(0);
  });

  test('validate whether products can sorted by price low to high @regression', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.sortProducts('lohi');
    const prices = await authenticatedPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('validate whether products can be sorted by price high to low @regression', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.sortProducts('hilo');
    const prices = await authenticatedPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test('validate whether the products can be sorted by name from A to Z @regression', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.sortProducts('az');
    const names = await authenticatedPage.getProductNames();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });

  test('validate whether products can be sorted by name from Z to A @regression', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.sortProducts('za');
    const names = await authenticatedPage.getProductNames();
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sorted);
  });

  test('validate navigation to cart page @regression @critical', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.addProductToCart(SAUCE_DEMO_PRODUCTS.BACKPACK);
    await authenticatedPage.goToCart();
    await expect(authenticatedPage['page']).toHaveURL(/cart/);
  });

  test('validate successful logout @regression @critical', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.logout();
    await expect(authenticatedPage['page']).toHaveURL(/saucedemo\.com\/$/);
  });

  test('validate reset app state clears the cart @regression', async ({
    authenticatedPage,
  }) => {
    //Adds items to cart
    await authenticatedPage.addProductToCart(SAUCE_DEMO_PRODUCTS.BACKPACK);
    expect(await authenticatedPage.getCartCount()).toBe(1);
    //reset via hamberger menu
    await authenticatedPage.resetAppState();
    expect(await authenticatedPage.getCartCount()).toBe(0);
  });

  test('validate sort dropdwon is enabled @smoke', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.assertSortDropdownEnabled();
  });

  test('validate hamburger menu opens and closes @regression', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.openMenu();
    await authenticatedPage.assertMenuVisible();
    await authenticatedPage.closeMenu();
    await authenticatedPage.assertMenuHidden();
  });

  test('validate about link navigates to Sauce Labs website @regression', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.goToAbout();
    expect(await authenticatedPage.getCurrentUrl()).toBe(
      BASE_URLS.SAUCE_DEMO_ABOUT
    );
  });

  test('validate all items link navigate to inventory page @regression', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.goToCart();
    await authenticatedPage.goToAllItems();
    expect(await authenticatedPage.getCurrentUrl()).toContain('inventory');
  });

  test('validate cart badge count updates correctly through add and remove lifecycle @regression', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.addProductToCart(SAUCE_DEMO_PRODUCTS.BACKPACK);
    await authenticatedPage.assertCartBadgeCount(1);
    await authenticatedPage.addProductToCart(SAUCE_DEMO_PRODUCTS.BIKE_LIGHT);
    await authenticatedPage.assertCartBadgeCount(2);
    await authenticatedPage.removeProductFromCart(SAUCE_DEMO_PRODUCTS.BACKPACK);
    await authenticatedPage.assertCartBadgeCount(1);
    await authenticatedPage.removeProductFromCart(
      SAUCE_DEMO_PRODUCTS.BIKE_LIGHT
    );
    await authenticatedPage.assertCartBadgeHidden();
  });

  test('validate product images have alt attributes @regression', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.assertProductImagesHaveAltAttributes();
  });

  test('valiadte clicking product name navigates to detail page @regression', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.clickProductName(SAUCE_DEMO_PRODUCTS.BACKPACK);
    expect(await authenticatedPage.getCurrentUrl()).toContain('inventory-item');
  });

  test('validate product names match expected catalogue @regression', async ({
    authenticatedPage,
  }) => {
    const names = await authenticatedPage.getProductNames();
    const expectedProducts = Object.values(SAUCE_DEMO_PRODUCTS);
    expectedProducts.forEach((product) => expect(names).toContain(product));
  });

  test('validate all product prices are greater than zero @regression', async ({
    authenticatedPage,
  }) => {
    const prices = await authenticatedPage.getProductPrices();
    expect(prices.length).toBe(6);
    prices.forEach((price) => expect(price).toBeGreaterThan(0));
  });

  test('validate all products have add to cart button @regression', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.assertAllProductsHaveAddToCartButton();
  });

  test('validate cart persists after page reloard @regression', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.addProductToCart(SAUCE_DEMO_PRODUCTS.BACKPACK);
    expect(await authenticatedPage.getCartCount()).toBe(1);
    await authenticatedPage.navigate();
    expect(await authenticatedPage.getCartCount()).toBe(1);
  });

  test('validate sort dropdwon defaults to name A to Z @regression', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.assertSortDropdownValue('az');
  });
});
