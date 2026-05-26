# Agile Ceremonies and QA Activities

**Project:** QA Automation Portfolio
**Version:** 1.0
**Date:** 2026-05-26
**Author:** Sashika Samaragunaratne
**Status:** Approved

---

## 1. Overview

This document defines how QA activities integrate into Agile
ceremonies throughout the sprint lifecycle. It demonstrates
that quality is built in — not added at the end.

---

## 2. Sprint Structure

| Sprint length | 2 weeks |
| --- | --- |
| Team size | 1 QA Engineer — SDET |
| Methodology | Scrum |
| Definition of Ready | Story must meet DoR before sprint planning |
| Definition of Done | Story must meet DoD before sprint close |

---

## 3. Definition of Ready

A user story is ready to be picked up for testing when:

| Criterion | Detail |
| --- | --- |
| Acceptance criteria defined | Clear, testable, unambiguous |
| Requirements documented | Linked to REQUIREMENTS.md |
| Test data identified | Known inputs and expected outputs |
| Environment available | Application accessible and stable |
| Design reviewed | UI mockups or API contracts available |
| Dependencies resolved | No blocking external dependencies |
| Story estimated | Story points agreed by team |

---

## 4. Definition of Done

A user story is done when:

| Criterion | Detail |
| --- | --- |
| All acceptance criteria met | Verified by QA |
| Automated tests written | Happy path, negative, edge cases |
| Tests passing in CI | Quality gate at 95% pass rate |
| No open blocker or critical bugs | All P1 and P2 resolved |
| Code reviewed | PR reviewed and approved |
| Documentation updated | Relevant docs updated |
| Test summary updated | Results recorded |
| Deployed to environment | Available for demo |

---

## 5. Agile Ceremonies

### 5.1 Sprint Planning

**When:** Start of each sprint
**Duration:** 2 hours for a 2-week sprint

**QA activities during sprint planning:**

| Activity | Detail |
| --- | --- |
| Review user stories | Identify testability issues early |
| Write acceptance criteria | Collaborate with team on clear criteria |
| Identify test scenarios | Happy path, negative, edge cases |
| Estimate testing effort | Story points for QA tasks |
| Identify dependencies | External APIs, test data, environments |
| Flag risks | Stories that are hard to automate |

**QA questions to ask in sprint planning:**

-What is the expected behaviour when X happens?
-How should the system handle invalid input?
-What are the boundary conditions?
-Is this testable in isolation or does it need other stories?
-What test data is needed?
-Are there any performance or security considerations?

---

### 5.2 Sprint Backlog — User Story Format

As a [type of user]
I want to [perform some action]
So that [I achieve some goal]
Acceptance criteria:
GIVEN [some context]
WHEN [some action is taken]
THEN [some outcome is expected]

**Example user stories for this project:**

---

#### US-001 — Standard user login

As a standard Sauce Demo user
I want to log in with my credentials
So that I can access the product catalogue
Acceptance criteria:
GIVEN I am on the Sauce Demo login page
WHEN I enter valid credentials and click Login
THEN I am redirected to the inventory page
GIVEN I am on the Sauce Demo login page
WHEN I enter an incorrect password
THEN I see an error message
GIVEN I am on the Sauce Demo login page
WHEN I leave the username field empty
THEN I see a validation error
---

#### US-002 — Create a hotel booking

As a hotel guest
I want to create a booking via the API
So that I can reserve a room for my stay
Acceptance criteria:
GIVEN the Restful Booker API is available
WHEN I send a POST request with valid booking data
THEN a booking is created and I receive a booking ID
GIVEN the Restful Booker API is available
WHEN I send a POST request with missing required fields
THEN I receive an appropriate error response
GIVEN I have a valid booking ID
WHEN I send a GET request for that booking
THEN I receive the correct booking details
---

#### US-003 — Query Pokemon via GraphQL

As an API consumer
I want to query Pokemon data via GraphQL
So that I can retrieve specific Pokemon information
Acceptance criteria:
GIVEN the Pokemon GraphQL API is available
WHEN I query for a Pokemon by name
THEN I receive the correct Pokemon data
GIVEN the Pokemon GraphQL API is available
WHEN I query for a non-existent Pokemon
THEN I receive a null response with no errors

---

### 5.3 Daily Standup

**When:** Every day — 15 minutes maximum

**QA standup format:**

| Question | Example answer |
| --- | --- |
| What did I complete yesterday? | Finished login test cases — all passing in CI |
| What will I do today? | Write API test cases for booking CRUD |
| Any blockers? | Restful Booker API returning 500 — investigating |

**QA metrics to share in standup:**

- Tests added yesterday
- Current pass rate in CI
- Open defects by severity
- Any flaky tests being investigated

---

### 5.4 Sprint Review — Demo Script

**When:** End of sprint — last day
**Duration:** 1 hour

**QA demo activities:**

| Activity | What to show |
| --- | --- |
| Test execution | Run the full suite live — show green results |
| Allure report | Walk through the visual report |
| CI pipeline | Show green ticks on GitHub Actions |
| Coverage | Show test coverage by requirement |
| Defects | Review any open defects |
| Metrics | Pass rate trend over the sprint |

**Demo script for this portfolio:**

Open GitHub repository — show commit history and CI badges
Run npm run test:smoke — show tests executing in browser
Open Allure report — walk through results by feature
Show CI pipeline — explain each job and quality gate
Open CloudWatch dashboard — show test metrics over time
Discuss any defects found and their severity
Show GANTT chart — planned vs actual progress

---

### 5.5 Sprint Retrospective

**When:** End of sprint — after review
**Duration:** 1 hour

**Three questions:**

| Question | Purpose |
| --- | --- |
| What went well? | Celebrate successes — keep doing these |
| What could be improved? | Identify pain points honestly |
| What actions will we take? | Concrete improvements for next sprint |

**Example retrospective outcomes for this project:**

| What went well | What to improve | Action |
| --- | --- | --- |
| CI pipeline catching issues early | Test execution time too slow | Add parallel execution |
| BDD scenarios readable by all | Too many flaky tests | Add retry logic |
| Daily commits maintaining momentum | Documentation falling behind | Update docs same day as code |

---

### 5.6 Backlog Refinement

**When:** Mid-sprint — once per sprint
**Duration:** 1 hour

**QA activities:**

| Activity | Detail |
| --- | --- |
| Review upcoming stories | Identify testing concerns early |
| Clarify acceptance criteria | Ensure criteria are testable |
| Split large stories | Break down stories too big for one sprint |
| Identify automation candidates | Which stories can be automated |
| Estimate testing effort | Provide QA story point estimates |

---

## 6. Test Types Per Story Type

| Story type | Test types needed |
| --- | --- |
| New UI feature | UI spec, BDD feature file, visual regression |
| New API endpoint | API spec, schema validation, security check |
| Bug fix | Regression test for the bug, existing suite |
| Performance improvement | Performance test before and after |
| Security fix | Security test to confirm fix |
| UI redesign | Visual regression, accessibility check |

---

## 7. QA Metrics Tracked Per Sprint

| Metric | Target | How measured |
| --- | --- | --- |
| Test pass rate | Above 95% | CI quality gate |
| Test execution time | Under 10 minutes | CI pipeline duration |
| Defect detection rate | Above 80% | Bugs found in testing vs production |
| Automation coverage | Increasing each sprint | Tests added vs stories completed |
| Flaky test rate | Below 5% | Tests that pass and fail without code changes |

---

## 8. Shift Left Testing Activities

Shift left means testing earlier — before code is written.

| Activity | When | Benefit |
| --- | --- | --- |
| Requirements review | Before sprint starts | Catch ambiguity early |
| Test case design | During development | Developers know acceptance criteria |
| API contract review | Before API is built | Agree on contract before implementation |
| Risk assessment | Sprint planning | Allocate testing time appropriately |
| Exploratory testing | During development | Find issues before formal testing |
