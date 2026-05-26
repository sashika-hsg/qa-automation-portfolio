# Usability Heuristics Evaluation

**Project:** QA Automation Portfolio
**Version:** 1.0
**Date:** 2026-05-26
**Author:** Sashika Samaragunaratne
**Method:** Nielsen's 10 Usability Heuristics
**Applications evaluated:** Sauce Demo, Restful Booker

---

## 1. Overview

### 1.1 What is a Heuristic Evaluation

A heuristic evaluation is a usability inspection method where
an evaluator examines a user interface and judges its compliance
against recognised usability principles — the heuristics.

This evaluation uses Jakob Nielsen's 10 Usability Heuristics —
the industry standard framework for usability assessment.

### 1.2 Severity Rating Scale

| Rating | Description | Action required |
| --- | --- | --- |
| 0 | Not a usability problem | None |
| 1 | Cosmetic problem only | Fix if time permits |
| 2 | Minor usability problem | Low priority fix |
| 3 | Major usability problem | High priority fix |
| 4 | Usability catastrophe | Fix before release |

---

## 2. Nielsen's 10 Usability Heuristics

| # | Heuristic | Description |
| --- | --- | --- |
| H1 | Visibility of system status | Keep users informed about what is happening |
| H2 | Match between system and real world | Speak the user's language |
| H3 | User control and freedom | Support undo and redo |
| H4 | Consistency and standards | Follow platform conventions |
| H5 | Error prevention | Design to prevent problems |
| H6 | Recognition rather than recall | Minimise user memory load |
| H7 | Flexibility and efficiency of use | Accelerators for expert users |
| H8 | Aesthetic and minimalist design | No irrelevant information |
| H9 | Help users recognise and recover from errors | Plain language error messages |
| H10 | Help and documentation | Easy to search, focused on task |

---

## 3. Sauce Demo Evaluation

### H1 — Visibility of System Status

**Observation:**
The login button does not show any loading state when clicked.
There is no spinner or progress indicator while the system
processes the login request.

**Severity:** 2 — Minor usability problem

**Evidence:**
After clicking login the user sees no feedback until the page
either loads or shows an error. On slow connections this creates
uncertainty about whether the button was clicked.

**Recommendation:**
Add a loading spinner or disable the button with visual feedback
after it is clicked.

---

**Observation:**
The cart icon shows a badge with the item count — this is good
visibility of cart status.

**Severity:** 0 — Not a problem

**Evidence:**
The cart badge updates immediately when items are added or removed.

---

### H2 — Match Between System and Real World

**Observation:**
The product names and descriptions use familiar e-commerce
language that matches user expectations.

**Severity:** 0 — Not a problem

---

**Observation:**
The checkout button on the cart page is labelled "Checkout"
which matches real-world e-commerce conventions.

**Severity:** 0 — Not a problem

---

### H3 — User Control and Freedom

**Observation:**
There is no "Continue Shopping" button on the cart page.
Once a user navigates to the cart they must use the browser
back button to return to the inventory.

**Severity:** 2 — Minor usability problem

**Recommendation:**
Add a "Continue Shopping" link on the cart page.

---

**Observation:**
There is no way to cancel a checkout once started without
using the browser back button.

**Severity:** 2 — Minor usability problem

**Recommendation:**
Add a Cancel button on the checkout information page.

---

### H4 — Consistency and Standards

**Observation:**
The "Add to cart" button text changes to "Remove" after adding
an item. This is consistent across all products.

**Severity:** 0 — Not a problem

---

**Observation:**
The sort dropdown uses non-standard labels — "Name (A to Z)"
instead of the more common "A-Z". This is minor but slightly
inconsistent with common patterns.

**Severity:** 1 — Cosmetic problem

---

### H5 — Error Prevention

**Observation:**
The login form does not prevent submission when fields are empty.
The user can click Login with no input and only then sees an error.

**Severity:** 2 — Minor usability problem

**Recommendation:**
Disable the Login button until both fields contain input, or
add inline validation on blur.

---

**Observation:**
The checkout form does not validate fields until the user
clicks Continue. Inline validation on blur would prevent
submission errors.

**Severity:** 2 — Minor usability problem

---

### H6 — Recognition Rather Than Recall

**Observation:**
Product images are displayed clearly on the inventory page —
users recognise items visually without needing to remember names.

**Severity:** 0 — Not a problem

---

**Observation:**
The cart page shows product names, descriptions, and prices —
users do not need to remember what they added.

**Severity:** 0 — Not a problem

---

### H7 — Flexibility and Efficiency of Use

**Observation:**
There are no keyboard shortcuts or accelerators for power users.
All interactions require mouse clicks.

**Severity:** 1 — Cosmetic problem

**Recommendation:**
Add keyboard navigation support for accessibility and efficiency.

---

**Observation:**
There is no search functionality on the inventory page.
Users must scroll through all products to find what they want.

**Severity:** 2 — Minor usability problem

**Recommendation:**
Add a search field to filter products by name.

---

### H8 — Aesthetic and Minimalist Design

**Observation:**
The inventory page displays products in a clean grid layout
without unnecessary decorative elements.

**Severity:** 0 — Not a problem

---

**Observation:**
The sidebar menu contains a limited set of options — About,
All Items, Logout, Reset App State. Clean and uncluttered.

**Severity:** 0 — Not a problem

---

### H9 — Help Users Recognise and Recover from Errors

**Observation:**
Error messages on the login page are clear and descriptive.
"Sorry, this user has been locked out" clearly explains the issue.

**Severity:** 0 — Not a problem

---

**Observation:**
Error messages include an X button to dismiss them — good
recovery support.

**Severity:** 0 — Not a problem

---

**Observation:**
The error messages do not suggest what the user should do next.
For example "Username and password do not match" does not
suggest trying a different password or resetting credentials.

**Severity:** 1 — Cosmetic problem

---

### H10 — Help and Documentation

**Observation:**
There is no help, FAQ, or documentation link anywhere in
the application.

**Severity:** 1 — Cosmetic problem for a demo application

**Note:**
As a practice application this is acceptable. A production
application would require help documentation.

---

## 4. Sauce Demo Evaluation Summary

| Heuristic | Rating | Issues found |
|---|---|---|
| H1 — System status | 2 | No login loading indicator |
| H2 — Real world match | 0 | Language is appropriate |
| H3 — User control | 2 | No continue shopping or cancel |
| H4 — Consistency | 1 | Minor sort label inconsistency |
| H5 — Error prevention | 2 | No inline validation |
| H6 — Recognition | 0 | Good visual recognition |
| H7 — Flexibility | 2 | No search or keyboard shortcuts |
| H8 — Minimalist design | 0 | Clean and uncluttered |
| H9 — Error recovery | 1 | Errors lack next-step guidance |
| H10 — Documentation | 1 | No help available |
| **Overall** | **1.1 average** | **10 issues — 0 catastrophic** |

---

## 5. Restful Booker Evaluation

### H1 — Visibility of System Status

**Observation:**
The booking form does not show confirmation of submission.
After clicking Book Room the user is not clearly shown whether
the booking was successful.

**Severity:** 3 — Major usability problem

**Recommendation:**
Add a clear success message with booking reference after
a booking is confirmed.

---

### H2 — Match Between System and Real World

**Observation:**
The date picker uses a calendar format familiar to users.
Check-in and check-out labels match hotel industry language.

**Severity:** 0 — Not a problem

---

### H3 — User Control and Freedom

**Observation:**
There is no way to edit or cancel a booking from the UI.
Users must delete and recreate a booking to change details.

**Severity:** 3 — Major usability problem

**Recommendation:**
Add edit and cancel options for existing bookings.

---

### H4 — Consistency and Standards

**Observation:**
The date format in the booking form is inconsistent — some
fields show DD/MM/YYYY while the API uses YYYY-MM-DD.

**Severity:** 2 — Minor usability problem

**Recommendation:**
Standardise date format throughout the application.

---

### H5 — Error Prevention

**Observation:**
The booking form allows check-out date to be set before
check-in date. No validation prevents this impossible booking.

**Severity:** 4 — Usability catastrophe

**Recommendation:**
Validate that checkout date is after checkin date before
allowing form submission.

---

### H6 — Recognition Rather Than Recall

**Observation:**
The room booking form does not show room details alongside
the booking form — users must scroll up to see room information
then scroll down to fill in the form.

**Severity:** 2 — Minor usability problem

**Recommendation:**
Show room summary alongside the booking form.

---

### H7 — Flexibility and Efficiency of Use

**Observation:**
There is no quick booking option or saved preferences
for returning users.

**Severity:** 1 — Cosmetic problem

---

### H8 — Aesthetic and Minimalist Design

**Observation:**
The homepage contains example booking data that is not
relevant to real users — this is noise that clutters the UI.

**Severity:** 2 — Minor usability problem

---

### H9 — Help Users Recognise and Recover from Errors

**Observation:**
When booking fails due to missing fields the error message
is generic and does not specify which fields are missing.

**Severity:** 3 — Major usability problem

**Recommendation:**
Highlight specific missing fields and provide field-level
error messages.

---

### H10 — Help and Documentation

**Observation:**
No help or FAQ is available. The admin panel has no guidance
for new users.

**Severity:** 1 — Cosmetic problem for a demo application

---

## 6. Restful Booker Evaluation Summary

| Heuristic | Rating | Issues found |
| --- | --- | --- |
| H1 — System status | 3 | No booking confirmation shown |
| H2 — Real world match | 0 | Hotel language appropriate |
| H3 — User control | 3 | Cannot edit or cancel bookings |
| H4 — Consistency | 2 | Date format inconsistency |
| H5 — Error prevention | 4 | Invalid dates allowed |
| H6 — Recognition | 2 | Room details not visible during booking |
| H7 — Flexibility | 1 | No quick booking or saved preferences |
| H8 — Minimalist design | 2 | Example data clutters UI |
| H9 — Error recovery | 3 | Generic error messages |
| H10 — Documentation | 1 | No help available |
| **Overall** | **2.1 average** | **10 issues — 1 catastrophic** |

---

## 7. Combined Priority List

Issues ranked by severity across both applications:

| Priority | Application | Issue | Severity |
| --- | --- | --- | --- |
| 1 | Restful Booker | Checkout date before checkin allowed | 4 |
| 2 | Restful Booker | No booking confirmation shown | 3 |
| 3 | Restful Booker | Cannot edit or cancel bookings | 3 |
| 4 | Restful Booker | Generic error messages | 3 |
| 5 | Sauce Demo | No login loading indicator | 2 |
| 6 | Sauce Demo | No continue shopping button | 2 |
| 7 | Sauce Demo | No cancel during checkout | 2 |
| 8 | Sauce Demo | No inline form validation | 2 |
| 9 | Sauce Demo | No product search | 2 |
| 10 | Restful Booker | Date format inconsistency | 2 |

---

## 8. How This Connects to Automated Testing

| Usability finding | Automated test created |
| --- | --- |
| No login loading indicator | Visual regression captures current state |
| Error messages display correctly | TC-SD-002, TC-SD-003, TC-SD-004 |
| Cart badge updates correctly | TC-SD-009, TC-SD-010 |
| Checkout validation works | TC-SD-012 |
| Invalid dates accepted | API security test — TC-RB-010 |
| Booking confirmation | TC-RB-004 verifies API response |
