# Design Patterns — Justification and Implementation

> This document explains every design pattern used in this framework,
> why it was chosen, what problem it solves, and where it is implemented.

---

## Table of Contents

1. [Page Object Model](#1-page-object-model)
2. [Factory Pattern](#2-factory-pattern)
3. [Inheritance](#3-inheritance)
4. [Strategy Pattern](#4-strategy-pattern)
5. [Singleton Pattern](#5-singleton-pattern)
6. [Repository Pattern](#6-repository-pattern)
7. [Builder Pattern](#7-builder-pattern)
8. [Intentional Non-Pattern — GraphQLClient](#8-intentional-non-pattern--graphqlclient)

---

## 1. Page Object Model

**Location:** `src/pages/`

### Problem it solves

Without POM, UI tests contain raw selectors and interaction logic scattered across every test file. When a selector changes — and they always do — you update it in every test that uses it. With 25 UI tests across 3 browsers, that is a maintenance problem.

### How it is implemented

Each page of the application under test has a corresponding class in `src/pages/`. The class owns all selectors and interaction methods for that page. Tests call methods on the page object — they never touch selectors directly.

```typescript
// Without POM — selector repeated in every test
await page.locator('#user-name').fill('standard_user');
await page.locator('#password').fill('secret_sauce');
await page.locator('#login-button').click();

// With POM — intent is clear, selector is in one place
await loginPage.login('standard_user', 'secret_sauce');
```

### Why this pattern fits here

The Sauce Demo UI is the primary application under test. It has multiple pages (login, inventory, checkout) each with distinct selectors. POM maps naturally to this structure and makes the test suite maintainable as the UI evolves.

### Alternatives considered

- **Inline selectors** — rejected because any selector change requires updating multiple test files
- **CSS selector constants** — partially solves the problem but still mixes interaction logic into tests

---

## 2. Factory Pattern

**Location:** `src/fixtures/fixtures.ts`

### Problem it solves

Playwright tests need a configured browser context, page instance, and sometimes pre-authenticated state before each test. Without fixtures, every test file sets this up manually — duplicated boilerplate that diverges over time.

### How it is implemented

Playwright's custom fixture mechanism acts as a factory — it creates pre-configured objects and injects them into tests. The fixture file defines what each test receives, and Playwright handles instantiation.

```typescript
// Without fixtures — setup repeated in every test
test('inventory test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'secret_sauce');
  // now the actual test...
});

// With fixtures — pre-configured state injected
test('inventory test', async ({ authenticatedPage }) => {
  // already logged in, ready to test
});
```

### Why this pattern fits here

Multiple test suites (inventory, checkout) require an authenticated session. Centralising that setup in a fixture eliminates duplication and ensures every test starts from a consistent, known state.

### Alternatives considered

- **`beforeEach` in every test file** — rejected because it duplicates authentication logic and creates divergence risk
- **Global setup** — considered but fixtures are more granular and composable

---

## 3. Inheritance

**Location:** `src/api/base/ApiClient.ts` → `src/api/clients/RestfulBookerClient.ts`, `src/api/clients/ReqResClient.ts`

### Problem it solves

Every API client needs to make HTTP requests with consistent headers, base URLs, and error handling. Without inheritance, each client reimplements the same GET, POST, PUT, PATCH, DELETE methods.

### How it is implemented

`ApiClient` is the base class. It owns the HTTP methods and shared configuration. Subclasses extend it and add endpoint-specific methods without re-implementing transport logic.

```typescript
// Base class — shared HTTP methods
export class ApiClient {
  async get(endpoint: string): Promise<APIResponse> { ... }
  async post(endpoint: string, data: object): Promise<APIResponse> { ... }
  async put(endpoint: string, data: object): Promise<APIResponse> { ... }
  async patch(endpoint: string, data: object): Promise<APIResponse> { ... }
  async delete(endpoint: string): Promise<APIResponse> { ... }
  setHeader(key: string, value: string): void { ... }
}

// Subclass — endpoint-specific logic, inherits HTTP methods
export class RestfulBookerClient extends ApiClient {
  async login(username: string, password: string): Promise<APIResponse> { ... }
  async createBooking(booking: Booking): Promise<APIResponse> { ... }
  async getBookingById(id: number): Promise<APIResponse> { ... }
}
```

### Why this pattern fits here

The REST APIs under test (ReqRes, Restful Booker) share the same HTTP transport needs but have different endpoints and authentication mechanisms. Inheritance separates the shared concern (HTTP) from the specific concern (endpoint logic).

### Alternatives considered

- **Composition** — each client could hold an instance of a shared HTTP helper instead of extending it. Rejected because the clients ARE API clients — inheritance accurately models the relationship
- **One large client class** — rejected because it violates single responsibility and becomes hard to maintain

---

## 4. Strategy Pattern

**Location:** `playwright.config.ts` — `projects` array

### Problem it solves

Tests need to run across multiple browsers (chromium, firefox, webkit). Without a strategy pattern, browser selection is hardcoded and changing it requires modifying test files or build scripts.

### How it is implemented

Playwright's `projects` configuration is a strategy implementation. Each project defines a browser strategy. The test runner selects which strategies to execute without changing the tests themselves.

```typescript
projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
],
```

### Why this pattern fits here

Cross-browser testing is a core requirement. The Strategy pattern makes browser selection pluggable — adding a new browser, or running only one browser in CI, requires a config change not a code change.

### Alternatives considered

- **Hardcoded browser in tests** — rejected because it makes cross-browser testing impossible without test modification
- **Environment variable switching** — partially implemented via `process.env.CI` for worker count, but projects are the cleaner mechanism for browser strategy

---

## 5. Singleton Pattern

**Location:** `src/db/client.ts`

### Problem it solves

Opening a database connection is expensive — it involves a TCP handshake, authentication, and memory allocation. If every test opens its own connection, a suite of 7 database tests creates 7 connections. Databases have connection limits. Connection overhead also slows test execution.

### How it is implemented

`DbClient` stores one `Client` instance at the class level. The first call to `getInstance()` creates the connection. Every subsequent call returns the existing one. The connection is closed once via `disconnect()` in `afterAll`.

```typescript
export class DbClient {
  private static instance: Client | null = null;

  static async getInstance(): Promise<Client> {
    if (!DbClient.instance) {
      // Only runs once — first call only
      DbClient.instance = new Client({ ... });
      await DbClient.instance.connect();
    }
    // All subsequent calls return the same connection
    return DbClient.instance;
  }

  static async disconnect(): Promise<void> {
    if (DbClient.instance) {
      await DbClient.instance.end();
      DbClient.instance = null;
    }
  }
}
```

### Why this pattern fits here

The database test suite runs sequentially. One shared connection is correct — it avoids connection pool exhaustion and keeps test execution fast. The `private static instance` ensures nothing outside the class can create additional connections.

### Alternatives considered

- **New connection per test** — rejected because of connection overhead and pool limits
- **Connection pool (pg.Pool)** — valid for production applications but over-engineered for a test suite running sequentially

---

## 6. Repository Pattern

**Location:** `src/db/repositories/userRepository.ts`

### Problem it solves

Without a repository, tests contain raw SQL queries. If the table schema changes — a column is renamed, a table is split — every test that queries that table needs updating. SQL scattered across test files is also hard to read and maintain.

### How it is implemented

`UserRepository` owns all SQL for the `users` table. Tests call named methods — `getAll()`, `getByName()`, `create()`, `deleteByName()` — without knowing the underlying SQL.

```typescript
// Without Repository — SQL in test files
const result = await db.query(
  'SELECT * FROM users WHERE name = $1', ['Jane Doe']
);

// With Repository — intent is clear, SQL is in one place
const user = await UserRepository.getByName('Jane Doe');
```

### Why this pattern fits here

The database layer cross-validates API responses against persisted data. Tests need to query the database frequently. Repository centralises that logic and makes the tests read like specifications rather than SQL scripts.

### Alternatives considered

- **Raw queries in tests** — rejected because schema changes require updating every test
- **ORM (Prisma, TypeORM)** — considered but over-engineered for a test validation layer. Raw SQL with a repository wrapper gives full control and is easier to explain in interviews

---

## 7. Builder Pattern

**Location:** `src/builders/BookingBuilder.ts`, `src/builders/UserBuilder.ts`

### Problem it solves

Complex test objects like `Booking` have 6 fields including a nested object (`bookingdates`). Static constants in `testData.ts` work for fixed scenarios but become inflexible when tests need slight variations — a booking without a deposit, a premium stay, a minimal booking. Without Builder, each variation requires a new constant.

### How it is implemented

Each builder has private fields with sensible defaults. `withX()` methods override individual fields and return `this` for chaining. `build()` assembles and returns the final object.

```typescript
// Static constant — opaque, fixed, not flexible
const booking = RESTFUL_BOOKER_BOOKING.VALID;

// Builder — explicit, flexible, self-documenting
const booking = new BookingBuilder()
  .withFirstName('Janet')
  .withTotalPrice(200)
  .withoutDeposit()
  .build();

// Preset — named scenario, maximum readability
const booking = new BookingBuilder().asPremiumStay().build();
```

### Why `return this` enables chaining

Every `withX()` method returns the builder instance itself. This means each call can be chained directly onto the previous one without storing intermediate results.

### Why this pattern fits here

Restful Booker tests need bookings in multiple states — valid, updated, partial, premium, minimal. Database tests need users with different names and jobs for insert and delete scenarios. Builder makes each variation readable and eliminates the need for a growing list of static constants.

### Alternatives considered

- **Object spread** — `{ ...BOOKING.VALID, totalprice: 200 }` works for simple overrides but becomes unreadable for multiple field changes and does not support named presets
- **Factory functions** — similar to Builder but without chaining. Builder is more readable for objects with many optional fields

---

## 8. Intentional Non-Pattern — GraphQLClient

**Location:** `src/api/clients/GraphQLClient.ts`

### Why GraphQLClient does NOT extend ApiClient

This is a deliberate design decision worth explaining.

`ApiClient` provides GET, POST, PUT, PATCH, DELETE methods. GraphQL uses only POST — to a single endpoint — for all operations. Extending `ApiClient` would give `GraphQLClient` four methods it can never use, which is misleading and violates the Interface Segregation Principle.

Instead, `GraphQLClient` is a standalone class that uses `APIRequestContext` directly. It exposes one method — `query<T>()` — which is all GraphQL needs.

```typescript
// GraphQLClient is NOT a subclass of ApiClient
export class GraphQLClient {
  async query<T = unknown>(
    query: string,
    variables?: Record<string, unknown>
  ): Promise<T> {
    // Always POST, always to the same endpoint
    const response = await this.request.post(this.endpoint, { ... });
    return response.json() as T;
  }
}
```

This demonstrates that design patterns are tools, not rules. The right decision is sometimes to consciously not apply a pattern.

---

*Last updated: June 2026*
*Framework version: v1*