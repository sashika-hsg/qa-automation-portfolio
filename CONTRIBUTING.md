# Contributing Guide

This document defines the coding standards, Git workflow, commit conventions,
and best practices for this project. All contributors must follow these
standards on every single commit.

---

## Table of Contents

-[Prerequisites](#prerequisites)
-[Getting Started](#getting-started)
-[Branch Strategy](#branch-strategy)
-[Commit Message Standards](#commit-message-standards)
-[Pull Request Process](#pull-request-process)
-[Coding Standards](#coding-standards)
-[TypeScript Standards](#typescript-standards)
-[File and Folder Naming](#file-and-folder-naming)
-[Testing Standards](#testing-standards)
-[Documentation Standards](#documentation-standards)
-[Daily Workflow](#daily-workflow)
-[Definition of Done](#definition-of-done)

## Prerequisites

Before contributing, ensure you have the following installed and verified:

| Tool | Minimum version | Verify with |
| --- | --- | --- |
| Node.js | v20.0.0 | `node --version` |
| npm | v10.0.0 | `npm --version` |
| TypeScript | v5.0.0 | `tsc --version` |
| Git | v2.40.0 | `git --version` |
| Newman | v6.0.0 | `newman --version` |
| Allure | v2.0.0 | `allure --version` |

---

## Getting Started

Follow these steps exactly when setting up the project for the first time:

1.Clone the repository
2.Copy `.env.example` to `.env` and fill in all values
3.Run `npm install` to install all dependencies
4.Run `npx playwright install` to install browser binaries
5.Run `npm run db:seed` to populate the local database
6.Run `npm run test:smoke` to verify everything is working

If any step fails, raise a GitHub Issue with the label `setup-issue`
before proceeding.

---

## Branch Strategy

This project follows trunk-based development. The `main` branch is always
stable. All work happens on short-lived branches merged via pull requests.

### Branch naming convention

| Type | Pattern | Example |
|---|---|---|
| Phase | `phase/N-description` | `phase/0-foundation` |
| Feature | `feat/description` | `feat/login-page-pom` |
| Bug fix | `fix/description` | `fix/login-selector` |
| Documentation | `docs/description` | `docs/add-adr-playwright` |
| Test | `test/description` | `test/booking-api-specs` |
| Chore | `chore/description` | `chore/update-dependencies` |
| Refactor | `refactor/description` | `refactor/base-api-client` |
| CI/CD | `ci/description` | `ci/add-nightly-workflow` |
| Performance | `perf/description` | `perf/optimise-db-queries` |
| Hotfix | `hotfix/description` | `hotfix/broken-auth-token` |

### Branch rules

-Never commit directly to `main` — ever
-Branch names are always lowercase and kebab-case
-Branch names describe the work not the person
-Delete branches immediately after merging
-Keep branches short-lived — one phase or one feature per branch

---

## Commit Message Standards

This project enforces the Conventional Commits specification.
Commitlint runs automatically on every commit via Husky and rejects
messages that do not conform.

### Format

type(scope): short description
optional body — explain the why not the what
optional footer — Closes #issue-number

### Commit types

| Type | When to use | Example |
| --- | --- | --- |
| `feat` | New feature or capability | `feat(login): add sauce demo login page object` |
| `fix` | Bug fix | `fix(booking): correct date format in request body` |
| `docs` | Documentation only | `docs(readme): add quickstart instructions` |
| `test` | New or updated tests | `test(api): add negative cases for booking creation` |
| `chore` | Tooling, config, dependencies | `chore: install and configure eslint` |
| `refactor` | Restructure without behaviour change | `refactor(api): extract base client to own class` |
| `style` | Formatting only — no logic change | `style: apply prettier to all source files` |
| `perf` | Performance improvement | `perf(db): add index on bookings email column` |
| `ci` | CI/CD pipeline changes | `ci: add github actions workflow for api tests` |
| `build` | Build system or dependency changes | `build: update typescript to v5.4` |
| `revert` | Reverting a previous commit | `revert: feat(login): add login page` |

### Rules

-Subject line is always lowercase
-Subject line never ends with a full stop
-Subject line is under 72 characters
-Use present tense — `add` not `added`, `fix` not `fixed`
-Scope is optional but recommended
-Body and footer are optional — use for complex changes only
-One logical change per commit — never bundle unrelated work

### Good commit message examples

feat(booking): add restful booker api client with full crud operations
test(login): add negative test cases for locked out user scenario
fix(db): resolve null pointer when booking record not found
docs(adr): add decision record for playwright over selenium
chore: configure husky pre-commit hooks for lint and formatting
ci: add nightly regression workflow with allure reporting

### Bad commit message examples

| Bad message | Why it is wrong |
| --- | --- |
| `updated stuff` | No type, no scope, no description |
| `Fix` | Capital letter, no description, too vague |
| `fixed the bug` | No type, past tense, vague |
| `wip` | Never commit work in progress |
| `asdfjkl` | Meaningless |

---

## Pull Request Process

### When to raise a PR

-When a complete phase is finished and all tests pass locally
-When a feature is independently complete and testable
-Never raise a PR with failing tests
-Never raise a PR with ESLint errors
-Never raise a PR with TypeScript compilation errors

### PR title format

Same as commit message format:
feat(login): add sauce demo login page object model

### PR size guidelines

| Size | Lines changed | Verdict |
| --- | --- | --- |
| Small | Under 200 | Ideal |
| Medium | 200–500 | Acceptable |
| Large | 500–1000 | Split if possible |
| Too large | Over 1000 | Always split |

### Merge strategy

-Use `Squash and merge` for feature and fix branches
-Use `Merge commit` for phase branches — preserves phase history
-Always delete the branch after merging
-Always pull main locally after merging

---

## Coding Standards

### General rules

-One class per file — always
-One responsibility per class — always
-No magic numbers — use named constants
-No hardcoded strings — use enums or config
-No `console.log` in committed code — use the Logger utility
-No commented-out code — delete it, Git history preserves it
-No `any` type in TypeScript — always use proper types
-Functions do one thing only
-Maximum function length — 20 lines
-Maximum file length — 200 lines

### The boy scout rule

Leave every file cleaner than you found it. If you open a file and
see a naming issue or missing JSDoc, fix it in the same PR.

---

## TypeScript Standards

### Types and interfaces

| Rule | Detail |
| --- | --- |
| Always define return types | Every function and method must have a return type |
| Use `interface` for object shapes | Especially for classes and page objects |
| Use `type` for unions and aliases | Union types, intersection types |
| Use `enum` for fixed value sets | User roles, environments, test tags |
| Never use `any` | Use `unknown` if the type is truly unknown |
| Use `Readonly<T>` | For values that must never be mutated |
| Use `Partial<T>` | In builders where fields are optional |
| Use `Omit<T, K>` | When passing objects without certain fields |

### Access modifiers

| Modifier | When to use |
| --- | --- |
| `private` | Properties only used within this class |
| `protected` | Properties used by this class and subclasses |
| `public` | Methods that form the public API of the class |
| `readonly` | Values set once and never changed |

### Async standards

-Always use `async/await` — never raw `.then()` chains
-Always handle errors with `try/catch` in async functions
-Always declare return type as `Promise<T>`

---

## File and Folder Naming

| Thing | Convention | Example |
| --- | --- | --- |
| Class files | PascalCase | `LoginPage.ts` |
| Interface files | PascalCase with `I` prefix | `IUserRepository.ts` |
| Utility files | camelCase | `dateHelper.ts` |
| Config files | camelCase | `playwright.config.ts` |
| Test spec files | kebab-case `.spec.ts` | `login.spec.ts` |
| Feature files | kebab-case `.feature` | `user-login.feature` |
| Step definition files | camelCase `Steps.ts` | `loginSteps.ts` |
| Folders | kebab-case | `step-definitions/` |
| Classes | PascalCase | `class LoginPage` |
| Interfaces | PascalCase with `I` prefix | `interface IUserRepository` |
| Methods | camelCase | `getUserById()` |
| Variables | camelCase | `const loginPage` |
| Constants | SCREAMING_SNAKE_CASE | `const MAX_RETRIES = 3` |
| Enums — name | PascalCase | `enum UserRole` |
| Enums — values | SCREAMING_SNAKE_CASE | `STANDARD = 'standard_user'` |

---

## Testing Standards

### AAA pattern — every test follows this structure

Arrange — set up data and state needed for this test
Act     — perform the action being tested
Assert  — verify the outcome is correct

### Test naming

✅ should return 404 when booking id does not exist
✅ should display error message when password is incorrect
✅ should calculate correct total when multiple items in cart
❌ test login
❌ booking test 1
❌ check the thing

### Test independence rules

-Every test must run alone in any order
-Tests must not share state with other tests
-Tests must clean up any data they create in afterEach
-Never depend on the result of another test

### Coverage requirements per feature

| Test type | What it covers |
| --- | --- |
| Happy path | The expected successful flow |
| Negative test | Invalid input, wrong credentials, missing fields |
| Edge case | Boundary values, empty strings, max lengths |
| Error handling | How the system responds to failures |

### Tagging strategy

| Tag | When to apply |
| --- | -- |
| `@smoke` | Critical path — runs on every deployment |
| `@regression` | Full suite — runs nightly |
| `@critical` | Business-critical functionality |
| `@edge` | Edge cases and boundary conditions |
| `@negative` | Negative test scenarios |
| `@ui` | UI tests only |
| `@api` | API tests only |
| `@db` | Database validation tests |
| `@security` | Security test scenarios |
| `@performance` | Performance test scenarios |
| `@accessibility` | Accessibility checks |
| `@mobile` | Mobile viewport tests |
| `@wip` | Work in progress — excluded from CI |

---

## Documentation Standards

### JSDoc — required on every class and public method

```typescript
/**
 * Page object representing the Sauce Demo login page.
 * Implements the Page Object Model pattern.
 *
 * @example
 * const loginPage = new LoginPage(page);
 * await loginPage.navigate();
 * await loginPage.login('standard_user', 'secret_sauce');
 */
export class LoginPage extends BasePage {

  /**
   * Logs in with the provided credentials.
   *
   * @param username - The Sauce Demo username
   * @param password - The account password
   * @returns Promise that resolves when inventory page loads
   * @throws Error if login fails due to invalid credentials
   */
  async login(username: string, password: string): Promise<void> {
  }
}
```

### Inline comments

| Comment type | When to use | Example |
| --- | --- | --- |
| `// TODO:` | Known improvement needed | `// TODO: add retry logic for flaky network` |
| `// FIXME:` | Known bug to fix | `// FIXME: selector breaks on mobile viewport` |
| `// NOTE:` | Important context for the reader | `// NOTE: Restful Booker token expires after 1 hour` |

Never leave commented-out code in committed files.

---

## Daily Workflow

Follow this every single session without exception:

git branch                         — confirm you are on the right branch
git pull                           — get latest changes
Write your code for the session
git status                         — review what changed
git add .                          — stage all changes
git status                         — confirm files are green
git commit -m "type(scope): desc"  — commit with proper message
git push                           — push to GitHub
Update PROGRESS.md locally         — record what you did today

Never end a session without committing and pushing.
An unpushed commit exists only on your laptop.

---

## Definition of Done

A piece of work is only complete when ALL of the following are true:

| Criterion | Description |
| --- | --- |
| Code complete | Feature or fix fully implemented |
| Tests written | Happy path, negative, and edge cases covered |
| Tests passing | All tests pass locally with zero failures |
| ESLint clean | Zero linting errors |
| Prettier applied | All files correctly formatted |
| TypeScript clean | `tsc --noEmit` returns zero errors |
| JSDoc complete | All classes and public methods documented |
| No console.log | Logger used instead throughout |
| No secrets | No credentials or API keys in committed code |
| Documentation updated | Relevant docs updated |
| PR raised | Completed template — all checklist items ticked |
| PR self-reviewed | Read every line of the diff before merging |
| Branch merged | Into main via PR only — never direct push |
| Branch deleted | Cleaned up immediately after merge |

---

## Questions

This project is designed as a learning resource for QA engineers
transitioning to SDET roles. If you are learning from this project,
raise a GitHub Issue with the label `question` and it will be answered.
