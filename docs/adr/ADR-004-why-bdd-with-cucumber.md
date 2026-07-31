# ADR-004 — Why BDD with Cucumber

## Status

Accepted

## Date

2026-07-21

## Context

The v1 roadmap included BDD as Phase 7. The decision was whether to implement BDD at all, and if so, which layer of the framework it should cover. The framework already had comprehensive Playwright tests covering UI, API, database, and unit testing. The question was whether BDD added genuine value beyond what was already there, or whether it would be a superficial addition that duplicated existing coverage without delivering the real benefit of BDD — bridging the communication gap between technical and non-technical stakeholders.

The context for this decision: the framework is a portfolio project targeting Senior QA Engineer and SDET roles in Melbourne. BDD is listed as a requirement in many Australian enterprise QA job descriptions, particularly in FinTech, government, and large product companies. The ability to write and explain Gherkin scenarios is a commonly tested skill in interviews.

## Decision

Implement a BDD layer using Cucumber.js covering the Sauce Demo login feature, demonstrating Gherkin scenario writing, step definition mapping, the World pattern for shared state, and data-driven testing via Scenario Outlines.

## Alternatives considered

- **Skip BDD entirely** — rejected because BDD is explicitly listed in many target job descriptions and is a skill gap that would be visible in interviews. The framework demonstrates depth across many testing disciplines — omitting BDD would leave a visible gap.
- **Use Playwright's built-in test syntax with Given/When/Then comments** — some teams use Playwright tests with descriptive naming that mimics BDD without a separate framework. Rejected because it doesn't produce readable `.feature` files that non-technical stakeholders can review, which is the core value of BDD.
- **Use Jest + Cucumber** — rejected because the rest of the framework uses Playwright. Mixing test runners would introduce inconsistency and additional complexity without benefit.
- **BDD for all test layers (UI + API)** — considered but scoped to UI login only for v1. Full BDD coverage across all layers is a v2 item. A focused, well-implemented BDD layer is more valuable than a broad but shallow one.

## Reasons for this decision

- **Interview relevance** — Gherkin feature files and step definitions are commonly asked about in Senior QA interviews. Having a working implementation is more credible than theoretical knowledge.
- **Real business value demonstration** — BDD's core value is readable scenarios that non-technical stakeholders can review. The login feature file is readable by a BA, PO, or client without any technical knowledge — this is the value proposition in action.
- **Reuses existing page objects** — step definitions use the same `LoginPage` and `InventoryPage` objects already built for Playwright tests. No duplication of UI interaction logic — BDD adds a readable layer on top of existing infrastructure.
- **World pattern demonstrates advanced Cucumber knowledge** — using the World class for shared state rather than module-level variables shows understanding of Cucumber's lifecycle and how to write maintainable step definitions at scale.
- **Credentials from testData.ts** — the feature file uses `"log in as {username}"` rather than exposing passwords in Gherkin. Step definitions look up credentials from `SAUCE_DEMO_USERS` constants. This demonstrates awareness that feature files are readable by everyone — sensitive data belongs in code, not in business-readable scenarios.

## Consequences

**Positive:**
- The framework now demonstrates three distinct test writing styles — Playwright spec files, BDD Gherkin scenarios, and unit tests — covering the full spectrum of test approaches
- Feature files serve as living documentation that non-technical stakeholders can read and verify
- The Scenario Outline with Examples table demonstrates data-driven BDD — a pattern used extensively in enterprise acceptance testing

**Negative:**
- BDD adds a second layer to maintain — when a UI flow changes, both the Playwright spec AND the feature file/step definitions may need updating
- Cucumber has its own lifecycle (Before/After hooks, World) separate from Playwright's fixture system — this adds complexity that pure Playwright tests don't have
- Step definition functions must use `function` keyword not arrow functions for `this` binding — a non-obvious constraint that can cause confusing bugs if forgotten

**Mitigation of negatives:**
- Step definitions reuse page objects — UI logic changes only need updating in one place (the page object), not in the step definitions themselves
- The World pattern centralises browser setup in `support/hooks.ts` — new step definition files don't need to manage browser lifecycle
- The constraint on `function` vs arrow functions is documented in `support/hooks.ts` and `INTERVIEW_PREP.md`

## References

- Cucumber.js official documentation — https://cucumber.io/docs/cucumber/
- Gherkin reference — https://cucumber.io/docs/gherkin/reference/
- BDD in Practice — https://cucumber.io/blog/bdd/
- Playwright + Cucumber integration — https://github.com/cucumber/cucumber-js