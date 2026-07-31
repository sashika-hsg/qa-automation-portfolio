# Framework Completeness Checklist

> Track all remaining items for v1 completion and v2 roadmap.
> Check off items as they are implemented and merged to main.
> Last updated: 31 July 2026

---

## Playwright Constructs

### Locators
- [ ] `getByRole()` — refactor existing page object locators
- [ ] `getByText()` — add to inventory or checkout page
- [ ] `getByLabel()` — add to form inputs in checkout
- [ ] `getByPlaceholder()` — add to login page inputs
- [ ] `getByTestId()` — Sauce Demo uses `data-test` attributes, already possible
- [ ] XPath locators — add at least one example in a page object

### Page Actions
- [x] `selectOption({ label })` ✅ — `DropdownPage.ts`
- [x] `check()` / `uncheck()` ✅ — `CheckboxPage.ts`
- [x] `hover()` ✅ — `HoverPage.ts`
- [ ] `type()` — character by character input, different from `fill()`
- [ ] `press()` — keyboard key press e.g. `Enter`, `Tab`, `Escape`

### Assertions
- [ ] `toBeEnabled()` — assert button/input is enabled
- [ ] `toHaveValue()` — assert input field has a specific value

### Waits
- [ ] `waitForSelector()` — explicit wait for an element to appear

### Screenshots
- [ ] `page.screenshot({ path: 'screenshot.png' })` — explicit screenshot in a test
- [ ] `page.screenshot({ fullPage: true })` — full page screenshot

### Handling Elements
- [x] Dropdowns ✅ — `DropdownPage.ts`, `dropdown.spec.ts`
- [x] Checkboxes ✅ — `CheckboxPage.ts`, `checkboxes.spec.ts`
- [x] Alerts / Dialogs ✅ — `AlertPage.ts`, `alerts.spec.ts`
- [x] Frames / iFrames ✅ — `IframePage.ts`, `iframe.spec.ts`
- [x] Hovers ✅ — `HoverPage.ts`, `hovers.spec.ts`
- [ ] Radio buttons — The Internet `/inputs`
- [ ] Modals — The Internet `/entry_ad` or `/modal_dialogs`
- [ ] File upload — The Internet `/upload`

### Advanced Concepts
- [x] Network interception ✅ — `page.route()`, `network.spec.ts`
- [ ] Multiple tabs — The Internet `/windows`
- [ ] `storageState` — persist login auth state across tests
- [ ] `browser.newContext()` — explicit browser context creation
- [ ] Multiple contexts — demonstrate two users in same test
- [ ] `userAgent` — custom user agent in config or test

### Parallel Execution
- [ ] Set `fullyParallel: true` for a specific test suite
- [ ] Document `workers` configuration with example in README

### Reports & Debugging
- [ ] Headed mode — document how to run tests headed
- [ ] Trace viewer — document usage in README
- [ ] `page.screenshot()` — explicit screenshot captured in a test

---

## Framework Features

### Test coverage gaps
- [ ] ReqRes auth negative tests — register/login 400 scenarios
- [ ] More DB tests — update user, verify count after insert/delete
- [ ] Restful Booker Postman collection — Newman alongside ReqRes and Stripe
- [ ] StripeClient.ts — Playwright TypeScript version of Stripe API tests

### BDD
- [x] Cucumber.js setup ✅ — `cucumber.config.js`, `support/hooks.ts`
- [x] Login feature file ✅ — `features/ui/sauceDemo/login.feature`
- [x] Login step definitions ✅ — `step-definitions/ui/login.steps.ts`
- [x] World pattern ✅ — `support/hooks.ts`
- [ ] API BDD feature files
- [ ] More UI BDD scenarios (inventory, checkout)

### Accessibility
- [x] axe-core setup ✅ — `@axe-core/playwright` installed
- [x] Login page WCAG 2.1 AA scan ✅ — `tests/accessibility/sauceDemo.spec.ts`
- [x] Colour contrast check ✅
- [x] Keyboard navigation check ✅
- [ ] Full WCAG 2.1 audit across all pages

### Architecture gaps
- [x] Facade pattern ✅ — `src/pages/sauceDemo/index.ts`, `src/pages/theInternet/index.ts`
- [x] World pattern ✅ — `support/hooks.ts`
- [ ] Adapter pattern — wrap `pg` client behind a generic DB interface
- [ ] `UserBuilder.ts` — extend with more preset methods

### Documentation
- [x] ADR-001 — Why Playwright ✅
- [x] ADR-002 — Why TypeScript ✅
- [x] ADR-003 — Why PostgreSQL ✅
- [x] ADR-004 — Why BDD with Cucumber ✅
- [x] ADR-005 — Why Restful Booker ✅
- [x] ADR-006 — Why Claude API ✅
- [x] ADR-007 — Why Cucumber.js ✅
- [x] ADR-008 — Why GraphQL ✅
- [x] DESIGN_PATTERNS.md ✅ — 10 patterns documented
- [x] COMMANDS_REFERENCE.md ✅
- [x] MERGE_CONFLICT_RESOLUTION_GUIDE.md ✅
- [ ] README — keep updated after each merge

---

## V2 Roadmap

### Testing disciplines
- [ ] SOAP API testing — DataAccess.com NumberConversion service
- [ ] k6 performance tests — basic load test against ReqRes
- [ ] Visual regression — Playwright screenshot comparison
- [ ] Applitools Eyes — AI-powered visual testing
- [ ] Contract testing — Pact for ReqRes + Restful Booker
- [ ] Security testing — OWASP basics via Playwright
- [ ] Mobile viewport tests — Playwright viewport config

### Integrations
- [ ] AI integration — Claude API for test data generation
- [ ] Allure reporting — full setup with trend history
- [ ] Appium mobile testing
- [ ] Medusa.js — full payment flow cross-service validation
- [ ] AWS CloudWatch integration
- [ ] Grafana dashboard
- [ ] Kubernetes test runner
- [ ] Percy visual regression
- [ ] GraphQL mutations and subscriptions

---

## Completion tracker

| Area | Items | Done | Remaining |
|---|---|---|---|
| Playwright constructs | 25 | 8 | 17 |
| Framework features | 15 | 10 | 5 |
| Documentation | 14 | 13 | 1 |
| V2 roadmap | 14 | 0 | 14 |
| **Total** | **68** | **31** | **37** |