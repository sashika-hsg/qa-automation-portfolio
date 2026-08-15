# QA Automation Portfolio

> A production-grade QA automation framework built from scratch to demonstrate
> senior QA engineering and SDET capabilities across UI, API, database,
> accessibility, BDD, and AI-powered testing.

[![CI Pipeline](https://github.com/sashika-hsg/qa-automation-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/sashika-hsg/qa-automation-portfolio/actions/workflows/ci.yml)
[![Nightly Regression](https://github.com/sashika-hsg/qa-automation-portfolio/actions/workflows/nightly.yml/badge.svg)](https://github.com/sashika-hsg/qa-automation-portfolio/actions/workflows/nightly.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.44+-purple.svg)](https://playwright.dev/)

---

## Author

**Sashika Samaragunaratne**
Senior QA Engineer | SDET | Melbourne, Australia
[GitHub](https://github.com/sashika-hsg/qa-automation-portfolio) · [LinkedIn](https://www.linkedin.com/in/sashika-samaragunaratne/)

---

## Project Status

| Version | Status | Focus |
| --- | --- | --- |
| **v1 — Current** | 🔄 In progress — 116 unique Playwright tests + 5 BDD scenarios + 45 Newman assertions, green CI pipeline | Core automation framework |
| **v2 — Planned** | ⏳ Not started | Advanced tooling and cloud |

---

## What This Project Demonstrates

This is not a tutorial project. Every design decision is intentional, documented, and explainable. Built to showcase the full skillset expected of a Senior QA Engineer or SDET.

| Skill | Tool | Status |
| --- | --- | --- |
| UI automation | Playwright + POM | ✅ 62 tests across Sauce Demo + The Internet, 3 browsers |
| API testing — REST | Playwright request context + AJV | ✅ ReqRes + Restful Booker, 15 tests |
| Authentication flows | Static API key + cookie-based token + Basic Auth + `storageState` session persistence | ✅ Four auth models implemented |
| API testing — GraphQL | Playwright + custom GraphQLClient | ✅ 10 tests, Pokémon GraphQL API |
| Payment API testing | Stripe sandbox + Postman/Newman | ✅ 6 requests, 20 assertions, full payment lifecycle |
| Database validation | PostgreSQL + Docker + Repository pattern | ✅ 7 tests, cross-validated against API |
| API collections | Postman + Newman | ✅ 45 assertions (ReqRes 25 + Stripe 20), CI-integrated |
| Unit testing | Playwright test runner | ✅ 19 tests — framework code tested in isolation |
| Schema validation | AJV | ✅ Implemented across all API tests |
| TypeScript language depth | Generics, discriminated unions, utility types, enums, accessors, abstract classes | ✅ 12+ core constructs implemented and test-covered |
| BDD | Cucumber.js + Gherkin | ✅ 5 scenarios, login feature, World pattern |
| Accessibility testing | axe-core | ✅ 3 tests, WCAG 2.1 AA, colour contrast, keyboard navigation |
| Network interception | Playwright `page.route()` | ✅ Request mocking, blocking, header modification |
| iframe handling | Playwright `frameLocator()` | ✅ TinyMCE editor interaction |
| Locator strategy | `getByRole`, `getByPlaceholder`, `getByTestId`, `getByText` | ✅ Semantic locators across Sauce Demo page objects |
| UI element interactions | Dropdowns, checkboxes, alerts, hovers | ✅ The Internet test suite |
| Security testing | Custom security spec | ⏳ Phase 8 |
| Performance testing | k6 | ⏳ Phase 8 |
| Visual regression | Playwright screenshots | ⏳ Phase 6 |
| Mobile testing | Playwright viewport | ⏳ Phase 6 |
| AI integration | Claude API | ⏳ Phase 10 |
| CI/CD pipeline | GitHub Actions — 2 workflows, branch protection | ✅ Complete — green pipeline |
| Cloud monitoring | AWS CloudWatch | ⏳ Phase 11 |
| Reporting | Allure + Playwright HTML | ⏳ Phase 11 |

---

## Design Patterns

Every pattern is justified — not just used for the sake of it. Full reasoning, alternatives considered, and code examples are documented in [`docs/design/DESIGN_PATTERNS.md`](docs/design/DESIGN_PATTERNS.md).

| Pattern | Where applied | Status | Problem it solves |
| --- | --- | --- | --- |
| Page Object Model | `src/pages/` | ✅ Implemented | Selector abstraction — one change point per UI element |
| Custom Fixtures (Factory) | `src/fixtures/fixtures.ts` | ✅ Implemented | Pre-configured page and auth state injected into tests |
| Inheritance | `ApiClient` → `ReqResClient`, `RestfulBookerClient` | ✅ Implemented | Shared HTTP methods, endpoint-specific logic in subclasses |
| Strategy | `playwright.config.ts` projects | ✅ Implemented | Pluggable browser selection (chromium/firefox/webkit) |
| Singleton | `src/db/client.ts` | ✅ Implemented | One shared PostgreSQL connection across all DB tests |
| Repository | `src/db/repositories/userRepository.ts` | ✅ Implemented | DB engine agnostic data access — SQL isolated from tests |
| Builder | `src/builders/BookingBuilder.ts`, `UserBuilder.ts` | ✅ Implemented | Readable, flexible test data construction with method chaining |
| Facade | `src/pages/sauceDemo/index.ts`, `src/pages/theInternet/index.ts` | ✅ Implemented | Single import point for page objects — hides internal file structure |
| World (Cucumber) | `support/hooks.ts` | ✅ Implemented | Shared browser/page/page-object state across all Cucumber step definitions |

The framework also documents an intentional **non-pattern decision** — `GraphQLClient` does not extend `ApiClient`, since GraphQL's single-endpoint POST-only transport makes REST method inheritance misleading. See the design patterns doc for the full reasoning.

---

## Architecture Diagrams

Visual documentation of the framework architecture — created in draw.io.

| # | Diagram | What it shows |
| --- | --- | --- |
| 01 | [System Context](docs/design/diagrams/01-system-context.svg) | Framework boundary — external systems and trigger flow |
| 02 | [Container](docs/design/diagrams/02-container-diagram.svg) | Internal modules — test types, framework components, infrastructure |
| 03 | [Page Object Hierarchy](docs/design/diagrams/03-page-object-hierarchy.svg) | IPage → BasePage → all page objects |
| 04 | [API Client Hierarchy](docs/design/diagrams/04-api-client-hierarchy.svg) | ApiClient → REST clients — deliberate non-inheritance for GraphQL and Stripe |
| 05 | [CI/CD Pipeline](docs/design/diagrams/05-cicd-pipeline.svg) | What triggers what — quality gate, parallel execution |
| 06 | [BDD Flow](docs/design/diagrams/06-bdd-flow.svg) | Feature file → step definitions → World → page objects |
| 07 | [Database Layer](docs/design/diagrams/07-database-layer.svg) | Singleton → Repository → cross-service validation |

---

## TypeScript Language Depth

Beyond basic syntax, this framework deliberately exercises core TypeScript and OOP constructs — each implemented where it genuinely fits, not forced in for the sake of coverage.

| Construct | Where applied |
| --- | --- |
| Abstract classes & methods | `BasePage` — every page object must implement `navigate()` and `assertPageLoaded()` |
| Interfaces (`implements`) | `BasePage implements IPage` — compiler-enforced contract |
| Generics with default types | `GraphQLClient.query<T = unknown>()` — type-safe, reusable query method |
| Discriminated unions | `ApiResult<T>` — `{ success: true; data: T } | { success: false; error: string }`, narrows in `if/else` |
| Error handling (`try/catch`, `throw`) | `ApiClient` — every HTTP method wraps failures with contextual error messages |
| `get`/`set` accessors | `BookingBuilder` — validated property access with custom errors |
| Array methods (`filter`, `find`, `reduce`) | `DataUtils` — booking aggregation and search utilities |
| Utility types (`Pick`, `Omit`, `Required`, `Readonly`, `Partial`) | `Booking.ts` — derived types without duplicating the base interface |
| Enums | `HttpMethod`, `HttpStatus`, `UserRole`, `TestStatus`, `TestSeverity`, `TestCategory` — prevent magic strings/numbers |
| `unknown` over `any` | `GraphQLClient`, `userRepository` — type-safe handling of untyped API/DB responses |

---

## Technology Stack

| Layer | Technology | Version |
| --- | --- | --- |
| Language | TypeScript | 5.x |
| UI Testing | Playwright | 1.44+ |
| API Testing — REST | Playwright request context | 1.44+ |
| API Testing — GraphQL | Playwright + custom client | 1.44+ |
| BDD | Cucumber.js + Gherkin | 12.x |
| Accessibility | axe-core | 4.x |
| API Collections | Postman + Newman | Latest |
| Database | PostgreSQL 15 via Docker | 15 |
| Container Runtime | Docker Desktop | Latest |
| Schema Validation | AJV | 8.x |
| Reporting | Allure + Playwright HTML | 3.x |
| CI/CD | GitHub Actions | Latest |
| Cloud Monitoring | AWS CloudWatch | ⏳ Planned |
| AI Integration | Claude API — Anthropic | ⏳ Planned |
| Performance | k6 | ⏳ Planned |
| Code Quality | ESLint v8 + Prettier + Husky | Latest |

---

## Applications Under Test

| Application | Type | URL |
| --- | --- | --- |
| Sauce Demo | UI — e-commerce | https://www.saucedemo.com |
| The Internet | UI — edge cases | https://the-internet.herokuapp.com |
| Restful Booker | UI + REST API | https://restful-booker.herokuapp.com |
| ReqRes | REST API | https://reqres.in |
| Pokémon GraphQL | GraphQL API | https://graphql-pokemon2.vercel.app |
| Stripe | Payment API (sandbox) | https://api.stripe.com |

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/sashika-hsg/qa-automation-portfolio.git
cd qa-automation-portfolio

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Copy environment variables
cp .env.example .env

# Start PostgreSQL via Docker
docker run --name qa-postgres \
  -e POSTGRES_USER=qa_user \
  -e POSTGRES_PASSWORD=qa_password \
  -e POSTGRES_DB=qa_db \
  -p 5432:5432 \
  -d postgres:15

# Seed the database
npm run db:seed

# Run smoke tests
npm run test:smoke
```

> Note: Docker must be running before executing database tests or the seed script.

---

## Running Tests

| Command | What it runs |
| --- | --- |
| `npm run test:unit` | Unit tests — framework code in isolation |
| `npm run test:ui` | All UI tests (Sauce Demo + The Internet) |
| `npm run test:api` | All REST API tests (ReqRes + Restful Booker) |
| `npm run test:graphql` | GraphQL tests (Pokémon API) |
| `npm run test:db` | Database validation tests |
| `npm run test:accessibility` | Accessibility checks |
| `npm run test:smoke` | Smoke suite — @smoke tagged tests |
| `npm run test:regression` | Full regression — @regression tagged |
| `npm run test:all` | Everything |
| `npm run test:bdd` | All BDD scenarios via Cucumber |
| `npm run test:ui:bdd` | BDD UI feature files only |
| `npm run test:api:bdd` | BDD API feature files only |
| `npm run test:newman:ci` | ReqRes Newman collection (CI) |
| `npm run test:newman:reqres` | ReqRes Newman collection (named) |
| `npm run test:newman:stripe` | Stripe Newman collection |
| `npm run test:newman:all` | All Newman collections |
| `./scripts/newman-local.sh` | All Newman collections (local — loads from .env) |

> See [`docs/guides/COMMANDS_REFERENCE.md`](docs/guides/COMMANDS_REFERENCE.md) for the complete command reference.

---

## Reporting

| Command | What it does |
| --- | --- |
| `npm run report:allure` | Generate and open Allure report |
| `npm run report:allure:generate` | Generate Allure HTML report |
| `npm run report:allure:open` | Open generated report in browser |

Reports are generated per suite into separate folders:

| Suite | Report location |
| --- | --- |
| Unit tests | `reports/unit-html/` |
| UI tests | `reports/ui-html/` |
| API tests | `reports/api-html/` |
| GraphQL tests | `reports/graphql-html/` |
| Database tests | `reports/db-html/` |
| Newman — ReqRes | `reports/newman/reqres-report.html` |
| Newman — Stripe | `reports/newman/stripe-report.html` |

---

## Project Structure

> Note: The tree below shows the overall folder layout and representative example files in each directory — not every file in the repository is listed. See the linked sections below (QA Lifecycle Documentation, Architecture Decision Records, Design Patterns) for the complete, current file listings in `docs/`.

```
qa-automation-portfolio/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   └── nightly.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/
│   ├── adr/
│   │   ├── TEMPLATE.md
│   │   ├── ADR-001-why-playwright.md
│   │   ├── ADR-002-why-typescript.md
│   │   ├── ADR-003-why-postgres-over-sqlite.md
│   │   ├── ADR-004-why-bdd-with-cucumber.md
│   │   ├── ADR-005-why-restful-booker-as-test-application.md
│   │   ├── ADR-006-why-claude-api-for-ai-integration.md
│   │   ├── ADR-007-why-cucumberjs-over-other-bdd-tools.md
│   │   └── ADR-008-why-graphql-testing-was-included.md
│   ├── design/
│   │   └── DESIGN_PATTERNS.md
│   ├── guides/
│   │   ├── COMMANDS_REFERENCE.md
│   │   └── MERGE_CONFLICT_RESOLUTION_GUIDE.md
│   ├── qa-lifecycle/
│   ├── usability/
│   └── ai-integration/
├── features/
│   └── ui/
│       └── sauceDemo/
│           └── login.feature
├── step-definitions/
│   └── ui/
│       └── login.steps.ts
├── support/
│   └── hooks.ts
├── scripts/
│   └── newman-local.sh
├── src/
│   ├── api/
│   │   ├── base/
│   │   ├── clients/
│   │   ├── queries/
│   │   └── schemas/
│   ├── builders/
│   ├── config/
│   ├── db/
│   │   ├── migrations/
│   │   ├── repositories/
│   │   └── seed/
│   ├── fixtures/
│   ├── models/
│   ├── pages/
│   │   ├── base/
│   │   ├── sauceDemo/
│   │   ├── theInternet/
│   │   └── restfulBooker/
│   └── utils/
├── tests/
│   ├── unit/
│   │   ├── builders/
│   │   └── utils/
│   ├── ui/
│   │   ├── sauceDemo/
│   │   └── theInternet/
│   ├── api/
│   │   ├── reqres/
│   │   ├── restfulBooker/
│   │   └── graphql/
│   ├── db/
│   ├── accessibility/
│   └── performance/
├── postman/
│   ├── collections/
│   └── environments/
├── reports/
├── .env.example
├── playwright.config.ts
├── cucumber.config.js
├── tsconfig.json
├── package.json
├── bootstrap.sh
├── PHASES.md
├── GANTT.md
└── README.md
```

---

## CI/CD Pipeline

Every push triggers the CI pipeline automatically.

| Job | Runs when | What it checks |
| --- | --- | --- |
| Quality Checks | Every push to every branch | TypeScript compile + ESLint |
| Unit Tests | Every push to every branch | Framework code in isolation — fastest fail-fast gate |
| BDD Tests | Every push to every branch | Cucumber scenarios — Sauce Demo login feature |
| UI Tests | PR to main or push to main | UI suite — chromium, firefox, webkit |
| API Tests | PR to main or push to main | ReqRes + Restful Booker + GraphQL |
| Database Tests | PR to main or push to main | PostgreSQL validation via Docker service container |
| Newman Tests — ReqRes | PR to main or push to main | Postman collection — 25 assertions |
| Newman Tests — Stripe | PR to main or push to main | Stripe payment API — 20 assertions |
| Quality Gate | After all jobs | Fails if quality checks fail |
| Nightly Regression | Every night at midnight UTC | Full suite — all phases |

---

## QA Lifecycle Documentation

This project includes the complete QA lifecycle — not just scripts.

| Artefact | Location | Status |
| --- | --- | --- |
| Requirements | `docs/qa-lifecycle/REQUIREMENTS.md` | ✅ Complete |
| Test Strategy | `docs/qa-lifecycle/TEST_STRATEGY.md` | ✅ Complete |
| Test Plan | `docs/qa-lifecycle/TEST_PLAN.md` | ✅ Complete |
| Test Cases | `docs/qa-lifecycle/TEST_CASES.md` | ✅ Complete |
| Bug Report Template | `docs/qa-lifecycle/BUG_REPORT_TEMPLATE.md` | ✅ Complete |
| Test Summary Report | `docs/qa-lifecycle/TEST_SUMMARY_REPORT.md` | ✅ Complete |
| Usability Evaluation | `docs/usability/HEURISTICS_EVALUATION.md` | ✅ Complete |
| Design Patterns | `docs/design/DESIGN_PATTERNS.md` | ✅ Complete |
| Architecture Diagrams | `docs/design/diagrams/` | ✅ Complete |
| Commands Reference | `docs/guides/COMMANDS_REFERENCE.md` | ✅ Complete |
| Merge Conflict Guide | `docs/guides/MERGE_CONFLICT_RESOLUTION_GUIDE.md` | ✅ Complete |
| Framework Checklist | `docs/COMPLETENESS_CHECKLIST.md` | ✅ Complete |

---

## Architecture Decision Records

Every major technology decision is documented with context, alternatives considered, and consequences.

| ADR | Decision | Status |
| --- | --- | --- |
| ADR-001 | Why Playwright over Selenium | ✅ Complete |
| ADR-002 | Why TypeScript over JavaScript | ✅ Complete |
| ADR-003 | Why PostgreSQL over SQLite | ✅ Complete |
| ADR-004 | Why BDD with Cucumber | ✅ Complete |
| ADR-005 | Why Restful Booker as test application | ✅ Complete |
| ADR-006 | Why Claude API for AI integration | ✅ Complete |
| ADR-007 | Why Cucumber.js over other BDD tools | ✅ Complete |
| ADR-008 | Why GraphQL testing was included | ✅ Complete |

---

## Current Test Suite

| Suite | File | Tests | Tags | Status |
| --- | --- | --- | --- | --- |
| Sauce Demo Login | `tests/ui/sauceDemo/login.spec.ts` | 6 | @smoke @regression @negative | ✅ Passing |
| Sauce Demo Inventory | `tests/ui/sauceDemo/inventory.spec.ts` | 23 | @smoke @critical @regression | ✅ Passing |
| Sauce Demo Checkout | `tests/ui/sauceDemo/checkout.spec.ts` | 6 | @smoke @regression @negative | ✅ Passing |
| Sauce Demo Data-Driven Login | `tests/ui/sauceDemo/dataDriven.spec.ts` | 3 | @regression | ✅ Passing |
| Sauce Demo Network Interception | `tests/ui/sauceDemo/network.spec.ts` | 4 | @regression @network | ✅ Passing |
| The Internet — Dropdown | `tests/ui/theInternet/dropdown.spec.ts` | 3 | @smoke @regression @theinternet | ✅ Passing |
| The Internet — Checkboxes | `tests/ui/theInternet/checkbox.spec.ts` | 4 | @smoke @regression @theinternet | ✅ Passing |
| The Internet — Alerts | `tests/ui/theInternet/alerts.spec.ts` | 4 | @smoke @regression @theinternet | ✅ Passing |
| The Internet — Hovers | `tests/ui/theInternet/hovers.spec.ts` | 6 | @smoke @regression @theinternet | ✅ Passing |
| The Internet — iFrame | `tests/ui/theInternet/iframe.spec.ts` | 3 | @smoke @regression @theinternet | ✅ Passing |
| ReqRes Users API | `tests/api/reqres/users.spec.ts` | 7 | @smoke @critical @regression | ✅ Passing |
| Restful Booker Bookings API | `tests/api/restfulBooker/bookings.spec.ts` | 8 | @smoke @regression @negative @critical | ✅ Passing |
| Pokémon GraphQL API | `tests/api/graphql/pokemon.spec.ts` | 10 | @smoke @regression @negative @graphql | ✅ Passing |
| Database — Users Table | `tests/db/users.spec.ts` | 7 | @smoke @regression @negative @db | ✅ Passing |
| Accessibility — Sauce Demo | `tests/accessibility/sauceDemo.spec.ts` | 3 | @accessibility @smoke @regression | ✅ Passing |
| BookingBuilder — Unit Tests | `tests/unit/builders/bookingBuilder.spec.ts` | 9 | @unit | ✅ Passing |
| DataUtils — Unit Tests | `tests/unit/utils/dataUtils.spec.ts` | 10 | @unit | ✅ Passing |
| BDD — Sauce Demo Login | `features/ui/sauceDemo/login.feature` | 5 scenarios | @ui @saucedemo @smoke @regression | ✅ Passing |
| **Total (unique Playwright tests)** | | **116** | | ✅ All passing |

UI suites run across chromium, firefox, and webkit.
BDD layer: 5 scenarios, 15 steps — Cucumber.js with World pattern (counted separately from the 116 above).
Newman collections: ReqRes (25 assertions) + Stripe (20 assertions) — both passing locally.
CI pipeline and nightly regression both green.

---

## Version 2 — Roadmap

After completing v1, this project will be extended with:

| # | Addition | What it demonstrates |
| --- | --- | --- |
| 1 | SOAP API testing — NumberConversion service | Legacy enterprise API testing |
| 2 | AI integration — Claude API for test data generation | AI-assisted QA tooling |
| 3 | k6 performance testing | Performance engineering |
| 4 | Contract testing with Pact | API architecture awareness |
| 5 | Mobile testing with Appium | Cross-platform QA |
| 6 | Visual regression with Applitools/Percy | Enterprise visual testing |
| 7 | Full WCAG 2.1 accessibility audit | Deep accessibility |
| 8 | Grafana dashboard from CloudWatch | Observability and monitoring |
| 9 | Kubernetes test runner | Cloud-native awareness |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for coding standards,
Git workflow, commit conventions, and the definition of done.

---

## Licence

MIT — see [LICENSE](LICENSE) for details.
