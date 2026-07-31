import { test, expect } from '@playwright/test';
import { AlertPage } from '@pages/theInternet/AlertPage';
import { THE_INTERNET_ALERTS } from '@utils/testData';

test.describe('The Internet - UI Elements- Alerts', () => {
  let alertPage: AlertPage;

  test.beforeEach(async ({ page }) => {
    alertPage = new AlertPage(page);
    await alertPage.navigate();
    await alertPage.waitForPageLoad();
  });

  test('validate accepting a JS alert @smoke @theinternet', async () => {
    await alertPage.acceptAlert();
    const result = await alertPage.getResultText();
    expect(result).toBe(THE_INTERNET_ALERTS.RESULT_ALERT_ACCEPTED);
  });

  test('validate accpeting a JS confirm dialog @smoke @theinternet', async () => {
    await alertPage.acceptConfirm();
    const result = await alertPage.getResultText();
    expect(result).toBe(THE_INTERNET_ALERTS.RESULT_CONFIRM_ACCEPTED);
  });

  test('validate dismissing a JS confrm dialog @regression @theinternet', async () => {
    await alertPage.dismissConfirm();
    const result = await alertPage.getResultText();
    expect(result).toBe(THE_INTERNET_ALERTS.RESULT_CONFIRM_DISMISSED);
  });

  test('validate accepting a JS prompt with input @regression @theinternet', async () => {
    await alertPage.accpetPrompt(THE_INTERNET_ALERTS.PROMPT_INPUT);
    const result = await alertPage.getResultText();
    expect(result).toBe(THE_INTERNET_ALERTS.RESULT_PROMPT_ACCEPTED);
  });
});
