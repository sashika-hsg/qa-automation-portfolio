import { test, expect } from '@playwright/test';
import { CheckboxPage } from '@pages/theInternet/CheckboxPage';
import { THE_INTERNET_CHECKBOXES } from '@utils/testData';

test.describe('The Internet - UI Elements- CHeckboxes', () => {
  let checkboxPage: CheckboxPage;

  test.beforeEach(async ({ page }) => {
    checkboxPage = new CheckboxPage(page);
    await checkboxPage.navigate();
    await checkboxPage.assertPageLoaded();
  });

  test('validate correct number of checkboxes exists @smoke @theinternet', async () => {
    const count = await checkboxPage.getCheckboxCount();
    expect(count).toBe(THE_INTERNET_CHECKBOXES.TOTAL_CHECKBOXES);
  });

  test('validate checkbox 1 is checked @smoke @theinternet', async () => {
    await checkboxPage.checkByIndex(THE_INTERNET_CHECKBOXES.CHECKBOX_1_INDEX);
    const checked = await checkboxPage.isChecked(
      THE_INTERNET_CHECKBOXES.CHECKBOX_1_INDEX
    );
    expect(checked).toBe(true);
  });

  test('validate checkbox 2 is unchecked @smoke @theinternet', async () => {
    await checkboxPage.uncheckByINdex(THE_INTERNET_CHECKBOXES.CHECKBOX_2_INDEX);
    const checked = await checkboxPage.isChecked(
      THE_INTERNET_CHECKBOXES.CHECKBOX_2_INDEX
    );
    expect(checked).toBe(false);
  });
  test('validate check and uncheck checkbox1 @regression @theinternet', async () => {
    await checkboxPage.checkByIndex(THE_INTERNET_CHECKBOXES.CHECKBOX_1_INDEX);
    expect(
      await checkboxPage.isChecked(THE_INTERNET_CHECKBOXES.CHECKBOX_1_INDEX)
    ).toBe(true);
    await checkboxPage.uncheckByINdex(THE_INTERNET_CHECKBOXES.CHECKBOX_1_INDEX);
    expect(
      await checkboxPage.isChecked(THE_INTERNET_CHECKBOXES.CHECKBOX_1_INDEX)
    ).toBe(false);
  });
});
