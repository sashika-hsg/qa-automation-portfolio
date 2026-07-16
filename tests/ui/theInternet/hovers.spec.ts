import { test, expect } from '@playwright/test';
import { HoverPage } from '@pages/theInternet/HoverPage';
import { THE_INTERNET_HOVERS } from '@utils/testData';

test.describe('The Internet - UI Elements- Hovers', () => {
  let hoverPage: HoverPage;

  test.beforeEach(async ({ page }) => {
    hoverPage = new HoverPage(page);
    await hoverPage.navigate();
    await hoverPage.assertPageLoaded();
  });

  test('validate correct number of avatars are displayed @smoke @theinternet', async () => {
    const count = await hoverPage.getAvatarCount();
    expect(count).toBe(THE_INTERNET_HOVERS.TOTAL_AVATARS);
  });

  test('validate caption reveal for avatar 1 when hovered', async () => {
    await hoverPage.hoverAvatar(THE_INTERNET_HOVERS.AVATAR_1_INDEX);
    const visible = await hoverPage.isCaptionVisible(
      THE_INTERNET_HOVERS.AVATAR_1_INDEX
    );
    expect(visible).toBe(true);
  });
  test('validate correct caption is dispalyed when hovering over avatar 1 @smoke @theinternet', async () => {
    await hoverPage.hoverAvatar(THE_INTERNET_HOVERS.AVATAR_1_INDEX);
    const visible = await hoverPage.isCaptionVisible(
      THE_INTERNET_HOVERS.AVATAR_1_INDEX
    );
    expect(visible).toBe(true);
  });
  test('should show correct caption text for avatar 1 @regression @theinternet', async () => {
    await hoverPage.hoverAvatar(THE_INTERNET_HOVERS.AVATAR_1_INDEX);
    const caption = await hoverPage.getCaptionText(
      THE_INTERNET_HOVERS.AVATAR_1_INDEX
    );
    expect(caption).toContain(THE_INTERNET_HOVERS.AVATAR_1_CAPTION);
  });

  test('should show correct caption text for avatar 2 @regression @theinternet', async () => {
    await hoverPage.hoverAvatar(THE_INTERNET_HOVERS.AVATAR_2_INDEX);
    const caption = await hoverPage.getCaptionText(
      THE_INTERNET_HOVERS.AVATAR_2_INDEX
    );
    expect(caption).toContain(THE_INTERNET_HOVERS.AVATAR_2_CAPTION);
  });

  test('should show correct caption text for avatar 3 @regression @theinternet', async () => {
    await hoverPage.hoverAvatar(THE_INTERNET_HOVERS.AVATAR_3_INDEX);
    const caption = await hoverPage.getCaptionText(
      THE_INTERNET_HOVERS.AVATAR_3_INDEX
    );
    expect(caption).toContain(THE_INTERNET_HOVERS.AVATAR_3_CAPTION);
  });
});
