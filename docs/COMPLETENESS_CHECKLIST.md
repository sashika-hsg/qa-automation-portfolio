# Framework Completeness Checklist

> Track all remaining items for v1 completion and v2 roadmap.
> Check off items as they are implemented and merged to main.
> Last updated: 14 August 2026

---

## Playwright Constructs

### Locators
- [x] `getByRole()` ✅ — `LoginPage.ts`, `InventoryPage.ts`, `CheckoutPage.ts`
- [x] `getByText()` ✅ — `InventoryPage.clickProductName()`
- [ ] `getByLabel()` — add to form inputs in checkout
- [x] `getByPlaceholder()` ✅ — `LoginPage.ts`, `CheckoutPage.ts`
- [x] `getByTestId()` ✅ — `LoginPage.ts`, `InventoryPage.ts`
- [ ] XPath locators — add at least one example in a page object

### Page Actions
- [x] `selectOption({ label })` ✅ — `DropdownPage.ts`
- [x] `check()` / `uncheck()` ✅ — `CheckboxPage.ts`
- [x] `hover()` ✅ — `HoverPage.ts`
- [ ] `type()` — character by character input, different from `fill()`
- [ ] `press()` — keyboard key press e.g. `Enter`, `Tab`, `Escape`

### Assertions
- [x] `toBeEnabled()` ✅ — `InventoryPage.assertSortDropdownEnabled()`
- [x] `toHaveValue()` ✅ — `InventoryPage.assertSortDropdownValue()`

### Waits
- [ ] `waitForSelector()` — currently using `locator.waitFor({ state })` in `InventoryPage.ts`; note the distinction if asked in interview

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
- [x] `storageState` ✅ — `authenticatedPage` fixture, `.auth/user.json` — `src/fixtures/fixtures.ts`
- [x] `browser.newContext()` ✅ — `authenticatedPage` fixture — `src/fixtures/fixtures.ts`
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

## TypeScript Constructs

### Core Type System
- [x] Interfaces ✅ — `IPage`, `ApiResponse<T>`, `ApiError` (27 interfaces across `src/`)
- [x] Type aliases ✅ — `ApiResult<T>`, `UpdateBookingRequest`, `GuestName` — `src/models/`
- [x] Generics ✅ — `ApiResponse<T>`, `PaginatedApiResponse<T>`, `UserRepository.query<T>()`
- [x] Generic default types ✅ — `query<T = unknown>()` — `GraphQLClient.ts`
- [x] `unknown` ✅ — used idiomatically over `any` — `GraphQLClient.ts`, `userRepository.ts`
- [x] Discriminated unions ✅ — `ApiResult<T>` (`success: true/false`) — `ApiResponse.ts`
- [ ] `ApiResult<T>` actually consumed by a client method — currently defined but unused; wire into `ReqResClient` or `RestfulBookerClient`
- [ ] Type guards / type predicates (`x is Booking`) — add at least one custom predicate, e.g. in `dataUtils.ts` or a schema validator
- [ ] `typeof` narrowing in application code — currently only in test assertions (`users.spec.ts`), not in `src/`
- [ ] `instanceof` narrowing — no occurrences yet; needs a genuine use case (e.g. custom error classes)
- [ ] `never` as an active type (not just prose) — add exhaustiveness check, e.g. `default` branch on a `switch` over `HttpStatus` or `TestCategory`
- [ ] Union type literals — only one example (`TestResult.ts`); add 1–2 more deliberate unions
- [ ] Intersection types (`&`) — no occurrences yet

### Utility Types
- [x] `Partial<T>` ✅ — `UpdateBookingRequest`, `RestfulBookerClient.ts`
- [x] `Pick<T>` ✅ — `GuestName` — `Booking.ts`
- [x] `Omit<T>` ✅ — `BookingWithoutDates` — `Booking.ts`
- [x] `Required<T>` ✅ — `CompleteBooking` — `Booking.ts`
- [x] `Readonly<T>` ✅ — `ConfirmedBooking` — `Booking.ts`
- [x] `Record<K,V>` ✅ — `ApiClient.ts`, `GraphQLClient.ts`, `TestResult.ts`, `login.steps.ts`
- [ ] Mapped types (custom, not built-in) — build one from scratch to show understanding of the mechanism behind `Pick`/`Omit`
- [ ] Conditional types (`T extends U ? X : Y`) — not yet used; optional/advanced

### OOP & Class Features
- [x] Abstract classes ✅ — `BasePage` — `src/pages/base/BasePage.ts`
- [x] Abstract methods ✅ — `navigate()`, `assertPageLoaded()` — `BasePage.ts`
- [x] `implements` (interface contract) ✅ — `BasePage implements IPage`
- [x] Inheritance ✅ — `ApiClient` → `ReqResClient`, `RestfulBookerClient`
- [x] Accessors (`get`/`set`) ✅ — `BookingBuilder.ts`
- [x] Enums ✅ — `HttpMethod`, `HttpStatus`, `UserRole`, `TestStatus`, `TestSeverity`, `TestCategory`
- [ ] Custom error classes (`class extends Error`) — none yet; pairs naturally with `instanceof` narrowing gap above
- [ ] Access modifiers beyond `protected` — confirm `private` is used somewhere deliberate, or add one
- [ ] Static members (`static` properties/methods) — not yet used; natural fit for `ConfigManager`-style singleton

### Modern Syntax / Idioms
- [x] Nullish coalescing (`??`) ✅ — 9 occurrences across `src/`
- [ ] Optional chaining (`?.`) — zero occurrences anywhere in codebase; add where accessing nested/possibly-undefined data
- [ ] Non-null assertion (`!`) — zero occurrences; fine to intentionally avoid, but be ready to explain the trade-off
- [x] Async/await typing (`Promise<T>`) ✅ — 38 files use `async`

### Compiler / Config Understanding
- [ ] Document which `strictNullChecks` / strict flags are enabled in `tsconfig.json` and why
- [ ] Index signatures (`[key: string]: T`) — not yet used

---

## Design Diagrams

> Created in draw.io, stored under `docs/design/diagrams/`.

- [x] 01 — System Context ✅ — `01-system-context.svg`
- [x] 02 — Container Diagram ✅ — `02-container-diagram.svg`
- [x] 03 — Page Object Hierarchy ✅ — `03-page-object-hierarchy.svg`
- [x] 04 — API Client Hierarchy ✅ — `04-api-client-hierarchy.svg`
- [x] 05 — CI/CD Pipeline ✅ — `05-cicd-pipeline.svg`
- [x] 06 — BDD Flow ✅ — `06-bdd-flow.svg`
- [x] 07 — Database Layer ✅ — `07-database-layer.svg`
- [ ] 08 — DB/API Cross-Validation Flow — visualise how DB tests validate against API-created data, your key differentiator
- [ ] 09 — Auth Models Comparison — static API key vs cookie token vs Basic Auth, side by side
- [ ] Diagrams referenced in README table (`docs/design/diagrams/`) kept in sync with any new diagram added here

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
| Playwright constructs | 25 | 15 | 10 |
| TypeScript constructs | 36 | 20 | 16 |
| Design diagrams | 9 | 7 | 2 |
| Framework features | 15 | 10 | 5 |
| Documentation | 14 | 13 | 1 |
| V2 roadmap | 14 | 0 | 14 |
| **Total** | **113** | **65** | **48** |
