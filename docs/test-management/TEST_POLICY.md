# Test Policy

> **Status:** Living document — stable, revised rarely.
> **Owner:** Sashika Samaragunaratne
> **Related:** [`TEST_STRATEGY.md`](./TEST_STRATEGY.md) for how this policy is fulfilled in practice

---

## Purpose

This document defines the mission-level commitment behind this framework: **why it tests, and what "quality" means here.** It is deliberately kept separate from [`TEST_STRATEGY.md`](./TEST_STRATEGY.md), which defines *how* that commitment is fulfilled — the policy should rarely need to change, while the strategy evolves as the framework's scope grows.

This policy does not dictate specific tools, test-case-level detail, or numeric thresholds. Those belong to strategy and to project/phase-level test plans built on top of it.

---

## Policy Statement

> **This framework exists to demonstrate that quality can be engineered into software development from every angle — functional correctness, API and data integrity, accessibility, performance, and security — not verified as an afterthought. Quality is treated as a shared, continuously-enforced property of the codebase: every change is validated automatically through unit tests, static/style quality checks, and multi-layer test suites before it is considered acceptable, with no manual gatekeeping required to catch preventable defects.**

---

## What This Commits To

| Commitment | What it means in practice |
|---|---|
| **Broad quality, not narrow correctness** | Quality includes functional behavior, but also security, performance, accessibility, and data integrity — each is a first-class concern, not an optional extra |
| **Continuous enforcement** | Quality is checked on every change, not periodically or only before release |
| **Engineered in, not inspected in** | Prevention (linting, type-checking, pre-commit hooks) is prioritized alongside detection (testing) |
| **Explainability** | Every non-trivial testing or tooling decision is documented — quality decisions must be defensible, not just asserted |
| **Adoptability** | Nothing in this policy is tied to a specific tool, team size, or organization — teams adopting this framework inherit the policy without needing to rewrite it |

## What This Deliberately Does *Not* Commit To

To keep this policy durable, it intentionally avoids naming specific tools, specific quality gate mechanics, or specific numeric thresholds — those belong to the strategy and to individual test plans, and will change far more often than the policy should.

---

## Document History

| Version | Change |
|---|---|
| v1 | Initial policy definition |
