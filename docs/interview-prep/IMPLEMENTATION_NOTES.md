# Implementation Notes — QA Automation Portfolio

> Private study document. Not part of the public repo.
> Goal: understand every implementation deeply enough to explain,
> defend, and write it from scratch in an interview.
>
> How to use: For each implementation, read the explanation,
> then close the file and explain it out loud. The gap between
> your explanation and this document is what to practise.

---

## 1. BasePage — Abstract Base Class

### What it is
An abstract class that all page objects extend. Provides shared
implementation and enforces a contract on every subclass.

### File
`src/pages/base/BasePage.ts`

### Key concepts

**Abstract class:**
- Cannot be instantiated directly — `new BasePage(page)` is illegal
- Forces subclasses to implement abstract methods
- Provides shared concrete methods inherited for free

**Implements IPage:**
- IPage is an interface defining 3 contracts: `navigate()`,
  `getTitle()`, `getCurrentUrl()`
- BasePage fulfils 2 of them (`getTitle`, `getCurrentUrl`)
- Passes `navigate()` down as abstract — each page has a different URL

**protected readonly page: Page:**
- `protected` — accessible in BasePage AND all subclasses, not outside
- `readonly` — set once in constructor, never reassigned
- `Page` — Playwright's browser tab object

**Constructor — dependency injection:**
- Receives `Page` instance — does not create it
- The fixture or test creates the page and passes it in
- Page object is not responsible for browser lifecycle

**Abstract methods:**
- `navigate()` — every page has a different URL, no shared implementation
- `assertPageLoaded()` — every page has different "loaded" criteria

**Concrete methods (inherited free):**
- `waitForPageLoad()` — waits for `domcontentloaded`
- `getTitle()` — returns `page.title()`
- `getCurrentUrl()` — returns `page.url()`
- `getLocator()` — protected utility wrapping `page.locator()`

### Interview answer
*"BasePage is an abstract class implementing the IPage interface.
It holds the Playwright Page as a protected readonly property —
protected so subclasses can access it, readonly so it can't be
reassigned. It implements getTitle and getCurrentUrl once so every
subclass inherits them. It declares navigate and assertPageLoaded
as abstract — every subclass must implement both or TypeScript
fails at compile time. The constructor uses dependency injection —
the page is passed in, not created here."*

---

## 2. IPage — Interface Contract

### What it is
A TypeScript interface defining 3 methods every page object must have.

### File
`src/pages/base/IPage.ts`

### Key concepts

**Interface vs Abstract class:**
- Interface = contract only, no implementation
- Abstract class = contract + shared implementation
- A class can implement multiple interfaces but extend only one class

**Why both IPage and BasePage exist:**
- IPage defines WHAT must exist
- BasePage defines HOW common things work
- Together: compiler-enforced contract + shared implementation

**The 3 contracts:**
- `navigate()` — go to this page
- `getTitle()` — return page title
- `getCurrentUrl()` — return current URL

**Compile-time enforcement:**
If a page object forgets to implement a method, TypeScript
catches it immediately — not at runtime during a test.

### Interview answer
*"IPage is a TypeScript interface that defines three contracts every
page object must fulfil. BasePage implements IPage and provides
concrete implementations of getTitle and getCurrentUrl. navigate
remains abstract because every page has a different URL. TypeScript
enforces this at compile time — if I create a new page object and
forget navigate, the build fails immediately."*

---

## 3. LoginPage — Concrete Page Object

### What it is
A concrete page object for Sauce Demo login page.
Extends BasePage and implements all abstract methods.

### File
`src/pages/sauceDemo/LoginPage.ts`

### Key concepts

**Locator strategy (priority order):**
1. `getByRole()` — ARIA roles, most resilient
2. `getByPlaceholder()` — placeholder text
3. `getByLabel()` — label text
4. `getByTestId()` — data-test attributes
5. CSS selectors — last resort
6. XPath — avoid

**Private locators:**
Defined as class properties — encapsulated inside the page object.
Tests never access selectors directly.

**navigate() implementation:**
Goes to Sauce Demo URL from `BASE_URLS.SAUCE_DEMO`.
Calls `waitForPageLoad()` after navigation.

**assertPageLoaded():**
Defines what "loaded" means for the login page —
typically asserts the username input is visible.

**login() method:**
Fills username, fills password, clicks login button.
Accepts credentials as parameters — never hardcoded.

### Interview answer
*"LoginPage extends BasePage and implements navigate() with the
Sauce Demo URL and assertPageLoaded() checking the username input
is visible. I use getByPlaceholder for form inputs and getByRole
for the login button — following Playwright's recommended locator
priority. All selectors are private class properties — tests never
touch selectors directly, only named methods like login()."*

---

## 4. Fixtures — Factory Pattern

### What it is
Custom Playwright fixtures providing pre-configured page objects
and auth state to tests via dependency injection.

### File
`src/fixtures/fixtures.ts`

### Key concepts

**`test.extend()`:**
Extends Playwright's base test with custom fixtures.
Tests import `test` from fixtures, not from `@playwright/test`.

**Five fixtures:**
- `loginPage` — navigated to login page, ready to interact
- `inventoryPage` — inventory page instance, not logged in
- `authenticatedPage` — logged in, on inventory page
- `cartPage` — cart page instance
- `checkoutPage` — logged in, item in cart, on checkout step 1

**Factory pattern:**
Each fixture is a factory — it creates and configures a page
object before the test, tears it down after.

**`use(fixture)`:**
Passes the fixture to the test. Everything before `use()` is setup,
everything after is teardown.

**Why fixtures over beforeEach:**
- Fixtures are declared in the test signature — explicit dependencies
- Automatic teardown even on test failure
- Composable — `checkoutPage` builds on `authenticatedPage` setup
- Reusable across all test files

### Interview answer
*"I use Playwright's custom fixture system implementing the Factory
pattern. Each fixture creates and configures a page object before
the test runs and tears it down after — even on failure. Tests
declare which fixture they need in the function signature.
The checkoutPage fixture chains setup — logs in, adds an item to
cart, navigates to checkout — so tests start exactly where they
need to be. This is much cleaner than repeating that setup in
beforeEach across multiple test files."*

---

## 5. ApiClient — Base HTTP Client

### What it is
Abstract base class providing HTTP methods to all API clients.
Wraps Playwright's APIRequestContext.

### File
`src/api/base/ApiClient.ts`

### Key concepts

**Why wrap APIRequestContext:**
- Adds error handling around every request
- Adds shared header management
- Provides named methods (get, post, put, patch, delete)
- Single point to change HTTP behaviour for all clients

**try/catch in every method:**
If a request fails at network level, catches the raw error and
re-throws with context (which method, which URL).
Makes debugging faster — you know exactly which call failed.

**Inheritance — `extends ApiClient`:**
- `ReqResClient` and `RestfulBookerClient` extend ApiClient
- They inherit all 5 HTTP methods
- They add only their own auth and endpoint methods

**Deliberate non-inheritance:**
- `GraphQLClient` does NOT extend ApiClient
- Reason: GraphQL only uses POST to one endpoint
- Inheriting GET, PUT, PATCH, DELETE would be misleading
- Violates Interface Segregation Principle
- `StripeClient` does NOT extend ApiClient
- Reason: Stripe uses form-encoded bodies, not JSON
- ApiClient's POST sends JSON — wrong content type for Stripe

### Interview answer
*"ApiClient wraps Playwright's APIRequestContext and provides five
HTTP methods with consistent error handling. ReqRes and Restful
Booker clients extend it — they inherit the HTTP methods and add
their own authentication and endpoints. GraphQL and Stripe clients
deliberately do not extend ApiClient. GraphQL only uses POST to one
endpoint — inheriting GET, PUT, PATCH, DELETE would be misleading.
Stripe uses form-encoded bodies not JSON — ApiClient's POST would
send the wrong content type. The deliberate non-inheritance is the
design decision I'm most proud of — knowing when not to apply a
pattern shows more architectural maturity."*

---

## 6. DbClient — Singleton Pattern

### What it is
A database connection manager using the Singleton pattern.
Ensures one shared PostgreSQL connection across all DB tests.

### File
`src/db/client.ts`

### Key concepts

**Singleton pattern:**
- `private static instance: DbClient` — one instance stored
- `getInstance()` — returns existing instance or creates new one
- Constructor is private — cannot do `new DbClient()` externally

**Why Singleton for DB:**
- PostgreSQL has connection limits
- Opening a new connection per test wastes resources
- TCP handshake + authentication per test = slow and wasteful
- One connection shared across all 7 DB tests

**Lifecycle:**
- Created on first `getInstance()` call
- Shared across all subsequent calls in same test run
- Closed once in `afterAll()` — `DbClient.disconnect()`

**Why NOT use Singleton for everything:**
Singleton is often considered an anti-pattern because it creates
hidden global state. Here it's appropriate because:
- The resource (DB connection) genuinely should be shared
- The lifecycle is explicitly managed
- It's a read-mostly connection, not mutable shared state

### Interview answer
*"DbClient uses the Singleton pattern — getInstance() returns the
same connection every time it's called. The first call creates the
connection, every subsequent call returns the same instance.
This is correct here because PostgreSQL connections are expensive
to open — TCP handshake plus authentication. With 7 DB tests,
that's 7 unnecessary connection opens if we didn't use Singleton.
The connection is closed once in afterAll. I'm aware Singleton gets
a bad reputation for hiding global state — here it's appropriate
because the resource genuinely should be shared and the lifecycle
is explicitly managed."*

---

## 7. UserRepository — Repository Pattern

### What it is
Encapsulates all SQL for the users table behind named methods.

### File
`src/db/repositories/userRepository.ts`

### Key concepts

**Repository pattern:**
- Tests call `UserRepository.getByName('Alice')` not raw SQL
- SQL is isolated inside the repository
- If schema changes — only repository changes, not every test

**Methods:**
- `getAll()` — SELECT all users
- `getByName()` — SELECT by name, returns User or null
- `create()` — INSERT new user, returns created User
- `deleteByName()` — DELETE by name
- `query<T>()` — generic query method, type-safe results

**Generic constraint `query<T extends object>()`:**
Caller specifies the shape of expected rows.
TypeScript provides compile-time type safety on results.
`extends object` prevents primitives — DB rows are always objects.

**Why Repository over direct SQL in tests:**
```typescript
// Without Repository — SQL in test (bad)
const result = await db.query('SELECT * FROM users WHERE name = $1', ['Alice']);

// With Repository — named method (good)
const user = await UserRepository.getByName('Alice');
```
Tests read like specifications. SQL changes don't cascade into tests.

### Interview answer
*"UserRepository encapsulates all SQL for the users table.
Tests call named methods like getByName() instead of writing raw
SQL. This means if the schema changes — a column rename, a table
split — only the repository needs updating, not every test.
The generic query<T>() method lets callers specify the expected
row shape for compile-time type safety. I deliberately did not use
an ORM like Prisma — for a validation layer I want full visibility
into exactly what query runs, which matters when debugging a test
failure."*

---

## 8. BookingBuilder — Builder Pattern

### What it is
A fluent builder for creating Booking test data with method chaining.

### File
`src/builders/BookingBuilder.ts`

### Key concepts

**Builder pattern:**
- Sensible defaults — `build()` returns a valid booking immediately
- `withX()` methods — override only what you need
- Method chaining — each `withX()` returns `this`
- Named presets — `asPremiumStay()`, `asWeekendBooking()`

**get/set accessors with validation:**
```typescript
set totalPrice(value: number) {
  if (value < 0) throw new Error('Price cannot be negative');
  this._totalPrice = value;
}
```
Validation at assignment time — invalid data caught immediately.

**Why Builder over object literals:**
```typescript
// Object literal — verbose, no validation
const booking = {
  firstname: 'John',
  lastname: 'Doe',
  totalprice: 200,
  depositpaid: true,
  bookingdates: { checkin: '2026-01-01', checkout: '2026-01-03' },
  additionalneeds: 'Breakfast'
};

// Builder — readable, validated, flexible
const booking = new BookingBuilder()
  .withTotalPrice(200)
  .withDepositPaid(true)
  .asPremiumStay()
  .build();
```

### Interview answer
*"BookingBuilder implements the Builder pattern for Restful Booker
test data. It has sensible defaults — build() returns a valid
booking immediately — and withX() methods that return this for
chaining. I added get/set accessors with validation so setting a
negative price throws immediately rather than causing a confusing
assertion failure later. Named presets like asPremiumStay() make
test intent visible at a glance. The Builder replaced a growing
collection of static constants that couldn't handle combinations."*

---

## 9. BDD — Cucumber World Pattern

### What it is
Cucumber's mechanism for sharing state between step definitions.

### Files
`support/hooks.ts`, `step-definitions/ui/login.steps.ts`,
`features/ui/sauceDemo/login.feature`

### Key concepts

**Three layers:**
1. Feature file — Gherkin, plain English, readable by everyone
2. Step definitions — TypeScript mapping Gherkin to Playwright actions
3. World — shared context (browser, page, page objects)

**Why World pattern:**
Step definitions are separate functions — they can't share local
variables. World is injected as `this` into every step function.

**CRITICAL — function not arrow function:**
```typescript
// CORRECT
Given('I am on login page', async function(this: CustomWorld) {
  await this.loginPage.navigate();
});

// WRONG — arrow function has no own `this`
Given('I am on login page', async () => {
  await this.loginPage.navigate(); // `this` is undefined
});
```

**Before/After hooks:**
- `Before` — launches browser, creates context, creates page objects
- `After` — closes context, closes browser
- Runs before/after EACH scenario — fresh state per scenario

**Credentials not in feature file:**
Feature file uses `"log in as {string}"` not `"username/password"`.
Step definition looks up credentials from `testData.ts`.
Feature files are readable by everyone — passwords belong in code.

**Reuses existing page objects:**
BDD step definitions use the same `LoginPage` as Playwright tests.
No duplication of UI interaction logic.

### Interview answer
*"My BDD implementation uses Cucumber.js with the World pattern.
Feature files are plain Gherkin readable by anyone — BA, PO, client.
Each Gherkin line maps to a step definition in TypeScript. Step
definitions use the World — a shared context object holding browser,
page, and page objects, created fresh before each scenario.
One critical constraint: step definitions must use function keyword
not arrow functions — arrow functions have no own this, so the World
binding breaks. Credentials are kept out of feature files — the step
definition looks them up from testData.ts. BDD reuses the same
LoginPage page object used in regular Playwright tests — zero
duplication."*

---

## 10. storageState — Auth Persistence

### What it is
Playwright's mechanism for saving and reusing browser auth state.
Login once, reuse across all tests.

### Files
`global-setup.ts`, `playwright.config.ts`, `src/fixtures/fixtures.ts`

### Key concepts

**The problem:**
Every test that needs auth does a full UI login — navigate, fill,
click, wait. With 25 UI tests × 3 browsers = 75 login operations.

**The solution:**
`global-setup.ts` runs once before all tests:
1. Launch browser
2. Navigate to login page
3. Log in with standard user credentials
4. Save browser state (cookies + localStorage) to `.auth/user.json`
5. Close browser

Every test loads `.auth/user.json` into its context — already
authenticated, no UI login needed.

**What gets saved:**
- Cookies — session tokens
- localStorage — any auth data stored client-side
- sessionStorage — session-specific auth data
- IndexedDB — if application uses it for auth

**playwright.config.ts:**
```typescript
globalSetup: require.resolve('./global-setup')
```

**Updated fixture:**
```typescript
authenticatedPage: async ({ browser }, use) => {
  const context = await browser.newContext({
    storageState: '.auth/user.json'
  });
  const page = await context.newPage();
  // Already logged in — no UI login needed
  await use(new InventoryPage(page));
  await context.close();
}
```

**`.gitignore`:**
`.auth/` must never be committed — contains real session tokens.

**Multiple user roles:**
Different state files for different users:
- `.auth/standard-user.json`
- `.auth/locked-user.json`
- `.auth/admin.json`

### Interview answer
*"I use Playwright's storageState to avoid repeated logins.
global-setup.ts runs once before the entire test suite — it logs in
once and saves the browser's cookies and localStorage to
.auth/user.json. Every test that needs auth loads that file into
its browser context via browser.newContext({ storageState }).
The browser is already authenticated — no network requests for login.
With 25 UI tests across 3 browsers, this eliminates 75 login
operations per CI run. The .auth folder is gitignored — it contains
real session tokens that must never be committed."*

---

## 11. Network Interception — page.route()

### What it is
Playwright's built-in request interception mechanism.
Intercept, mock, modify, or abort HTTP requests during tests.

### File
`tests/ui/sauceDemo/network.spec.ts`

### Key concepts

**Four patterns:**

**1. route.abort() — block requests:**
```typescript
await page.route('**/*.png', route => route.abort());
```
Prevents images loading. Tests layout without images.
Also useful for blocking analytics, ads, trackers.

**2. route.continue() — modify requests:**
```typescript
await page.route('**/inventory.html', async route => {
  await route.continue({
    headers: { ...route.request().headers(), 'x-test': 'value' }
  });
});
```
Passes request through but modifies headers.

**3. route.fulfill() — mock responses:**
```typescript
await page.route('**/api/users', route => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([{ id: 1, name: 'Mock User' }])
  });
});
```
Returns fake data without hitting real server.
Makes tests deterministic — same response every time.

**4. page.on('request') — monitor:**
```typescript
page.on('request', request => {
  console.log(request.url());
});
```
Records all outgoing requests. Useful for debugging.

**Why mock external APIs:**
Real APIs can be slow, rate-limited, or unavailable in CI.
Mocking makes tests fast and deterministic.
Negative scenarios (500 errors, timeouts) are hard to trigger
against real APIs — easy to mock.

### Interview answer
*"I use page.route() for four scenarios. route.abort() blocks
requests — I block images to test layout resilience. route.continue()
modifies requests — adding custom headers. route.fulfill() returns
mock responses — making tests deterministic and removing external
API dependencies. page.on('request') monitors outgoing calls for
debugging. The most valuable use in production is mocking third-party
APIs like payment gateways — I can return a mock success response
for happy path tests and a mock failure for negative tests, without
depending on Stripe sandbox availability."*

---

## 12. Accessibility Testing — axe-core

### What it is
Automated WCAG 2.1 accessibility scanning using axe-core.

### File
`tests/accessibility/sauceDemo.spec.ts`

### Key concepts

**Three tests:**
1. WCAG 2.1 AA scan — full scan, filter critical/serious violations
2. Colour contrast — `color-contrast` rule only
3. Keyboard navigation — `tabindex`, `scrollable-region-focusable`

**Named import — critical:**
```typescript
import { AxeBuilder } from '@axe-core/playwright'; // CORRECT
import AxeBuilder from '@axe-core/playwright';      // WRONG — undefined
```
Package exports as named, not default.

**Why assert >= 0 not === 0:**
Sauce Demo is a third-party demo site — we don't control it.
Asserting zero violations would make tests fragile if Sauce Labs
changes their CSS. The value is demonstrating axe-core capability,
not certifying the site.

**Impact levels:**
- `critical` — must fix, blocks users
- `serious` — should fix, significantly impacts users
- `moderate` — design decision required
- `minor` — nice to have

**Legal context:**
Accessibility testing is increasingly required in Australia under
the Disability Discrimination Act. Enterprise clients — especially
government — require WCAG 2.1 AA compliance.

### Interview answer
*"I use axe-core for automated WCAG 2.1 accessibility scanning.
Three tests: a full WCAG 2.1 AA scan filtering only critical and
serious violations, a colour contrast check, and a keyboard
navigation check. I use the named import — AxeBuilder from
@axe-core/playwright — the default import returns undefined at
runtime even though TypeScript doesn't catch it at compile time.
I assert violations >= 0 rather than === 0 because Sauce Demo is
a third-party site I don't control. The value is demonstrating
the ability to run axe scans and interpret severity levels, not
certifying someone else's site passes WCAG."*

---

*Last updated: August 2026*
*Add new implementations here as they are built.*