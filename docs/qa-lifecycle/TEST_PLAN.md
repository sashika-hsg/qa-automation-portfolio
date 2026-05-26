# Test Plan

**Project:** QA Automation Portfolio
**Version:** 1.0
**Date:** 2026-05-26
**Author:** Sashika Samaragunaratne
**Status:** Approved

---

## 1. Introduction

### 1.1 Purpose

This document defines the specific testing activities, schedule,
resources, and deliverables for the QA Automation Portfolio project.
It translates the Test Strategy into an actionable plan.

### 1.2 References

| Document | Location |
| --- | -- -|
| Requirements | `docs/qa-lifecycle/REQUIREMENTS.md` |
| Test Strategy | `docs/qa-lifecycle/TEST_STRATEGY.md` |
| Test Cases | `docs/qa-lifecycle/TEST_CASES.md` |
| Contributing Guide | `CONTRIBUTING.md` |

---

## 2. Test Scope

### 2.1 In Scope

| Application | Test Types |
| --- | --- |
| Sauce Demo UI | Functional, visual regression, accessibility, mobile |
| Restful Booker UI | Functional |
| Restful Booker API | Functional, schema, security, performance |
| ReqRes API | Functional, schema |
| Pokemon GraphQL API | Functional, schema |

### 2.2 Out of Scope

| Item | Reason |
| --- | --- |
| Load testing UI | Browser-based load testing is not industry practice |
| Penetration testing | Beyond scope of automation portfolio |
| Unit testing source code | Framework code is validated through integration |
| Cross-device testing | Covered by viewport emulation only |

---

## 3. Test Deliverables

| Deliverable | Description | Location |
| --- | --- | --- |
| Requirements document | Application requirements | `docs/qa-lifecycle/REQUIREMENTS.md` |
| Test strategy | Overall testing approach | `docs/qa-lifecycle/TEST_STRATEGY.md` |
| Test plan | This document | `docs/qa-lifecycle/TEST_PLAN.md` |
| Test cases | Detailed test scenarios | `docs/qa-lifecycle/TEST_CASES.md` |
| BDD feature files | Gherkin scenarios | `features/` |
| Automated test scripts | Playwright specs | `tests/` |
| Bug report template | Defect reporting format | `docs/qa-lifecycle/BUG_REPORT_TEMPLATE.md` |
| Test summary report | Execution results | `docs/qa-lifecycle/TEST_SUMMARY_REPORT.md` |
| Allure report | Visual test report | `reports/allure-report/` |
| Newman report | API collection results | `reports/newman/` |

---

## 4. Test Schedule

### 4.1 Phase-based schedule

| Phase | Activity | Duration |
| --- | --- | --- |
| Phase 1 | TypeScript models — foundation | 3 days |
| Phase 2 | QA lifecycle documentation | 2 days |
| Phase 3 | SQL learning track | 5 days |
| Phase 4 | Design patterns implementation | 4 days |
| Phase 5 | Database layer | 2 days |
| Phase 6 | UI automation — all sites | 4 days |
| Phase 7 | BDD — Gherkin and Cucumber | 3 days |
| Phase 8 | API automation + GraphQL | 5 days |
| Phase 9 | Postman + Newman | 2 days |
| Phase 10 | AI integration | 2 days |
| Phase 11 | Reporting + CI/CD | 2 days |
| Phase 12 | Documentation + polish | 5 days |
| Phase 13 | Final review | 1 day |

### 4.2 Daily schedule

| Time block | Activity |
| --- | --- |
| Morning — 3 hours | Core coding and test implementation |
| Afternoon — 2.5 hours | Continued implementation and review |
| Evening — 1.5 hours | Documentation, commits, and Gantt update |

---

## 5. Resources

### 5.1 Human resources

| Role | Responsibility |
| --- | --- |
| QA Engineer / SDET | Test design, automation implementation, reporting |

### 5.2 Tool resources

| Tool | Purpose | Cost |
| --- | --- | --- |
| Playwright | UI and API automation | Free |
| TypeScript | Primary language | Free |
| Cucumber.js | BDD framework | Free |
| SQLite | Database validation | Free |
| GitHub Actions | CI/CD pipeline | Free tier |
| AWS CloudWatch | Cloud monitoring | Free tier |
| Claude API | AI integration | $20 pre-purchased |
| Allure | Reporting | Free |
| Postman | API design and testing | Free tier |
| Newman | CLI collection runner | Free |
| k6 | Performance testing | Free |
| axe-core | Accessibility testing | Free |

### 5.3 Environment resources

| Environment | Access |
| --- | --- |
| Sauce Demo | Public — no credentials required to access |
| Restful Booker | Public — credentials: admin/password123 |
| ReqRes | Public — no authentication required |
| Pokemon GraphQL | Public — no authentication required |

---

## 6. Test Execution Approach

### 6.1 Local execution

```bash
# Run all tests
npm run test:all

# Run specific test types
npm run test:ui
npm run test:api
npm run test:graphql
npm run test:db
npm run test:accessibility
npm run test:security

# Run by tag
npm run test:smoke
npm run test:regression
# Run Postman collections
npm run test:newman
```

### 6.2 CI execution

| Trigger | Jobs that run |
| --- | --- |
| Push to any branch | Quality checks — lint and type check |
| Pull request to main | All test jobs |
| Push to main | All test jobs |
| Nightly — midnight UTC | Full regression suite |

### 6.3 Test tagging strategy

| Tag | Purpose | When it runs |
| --- | --- | --- |
| `@smoke` | Critical path — 5 to 10 tests | Every deployment |
| `@regression` | Full suite | Nightly |
| `@critical` | Business critical features | Every PR |
| `@edge` | Edge cases and boundaries | Nightly |
| `@negative` | Negative scenarios | Every PR |
| `@security` | Security checks | Nightly |
| `@accessibility` | WCAG checks | Nightly |
| `@mobile` | Mobile viewport | Nightly |
| `@wip` | Work in progress | Never — excluded from CI |

---

## 7. Defect Management Process

### 7.1 Defect reporting

All defects are raised using the template in
`docs/qa-lifecycle/BUG_REPORT_TEMPLATE.md`.

### 7.2 Defect workflow

| Step | Action | Owner |
| --- | --- | --- |
| 1 | Defect identified during test execution | QA Engineer |
| 2 | Defect logged with full details and evidence | QA Engineer |
| 3 | Defect triaged and prioritised | QA Lead |
| 4 | Defect assigned for fix | Developer |
| 5 | Fix implemented and deployed | Developer |
| 6 | Defect retested | QA Engineer |
| 7 | Defect closed if fixed | QA Engineer |

### 7.3 Defect metrics tracked

| Metric | Description |
| --- | --- |
| Total defects raised | Count of all defects found |
| Defects by severity | Breakdown of blocker, critical, major, minor |
| Defect fix rate | Percentage of defects resolved |
| Defect reopen rate | Percentage of defects reopened after fix |
| Defects by phase | Where in the lifecycle defects are found |

---

## 8. Quality Gates

### 8.1 CI quality gate

The CI pipeline enforces a quality gate — the pipeline fails if:

| Condition | Threshold |
| --- | --- |
| Test pass rate | Below 95% |
| TypeScript compilation | Any errors |
| ESLint | Any errors |
| Open blocker defects | Any open |

### 8.2 Definition of done

A test phase is complete when:

| Criterion | Detail |
| --- | --- |
| All test cases executed | 100% execution |
| Pass rate above 95% | CI quality gate passes |
| All commits pushed | Branch merged to main via PR |
| Reports generated | Allure and Newman reports available |
| Documentation updated | GANTT and PROGRESS updated |

---

## 9. Communication and Reporting

### 9.1 Reporting cadence

| Report | Frequency | Audience |
| --- | --- | --- |
| CI pipeline results | Every push | Development team |
| Allure test report | Every CI run | QA and stakeholders |
| Newman API report | Every CI run | QA and stakeholders |
| CloudWatch dashboard | Real-time | Operations team |
| Test summary report | End of project | All stakeholders |

### 9.2 Escalation path

| Issue | Escalation |
| --- | --- |
| Blocker defect found | Immediate notification to QA Lead |
| CI pipeline failing | Immediate investigation |
| Pass rate drops below 95% | Quality gate triggers — investigation required |
| Environment unavailable | Alternative environment or test skip |

---

## 10. Assumptions and Dependencies

### 10.1 Assumptions

| Assumption | Impact if wrong |
| --- | --- |
| Public applications remain available | Tests cannot run |
| API contracts remain stable | Schema validation fails |
| Sauce Demo credentials unchanged | Login tests fail |
| GitHub Actions free tier sufficient | CI pipeline disrupted |

### 10.2 Dependencies

| Dependency | Type | Risk |
| --- | --- | --- |
| Sauce Demo availability | External | Medium |
| Restful Booker availability | External | Medium |
| ReqRes availability | External | Low |
| GitHub Actions | External | Low |
| AWS CloudWatch | External | Low |
| Claude API credits | Budget | Low — $20 sufficient |
