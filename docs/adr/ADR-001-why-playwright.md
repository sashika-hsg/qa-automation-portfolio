# ADR-001 — Use Playwright over Selenium

## Status
Accepted

## Date
2025-01-15

## Context
This framework requires a browser automation tool for UI testing.
The application under test (Sauce Demo, The Internet, Restful Booker)
requires a modern browser automation solution that supports
TypeScript natively and can handle modern web applications.

## Decision
We will use Playwright as the UI automation framework.

## Alternatives considered

### Option 1 — Selenium WebDriver
- The most widely used browser automation tool
- Large community and extensive documentation
- Supports Java, Python, JavaScript, C#
- Requires separate WebDriver binaries per browser
- No built-in API testing capability
- No built-in auto-waiting — requires explicit waits
- Test runner is separate (TestNG, JUnit, Mocha)

### Option 2 — Cypress
- Modern, fast, JavaScript-only
- Excellent developer experience
- Cannot test multiple tabs or cross-origin iframes
- No native mobile browser support
- No built-in API testing via request context
- Cannot run Safari (WebKit) tests

### Option 3 — Playwright
- Built by Microsoft — actively developed
- TypeScript-first with excellent type definitions
- Built-in API testing via request context
- Built-in auto-waiting — no flaky explicit waits
- Supports Chromium, Firefox, and WebKit (Safari)
- Supports multiple tabs, iframes, file downloads
- Built-in screenshot, video, and trace capture
- Custom fixture system for shared test state
- Single tool for UI and API testing

### Option 4 — WebdriverIO
- Modern, TypeScript-compatible
- More configuration overhead
- Smaller community than Playwright or Selenium
- Good mobile support via Appium integration

## Reasons for this decision

### 1 — Single tool for UI and API testing
Playwright's `request` context allows full HTTP API testing
without any additional library. This means one framework,
one language, one test runner for both UI and API tests.
No context switching, no additional dependencies.

### 2 — Auto-waiting eliminates flakiness
Playwright automatically waits for elements to be visible,
enabled, and stable before interacting with them. Selenium
requires explicit waits — a common source of flaky tests
in large suites.

### 3 — Native TypeScript support
Playwright's type definitions are maintained by Microsoft
and are comprehensive. The custom fixture system uses
TypeScript generics, making type-safe shared test state
straightforward to implement.

### 4 — Multi-browser with zero configuration
Running tests on Chromium, Firefox, and WebKit requires
only adding a project entry in `playwright.config.ts`.
No separate WebDriver binaries, no browser-specific code.

### 5 — Built-in debugging tools
Playwright ships with trace viewer, screenshot on failure,
video recording, and a VS Code extension for running and
debugging tests. These reduce debugging time significantly.

### 6 — Active development and community
Microsoft actively develops Playwright. New features ship
regularly. The GitHub community is large and responsive.

### 7 — Industry adoption
Playwright adoption in the Australian job market has grown
significantly. Many job descriptions now list Playwright
as preferred or required — replacing Selenium for new projects.

## Consequences

### Positive
- One tool handles UI and API testing
- No flaky tests from timing issues
- TypeScript works natively
- Multi-browser testing is trivial
- Rich built-in debugging tools
- Growing industry adoption

### Negative
- Newer than Selenium — smaller total community
- Some legacy enterprise teams still use Selenium
- Learning curve for Selenium-experienced testers
- Playwright-specific patterns differ from Selenium

### Mitigation of negatives
- Playwright documentation is comprehensive
- This project documents all Playwright-specific patterns
- The Architecture Decision Record explains the choice
  for any team member familiar with Selenium

## References
- Playwright official documentation — https://playwright.dev
- Playwright vs Selenium comparison —
  https://playwright.dev/docs/why-playwright
- Microsoft Playwright GitHub — https://github.com/microsoft/playwright
