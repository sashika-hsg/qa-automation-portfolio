import { test, expect } from '@playwright/test';
import { DropdownPage } from '@pages/theInternet/DropdownPage';
import { CheckboxPage } from '@pages/theInternet/CheckboxPage';
import { AlertPage } from '@pages/theInternet/AlertPage';
import {
  THE_INTERNET_DROPDOWN,
  THE_INTERNET_ALERTS,
  THE_INTERNET_CHECKBOXES,
} from '@utils/testData';

test.describe('The Internet - UI Elements', () => {
  //--- Dropdown ---

  test.describe('Dropdown', () => {
    let dropdownPage: DropdownPage;

    test.beforeEach(async ({ page }) => {
      dropdownPage = new DropdownPage(page);
      await dropdownPage.navigate();
      await dropdownPage.assertPageLoaded();
    });

    test('validate selection of Option 1 from dropdown @smoke @theinternet', async () => {
      await dropdownPage.selectOption(THE_INTERNET_DROPDOWN.OPTION_1);
      const selected = await dropdownPage.getSelectedOption();
      expect(selected).toBe(THE_INTERNET_DROPDOWN.OPTION_1_VALUE);
    });

    test('validate selection of Option 2 from dropdown @smoke @theinternet', async () => {
      await dropdownPage.selectOption(THE_INTERNET_DROPDOWN.OPTION_2);
      const selected = await dropdownPage.getSelectedOption();
      expect(selected).toBe(THE_INTERNET_DROPDOWN.OPTION_2_VALUE);
    });

    test('validate correct numner of options are present @regression @theinternet', async () => {
      const options = await dropdownPage.getAllOptions();
      expect(options.length).toBe(THE_INTERNET_DROPDOWN.TOTAL_OPTIONS);
    });
  });

  //--- Dropdown ---

  test.describe('Checkboxes', () => {
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
      await checkboxPage.uncheckByINdex(
        THE_INTERNET_CHECKBOXES.CHECKBOX_2_INDEX
      );
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
      await checkboxPage.uncheckByINdex(
        THE_INTERNET_CHECKBOXES.CHECKBOX_1_INDEX
      );
      expect(
        await checkboxPage.isChecked(THE_INTERNET_CHECKBOXES.CHECKBOX_1_INDEX)
      ).toBe(false);
    });
  });

  // --- Alerts ---

  test.describe('Alerts', () => {
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
});
