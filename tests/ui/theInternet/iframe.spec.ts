import { test, expect } from '@playwright/test';
import { IframePage } from '@pages/theInternet/IframePage';
import { THE_INTERNET_IFRAME } from '@utils/testData';

test.describe(' The Internet - UI Elements - Iframes', async () => {
  let iframePage: IframePage;

  test.beforeEach(async ({ page }) => {
    iframePage = new IframePage(page);
    await iframePage.navigate();
    await iframePage.assertPageLoaded();
  });

  test('validate whether page header is displayed correctly @smoke @theinternet', async () => {
    const heading = await iframePage.getHeadingText();
    expect(heading).toBe(THE_INTERNET_IFRAME.HEADING);
  });

  test('validate whether text can be typed into iframe editor @smoke @theinternet', async () => {
    await iframePage.typeInEditor(THE_INTERNET_IFRAME.TYPED_TEXT);
    const text = await iframePage.getEditorText();
    expect(text).toBe(THE_INTERNET_IFRAME.TYPED_TEXT);
  });

  test('validate whether editor content can be cleared and replaced @regression @theinternet', async () => {
    await iframePage.typeInEditor(THE_INTERNET_IFRAME.TYPED_TEXT);
    const text = await iframePage.getEditorText();
    expect(text).not.toBe(THE_INTERNET_IFRAME.DEFAULT_TEXT);
    expect(text).toBe(THE_INTERNET_IFRAME.TYPED_TEXT);
  });
});
