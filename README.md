# QA Automation Portfolio

> A production-grade QA automation framework built from scratch to demonstrate
> senior QA engineering and SDET capabilities across UI, API, database,
> security, performance, accessibility, and AI-powered testing.

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
| **v1 — Current** | 🔄 In progress — 765 unique tests (228 executions across 3 browsers) + 25 Newman assertions, green CI pipeline | Core automation framework |
| **v2 — Planned** | ⏳ Not started | Advanced tooling and cloud |

---

## What This Project Demonstrates

This is not a tutorial project. Every design decision is intentional, documented, and explainable. Built to showcase the full skillset expected of a Senior QA Engineer or SDET.

| Skill | Tool | Status |
| --- | --- | --- |
| UI automation | Playwright + POM | ✅ 22 tests, 3 browsers (chromium, firefox, webkit) |
| API testing — REST | Playwright request context + AJV | ✅ ReqRes + Restful Booker, 15 tests |
| Authentication flows | Static API key + cookie-based token | ✅ Both implemented |
| API testing — GraphQL | Playwright + custom GraphQLClient | ✅ 10 tests, Pokémon GraphQL API |
| Database validation | PostgreSQL + Docker + Repository pattern | ✅ 7 tests, cross-validated against API |
| API collections | Postman + Newman | ✅ 25 assertions, CI-integrated |
| Unit testing | Playwright test runner | ✅ 18 tests — framework code tested in isolation |
| Schema validation | AJV | ✅ Implemented across all API tests |
| TypeScript language depth | Generics, accessors, abstract classes, utility types | ✅ 8 core constructs implemented and test-covered |
| BDD | Cucumber.js + Gherkin | ⏳ Phase 7 |
| Security testing | Custom security spec | ⏳ Phase 8 |
| Performance testing | k6 | ⏳ Phase 8 |
| Accessibility testing | axe-core | ⏳ Phase 6 |
| Visual regression | Playwright screenshots | ⏳ Phase 6 |
| Mobile testing | Playwright viewport | ⏳ Phase 6 |
| AI integration | Claude API | ⏳ Phase 10 |
| CI/CD pipeline | GitHub Actions — 2 workflows, branch protection, auto-merge | ✅ Complete — green pipeline |
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

The framework also documents an intentional **non-pattern decision** — `GraphQLClient` does not extend `ApiClient`, since GraphQL's single-endpoint POST-only transport makes REST method inheritance misleading. See the design patterns doc for the full reasoning.

---

## TypeScript Language Depth

Beyond basic syntax, this framework deliberately exercises core TypeScript and OOP constructs — each implemented where it genuinely fits, not forced in for the sake of coverage.

| Construct | Where applied |
| --- | --- |
| Abstract classes & methods | `BasePage` — every page object must implement `navigate()` and `assertPageLoaded()` |
| Interfaces (`implements`) | `BasePage implements IPage` — compiler-enforced contract |
| Error handling (`try/catch`, `throw`) | `ApiClient` — every HTTP method wraps failures with contextual error messages |
| `switch/case` | `StatusCodeHandler` — maps HTTP status codes to categories |
| `get`/`set` accessors | `BookingBuilder` — validated property access with custom errors |
| Array methods (`filter`, `find`, `reduce`) | `DataUtils` — booking aggregation and search utilities |
| Generic constraints (`<T extends object>`) | `UserRepository.query<T>()` — type-safe, reusable query method |
| Utility types (`Pick`, `Omit`, `Required`, `Readonly`) | `Booking.ts` — derived types without duplicating the base interface |

---

## Technology Stack

| Layer | Technology | Version |
| --- | --- | --- |
| Language | TypeScript | 5.x |
| UI Testing | Playwright | 1.44+ |
| API Testing — REST | Playwright request context | 1.44+ |
| API Testing — GraphQL | Playwright + custom client | 1.44+ |
| BDD | Cucumber.js + Gherkin | 10.x |
| API Collections | Postman + Newman | Latest |
| Database | PostgreSQL 15 via Docker | 15 |
| Container Runtime | Docker Desktop | Latest |
| Schema Validation | AJV | 8.x |
| Reporting | Allure + Playwright HTML | 3.x |
| CI/CD | GitHub Actions | Latest |
| Cloud Monitoring | AWS CloudWatch | ⏳ Planned |
| AI Integration | Claude API — Anthropic | ⏳ Planned |
| Performance | k6 | ⏳ Planned |
| Accessibility | axe-core | ⏳ Planned |
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
| `npm run test:ui` | All UI tests |
| `npm run test:api` | All REST API tests (ReqRes + Restful Booker) |
| `npm run test:graphql` | GraphQL tests (Pokémon API) |
| `npm run test:db` | Database validation tests |
| `npm run test:accessibility` | Accessibility checks |
| `npm run test:security` | Security tests |
| `npm run test:smoke` | Smoke suite — @smoke tagged tests |
| `npm run test:regression` | Full regression — @regression tagged |
| `npm run test:all` | Everything |
| `npm run test:newman` | Postman collections via Newman (local) |
| `npm run test:newman:ci` | Postman collections via Newman (CI) |
| `npm run test:ui:bdd` | BDD UI feature files |
| `npm run test:api:bdd` | BDD API feature files |

> Note: some scripts are placeholders for upcoming phases — see PHASES.md

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
| Newman | `reports/newman/report.html` |

---

## Project Structure

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
│   │   |── ADR-002-why-typescript.md
│   │   |── ADR-003-why-postgres-over-sqlite.md
|   |   └── ADR-008-why-graphql-testing-was-included.md
│   ├── design/
│   │   └── DESIGN_PATTERNS.md
│   ├── qa-lifecycle/
│   ├── usability/
│   └── ai-integration/
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
│   ├── factories/
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
│   │   └── sauceDemo/
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
├── tsconfig.json
├── package.json
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
| UI Tests | PR to main or push to main | UI suite — chromium, firefox, webkit |
| API Tests | PR to main or push to main | ReqRes + Restful Booker + GraphQL |
| Database Tests | PR to main or push to main | PostgreSQL validation via Docker service container |
| Newman Tests | PR to main or push to main | Postman collection — 25 assertions |
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

---

## Architecture Decision Records

Every major technology decision is documented with context, alternatives considered, and consequences.

| ADR | Decision | Status |
| --- | --- | --- |
| ADR-001 | Why Playwright over Selenium | ✅ Complete |
| ADR-002 | Why TypeScript over JavaScript | ✅ Complete |
| ADR-003 | Why PostgreSQL over SQLite | ✅ Complete |
| ADR-004 | Why BDD with Cucumber | ⏳ Planned |
| ADR-005 | Why Restful Booker as test application | ⏳ Planned |
| ADR-006 | Why Claude API for AI integration | ⏳ Planned |
| ADR-007 | Why Cucumber.js over other BDD tools | ⏳ Planned |
| ADR-008 | Why GraphQL testing was included | ✅ Complete |

---

## Current Test Suite

| Suite | File | Tests | Tags | Status |
| --- | --- | --- | --- | --- |
| Sauce Demo Login | `tests/ui/sauceDemo/login.spec.ts` | 6 | @smoke @regression @negative | ✅ Passing |
| Sauce Demo Inventory | `tests/ui/sauceDemo/inventory.spec.ts` | 10 | @smoke @regression | ✅ Passing |
| Sauce Demo Checkout | `tests/ui/sauceDemo/checkout.spec.ts` | 6 | @smoke @regression @negative | ✅ Passing |
| Sauce Demo Data-Driven Login | `tests/ui/sauceDemo/dataDriven.spec.ts` | 3 | @regression | ✅ Passing |
| ReqRes Users API | `tests/api/reqres/users.spec.ts` | 7 | @smoke @critical @regression | ✅ Passing |
| Restful Booker Bookings API | `tests/api/restfulBooker/bookings.spec.ts` | 8 | @smoke @regression @negative @critical | ✅ Passing |
| Pokémon GraphQL API | `tests/api/graphql/pokemon.spec.ts` | 10 | @smoke @regression @negative @graphql | ✅ Passing |
| Database — Users Table | `tests/db/users.spec.ts` | 7 | @smoke @regression @negative @db | ✅ Passing |
| BookingBuilder — Unit Tests | `tests/unit/builders/bookingBuilder.spec.ts` | 9 | @unit | ✅ Passing |
| DataUtils — Unit Tests | `tests/unit/utils/dataUtils.spec.ts` | 9 | @unit | ✅ Passing |
| **Total (unique)** | | **76** | | ✅ All passing |

UI suites (22 tests) run across chromium, firefox, and webkit — 228 total test executions in CI.
Newman collection: 6 requests, 25 assertions — all passing in CI.
CI pipeline and nightly regression both green.

---

## Version 2 — Roadmap

After completing v1, this project will be extended with:

| # | Addition | What it demonstrates |
| --- | --- | --- |
| 1 | Contract testing with Pact | API architecture awareness |
| 2 | Mobile testing with Appium | Cross-platform QA |
| 3 | Deep k6 load testing suite | Performance engineering |
| 4 | Grafana dashboard from CloudWatch | Observability and monitoring |
| 5 | Kubernetes test runner | Cloud-native awareness |
| 6 | GraphQL mutations and subscriptions | Advanced GraphQL |
| 7 | Visual regression with Percy | Enterprise visual testing |
| 8 | Full WCAG 2.1 accessibility audit | Deep accessibility |
| 9 | Data structures and algorithm exercises | CS fundamentals |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for coding standards,
Git workflow, commit conventions, and the definition of done.

---

## Licence

MIT — see [LICENSE](LICENSE) for details.
