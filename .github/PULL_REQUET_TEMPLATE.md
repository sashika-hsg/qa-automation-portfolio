# Pull Request Template

## Summary

<!-- Describe what this PR does in 2-3 sentences -->

## Phase

<! -- Which project phase does this belong to? >

-[ ] Phase 0 — Foundation
-[ ] Phase 1 — TypeScript
-[ ] Phase 2 — QA Lifecycle
-[ ] Phase 3 — SQL
-[ ] Phase 4 — Design Patterns
-[ ] Phase 5 — Database Layer
-[ ] Phase 6 — UI Automation
-[ ] Phase 7 — BDD
-[ ] Phase 8 — API Automation
-[ ] Phase 9 — Postman + Newman
-[ ] Phase 10 — AI Integration
-[ ] Phase 11 — Reporting + CI/CD
-[ ] Phase 12 — Documentation
-[ ] Phase 13 — Final Review## Type of change

## Type of change

-[ ] `feat` — new page object, api client, fixture, or framework component
-[ ] `test` — new or updated test specs or feature files
-[ ] `fix` — broken test, wrong selector, incorrect assertion
-[ ] `refactor` — restructured code, no behaviour change
-[ ] `docs` — documentation, ADR, QA lifecycle artefact
-[ ] `chore` — dependencies, config, tooling
-[ ] `ci` — GitHub Actions, Newman, reporting pipeline

## What was built

<! -- List the key files created or changed >

## Test types included

-[ ] UI — BDD feature file + step definitions
-[ ] API — Playwright request spec
-[ ] API — BDD feature file + step definitions
-[ ] API — Postman collection updated
-[ ] DB — validation spec
-[ ] Accessibility — axe-core
-[ ] Visual regression — screenshot comparison
-[ ] Mobile — viewport test
-[ ] Security — injection or auth check
-[ ] Performance — k6 script

## How to verify locally
<!-- Exact commands to run to verify this works -->

## Test results
<!-- Paste a summary of local test results before raising this PR -->
Total tests:
-Passed:
-Failed:
-Skipped:

## Design pattern used
<!-- If applicable — which pattern and where -->
-[ ] Page Object Model — `src/pages/`
-[ ] Singleton — `src/config/` or `src/db/`
-[ ] Factory — `src/factories/`
-[ ] Builder — `src/builders/`
-[ ] Strategy — `playwright.config.ts`
-[ ] Repository — `src/db/repositories/`
-[ ] Chain of Responsibility — `src/api/handlers/`
-[ ] Not applicable

## Screenshots or recordings
<!-- For UI changes — drag and drop a screenshot or screen recording -->
<!-- For API changes — paste a sample response or Allure report snippet -->

## Checklist

-[ ] Branch name follows convention — `phase/`, `feat/`, `test/`, `fix/` etc.
-[ ] All commit messages follow conventional commits format
-[ ] ESLint passes — zero errors
-[ ] Prettier formatting applied
-[ ] TypeScript compiles with zero errors — `tsc --noEmit`
-[ ] All new classes and methods have JSDoc comments
-[ ] No `console.log` left in committed code — Logger used instead
-[ ] No hardcoded credentials or secrets
-[ ] `.env` file is not committed
-[ ] ] Tests are independent — no shared state between tests
-[ ] Test data is cleaned up in `afterEach` or `afterAll`
-[ ] All tests pass locally before raising this PR
-[ ] `PROGRESS.md` updated for today
-[ ] `GANTT.md` status updated for current phase
