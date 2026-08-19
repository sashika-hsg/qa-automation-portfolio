# Test Strategy

> **Status:** Living document — v1 (current). Extended, not rewritten, as the framework grows.
> **Owner:** Sashika Samaragunaratne
> **Related:** [`TEST_POLICY.md`](./TEST_POLICY.md) for the mission-level commitment this strategy fulfills · [`docs/adr/`](../adr/) for individual decision records · [`docs/design/diagrams/`](../design/diagrams/) for architecture

---

## Purpose

This document defines the general **approach** used to fulfill the commitments in [`TEST_POLICY.md`](./TEST_POLICY.md): which testing archetypes are applied, why, and how the approach scales as scope grows (v1 → v2 and beyond). It does not dictate test-case-level detail — that belongs to project/phase-level test plans, which apply this strategy to specific, concrete work.

This strategy is designed to be organization-agnostic and reusable as-is; teams adopting this framework can apply it directly and layer their own test plans on top.

---

## 1. Strategy Archetype Blend

This framework does not run on a single ISTQB strategy archetype — like most real testing efforts, it runs on a deliberate blend. Each archetype below is included because of a specific, evidenced need, not by default:

| Archetype | Why it applies here | Evidence in this repo |
|---|---|---|
| **Analytical (risk-based)** | Test depth and priority are driven by risk, not uniform effort. Security and data-integrity paths receive deeper, more rigorous coverage than low-risk cosmetic UI paths. | `tests/security/`, `tests/db/`, ADR-005 (test application selection reasoning) |
| **Regression-averse** | Full automated regression runs on every push and nightly; protecting existing coverage is treated as non-negotiable, not optional. | `.github/workflows/ci.yml`, `nightly.yml`, `npm run test:regression` |
| **Process-compliant (self-imposed)** | Even without an external regulator, the framework imposes its own internal standard: no code is accepted without passing quality gates, and no significant decision is made without being recorded. | Husky pre-commit hooks, ESLint/Prettier gates, `docs/adr/` |
| **Methodical** | Certain layers follow established quality-characteristic checklists rather than ad hoc exploration — e.g., accessibility testing follows axe-core's WCAG-aligned rule set. Behavior-driven scenarios (Gherkin) further structure test conditions as pre-defined, agreed-upon acceptance criteria rather than ad hoc test design. | `tests/accessibility/`, `features/ui/`, `step-definitions/ui/` |

**Notably absent:** a dynamic/heuristic-heavy strategy (testing driven primarily by tester intuition/experience). This is intentional — because this framework is designed to be adopted by teams who don't have the specific tacit domain knowledge the original author does, everything must be codified, automatable, and explainable. Exploratory testing has a place in real-world usage of this framework, but it is not the framework's backbone.

---

## 2. Traceability Principle

This framework maintains traceability through two complementary mechanisms, each answering a different question:

| Mechanism | Question it answers | Location |
|---|---|---|
| **ADRs** | *Why* was this technical/testing decision made? | `docs/adr/` |
| **BDD scenarios (Gherkin)** | *What* behavior is guaranteed, in business-readable terms, and where is it verified? | `features/`, `step-definitions/` |

Together these mean a decision's rationale and a feature's expected behavior are never only implicit in code — both are captured as first-class, human-readable artifacts. This is how the policy's "explainable" commitment is actually enforced in practice. A team adopting this framework inherits not just the code, but the reasoning behind it and the guaranteed behavior it verifies, which is what makes the framework adaptable rather than a black box.

**Current scope note:** BDD coverage is presently implemented for UI (`features/ui/`, `step-definitions/ui/`); API BDD coverage exists structurally (`features/api/`) with AJV used directly for API schema validation outside the BDD layer. Extension of BDD to fully cover API, DB, and mobile is planned (see Section 3) — this document is updated as that extension lands, rather than claiming coverage ahead of implementation.

---

## 3. Phase-Aware Strategy (v1 → v2)

The strategy is designed to **scale in scope without changing in kind.** As the framework matures through its roadmap phases, new testing layers are added, but the underlying archetype blend (analytical + regression-averse + process-compliant + methodical) does not need to be replaced — only extended.

| Phase | Scope | Strategy treatment |
|---|---|---|
| **v1 (current)** | UI, REST/GraphQL API, DB, security, performance, accessibility, AI integration. BDD implemented for UI; API validated directly via AJV schema checks (BDD scaffolding present, not yet fully populated). | Full archetype blend applied across all layers listed in Section 1 |
| **v2 (planned)** | Docker/containerized execution, contract testing (Pact), mobile (Appium), deeper performance (k6), cloud observability (Grafana/CloudWatch), Kubernetes test runner. BDD extended to fully cover API, DB, and mobile. | Same archetype blend extended to new layers — e.g., contract testing is additional *analytical, risk-based* coverage of integration risk; mobile testing is additional *regression-averse* coverage on a new platform surface, with BDD scenarios extended to specify expected mobile behavior in the same methodical, human-readable form already used for UI. No new archetype is introduced without an ADR justifying why the existing blend is insufficient. |

This explicit phase table exists so that growth is a documented *extension* of strategy, not a silent drift away from it — the same failure pattern seen in organizations whose test strategy documents go stale and stop matching actual practice.

---

## 4. How to Adopt This Strategy

Teams forking or adopting this framework can use this document largely as-is:

1. **Review the strategy blend (Section 1)** against your own risk profile — most product teams will land on a similar blend, but confirm rather than assume.
2. **Add your own phase table** if your roadmap differs from this project's v1/v2 structure.
3. **Adopt the ADR + BDD traceability discipline (Section 2)** — even partial adoption (e.g., documenting only major testing-tool decisions) preserves most of the explainability benefit.
4. **Write test plans on top of this**, not instead of it — this document should rarely change; your plans will change every release.

---

## Document History

| Version | Change |
|---|---|
| v1 | Initial strategy definition, covering UI/API/DB/security/performance/accessibility/AI phases and BDD scope |
