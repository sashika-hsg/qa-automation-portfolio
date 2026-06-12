import { test, expect } from '../../../src/fixtures/fixtures';
import {
  SAUCE_DEMO_USERS,
  EXPECTED_MESSAGES,
} from '../../../src/utils/testData';

test.describe('Sauce Demo - Login', () => {
  test('successful login with valid credentials @smoke @critical', async ({
    loginPage,
  }) => {
    await loginPage.login(
      SAUCE_DEMO_USERS.STANDARD.username,
      SAUCE_DEMO_USERS.STANDARD.password
    );
    await expect(loginPage['page']).toHaveURL(/inventory/);
  });

  test('display error for lockedout user @regression @negative', async ({
    loginPage,
  }) => {
    await loginPage.login(
      SAUCE_DEMO_USERS.LOCKED.username,
      SAUCE_DEMO_USERS.LOCKED.password
    );
    await loginPage.assertErrorMessage(EXPECTED_MESSAGES.LOCKED_USER_ERROR);
  });

  test('display error for invalid credentials @regression @negative', async ({
    loginPage,
  }) => {
    await loginPage.login(
      SAUCE_DEMO_USERS.INVALID.username,
      SAUCE_DEMO_USERS.INVALID.password
    );
    await loginPage.assertErrorMessage(
      EXPECTED_MESSAGES.INVALID_CREDENTIALS_ERROR
    );
  });

  test('display error for empty username @regression @negative @edge', async ({
    loginPage,
  }) => {
    await loginPage.login('', SAUCE_DEMO_USERS.STANDARD.password);
    await loginPage.assertErrorMessage(
      EXPECTED_MESSAGES.MISSING_USERNAME_ERROR
    );
  });

  test('display error for empty password @regression @negative @edge', async ({
    loginPage,
  }) => {
    await loginPage.login(SAUCE_DEMO_USERS.INVALID.username, '');
    await loginPage.assertErrorMessage(
      EXPECTED_MESSAGES.MISSING_PASSWORD_ERROR
    );
  });

  test('validate error message is cleared @regression', async ({
    loginPage,
  }) => {
    await loginPage.login(
      SAUCE_DEMO_USERS.INVALID.username,
      SAUCE_DEMO_USERS.INVALID.password
    );

    await loginPage.dismissError();

    const isErrorMessageVisible = await loginPage.isErrorVisible();
    expect(isErrorMessageVisible).toBe(false);
  });
});
