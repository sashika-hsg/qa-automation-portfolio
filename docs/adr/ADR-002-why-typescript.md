# ADR-002 — Use TypeScript over JavaScript

## Status

Accepted

## Date

2025-01-15

## Context

This framework needs a programming language for writing automation
tests, page objects, API clients, database repositories, and AI
integrations. The two primary options for a Playwright-based
framework are JavaScript and TypeScript.

The framework is designed to be maintainable, scalable, and
explainable — both to interviewers and to other QA engineers
who may learn from it. The language choice directly affects
all of these goals.

## Decision

We will use TypeScript as the primary language for this framework.

## Alternatives considered

### Option 1 — JavaScript

-Native language of Node.js and browsers
-No compilation step required
-Simpler to set up initially
-Playwright fully supports it

### Option 2 — TypeScript

-Superset of JavaScript — all JavaScript is valid TypeScript
-Adds a static type system on top of JavaScript
-Requires compilation step (tsc) or a runtime like ts-node
-Playwright has first-class TypeScript support
-Industry standard for large TypeScript projects

### Option 3 — Java or Python

-Both have Playwright bindings
-Java is strongly typed with excellent IDE support
-Python is simpler to learn
-Rejected because this framework uses the Playwright TypeScript
  SDK which is the most feature-complete and best documented

## Reasons for this decision

### 1 — Type safety catches bugs at compile time

JavaScript allows this without any warning:

```javascript
const user = { email: 'test@test.com' };
console.log(user.emial); // undefined — typo goes unnoticed
```

TypeScript catches it immediately:

```typescript
const user: User = { email: 'test@test.com' };
console.log(user.emial); // ❌ compile error — Property 'emial' does not exist
```

In a large test framework with hundreds of files, catching
mistakes as you type — not when tests fail — dramatically
reduces debugging time.

### 2 — Interfaces enforce contracts

TypeScript interfaces define the exact shape of test data,
API responses, and page object methods. If an API response
changes and the interface is not updated, TypeScript flags
every affected test immediately.

### 3 — Better IDE support

TypeScript gives VSCode full autocomplete, parameter hints,
and inline documentation on every class and method. This
speeds up development and reduces the need to constantly
check documentation.

### 4 — Playwright is TypeScript-first

Playwright was built with TypeScript in mind. Its type
definitions are comprehensive, its documentation examples
are TypeScript-first, and its custom fixture system uses
TypeScript generics extensively.

### 5 — Design patterns are cleaner in TypeScript

The seven design patterns implemented in this framework
(POM, Singleton, Factory, Builder, Strategy, Repository,
Chain of Responsibility) all rely on classes, interfaces,
access modifiers, and generics. These are first-class
citizens in TypeScript. In JavaScript, they require
workarounds and conventions that are easy to break.

### 6 — Industry standard for SDET roles

TypeScript is the expected language for SDET roles that
use Playwright. Job descriptions for senior QA and SDET
positions in Australia consistently list TypeScript as
a requirement, not JavaScript.

### 7 — Self-documenting code

TypeScript code documents itself through types. A function
signature like:

```typescript
async login(credentials: LoginCredentials): Promise<void>
```

tells the reader exactly what it accepts and returns
without needing a comment.

## Consequences

### Positive

-All bugs from wrong types are caught at compile time
-Autocomplete and IDE support speeds up development
-Design patterns are cleaner and more explicit
-Code is self-documenting through type annotations
-Aligns with industry expectations for SDET roles

### Negative

-Requires a compilation step — `tsc` or `ts-node`
-Slightly more setup than JavaScript — `tsconfig.json` needed
-New TypeScript-specific concepts to learn — interfaces,
  generics, utility types, decorators
-Some npm packages have incomplete type definitions

### Mitigation of negatives

-`ts-node` removes the manual compilation step for development
-`tsconfig.json` is set up once and rarely changed
-TypeScript concepts are documented in Phase 1 of this project
-`@types/*` packages provide type definitions for most libraries

## References

-TypeScript official documentation — https://www.typescriptlang.org/docs
-Playwright TypeScript guide — https://playwright.dev/docs/test-typescript
-TypeScript vs JavaScript for large projects —
  https://www.typescriptlang.org/why-create-typescript