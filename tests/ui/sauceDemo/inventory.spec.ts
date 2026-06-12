import { test, expect } from '../../../src/fixtures/fixtures';
import { SAUCE_DEMO_PRODUCTS } from '../../../src/utils/testData';

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

  test('valiate whether products can be sorted by name from Z to A @regression', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.sortProducts('za');
    const names = await authenticatedPage.getProductNames();
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sorted);
  });

  test('validate navigation to cart page @regression', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.addProductToCart(SAUCE_DEMO_PRODUCTS.BACKPACK);
    await authenticatedPage.goToCart();
    await expect(authenticatedPage['page']).toHaveURL(/cart/);
  });

  test('validate successful login @regression @critical', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.logout();
    await expect(authenticatedPage['page']).toHaveURL(/saucedemo\.com\/$/);
  });
});
