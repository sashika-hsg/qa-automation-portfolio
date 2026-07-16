import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/sauceDemo/LoginPage';
import { InventoryPage } from '@pages/sauceDemo/InventoryPage';
import { SAUCE_DEMO_USERS, SAUCE_DEMO_NETWORK } from '@utils/testData';
import { BASE_URLS } from '@config/urls';

/**
 * Network interception tests - page.rout()
 *
 * What page.route() does:
 * - Intercepts HTTPS requests made by the browser during a test
 * - Allows mock, block, modify or abourt requests
 * - Makes UI tests independet of backend avaialbilty
 * - Enables testing of error states that are hard to trigger in real APIs
 *
 * why this matters:
 * - Ttests don't depend on sandbox uptime or test dta state
 * - Error scenarios (500, netwrok failure) can be teted reliably
 * - Speeds up tets by vlocking unnecessary resoueces (images, fonts)
 */
test.describe('Network Interception - Sauce Demo', () => {
  // --- Block  requests ---

  test('validate whether inventory page is loaded images blocked @regression @network', async ({
    page,
  }) => {
    //Block all PNG image requests before navigating
    //route.abort() prevents the requests from goin to the server
    await page.route(SAUCE_DEMO_NETWORK.BLOCKED_RESOURCE, (route) =>
      route.abort()
    );
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(
      SAUCE_DEMO_USERS.STANDARD.username,
      SAUCE_DEMO_USERS.STANDARD.password
    );

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.assertPageLoaded();

    //Page shouldstill load correctly even without images
    const count = await inventoryPage.getProductCount();
    expect(count).toBe(SAUCE_DEMO_NETWORK.TOTAL_PRODUCTS);
  });

  // ---Monitor requests---

  test('validate whether API calls made during the login is tracked @regression @network', async ({
    page,
  }) => {
    const requests: string[] = [];

    //Listen to all requests and record thier URLs
    /// page.on() is persistent - fiers for every matching event
    page.on('request', (request) => {
      requests.push(request.url());
    });
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(
      SAUCE_DEMO_USERS.STANDARD.username,
      SAUCE_DEMO_USERS.STANDARD.password
    );

    //Verify at least one request was made during the login flow
    expect(requests.length).toBeGreaterThan(0);

    //Verify the login page URL was requested
    const loginPageRequested = requests.some((url) =>
      url.includes(BASE_URLS.SAUCE_DEMO)
    );
    expect(loginPageRequested).toBe(true);
  });

  // --- Mock Responses ---
  test('Validate whether modified responsed headers are handled @regression @network', async ({
    page,
  }) => {
    //Intercept requests to saucedemo.com and add a custom header
    //route.continue() passes the request through but allows modification
    await page.route(
      SAUCE_DEMO_NETWORK.INVENTORY_URL_PATTERN,
      async (route) => {
        await route.continue({
          headers: {
            ...route.request().headers(),
            [SAUCE_DEMO_NETWORK.TEST_HEADER_KEY]:
              SAUCE_DEMO_NETWORK.TEST_HEADER_VALUE,
          },
        });
      }
    );
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(
      SAUCE_DEMO_USERS.STANDARD.username,
      SAUCE_DEMO_USERS.STANDARD.password
    );
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.assertPageLoaded();
    const count = await inventoryPage.getProductCount();
    expect(count).toBe(SAUCE_DEMO_NETWORK.TOTAL_PRODUCTS);
  });

  // -- Simulate failures ---
  test('should block CSS and verify page still functions @negative @network', async ({
    page,
  }) => {
    // Block all CSS files — page should still be functional without styling
    await page.route('**/*.css', (route) => route.abort());

    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(
      SAUCE_DEMO_USERS.STANDARD.username,
      SAUCE_DEMO_USERS.STANDARD.password
    );

    // Despite CSS being blocked, the page should still load with all products
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.assertPageLoaded();
    const count = await inventoryPage.getProductCount();
    expect(count).toBe(SAUCE_DEMO_NETWORK.TOTAL_PRODUCTS);
  });
});
