import { test, expect } from '@playwright/test';
import { DropdownPage } from '@pages/theInternet/DropdownPage';
import { THE_INTERNET_DROPDOWN } from '@utils/testData';

test.describe('The Internet - UI Elements- Dropdowns', () => {
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
