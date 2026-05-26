# UX Bug Report Template

**Project:** QA Automation Portfolio
**Version:** 1.0
**Date:** 2026-05-26
**Author:** Sashika Samaragunaratne

---

## Why UX Bugs Are Different

UX bugs are different from functional bugs. A functional bug means
something is broken — it does not work as designed. A UX bug means
something works technically but creates a poor user experience.

| Functional bug | UX bug |
| --- | --- |
| Login button does not respond to click | Login button has no loading state — user clicks twice |
| Booking not saved to database | No confirmation shown — user does not know if booking worked |
| Error message not displayed | Error message is shown but does not explain what to do next |
| Sort not working | Sort option is hard to find — users miss it |

Both types matter. UX bugs affect user satisfaction, trust,
and task completion even when the system is technically working.

---

## UX Bug Report Format

---

### UX-[NUMBER] — [Short descriptive title]

| Field | Detail |
| --- | --- |
| **UX Bug ID** | UX-001 |
| **Title** | Short description of the UX issue |
| **Date raised** | YYYY-MM-DD |
| **Raised by** | Your Name |
| **Source** | Heuristic evaluation / Usability test / Expert review |
| **Application** | Sauce Demo / Restful Booker |
| **Page or feature** | Which page or feature is affected |
| **Heuristic violated** | H1 through H10 — Nielsen's heuristic |
| **Severity** | Critical / Major / Minor / Cosmetic |
| **Priority** | P1 / P2 / P3 / P4 |
| **Status** | New / In Design / In Development / Fixed / Closed |
| **Linked finding** | UF-001 from usability test results |

---

#### User impact
<!-- How does this affect the user experience? -->
<!-- What does the user feel, think, or do as a result? -->

#### Current behaviour
<!-- What currently happens — describe what the user sees and experiences -->

#### Expected behaviour
<!-- What should happen to provide a good user experience -->

#### Evidence
<!-- Source of the finding — observation notes, quote, screenshot -->

#### Heuristic analysis
<!-- Which heuristic is violated and why -->

#### Recommendation
<!-- Specific design recommendation to fix this issue -->

#### Acceptance criteria
<!-- How will we know this UX bug is fixed? -->

---

## Example UX Bug Reports

---

### UX-001 — No loading feedback after login button click

| Field | Detail |
| --- | --- |
| **UX Bug ID** | UX-001 |
| **Title** | Login button shows no loading state after click |
| **Date raised** | 2025-01-20 |
| **Raised by** | Your Name |
| **Source** | Usability test — Task SD-01 |
| **Application** | Sauce Demo |
| **Page or feature** | Login page |
| **Heuristic violated** | H1 — Visibility of system status |
| **Severity** | Major |
| **Priority** | P2 |
| **Status** | New |
| **Linked finding** | UF-003 |

#### User impact

Users are uncertain whether their click was registered.
2 out of 3 usability test participants clicked the login
button a second time because there was no visual feedback.
This creates frustration and potential duplicate submissions.

#### Current behaviour

After clicking the Login button the page shows no visual
change until either the inventory page loads or an error
message appears. On a slow connection this delay can be
2 to 3 seconds with no feedback.

#### Expected behaviour

Immediately after clicking Login the button should show
a loading state — either a spinner, disabled state with
changed text, or a progress indicator. This reassures
the user that their action was registered.

#### Evidence

-Usability session recording — Participant 1 clicked
 Login button twice during Task SD-01
-Quote: "I clicked the button but nothing happened —
 I wasn't sure if it worked"
-Heuristics evaluation finding — H1 severity 2

#### Heuristic analysis

H1 — Visibility of system status requires that the system
always keeps users informed about what is going on through
appropriate feedback within a reasonable time. A 2 to 3
second delay with no feedback violates this principle.

#### Recommendation

Add one of the following after Login button click:
1.Show a spinner inside the button
2.Change button text to "Logging in..."
3.Disable the button and show a page-level loading bar
4.Add a subtle animation to indicate processing

#### Acceptance criteria

-After clicking Login a loading indicator appears
 within 100 milliseconds
-The indicator remains visible until the page
 transitions or an error is shown
-Users do not click the button more than once
 in usability testing

---

### UX-002 — No booking confirmation after successful submission

| Field | Detail |
| --- | --- |
| **UX Bug ID** | UX-002 |
| **Title** | No confirmation or reference number shown after booking |
| **Date raised** | 2025-01-20 |
| **Raised by** | Your Name |
| **Source** | Usability test — Task RB-01 and RB-02 |
| **Application** | Restful Booker |
| **Page or feature** | Room booking form |
| **Heuristic violated** | H1 — Visibility of system status |
| **Severity** | Critical |
| **Priority** | P1 |
| **Status** | New |
| **Linked finding** | UF-001 |

#### User impact

All 3 usability test participants were unsure whether their
booking was successful. Without a confirmation message or
booking reference number users have no evidence of their
reservation. This severely damages trust in the system and
could lead to users abandoning the service.

#### Current behaviour

After clicking Book Room no clear success message is shown.
The form may clear but there is no booking reference number,
no confirmation message, and no email confirmation offered.
Users are left uncertain about whether their booking exists.

#### Expected behaviour

Immediately after a successful booking the system should:
1.Show a prominent success message
2.Display a booking reference number
3.Summarise the booking details — dates, room, price
4.Offer to send a confirmation email
5.Provide a link to view or manage the booking

#### Evidence

-All 3 participants expressed uncertainty after Task RB-01
-Quote: "I expected to get an email or see a reference number"
-Quote: "Did that work? I'm not sure if my booking went through"
-Task RB-02 completion rate: 0% — no participant found
 confirmation because none was shown

#### Heuristic analysis

H1 — Visibility of system status is critically violated.
A booking is a significant transaction. Users need immediate
and clear confirmation that the action was completed.
The current experience creates anxiety and distrust.

#### Recommendation

After successful booking submission display:
✅ Booking Confirmed
Booking Reference: RB-12345
Name: Jane Doe
Check-in: 15 January 2025
Check-out: 20 January 2025
Total price: $150
A confirmation has been sent to your email address.
[View Booking] [Make Another Booking]

#### Acceptance criteria

-A success message appears within 1 second of
 successful booking submission
-A booking reference number is displayed
-Booking dates and total price are summarised
-The confirmation is visible without scrolling
-Users can identify their booking reference in
  usability testing without assistance

---

### UX-003 — Invalid date combination accepted without error

| Field | Detail |
| --- | --- |
| **UX Bug ID** | UX-003 |
| **Title** | Check-out date before check-in date accepted by booking form |
| **Date raised** | 2025-01-20 |
| **Raised by** | Your Name |
| **Source** | Heuristic evaluation — H5 |
| **Application** | Restful Booker |
| **Page or feature** | Room booking form — date fields |
| **Heuristic violated** | H5 — Error prevention |
| **Severity** | Critical |
| **Priority** | P1 |
| **Status** | New |
| **Linked finding** | UF-002 |

#### User impact

A user can accidentally create a booking where check-out
is before check-in. This creates a logically impossible
booking that would cause operational problems for a real
hotel. Users who make this mistake have no way to know
their booking is invalid.

#### Current behaviour

The booking form accepts any date combination including
check-out dates that are before or equal to check-in dates.
No error or warning is displayed. The booking is submitted
and accepted by the system.

#### Expected behaviour

The booking form should prevent impossible date combinations:
1.Check-out must be after check-in
2.Neither date can be in the past
3.An inline error should explain the issue immediately

#### Evidence

-Usability test Participant 2 set check-out before check-in
 during Task RB-01 without realising
-No error was displayed — booking appeared to succeed
-Heuristics evaluation H5 severity rating: 4 — catastrophe

#### Heuristic analysis

H5 — Error prevention states that it is better to design
carefully to prevent problems from occurring in the first
place. Accepting impossible date ranges is a clear violation.
This is rated the most severe finding in this evaluation.

#### Recommendation

Implement date validation:
1.Disable all past dates in the check-in calendar
2.After check-in is selected — disable all dates before
   and equal to check-in in the check-out calendar
3.If dates are manually typed — validate on blur and
   show inline error: "Check-out must be after check-in"
4.Disable the Book Room button until dates are valid

#### Acceptance criteria

-Check-out calendar disables all dates up to
 and including check-in date
-If invalid dates are entered manually an error
 appears within 500 milliseconds of leaving the field
-The Book Room button is disabled while dates are invalid
-Users cannot submit a booking with invalid dates

---

## UX Bug Severity Guide

| Severity | Definition | Example |
| --- | --- | --- |
| **Critical** | Core user task cannot be completed or creates serious trust issues | No booking confirmation shown |
| **Major** | Task completed but with significant friction or confusion | No loading state on login |
| **Minor** | Small friction — user recovers without help | Sort option hard to find |
| **Cosmetic** | Visual polish — no impact on task completion | Button slightly misaligned |

---

## UX Bug vs Functional Bug

Use this guide to decide which template to use:

| Question | Yes → | No → |
| --- | --- | --- |
| Does the feature work technically? | UX bug template | Functional bug template |
| Is the issue about user perception or feeling? | UX bug template | Functional bug template |
| Would a developer say "it works as designed"? | UX bug template | Functional bug template |
| Does it cause user confusion rather than system error? | UX bug template | Functional bug template |

---

## Tracking UX Bugs

| Field | Detail |
| --- | --- |
| UX bugs are tracked separately | They require design input — not just development |
| Severity drives priority | Critical UX bugs should be treated as P1 |
| Evidence is essential | Quotes and observations from usability testing |
| Acceptance criteria required | How will we verify the fix improved the experience |
