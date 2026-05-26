# Test Strategy

**Project:** QA Automation Portfolio
**Version:** 1.0
**Date:** 2026-05-26
**Author:** Sashika Samaragunaratne
**Status:** Approved

---

## 1. Introduction

### 1.1 Purpose

This document defines the overall approach to testing for the
QA Automation Portfolio project. It describes the testing philosophy,
scope, techniques, tools, and quality standards applied across
all test types.

### 1.2 Scope

This strategy covers all testing activities for:
-Sauce Demo — UI e-commerce application
-Restful Booker — UI and REST API hotel booking application
-ReqRes — REST API user management
-Pokemon GraphQL — GraphQL API

---

## 2. Testing Philosophy

### 2.1 The Test Pyramid

The test pyramid defines the distribution of tests across layers.
More tests at the bottom — fewer at the top. Each layer serves
a different purpose.

      /\
     /  \
    / UI \          
   /------\
  /  API   \
  /----------
 / Unit/Model \
/--------------\

UI- Small number — slow, expensive, high value
API - Medium number — fast, reliable, good coverage
UNIT/ Model - Large number — fastest, cheapest, most stable

| Layer | Count | Speed | Cost | What it tests |
| --- | --- | --- | --- | --- |
| UI | Small | Slow | High | End to end user journeys |
| API | Medium | Fast | Medium | Service contracts and business logic |
| Model | Large | Fastest | Lowest | Data shapes and type safety |

### 2.2 Why this distribution

| Reason | Detail |
| --- | --- |
| UI tests are slow | Browser automation takes seconds per test |
| UI tests are brittle | Selectors break when UI changes |
| API tests are faster | No browser — pure HTTP calls |
| API tests are more stable | APIs change less often than UI |
| Model tests are instant | TypeScript compilation catches errors |

### 2.3 Shift Left Testing

Testing begins at the requirements phase — not after development.
Requirements are reviewed for testability before test cases are written.
Defects found early cost significantly less to fix than defects
found in production.

---

## 3. Test Types and Coverage

### 3.1 Functional Testing

| Test type | Tool | Coverage |
| --- | --- | --- |
| UI automation | Playwright | Login, inventory, cart, checkout, booking |
| API testing — REST | Playwright request context | CRUD, auth, error handling |
| API testing — GraphQL | Playwright + GraphQLClient | Queries, error handling |
| BDD acceptance tests | Cucumber.js + Gherkin | All user-facing scenarios |
| Database validation | SQLite + Repository pattern | Data persistence and integrity |

### 3.2 Non-Functional Testing

| Test type | Tool | What is validated |
| --- | --- | --- |
| Performance | k6 | Response times, throughput, error rate under load |
| Accessibility | axe-core | WCAG 2.1 AA compliance |
| Visual regression | Playwright screenshots | UI consistency across changes |
| Security | Custom specs | SQL injection, missing auth headers, XSS inputs |
| Mobile | Playwright viewport | Responsive layout on 375px viewport |

### 3.3 Schema Validation

All API responses are validated against JSON schemas using AJV.
This ensures the API contract is honoured — not just the status code.

| What is validated | Why it matters |
| --- | --- |
| Required fields present | Missing fields break consuming applications |
| Field types correct | Wrong types cause runtime errors |
| Field values in range | Invalid values cause business logic failures |
| No unexpected fields | Extra fields can indicate API version drift |

---

## 4. Test Design Techniques

### 4.1 Equivalence Partitioning

Divide input data into partitions where all values in a partition
are expected to behave the same way. Test one value from each partition.

**Example — login password field:**

| Partition | Example | Expected |
| --- | --- | --- |
| Valid password | `secret_sauce` | Login succeeds |
| Wrong password | `wrongpassword` | Error message shown |
| Empty password | `` | Error message shown |

### 4.2 Boundary Value Analysis

Test at the boundaries of valid and invalid ranges.

**Example — booking price:**

| Value | Type | Expected |
| --- | --- | --- |
| `0` | Boundary — minimum | Accepted or rejected per business rule |
| `1` | Just inside boundary | Accepted |
| `-1` | Just outside boundary | Rejected |
| `999999` | Maximum realistic value | Accepted |

### 4.3 Decision Table Testing

Used for scenarios with multiple conditions and combinations.

**Example — checkout validation:**

| First name | Last name | Postal code | Expected |
| --- | --- | --- | --- |
| Provided | Provided | Provided | Proceed to summary |
| Missing | Provided | Provided | Error — first name required |
| Provided | Missing | Provided | Error — last name required |
| Provided | Provided | Missing | Error — postal code required |
| Missing | Missing | Missing | Error — all fields required |

### 4.4 Error Guessing

Based on experience, anticipate where errors are likely to occur.

**Common areas tested:**
-Empty inputs
-Special characters in text fields
-Extremely long strings
-SQL injection patterns
-Missing authentication tokens
-Expired or invalid tokens
-Concurrent requests

---

## 5. Test Environments

| Environment | Purpose | URL |
| --- | --- | --- |
| Development | Local development and debugging | localhost |
| Staging | Pre-production validation | Not available for public apps |
| Production | Live application testing | Public URLs |

All automated tests in this portfolio run against production URLs
of publicly available applications.

---

## 6. Test Data Strategy

### 6.1 Test data sources

| Source | Used for |
| --- | --- |
| Hardcoded constants | Known Sauce Demo credentials |
| Builder pattern | Dynamically constructed user and booking objects |
| AI generation | Realistic names, emails, and booking details |
| Seed scripts | Pre-populated SQLite database records |

### 6.2 Test data principles

| Principle | Detail |
| --- | --- |
| Independence | Each test creates and cleans up its own data |
| Isolation | Tests never share state through data |
| Realism | Data resembles real-world values — not `test123` |
| No sensitive data | No real personal or financial information |

---

## 7. Defect Management

### 7.1 Defect lifecycle

New → Assigned → In Progress → Fixed → Retest → Closed
↓
Rejected → Closed

### 7.2 Defect severity levels

| Severity | Definition | Example |
| --- | --- | --- |
| Blocker | System unusable — testing cannot continue | Login completely broken |
| Critical | Major feature broken — workaround not possible | Cannot create a booking |
| Major | Feature broken — workaround exists | Sorting does not work |
| Minor | Small issue — minimal business impact | Wrong error message text |
| Trivial | Cosmetic issue | Misaligned UI element |

### 7.3 Defect priority levels

| Priority | Definition |
| --- | --- |
| P1 | Fix immediately — blocks release |
| P2 | Fix in current sprint |
| P3 | Fix in next sprint |
| P4 | Fix when time permits |

---

## 8. Entry and Exit Criteria

### 8.1 Entry criteria — when testing can begin

| Criterion | Detail |
| --- | --- |
| Requirements approved | Requirements document signed off |
| Environment available | Applications accessible and stable |
| Test cases reviewed | Test cases peer reviewed |
| Test data ready | Seed scripts executed |
| CI pipeline green | Quality checks passing |

### 8.2 Exit criteria — when testing is complete

| Criterion | Detail |
| --- | --- |
| All test cases executed | 100% execution rate |
| Pass rate above 95% | Quality gate threshold |
| No open blocker or critical defects | All P1 and P2 resolved |
| Test summary report approved | Stakeholders sign off |
| All reports generated | Allure and Newman reports available |

---

## 9. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Public applications go offline | Medium | High | Tests have retry logic — CI alerts on failure |
| API contracts change | Low | High | Schema validation catches breaking changes |
| Flaky UI tests | Medium | Medium | Playwright auto-wait — retries on CI |
| Test data conflicts | Low | Medium | Each test creates and cleans its own data |
| Browser version changes | Low | Low | Playwright manages browser versions |

---

## 10. Tools and Frameworks

| Tool | Version | Purpose |
| --- | --- | --- |
| Playwright | 1.44+ | UI and API automation |
| TypeScript | 5.x | Primary language |
| Cucumber.js | 10.x | BDD framework |
| SQLite | 3.x | Database validation |
| AJV | 8.x | JSON schema validation |
| k6 | Latest | Performance testing |
| axe-core | Latest | Accessibility testing |
| Allure | 3.x | Test reporting |
| GitHub Actions | Latest | CI/CD pipeline |
| AWS CloudWatch | Latest | Production monitoring |
| Claude API | Latest | AI test data generation |

---

## 11. Contract Testing Awareness

While not fully implemented in v1, contract testing is acknowledged
as a critical practice for microservices architectures.

**Consumer-driven contract testing with Pact** will be implemented
in v2 of this framework. It ensures that:
-API consumers define what they expect from providers
-Providers verify they meet consumer expectations
-Breaking changes are caught before deployment

---

## 12. Agile Testing Approach

Testing is integrated into every sprint — not a phase at the end.

| Activity | When |
| --- | --- |
| Requirements review | Sprint planning |
| Test case design | During development |
| Automated test execution | On every commit via CI |
| Exploratory testing | During sprint |
| Regression suite | Nightly |
| Test summary report | End of sprint |
