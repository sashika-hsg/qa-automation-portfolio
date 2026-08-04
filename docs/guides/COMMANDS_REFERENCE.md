# Commands Reference

> A comprehensive reference of all commands used in this QA Automation Portfolio.
> Use this as a quick lookup during development, debugging, and CI/CD work.

---

## Table of Contents

1. [Git](#1-git)
2. [Playwright](#2-playwright)
3. [Cucumber BDD](#3-cucumber-bdd)
4. [Newman / Postman](#4-newman--postman)
5. [Docker](#5-docker)
6. [Database](#6-database)
7. [npm Scripts](#7-npm-scripts)
8. [TypeScript & Code Quality](#8-typescript--code-quality)
9. [CI/CD](#9-cicd)

---

## 1. Git

### Branch management

```bash
# Create and switch to a new branch
git checkout -b feat/my-feature

# Switch to an existing branch
git checkout main

# List all local branches
git branch

# List all remote branches
git branch -r

# Delete a local branch
git branch -d feat/my-feature

# Delete a remote branch
git push origin --delete feat/my-feature

# List branches matching a pattern
git branch | grep "feat"
git branch -r | grep "feat"

# List all branches except main
git branch -r | grep -v main

# List branches with last commit date
git branch -v

# Find which branch contains a commit
git branch --contains abc1234

# Search commit messages
git log --oneline --grep="fix"
git log --oneline --grep="newman"

# Search commits by author
git log --oneline --author="Sashika"

# Search commits by date
git log --oneline --after="2026-06-01" --before="2026-07-01"
```


### Staging and committing

```bash
# Check status of working directory
git status

# Stage all changes
git add .

# Stage a specific file
git add src/pages/LoginPage.ts

# Stage specific files
git add src/ tests/ README.md

# Commit with message
git commit -m "feat(ui): add login page tests"

# Amend last commit message (before push)
git commit --amend -m "feat(ui): corrected commit message"

# Amend last commit (after push — use with caution)
git commit --amend -m "feat(ui): corrected commit message"
git push --force-with-lease
```

### Pushing and pulling

```bash
# Push current branch and set upstream
git push -u origin feat/my-feature

# Push to existing upstream
git push

# Pull latest from remote
git pull

# Pull with rebase (cleaner history)
git pull --rebase
```

### Stashing

```bash
# Stash uncommitted changes
git stash

# List all stashes
git stash list

# Apply most recent stash
git stash pop

# Apply a specific stash
git stash pop stash@{1}

# Discard most recent stash
git stash drop
```

### Merging and rebasing

```bash
# Merge main into current branch
git merge main

# Rebase current branch onto main
git rebase main

# Continue after resolving conflicts
git merge --continue
git rebase --continue

# Abort a merge or rebase
git merge --abort
git rebase --abort

# Interactive rebase (squash commits)
git rebase -i HEAD~3
```

### Cherry-picking

```bash
# Apply a specific commit to current branch
git cherry-pick abc1234

# Cherry-pick without committing
git cherry-pick --no-commit abc1234
```

### History and inspection

```bash
# View commit history
git log --oneline

# View commits on current branch not on main
git log main..HEAD --oneline

# View changes in a specific commit
git show abc1234

# View changes in a specific commit for a file
git show abc1234 -- package.json

# Check for conflict markers in all files
grep -r "<<<<<<" .
```

### Undoing changes

```bash
# Discard all uncommitted changes
git restore .

# Discard changes to a specific file
git restore src/pages/LoginPage.ts

# Unstage a file
git restore --staged src/pages/LoginPage.ts

# Remove untracked files (dry run first)
git clean -n
git clean -f
```


---

## 2. Playwright

### Running tests

```bash
# Run all tests
npx playwright test

# Run a specific file
npx playwright test tests/ui/sauceDemo/login.spec.ts

# Run a specific test by line number
npx playwright test tests/ui/sauceDemo/login.spec.ts:25

# Run tests matching a pattern
npx playwright test --grep "@smoke"

# Run tests NOT matching a pattern
npx playwright test --grep-invert "@regression"

# Run on a specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run with specific number of workers
npx playwright test --workers=4

# Run in headed mode (visible browser)
npx playwright test --headed

# Run in debug mode
npx playwright test --debug
```

### Listing tests

```bash
# List all tests
npx playwright test --list

# List tests on a specific project
npx playwright test --list --project=chromium

# Count unique tests
npx playwright test --list --project=chromium | tail -1
```

### npm script shortcuts

```bash
npm run test:ui          # UI tests only
npm run test:api         # REST API tests
npm run test:graphql     # GraphQL tests
npm run test:db          # Database tests
npm run test:unit        # Unit tests
npm run test:smoke       # @smoke tagged tests
npm run test:regression  # @regression tagged tests
npm run test:all         # Everything
```

### Reports

```bash
# Open last HTML report
npx playwright show-report

# Open specific report folder
npx playwright show-report reports/ui-html

# Generate and open Allure report
npm run report:allure
```

### Debugging

```bash
# Run with trace on
npx playwright test --trace on

# Open trace viewer
npx playwright show-trace trace.zip

# Take a screenshot
npx playwright screenshot --browser chromium https://example.com screenshot.png
```

---

## 3. Cucumber BDD

### Running scenarios

```bash
# Run all BDD scenarios
npx cucumber-js --config cucumber.config.js

# Run using npm script
npm run test:bdd

# Run UI BDD scenarios only
npm run test:ui:bdd

# Run API BDD scenarios only
npm run test:api:bdd

# Run by tag
npx cucumber-js --config cucumber.config.js --tags "@smoke"
npx cucumber-js --config cucumber.config.js --tags "@smoke and @ui"
npx cucumber-js --config cucumber.config.js --tags "not @regression"
```

### Development helpers

```bash
# Dry run — show which steps match without executing
npx cucumber-js --config cucumber.config.js --dry-run

# Generate step definition snippets for unmatched steps
npx cucumber-js --config cucumber.config.js --dry-run --format snippets

# Check version
npx cucumber-js --version
```

---

## 4. Newman / Postman

### Running collections

```bash
# Run ReqRes collection (local — loads from .env)
./scripts/newman-local.sh

# Run ReqRes collection (CI mode)
npm run test:newman:ci

# Run ReqRes collection (named script)
npm run test:newman:reqres

# Run Stripe collection
npm run test:newman:stripe

# Run all Newman collections
npm run test:newman:all
```

### Manual Newman commands

```bash
# Run a collection with an environment file
newman run postman/collections/ReqRes.postman_collection.json \
  -e postman/environments/ReqRes.postman_environment.ci.json \
  --env-var api_key=$REQRES_API_KEY \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export reports/newman/reqres-report.html

# Check Newman version
npx newman --version
```

---

## 5. Docker

### PostgreSQL container

```bash
# First time setup — create and start the container
docker run --name qa-postgres \
  -e POSTGRES_USER=qa_user \
  -e POSTGRES_PASSWORD=qa_password \
  -e POSTGRES_DB=qa_db \
  -p 5432:5432 \
  -d postgres:15

# Start existing container (after machine restart)
docker start qa-postgres

# Stop the container
docker stop qa-postgres

# Check running containers
docker ps

# Check all containers (including stopped)
docker ps -a

# View container logs
docker logs qa-postgres

# Connect to PostgreSQL inside the container
docker exec -it qa-postgres psql -U qa_user -d qa_db
```

### Docker general

```bash
# Check Docker version
docker --version

# Pull an image
docker pull postgres:15

# Remove a container
docker rm qa-postgres

# Remove an image
docker rmi postgres:15
```

---

## 6. Database

### Seeding

```bash
# Run migrations and seed test data
npm run db:seed
```

### Direct PostgreSQL queries (inside container)

```bash
# Connect to the database
docker exec -it qa-postgres psql -U qa_user -d qa_db

# List all tables
\dt

# Query users table
SELECT * FROM users;

# Count rows
SELECT COUNT(*) FROM users;

# Exit psql
\q
```

---

## 7. npm Scripts

### Test scripts

| Script | What it runs |
|---|---|
| `npm run test:unit` | Unit tests — framework code in isolation |
| `npm run test:ui` | All UI tests (Sauce Demo + The Internet) |
| `npm run test:api` | REST API tests (ReqRes + Restful Booker) |
| `npm run test:graphql` | GraphQL tests (Pokémon API) |
| `npm run test:db` | Database validation tests |
| `npm run test:accessibility` | Accessibility checks |
| `npm run test:smoke` | @smoke tagged tests across all suites |
| `npm run test:regression` | @regression tagged tests |
| `npm run test:all` | Everything |
| `npm run test:bdd` | All Cucumber BDD scenarios |
| `npm run test:ui:bdd` | UI BDD scenarios only |
| `npm run test:api:bdd` | API BDD scenarios only |
| `npm run test:newman:ci` | ReqRes Newman collection (CI) |
| `npm run test:newman:reqres` | ReqRes Newman collection (named) |
| `npm run test:newman:stripe` | Stripe Newman collection |
| `npm run test:newman:all` | All Newman collections |

### Report scripts

| Script | What it does |
|---|---|
| `npm run report:allure` | Generate and open Allure report |
| `npm run report:allure:generate` | Generate Allure HTML only |
| `npm run report:allure:open` | Open existing Allure report |

### Database scripts

| Script | What it does |
|---|---|
| `npm run db:seed` | Run migrations and seed test data |

### Code quality scripts

| Script | What it does |
|---|---|
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint and auto-fix |
| `npm run format` | Run Prettier on all files |

---

## 8. TypeScript & Code Quality

### TypeScript

```bash
# Type check entire project (no output = no errors)
npx tsc --noEmit

# Type check and show errors for a specific file
npx tsc --noEmit 2>&1 | grep LoginPage

# Check TypeScript version
npx tsc --version
```

### ESLint

```bash
# Lint all TypeScript files
npx eslint . --ext .ts --ignore-pattern 'node_modules/' --ignore-pattern 'dist/'

# Lint and auto-fix
npx eslint . --ext .ts --fix --ignore-pattern 'node_modules/'

# Lint a specific file
npx eslint src/api/base/ApiClient.ts
```

### Prettier

```bash
# Format all files
npx prettier --write .

# Format a specific file
npx prettier --write src/pages/sauceDemo/LoginPage.ts

# Check formatting without writing
npx prettier --check .
```

### Package management

```bash
# Install all dependencies
npm install

# Install for CI (exact versions, no updates)
npm ci

# Install a dev dependency
npm install --save-dev package-name

# Install with Windows system packages flag (for pip equivalent)
npm install --save-dev package-name

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# List installed packages
npm list

# Check if a specific package is installed
npm list package-name
```

---

## 9. CI/CD

### GitHub Actions

```bash
# Trigger nightly workflow manually via GitHub CLI
gh workflow run nightly.yml

# View workflow runs
gh run list

# View a specific run
gh run view <run-id>

# Watch a run in progress
gh run watch <run-id>
```

### Checking CI status locally

```bash
# Run the same checks CI runs
npx tsc --noEmit                          # Quality Checks — TypeScript
npx eslint . --ext .ts                    # Quality Checks — ESLint
npm run test:unit                         # Unit Tests
npm run test:ui                           # UI Tests
npm run test:api                          # API Tests
npm run test:graphql                      # GraphQL Tests
npm run db:seed && npm run test:db        # Database Tests (Docker must be running)
npm run test:bdd                          # BDD Tests
./scripts/newman-local.sh                 # Newman Tests
```

### Environment variables

```bash
# Load .env variables into current shell session (Linux/Mac)
export $(cat .env | grep -v '^#' | grep -v '^$' | xargs)

# Load specific variable
export REQRES_API_KEY=$(grep REQRES_API_KEY .env | cut -d '=' -f2 | tr -d '\r')
export STRIPE_SECRET_KEY=$(grep STRIPE_SECRET_KEY .env | cut -d '=' -f2 | tr -d '\r')
```

---

## Quick start after machine restart

Run these in order when starting a new development session:

```bash
# 1. Start Docker Desktop (from Windows Start menu, wait for whale icon)

# 2. Start PostgreSQL container
docker start qa-postgres

# 3. Verify Docker is running
docker ps

# 4. Seed the database
npm run db:seed

# 5. Run smoke tests to confirm everything works
npm run test:smoke
```

---

*Last updated: July 2026*
*Framework version: v1*