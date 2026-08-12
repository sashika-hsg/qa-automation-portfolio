import { chromium } from '@playwright/test';
import { SAUCE_DEMO_USERS } from './src/utils/testData';
import { LoginPage } from './src/pages/sauceDemo';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Global setup - runs once before all tests.
 *
 * Why this exists:
 *  - Logs in once and saves browser state to .auth/user.json
 *  - Every test that needs auth loads this saved state
 *  - Eliminates repeated UI login across all authenticated tests
 *  - Ex: with 25 UI tests x3 browsers = 75 fewer login operations per CI run
 *
 * What gets saved in storageState:
 *  - Cookies - ssession tokens
 *  - localStorage - client-side auth data
 *  - sessionStorage - sesion-specific auth data
 */
async function globalSetup(): Promise<void> {
  // Skip if running DB or API tests only
  if (
    process.env.TEST_SUITE === 'db' ||
    process.env.TEST_SUITE === 'api' ||
    process.env.TEST_SUITE === 'unit'
  ) {
    return;
  }
  const browser = await chromium.launch();
  const context = await browser.newContext({
    baseURL: process.env.SAUCE_DEMO_BASE_URL ?? 'https://www.saucedemo.com',
  });
  const page = await context.newPage();

  //Navigate to Sauce Demo and login once
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(
    SAUCE_DEMO_USERS.STANDARD.username,
    SAUCE_DEMO_USERS.STANDARD.password
  );
  await page.waitForURL(/inventory/);

  //Create .auth directory if it doesnt exist
  const authDir = path.resolve('.auth');
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir);
  }
  //save browser state - cookies +localStorage
  await context.storageState({ path: path.join(authDir, 'user.json') });
  await browser.close();
}
export default globalSetup;
