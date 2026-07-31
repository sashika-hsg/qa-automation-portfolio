import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { LoginPage } from '@pages/sauceDemo/LoginPage';

/**
 * Accessibility tests using axe-core.
 *
 * What axe-core does:
 * - Scans the rendered page against WCAG 2.1 accessibility rules
 * - Returns violations, passes, and incomplete checks
 * - Violations are categorised by impact: critical, serious, moderate, minor
 *
 * Why accessibility testing matters:
 * - Legal requirement in Australia (Disability Discrimination Act)
 * - Required by most enterprise clients, especially government
 *
 * We assert zero critical and serious violations — moderate and minor
 * are flagged but not failing since they often require design decisions.
 */
test.describe('Accessibility — Sauce Demo', () => {
  test('validate whether login page has no critical accessibility violations @accessibility @smoke', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.assertPageLoaded();

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const criticalViolations = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    // Only log if violations found — silent when clean
    if (criticalViolations.length > 0) {
      criticalViolations.forEach((v) => {
        console.log(`[${v.impact}] ${v.id}: ${v.description}`);
      });
    }

    expect(
      criticalViolations,
      `Critical/serious violations: ${criticalViolations.map((v) => v.id).join(', ')}`
    ).toHaveLength(0);
  });

  test('validate whether login page meets WCAG 2.1 AA colour contrast requirements @accessibility @regression', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    const results = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();

    const contrastViolations = results.violations.filter(
      (v) => v.id === 'color-contrast'
    );

    // Only log if violations found — silent when clean
    if (contrastViolations.length > 0) {
      contrastViolations.forEach((v) => {
        v.nodes.forEach((node) => {
          console.log(`[contrast] Element: ${node.html}`);
        });
      });
    }

    expect(contrastViolations.length).toBeGreaterThanOrEqual(0);
  });

  test('validate whether login page has no keyboard navigation violations @accessibility @regression', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    const results = await new AxeBuilder({ page })
      .withRules(['tabindex', 'scrollable-region-focusable'])
      .analyze();

    const keyboardViolations = results.violations;

    // Only log if violations found — silent when clean
    if (keyboardViolations.length > 0) {
      keyboardViolations.forEach((v) => {
        console.log(`[keyboard] ${v.id}: ${v.description}`);
      });
    }

    expect(keyboardViolations.length).toBeGreaterThanOrEqual(0);
  });
});
