import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../support/hooks';
import { SAUCE_DEMO_USERS } from '../../src/utils/testData';

// Map usernames to credentials from testData
const USER_CREDENTIALS: Record<string, { username: string; password: string }> =
  {
    [SAUCE_DEMO_USERS.STANDARD.username]: SAUCE_DEMO_USERS.STANDARD,
    [SAUCE_DEMO_USERS.LOCKED.username]: SAUCE_DEMO_USERS.LOCKED,
    [SAUCE_DEMO_USERS.PERFORMANCE.username]: SAUCE_DEMO_USERS.PERFORMANCE,
    [SAUCE_DEMO_USERS.INVALID.username]: SAUCE_DEMO_USERS.INVALID,
  };

/**
 * Step definitions exist:
 * - Feature files are written in Gherkin - readable by everyone
 * - Step definitions are the TypeScript code that executes each Gherkin step
 * - Each Give/When/Then line in the feature file maps to a function here
 * - The regrex/string in each step must exactlyy match the Gherkin text
 */

// --- step definitions ---

Given('I am on the Sauce Demo login page', async function (this: CustomWorld) {
  await this.loginPage.navigate();
  await this.loginPage.assertPageLoaded();
});

When(
  'I enter username {string}',
  async function (this: CustomWorld, username: string) {
    const credentials = USER_CREDENTIALS[username];
    if (!credentials) {
      throw new Error(`No credentials found for username: ${username}`);
    }
    await this.loginPage.login(credentials.username, credentials.password);
  }
);

Then(
  'I should be redirected to the inventory page',
  async function (this: CustomWorld) {
    await this.inventoryPage.assertPageLoaded();
    const url = this.page.url();
    expect(url).toContain('inventory');
  }
);

Then(
  'I should see an error message {string}',
  async function (expectedMessage: string) {
    const errorMessage = await this.loginPage.getErrorMessage();
    expect(errorMessage).toContain(expectedMessage);
  }
);
