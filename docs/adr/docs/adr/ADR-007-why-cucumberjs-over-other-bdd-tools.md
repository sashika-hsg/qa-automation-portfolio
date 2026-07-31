# ADR-007 — Why Cucumber.js over Other BDD Tools

## Status

Accepted

## Date

2026-07-21

## Context

Having decided to implement BDD (see ADR-004), the next decision was which BDD framework to use. Several options exist in the JavaScript/TypeScript ecosystem. The choice needed to align with the existing TypeScript stack, integrate with Playwright's browser automation, and be recognisable to interviewers and hiring managers at Australian enterprise companies.

## Decision

Use `@cucumber/cucumber` v12 with `ts-node` for TypeScript support, integrated with Playwright's browser automation via manual browser context creation in the Cucumber World.

## Alternatives considered

- **Playwright's built-in BDD support (experimental)** — Playwright has experimental BDD support via community plugins. Rejected because it was not production-stable at the time of implementation and the documentation was sparse, making it difficult to explain confidently in interviews.
- **Jest-Cucumber** — a wrapper that lets you write Cucumber-style tests using Jest as the runner. Rejected because the framework uses Playwright, not Jest, and mixing test runners would introduce inconsistency. Jest-Cucumber also has less active maintenance than `@cucumber/cucumber`.
- **Vitest + BDD mode** — Vitest has a BDD-style API (`describe`, `it`, `test`) but doesn't support Gherkin `.feature` files. Rejected because feature files are the core artefact of BDD — without them, non-technical stakeholders can't participate in the process.
- **Behave (Python)** — a mature BDD framework but requires Python, which is inconsistent with the TypeScript-first framework. Rejected immediately.
- **SpecFlow (.NET)** — industry standard in .NET environments. Not applicable to a TypeScript project.

## Reasons for this decision

- **Industry standard** — `@cucumber/cucumber` is the de facto BDD framework in the JavaScript ecosystem. It is the most widely recognised option among Australian enterprise QA teams, which means interviewers are most likely to be familiar with it.
- **True Gherkin support** — produces genuine `.feature` files in standard Gherkin syntax, readable by any Cucumber-compatible tool regardless of implementation language. This portability matters in enterprise environments where teams may use different tech stacks.
- **TypeScript compatibility** — `@cucumber/cucumber` v12 works natively with TypeScript via `ts-node/register` and `tsconfig-paths/register`. No additional transpilation step required.
- **World pattern** — Cucumber.js's World class provides a clean solution to the shared state problem in step definitions. This pattern is well-documented and widely understood — it can be explained clearly in an interview.
- **Active maintenance** — `@cucumber/cucumber` is actively maintained by Smartbear (the company behind Cucumber). Version 12 was the latest stable release at the time of implementation.
- **Tag-based filtering** — `@smoke`, `@regression`, `@ui` tags on scenarios align with the existing tagging convention used throughout the Playwright test suite, maintaining consistency across both test layers.

## Consequences

**Positive:**
- Standard Gherkin syntax means feature files are interoperable — a BA or PO familiar with Cucumber in Java or Ruby can read and contribute to the same feature files
- The `@cucumber/cucumber` ecosystem includes reporters, formatters, and integrations that extend the framework without additional code
- Scenario Outlines with Examples tables provide native data-driven BDD support — no custom implementation needed

**Negative:**
- Cucumber.js has its own lifecycle separate from Playwright's — `Before`/`After` hooks, `World`, and step definitions are Cucumber concepts that don't map directly to Playwright's `beforeEach`, `afterAll`, and fixture system
- Step definitions must use `function` keyword not arrow functions for `this` binding — a constraint that is non-obvious and can cause confusing bugs
- The default 5000ms timeout is too short for Playwright operations — requires `setDefaultTimeout(30000)` in hooks

**Mitigation of negatives:**
- The lifecycle difference is documented in `support/hooks.ts` with inline comments explaining why `function` is required
- `setDefaultTimeout(30000)` is set in `support/hooks.ts` so all step definitions benefit automatically
- The World pattern centralises browser setup — new step definition files don't need to manage browser lifecycle independently

## References

- Cucumber.js official documentation — https://cucumber.io/docs/installation/javascript/
- Gherkin syntax reference — https://cucumber.io/docs/gherkin/reference/
- Cucumber.js World — https://cucumber.io/docs/cucumber/api/#world
- Cucumber.js tags — https://cucumber.io/docs/cucumber/api/#tags