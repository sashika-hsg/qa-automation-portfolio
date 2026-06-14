import { test, expect } from '../../../src/fixtures/fixtures';
import { SAUCE_DEMO_USERS } from '@utils/testData';

/**
 * Data-driven login tests across multiple Sauce Demo user types.
 * Each user has different behavior. This loop runs the same
 * assertions against each one, catching user-specific issues.
 */

const usersToTest = [
  { label: 'standard_user', credentials: SAUCE_DEMO_USERS.STANDARD },
  { label: 'problem_user', credentials: SAUCE_DEMO_USERS.PROBLEM },
  {
    label: 'performance_glitch_user',
    credentials: SAUCE_DEMO_USERS.PERFORMANCE,
  },
];

test.describe('Sauce Demo - Data-Driven User Login', () => {
  for (const { label, credentials } of usersToTest) {
    test(`Validate whether the ${label} user can login and navigate to the inventory page @regression`, async ({
      loginPage,
    }) => {
      await loginPage.login(credentials.username, credentials.password);
      await expect(loginPage['page']).toHaveURL(/inventory/);
    });
  }
});
