# Requirements Document

**Project:** QA Automation Portfolio
**Version:** 1.0
**Date:** 2026-05-26
**Author:** Sashika Samaragunaratne
**Status:** Approved

---

## 1. Introduction

### 1.1 Purpose

This document defines the functional and non-functional requirements
for the applications under test in this QA automation portfolio.
It serves as the basis for test strategy, test planning, and
test case design.

### 1.2 Scope

This document covers two applications:
-**Sauce Demo** — a web-based e-commerce application
-**Restful Booker** — a hotel booking web application and REST API

### 1.3 Definitions

| Term | Definition |
| --- | --- |
| AUT | Application Under Test |
| UI | User Interface |
| API | Application Programming Interface |
| CRUD | Create, Read, Update, Delete |
| BDD | Behaviour Driven Development |
| POM | Page Object Model |

---

## 2. Sauce Demo Requirements

### 2.1 Application Overview

Sauce Demo is a web-based e-commerce application used for
automation practice. It simulates a real shopping application
with login, product catalogue, cart, and checkout functionality.

**URL:** <https://www.saucedemo.com>

### 2.2 Functional Requirements

#### FR-001 — User Authentication

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-001-01 | The system shall allow standard users to log in with valid credentials | High |
| FR-001-02 | The system shall prevent locked-out users from logging in | High |
| FR-001-03 | The system shall display an error message for invalid credentials | High |
| FR-001-04 | The system shall display an error message for missing credentials | High |
| FR-001-05 | The system shall allow logged-in users to log out | Medium |
| FR-001-06 | The system shall redirect unauthenticated users to the login page | High |

#### FR-002 — Product Inventory

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-002-01 | The system shall display all available products after login | High |
| FR-002-02 | The system shall allow users to sort products by name A-Z | Medium |
| FR-002-03 | The system shall allow users to sort products by name Z-A | Medium |
| FR-002-04 | The system shall allow users to sort products by price low to high | Medium |
| FR-002-05 | The system shall allow users to sort products by price high to low | Medium |
| FR-002-06 | The system shall display product name, description, image and price | High |

#### FR-003 — Shopping Cart

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-003-01 | The system shall allow users to add products to the cart | High |
| FR-003-02 | The system shall allow users to remove products from the cart | High |
| FR-003-03 | The system shall display the correct item count on the cart icon | High |
| FR-003-04 | The system shall persist cart contents during the session | High |
| FR-003-05 | The system shall display all added items in the cart page | High |

#### FR-004 — Checkout

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-004-01 | The system shall allow users to proceed to checkout from the cart | High |
| FR-004-02 | The system shall require first name, last name, and postal code | High |
| FR-004-03 | The system shall display an error for missing checkout information | High |
| FR-004-04 | The system shall display an order summary before confirmation | High |
| FR-004-05 | The system shall display a success message after order completion | High |
| FR-004-06 | The system shall clear the cart after successful checkout | High |

### 2.3 Non-Functional Requirements

| ID | Requirement | Target |
| --- | --- | --- |
| NFR-001 | Page load time after login | Under 3 seconds |
| NFR-002 | Login response time | Under 2 seconds |
| NFR-003 | Application must be accessible | WCAG 2.1 AA |
| NFR-004 | Application must work on mobile viewports | 375px minimum |
| NFR-005 | Application must work on Chromium, Firefox, WebKit | All three browsers |

---

## 3. Restful Booker Requirements

### 3.1 Application Overview

Restful Booker is a hotel booking application with both a web UI
and a REST API. It supports full CRUD operations on bookings
with token-based authentication.

**UI URL:** <https://restful-booker.herokuapp.com>
**API URL:** <https://restful-booker.herokuapp.com>
**API Docs:** <https://restful-booker.herokuapp.com/apidoc/>

### 3.2 API Functional Requirements

#### FR-005 — Authentication

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-005-01 | The API shall return a token for valid credentials | High |
| FR-005-02 | The API shall return an error for invalid credentials | High |
| FR-005-03 | The API shall require a valid token for create, update, delete | High |

#### FR-006 — Booking Management

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-006-01 | The API shall return a list of all booking IDs | High |
| FR-006-02 | The API shall return a single booking by ID | High |
| FR-006-03 | The API shall create a new booking and return the booking ID | High |
| FR-006-04 | The API shall update an existing booking fully via PUT | High |
| FR-006-05 | The API shall update an existing booking partially via PATCH | High |
| FR-006-06 | The API shall delete an existing booking | High |
| FR-006-07 | The API shall return 404 for non-existent booking IDs | High |
| FR-006-08 | The API shall validate required fields on booking creation | High |

#### FR-007 — Booking Data

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-007-01 | A booking shall contain firstname, lastname, totalprice, depositpaid | High |
| FR-007-02 | A booking shall contain checkin and checkout dates | High |
| FR-007-03 | A booking may contain additionalneeds | Low |
| FR-007-04 | Checkin date shall be before checkout date | High |
| FR-007-05 | Totalprice shall be a positive number | High |

### 3.3 Non-Functional Requirements

| ID | Requirement | Target |
| --- | --- | --- |
| NFR-006 | API response time for GET requests | Under 2 seconds |
| NFR-007 | API response time for POST requests | Under 3 seconds |
| NFR-008 | API shall return correct Content-Type headers | application/json |
| NFR-009 | API shall return correct HTTP status codes | Per RFC 7231 |

---

## 4. Out of Scope

| Item | Reason |
| --- | --- |
| Payment processing | Sauce Demo does not implement real payments |
| User registration | Both applications use fixed user accounts |
| Email notifications | Not implemented in either application |
| Database administration | SQLite is used locally for validation only |

---

## 5. Assumptions and Constraints

| Type | Detail |
| --- | --- |
| Assumption | Sauce Demo user credentials remain `secret_sauce` |
| Assumption | Restful Booker API remains publicly available |
| Assumption | Restful Booker resets data periodically |
| Constraint | Tests must be independent — no shared state |
| Constraint | No real payment data is used |
| Constraint | Tests run against public URLs only |
