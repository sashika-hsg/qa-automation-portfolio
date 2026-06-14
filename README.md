# QA Automation Portfolio

> A production-grade QA automation framework built from scratch to demonstrate
> senior QA engineering and SDET capabilities across UI, API, database,
> security, performance, accessibility, and AI-powered testing.

[![CI Pipeline](https://github.com/YOUR_USERNAME/qa-automation-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/qa-automation-portfolio/actions/workflows/ci.yml)
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

| Version | Status | Phases | Focus |
| --- | --- | --- | --- |
| **v1 — Current** | 🔄 In progress — Day 10 of 43 | 14 phases | Core automation framework |
| **v2 — Planned** | ⏳ Not started | 10 phases | Advanced tooling and cloud |

---

## What This Project Demonstrates

This is not a tutorial project. Every design decision is intentional,
documented, and explainable. Built to showcase the full skillset
expected of a Senior QA Engineer or SDET.

| Skill | Tool | Status |
| --- | --- | --- |
| UI automation | Playwright + POM | 🔄 In progress — login suite passing |
| API testing — REST | Playwright request context | 🔄 Phase 8 |
| API testing — GraphQL | Playwright + GraphQLClient | 🔄 Phase 8 |
| BDD | Cucumber.js + Gherkin | 🔄 Phase 7 |
| Database validation | SQLite + Repository pattern | 🔄 Phase 5 |
| Schema validation | AJV | 🔄 Phase 8 |
| Security testing | Custom security spec | 🔄 Phase 8 |
| Performance testing | k6 | 🔄 Phase 8 |
| Accessibility testing | axe-core | 🔄 Phase 6 |
| Visual regression | Playwright screenshots | 🔄 Phase 6 |
| Mobile testing | Playwright viewport | 🔄 Phase 6 |
| API collections | Postman + Newman | 🔄 Phase 9 |
| AI integration | Claude API | 🔄 Phase 10 |
| CI/CD pipeline | GitHub Actions | ✅ Complete |
| Cloud monitoring | AWS CloudWatch | 🔄 Phase 11 |
| Reporting | Allure + Playwright HTML | 🔄 Phase 11 |

---

## Design Patterns

Every pattern is justified — not just used for the sake of it.

| Pattern | Where applied | Problem it solves |
| --- | --- | --- |
| Page Object Model | `src/pages/` | Selector abstraction — one change point |
| Singleton | `ConfigManager`, `DatabaseConnection` | One source of truth for shared resources |
| Factory | `PageFactory`, `ApiClientFactory` | Decouples object creation from test logic |
| Builder | `UserBuilder`, `BookingBuilder` | Readable, flexible test data construction |
| Strategy | `playwright.config.ts` projects | Pluggable browser selection |
| Repository | `src/db/repositories/` | DB engine agnostic data access |
| Chain of Responsibility | `src/api/handlers/` | Composable API middleware |

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
| Database | SQLite via better-sqlite3 | 9.x |
| Schema Validation | AJV | 8.x |
| Reporting | Allure + Playwright HTML | 3.x |
| CI/CD | GitHub Actions | Latest |
| Cloud Monitoring | AWS CloudWatch | Latest |
| AI Integration | Claude API — Anthropic | Latest |
| Performance | k6 | Latest |
| Accessibility | axe-core | Latest |
| Code Quality | ESLint v8 + Prettier + Husky | Latest |

---

## Applications Under Test

| Application | Type | URL |
| --- | --- | --- |
| Sauce Demo | UI — e-commerce | https://www.saucedemo.com |
| The Internet | UI — edge cases | https://the-internet.herokuapp.com |
| Restful Booker | UI + REST API | https://restful-booker.herokuapp.com |
| ReqRes | REST API | https://reqres.in |
| Pokemon GraphQL | GraphQL API | https://graphql-pokemon2.vercel.app |

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/qa-automation-portfolio.git
cd qa-automation-portfolio

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Copy environment variables
cp .env.example .env

# Seed the database
npm run db:seed

# Run smoke tests
npm run test:smoke
```

---

## Running Tests

| Command | What it runs |
| --- | --- |
| `npm run test:ui` | All UI tests |
| `npm run test:api` | All REST API tests |
| `npm run test:graphql` | GraphQL tests |
| `npm run test:db` | Database validation tests |
| `npm run test:accessibility` | Accessibility checks |
| `npm run test:security` | Security tests |
| `npm run test:smoke` | Smoke suite — @smoke tagged tests |
| `npm run test:regression` | Full regression — @regression tagged |
| `npm run test:all` | Everything |
| `npm run test:newman` | Postman collections via Newman |
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

---

## Project Structure

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
│   │   └── ADR-002-why-typescript.md
│   ├── design/
│   │   └── diagrams/
│   ├── qa-lifecycle/
│   ├── usability/
│   └── ai-integration/
├── src/
│   ├── ai/
│   ├── api/
│   │   ├── base/
│   │   ├── clients/
│   │   ├── handlers/
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
│   │   ├── User.ts
│   │   ├── Booking.ts
│   │   ├── ApiResponse.ts
│   │   ├── GraphQL.ts
│   │   ├── TestResult.ts
│   │   └── index.ts
│   ├── pages/
│   │   ├── base/
│   │   ├── sauceDemo/
│   │   ├── theInternet/
│   │   └── restfulBooker/
│   ├── reporting/
│   ├── strategies/
│   └── utils/
├── tests/
│   ├── ui/
│   │   ├── sauceDemo/
│   │   ├── theInternet/
│   │   └── restfulBooker/
│   ├── api/
│   │   ├── reqres/
│   │   ├── restfulBooker/
│   │   ├── graphql/
│   │   └── security/
│   ├── db/
│   ├── accessibility/
│   └── performance/
├── features/
│   ├── ui/
│   │   ├── sauceDemo/
│   │   ├── theInternet/
│   │   └── restfulBooker/
│   └── api/
│       ├── reqres/
│       ├── restfulBooker/
│       └── graphql/
├── step-definitions/
│   ├── ui/
│   └── api/
├── postman/
│   ├── collections/
│   └── environments/
├── reports/
├── data/
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── .commitlintrc.json
├── .gitignore
├── .gitattributes
├── bootstrap.sh
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── PHASES.md
├── GANTT.md
├── GANTT.html
├── CONTRIBUTING.md
└── README.md

---

## CI/CD Pipeline

Every push triggers the CI pipeline automatically.

| Job | Runs when | What it checks |
| --- | --- | --- |
| Quality Checks | Every push to every branch | TypeScript + ESLint |
| UI Tests | PR to main or push to main | UI suite — chromium, firefox, webkit |
| API Tests | PR to main or push to main | ReqRes REST API |
| GraphQL / Database / Newman | — | ⊘ Skipped — pending Phases 5, 8, 9 |
| Quality Gate | After all jobs | Fails if any job fails |
| Nightly Regression | Every night at midnight | Full suite |

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

---

## Architecture Decision Records

Every major technology decision is documented with context,
alternatives considered, and consequences.

| ADR | Decision | STATUS |
| --- | --- | --- |
| ADR-001 | Why Playwright over Selenium | ✅ Complete |
| ADR-002 | Why TypeScript over JavaScript | ✅ Complete |
| ADR-003 | Why SQLite over PostgreSQL | ⏳ Planned |
| ADR-004 | Why BDD with Cucumber | ⏳ Planned |
| ADR-005 | Why Restful Booker as test application | ⏳ Planned |
| ADR-006 | Why Claude API for AI integration | ⏳ Planned |
| ADR-007 | Why Cucumber.js over other BDD tools | ⏳ Planned |
| ADR-008 | Why GraphQL testing was included | ⏳ Planned |

---

## Current Test Suite

| Suite | File | Tests | Status |
| --- | --- | --- | --- |
| Sauce Demo Login | `tests/ui/sauceDemo/login.spec.ts` | 6 | ✅ Passing |
| Sauce Demo Inventory | `tests/ui/sauceDemo/inventory.spec.ts` | 10 | ✅ Passing |
| Sauce Demo Checkout | `tests/ui/sauceDemo/checkout.spec.ts` | 6 | ✅ Passing |
| Sauce Demo Data-Driven Login | `tests/ui/sauceDemo/dataDriven.spec.ts` | 3 | ✅ Passing |
| ReqRes Users API | `tests/api/reqres/users.spec.ts` | 7 | ✅ Passing |

All UI suites run across chromium, firefox, and webkit.
CI pipeline (Quality Checks, UI Tests, API Tests, Quality Gate) is green.
Nightly regression also passing.
More suites are added daily — see commit history for progress.

---

## Version 2 — Roadmap

After completing v1, this project will be extended with:

| # | Addition | What it demonstrates |
| --- | --- | --- |
| 1 | Docker + containerised test execution | DevOps maturity |
| 2 | Contract testing with Pact | API architecture awareness |
| 3 | Mobile testing with Appium | Cross-platform QA |
| 4 | Deep k6 load testing suite | Performance engineering |
| 5 | Grafana dashboard from CloudWatch | Observability and monitoring |
| 6 | Kubernetes test runner | Cloud-native awareness |
| 7 | GraphQL mutations and subscriptions | Advanced GraphQL |
| 8 | Visual regression with Percy | Enterprise visual testing |
| 9 | Full WCAG 2.1 accessibility audit | Deep accessibility |
| 10 | Data structures and algorithm exercises | CS fundamentals |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for coding standards,
Git workflow, commit conventions, and the definition of done.

---

## Licence

MIT — see [LICENSE](LICENSE) for details.
