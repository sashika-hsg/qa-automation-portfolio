# Bug Report Template

**Project:** QA Automation Portfolio
**Version:** 1.0
**Date:** 2026-05-26
**Author:** Sashika Samaragunaratne

---

## How to Use This Template

Copy the bug report format below for every defect found during
testing. Fill in all fields — incomplete bug reports delay fixes.
Attach screenshots, videos, or logs as evidence wherever possible.

---

## Bug Report Format

---

### BUG-[NUMBER] — [Short descriptive title]

| Field | Detail |
| --- | --- |
| **Bug ID** | BUG-001 |
| **Title** | Short description of the defect |
| **Date raised** | YYYY-MM-DD |
| **Raised by** | Your Name |
| **Application** | Sauce Demo / Restful Booker / ReqRes / GraphQL |
| **Environment** | Production / Staging / Local |
| **Browser** | Chromium 120 / Firefox 121 / WebKit |
| **Severity** | Blocker / Critical / Major / Minor / Trivial |
| **Priority** | P1 / P2 / P3 / P4 |
| **Status** | New / Assigned / In Progress / Fixed / Retested / Closed |
| **Linked test case** | TC-SD-001 |

---

#### Description
<!-- Clear description of what the defect is -->

#### Steps to Reproduce

1.Step one
2.Step two
3.Step three

#### Expected Result
<!-- What should happen -->

#### Actual Result
<!-- What actually happens -->

#### Test Data Used
<!-- Credentials, inputs, or data used when the bug was found -->

#### Evidence
<!-- Screenshots, videos, logs, network traces -->

#### Notes
<!-- Any additional context, related bugs, or workarounds -->

---

## Example Bug Report

---

### BUG-001 — Locked out user error message is truncated on mobile

| Field | Detail |
| --- | --- |
| **Bug ID** | BUG-001 |
| **Title** | Locked out user error message is truncated on mobile viewport |
| **Date raised** | 2025-01-20 |
| **Raised by** | Your Name |
| **Application** | Sauce Demo |
| **Environment** | Production |
| **Browser** | Chromium — mobile viewport 375px |
| **Severity** | Minor |
| **Priority** | P3 |
| **Status** | New |
| **Linked test case** | TC-SD-002 |

#### Description

When attempting to log in as a locked out user on a 375px mobile
viewport, the error message "Sorry, this user has been locked out"
is truncated and not fully visible to the user.

#### Steps to Reproduce

1.Open Chrome DevTools and set viewport to 375px width
2.Navigate to `https://www.saucedemo.com`
3.Enter username `locked_out_user`
4.Enter password `secret_sauce`
5.Click Login button
6.Observe the error message

#### Expected Result

The full error message "Sorry, this user has been locked out"
is displayed and fully readable on a 375px mobile viewport.

#### Actual Result

The error message is truncated — only "Sorry, this user has been
locked" is visible. The word "out" is cut off.

#### Test Data Used

-Username: `locked_out_user`
-Password: `secret_sauce`
-Viewport: 375px width

#### Evidence

-Screenshot: `bug-001-mobile-error-truncated.png`
-Automated test: `tests/ui/sauceDemo/mobile.spec.ts`

#### Notes

This issue only occurs on viewports below 400px.
On desktop the error message displays correctly.
Workaround: users can scroll to see the full message.

---

## Bug Severity Guide

| Severity | Definition | Example |
| --- | --- | --- |
| **Blocker** | System completely unusable — testing stops | Login page does not load |
| **Critical** | Core feature broken — no workaround | Cannot add items to cart |
| **Major** | Feature broken — workaround exists | Sorting does not work but browsing does |
| **Minor** | Small issue — minimal business impact | Wrong error message wording |
| **Trivial** | Cosmetic only — no functional impact | Button misaligned by 2px |

---

## Bug Priority Guide

| Priority | Definition | Target fix time |
| --- | --- | --- |
| **P1** | Fix immediately — blocks release | Same day |
| **P2** | Fix in current sprint | Within sprint |
| **P3** | Fix in next sprint | Next sprint |
| **P4** | Fix when time permits | Backlog |

---

## Bug Status Definitions

| Status | Meaning |
| --- | --- |
| **New** | Defect just raised — not yet reviewed |
| **Assigned** | Assigned to a developer for investigation |
| **In Progress** | Developer is actively working on the fix |
| **Fixed** | Developer has implemented and deployed a fix |
| **Retested** | QA is verifying the fix |
| **Closed** | Fix verified — defect resolved |
| **Rejected** | Not a defect — working as designed |
| **Deferred** | Valid defect — fix postponed to future release |

---

## UX Bug Template

For usability and UX defects use the template in
`docs/usability/UX_BUG_TEMPLATE.md`

---

## Bug Metrics

Track these metrics to measure testing effectiveness:

| Metric | Formula |
| --- | --- |
| Defect detection rate | Bugs found in testing / Total bugs found |
| Defect fix rate | Bugs fixed / Total bugs raised |
| Defect reopen rate | Bugs reopened / Total bugs closed |
| Bugs by severity | Count per severity level |
| Bugs by phase | Count per project phase |
| Mean time to resolve | Average days from New to Closed |