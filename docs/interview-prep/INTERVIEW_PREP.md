
# Interview Prep — QA Automation Portfolio

> Private rehearsal document. Not part of the public repo.
> Goal: be able to explain every design decision conversationally,
> not by reciting — by understanding the trade-off well enough to
> defend it if challenged.

How to use this: read a question, answer it out loud before reading
the suggested answer, then compare. The gap between your answer and
the suggested one is what to practise.

---

## 1. Design Patterns

### Q: Why did you use the Page Object Model?

**A:** UI selectors change constantly as the application evolves. Without
POM, if a `data-test` attribute changes, you're hunting through every
test file that touches that element. With POM, the selector lives in
exactly one place — the page object — so a UI change means one file
edit, not a search-and-replace across the suite. It also makes tests
read like specifications: `loginPage.login(username, password)` tells
you what the test does without exposing how it's done.

**If pushed further — "isn't this just basic abstraction?":**
Yes, and that's the point. POM isn't exotic, it's the industry-standard
way of applying separation of concerns to UI tests specifically. The
skill isn't knowing POM exists — it's applying it consistently and
knowing where the boundary sits (selectors and raw interactions in the
page object, assertions and business logic in the test).

---

### Q: Why Factory pattern for your fixtures instead of beforeEach?

**A:** Several of my test suites need a logged-in session before the
test even starts — checkout tests need login *and* an item already in
the cart. If I used `beforeEach` in every file, that setup logic gets
duplicated and drifts out of sync over time. With Playwright's fixture
system, I declare what a test needs — say, `checkoutPage` — and the
fixture handles login, add-to-cart, and navigation automatically before
the test body runs. The test only contains the behaviour it's actually
testing.

**Concrete example to cite:** my `checkoutPage` fixture does login →
assert inventory loaded → add a Backpack to cart → go to cart → assert
cart loaded → proceed to checkout — all before the test starts. Every
checkout test just starts mid-flow, already in the right state.

**If pushed — "why not a helper function instead of a fixture?":**
A helper function would need to be manually called and the developer
has to remember to call it, in the right order, in every test. A
fixture is declared once in the function signature and Playwright
guarantees it runs before the test body and tears down after —
including cleanup, even on failure. It's enforced, not just available.

---

### Q: Walk me through your Inheritance design for API clients.

**A:** I have a base `ApiClient` class that owns the actual HTTP
mechanics — GET, POST, PUT, PATCH, DELETE, all built on Playwright's
`APIRequestContext`, plus shared header management. `RestfulBookerClient`
and `ReqResClient` extend that base class and add only what's specific
to their API — login, createBooking, that kind of thing. The HTTP
plumbing is written once; each client adds its own domain logic on top.

**If pushed — "why not composition instead of inheritance here?":**
Fair challenge — composition is often preferred over inheritance.
I considered it, but in this case the relationship genuinely is "is-a" —
a `RestfulBookerClient` *is* an API client, it doesn't just *use* one.
There's no risk of the fragile base class problem here because the base
class is small, stable, and unlikely to grow new methods that subclasses
don't want. If `ApiClient` started accumulating unrelated responsibilities,
I'd reconsider.

---

### Q: Why is your browser strategy implemented as a Strategy pattern?

**A:** Playwright's `projects` array in the config is effectively the
Strategy pattern — each project (chromium, firefox, webkit) defines an
interchangeable algorithm for "how to run this test," and the test
runner picks which strategies to execute without the test code knowing
or caring which browser it's running on. I can add Edge as a fourth
project tomorrow and every existing UI test runs against it with zero
code changes.

**If pushed — "is this really Strategy or just configuration?":**
It's a fair line to draw carefully — but the defining feature of Strategy
is interchangeable algorithms behind a common interface, selected at
runtime without the calling code changing. That's exactly what's
happening: the test code calls the same Playwright APIs regardless of
which project executes it. Whether you call the implementation
"configuration" or "Strategy," the behaviour matches the pattern's intent.

---

### Q: Explain your Singleton implementation for the database connection.

**A:** Opening a PostgreSQL connection involves a TCP handshake and
authentication — it's not free. If every test in my 7-test database
suite opened its own connection, that's wasted overhead per test, and
worse, real databases have connection limits, so a larger suite could
exhaust the pool. My `DbClient.getInstance()` checks if a connection
already exists; if not, it creates one and stores it as a private static
field. Every subsequent call returns that same connection. I close it
once, in `afterAll`, after the whole suite finishes.

**If pushed — "isn't Singleton considered an anti-pattern?":**
It gets that reputation when it's used to smuggle global mutable state
into an application and makes code hard to test because everything
secretly depends on shared state. Here it's the opposite situation —
I'm *in* a test suite, the "global state" is a single, intentional,
read-mostly database connection that genuinely should be shared, and
I explicitly manage its lifecycle with `disconnect()`. It's the textbook
correct use case for Singleton, not the anti-pattern version.

---

### Q: Why Repository pattern for your database layer?

**A:** Without it, my tests would have raw SQL strings scattered
everywhere — `SELECT * FROM users WHERE name = $1`. If the schema
changes — a column rename, a table split — I'd have to hunt down every
test with embedded SQL. `UserRepository` owns all the SQL for the users
table behind named methods: `getAll()`, `getByName()`, `create()`,
`deleteByName()`. Tests call those methods and read like specifications,
not database scripts.

**If pushed — "why not use an ORM like Prisma or TypeORM?":**
I considered it, but for a test validation layer, an ORM is overhead
without proportional benefit — I'm not managing complex relationships
or migrations at application scale, I'm validating a handful of tables.
Raw SQL with a Repository wrapper gives me full visibility into exactly
what query runs, which matters when I'm debugging a test failure and
need to know precisely what was sent to the database — an ORM would add
a layer of abstraction I'd have to look through.

---

### Q: Why Builder pattern, and where did you actually use it?

**A:** My `Booking` model has six fields including a nested date range
object. Static test data constants work fine for one fixed scenario,
but the moment I needed a booking without a deposit, or a premium
long-stay booking, or a minimal booking with no extras, I'd need a new
constant for every combination. `BookingBuilder` has sensible defaults
and `withX()` methods that return `this`, so I can chain only the
overrides I need: `new BookingBuilder().withTotalPrice(200).withoutDeposit().build()`.
I also added named presets like `asPremiumStay()` for common scenarios,
which makes the test's intent visible at a glance.

**Concrete detail to cite if asked for depth:** I also added `get`/`set`
accessors with validation — setting a negative total price throws an
error immediately, which is a deliberate use of TypeScript's accessor
syntax to enforce invariants at the point of assignment rather than
discovering bad data later in an assertion failure.

**If pushed — "why not just use object spread for overrides?":**
Object spread — `{ ...DEFAULT, totalprice: 200 }` — works fine for one
or two field overrides, but it doesn't scale to expressive named
scenarios, and it gives up the validation a setter can provide. Builder
also makes invalid combinations harder to construct by accident, since
each step is a deliberate method call rather than an object literal
anyone can mutate freely.

---

### Q: You deliberately did NOT use inheritance for your GraphQL client — walk me through that.

**A:** This is probably the decision I'm proudest of explaining, because
it's not "I used pattern X," it's "I recognised pattern X didn't fit and
said so." My REST `ApiClient` exposes GET, POST, PUT, PATCH, DELETE.
GraphQL only ever uses POST, to a single endpoint — the operation is
defined by the request body, not the URL or HTTP verb. If `GraphQLClient`
extended `ApiClient`, it would inherit four methods it can never
meaningfully use, which is actively misleading to anyone reading the
code later and a textbook violation of the Interface Segregation
Principle. So I built it as a standalone class with exactly one method,
`query<T>()`, that does what GraphQL actually needs.

**If pushed — "doesn't that break consistency with the rest of your framework?":**
I'd argue consistency for its own sake is the wrong goal — the goal is
each class accurately representing what it does. Forcing every API
client through the same inheritance chain regardless of whether the
underlying protocol matches would be consistency at the expense of
correctness. I documented this explicitly in my design patterns doc
specifically so it reads as a decision, not an oversight.

---

## 2. Technology Decisions (ADRs)

### Q: Why Playwright over Selenium?

**A:** *(See ADR-001 for full detail — summarise the core reasons here once you've reviewed it: auto-waiting, built-in parallelisation, multi-browser support out of the box, modern API design, faster execution.)*

### Q: Why TypeScript over plain JavaScript?

**A:** *(See ADR-002 — compile-time error catching, autocomplete/IntelliSense for large codebases, interfaces enforcing API contracts, refactoring safety at scale.)*

### Q: Why did you switch from SQLite to PostgreSQL midway through the project?

**A:** SQLite was the original plan because it's zero-configuration —
no service to run, just a file. But as I got into actually building the
database layer, I realised the goal wasn't "fastest to set up," it was
"most representative of what I'll actually be tested on or work with in
a real QA role." PostgreSQL is the standard relational database at
every company on my target list — FinTech, product companies — and
SQLite simply isn't used in production at that scale. Switching also
meant I had to set up Docker and a PostgreSQL service container in
GitHub Actions CI, which on its own demonstrates a skill SQLite would
have let me skip entirely. The honest trade-off is local setup now
requires Docker running, which I documented clearly in the README's
Quick Start.

**If pushed — "doesn't switching mid-project show poor planning?":**
I'd reframe that — recognising a decision needs revisiting when new
information changes the calculus, and documenting *why* in an ADR
rather than silently changing it, is exactly the kind of judgement a
senior engineer should show. The ADR itself — including the "Alternatives
considered" and "Consequences" sections — is the artefact that proves
I made the change deliberately, not because I got something wrong
initially.

### Q: Why did you choose Restful Booker as your second API testing target?

**A:** *(See ADR-005 — cookie-based token auth as a contrast to ReqRes's
static API key, full CRUD on a stateful nested resource justifying the
Builder pattern, and the genuine negative-test material from its
documented quirk: unauthenticated DELETE returns 200, not 403.)*

**Strong example to have ready:** "I found that Restful Booker's sandbox
returns 200 instead of the documented 403 when you DELETE a booking
without authentication. I verified this wasn't a bug in my test — I
reproduced it manually in Postman with an identical unauthenticated
request and got the same result. Rather than treating this as a flaky
test or silently ignoring it, I wrote it as an explicit negative test
that documents the *observed* behaviour, with inline comments explaining
the discrepancy from the documented contract. That's a real example of
distinguishing 'what the API is supposed to do' from 'what it actually
does' — which is the actual job of a QA engineer."

### Q: Why did you include GraphQL testing at all?

**A:** *(See ADR-008 — differentiator from typical REST-only QA portfolios,
genuinely different validation problem since GraphQL always returns 200
even on errors, low marginal cost given AJV schema validation infrastructure
already existed.)*

---

## 3. TypeScript Depth — be ready to point at real code, not just name the feature

### Q: Give me an example of generics in your codebase.

**A:** `UserRepository.query<T extends object>()` — it's a generic method
that lets the caller specify the expected shape of the result rows,
constrained to object types since database rows are never primitives.
So `UserRepository.query<{ name: string; job: string }>('SELECT name, job FROM users WHERE name = $1', [name])`
gives me compile-time type safety on the result without writing a
separate method for every possible query shape.

### Q: What's an example of TypeScript utility types in your project?

**A:** In my `Booking` model I derived four types from the base interface
rather than duplicating it: `Pick<Booking, 'firstname' | 'lastname'>`
for when I only need guest name fields, `Omit<Booking, 'bookingdates'>`
for constructing a booking before dates are assigned, `Required<Booking>`
to enforce the otherwise-optional `additionalneeds` field is present for
a "complete" booking, and `Readonly<Booking>` to make a confirmed
booking immutable — TypeScript catches any attempt to mutate it at
compile time, not runtime.

### Q: Where do you use abstract classes and why?

**A:** `BasePage` is abstract with two abstract methods — `navigate()`
and `assertPageLoaded()`. Every page object extends it and is *forced*
by the compiler to implement both, because TypeScript won't let you
instantiate a concrete subclass that's missing an abstract method. That
means I can't accidentally forget to define what "this page has loaded"
means for a new page object — the compiler catches it before I even run
a test.

### Q: Tell me about error handling in your framework.

**A:** Every HTTP method in `ApiClient` wraps the actual Playwright
request in try/catch. If the request fails at the network level —
timeout, DNS failure, connection refused — I catch the raw error and
re-throw a new one with context: which method, which URL. That's
deliberate error wrapping — I'm not swallowing the original failure,
I'm adding information that makes debugging faster, because a bare
Playwright network error doesn't tell you which of your 8 API calls in
a test actually failed.

---

## 4. The "walk me through your whole framework" question

Use this as your 90-second elevator pitch structure if asked to give
an overview:

1. **What it is** — a TypeScript/Playwright automation framework
   covering UI, REST API (two different auth models), GraphQL,
   PostgreSQL database validation, Postman/Newman, and unit tests —
   76 unique tests, 228 executions across 3 browsers, fully wired into
   a green CI/CD pipeline with branch protection and nightly regression.

2. **The differentiator** — most QA portfolios stop at UI or REST.
   Mine demonstrates cross-service validation: calling an API, then
   querying the database directly to verify the response matches what
   was actually persisted — that's the specific skill gap between a
   QA who scripts tests and an SDET who understands the system.

3. **The architecture decisions are documented, not accidental** —
   7 design patterns, each with a written justification of the problem
   it solves and the alternatives I rejected, plus Architecture Decision
   Records for the bigger technology calls like PostgreSQL over SQLite.

4. **The thing I'm proudest of** — recognising when *not* to apply a
   pattern. My GraphQL client deliberately doesn't inherit from my REST
   client, because GraphQL's transport model is fundamentally different,
   and forcing that inheritance would have been misleading. That's the
   one example I'd lead with if asked "tell me about a design decision
   you're proud of."

---

## 5. Weak spots to be honest about if asked

Don't pretend these don't exist — own them confidently if asked:

- **BDD (Cucumber), accessibility testing, performance testing (k6), AI integration** are all on the v2 roadmap, not yet built. If asked "have you done BDD," the honest answer is: "Not in this framework yet — it's roadmapped for v2, my focus for v1 was depth across UI/API/DB/GraphQL/unit testing rather than breadth into every possible testing discipline."
- **Only 4 of 8 ADRs are written.** If asked, be honest: "I prioritised documenting the decisions with the most interesting trade-offs — Playwright vs Selenium, TypeScript vs JavaScript, PostgreSQL vs SQLite, and why I included GraphQL at all. The remaining ones (BDD tooling choice, AI integration rationale) are for features I haven't built yet, so I'll write those ADRs when I build them."

---

*Last updated: 30 June 2026 — update this as new patterns/decisions are added.*
