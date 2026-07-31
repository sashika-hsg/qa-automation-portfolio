import {
  Before,
  After,
  setWorldConstructor,
  World,
  setDefaultTimeout,
} from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { BASE_URLS } from '../src/config/urls';
import { LoginPage, InventoryPage } from '../src/pages/sauceDemo';

/**
 * Cucumber World - shared context across al step definitions.
 *
 * Why World exists:
 * - Steps are separate function - they cannot share local variables
 * - Workd is a shared object in every step
 * - Browser, context and page live here and all steps can access them
 */
export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  inventoryPage!: InventoryPage;
}

setWorldConstructor(CustomWorld);

// Set default timeout for all steps — performance_glitch_user needs extra time
setDefaultTimeout(30000);
//Before each scenario - launchbrowser and create page
Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext({
    baseURL: BASE_URLS.SAUCE_DEMO,
  });
  this.page = await this.context.newPage();
  this.loginPage = new LoginPage(this.page);
  this.inventoryPage = new InventoryPage(this.page);
});

//After each scenario - close the browser
After(async function (this: CustomWorld) {
  await this.context.close();
  await this.browser.close();
});
