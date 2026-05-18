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
| **v1 — Current** | 🔄 In progress — Day 4 of 43 | 14 phases | Core automation framework |
| **v2 — Planned** | ⏳ Not started | 10 phases | Advanced tooling and cloud |

---

## What This Project Demonstrates

This is not a tutorial project. Every design decision is intentional,
documented, and explainable. Built to showcase the full skillset
expected of a Senior QA Engineer or SDET.

| Skill | Tool | Status |
| --- | --- | --- |
| UI automation | Playwright + POM | 🔄 Phase 6 |
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
├── .github/workflows/     CI/CD pipelines
├── docs/
│   ├── design/            Architecture, patterns, diagrams
│   ├── qa-lifecycle/      Requirements, strategy, plan, cases, reports
│   ├── adr/               Architecture Decision Records
│   ├── usability/         Heuristics evaluation, test scripts
│   └── ai-integration/    AI usage documentation
├── src/
│   ├── ai/                AI integration — Claude API
│   ├── api/               API clients and handler chain
│   ├── builders/          Builder pattern — test data
│   ├── config/            Singleton config manager
│   ├── db/                Repository pattern — SQLite
│   ├── factories/         Factory pattern — page and client creation
│   ├── fixtures/          Playwright custom fixtures
│   ├── models/            TypeScript interfaces and enums
│   ├── pages/             Page Object Model — all sites
│   ├── reporting/         CloudWatch reporter
│   ├── strategies/        Browser strategy pattern
│   └── utils/             Logger, schema validator, helpers
├── tests/
│   ├── ui/                Playwright UI specs
│   ├── api/               Playwright API specs + GraphQL
│   ├── db/                Database validation specs
│   ├── accessibility/     axe-core checks
│   └── performance/       k6 load test scripts
├── features/              Gherkin BDD feature files
├── step-definitions/      Cucumber step implementations
├── postman/               Postman collections and environments
├── PHASES.md              All 14 project phases
├── GANTT.md               Project timeline
├── GANTT.html             Interactive Gantt chart
├── CONTRIBUTING.md        Coding standards and Git workflow
└── README.md              This file

---

## CI/CD Pipeline

Every push triggers the CI pipeline automatically.

| Job | Runs when | What it checks |
| --- | --- | --- |
| Quality Checks | Every push to every branch | TypeScript + ESLint |
| UI Tests | PR to main or push to main | Full UI suite |
| API Tests | PR to main or push to main | REST + GraphQL |
| Database Tests | PR to main or push to main | DB validation |
| Newman Tests | PR to main or push to main | Postman collections |
| Quality Gate | After all jobs | Fails if any job fails |
| Nightly Regression | Every night at midnight | Full suite |

---

## QA Lifecycle Documentation

This project includes the complete QA lifecycle — not just scripts.

| Artefact | Location |
| --- | --- |
| Requirements | `docs/qa-lifecycle/REQUIREMENTS.md` |
| Test Strategy | `docs/qa-lifecycle/TEST_STRATEGY.md` |
| Test Plan | `docs/qa-lifecycle/TEST_PLAN.md` |
| Test Cases | `docs/qa-lifecycle/TEST_CASES.md` |
| Bug Report Template | `docs/qa-lifecycle/BUG_REPORT_TEMPLATE.md` |
| Test Summary Report | `docs/qa-lifecycle/TEST_SUMMARY_REPORT.md` |
| Usability Evaluation | `docs/usability/HEURISTICS_EVALUATION.md` |

---

## Architecture Decision Records

Every major technology decision is documented with context,
alternatives considered, and consequences.

| ADR | Decision |
| --- | --- |
| ADR-001 | Why Playwright over Selenium |
| ADR-002 | Why TypeScript over JavaScript |
| ADR-003 | Why SQLite over PostgreSQL |
| ADR-004 | Why BDD with Cucumber |
| ADR-005 | Why Restful Booker as test application |
| ADR-006 | Why Claude API for AI integration |
| ADR-007 | Why Cucumber.js over other BDD tools |
| ADR-008 | Why GraphQL testing was included |

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
