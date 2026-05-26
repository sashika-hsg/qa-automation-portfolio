# Usability Test Script

**Project:** QA Automation Portfolio
**Version:** 1.0
**Date:** 2026-05-26
**Author:** Sashika Samaragunaratne
**Applications:** Sauce Demo, Restful Booker

---

## 1. Overview

### 1.1 Purpose

This document defines the tasks, scenarios, and observation
guidelines for conducting usability testing on Sauce Demo
and Restful Booker. It is used to identify usability issues
that automated tests alone cannot detect.

### 1.2 What is Usability Testing

Usability testing observes real users attempting to complete
tasks with a product. The goal is to identify where users
struggle, get confused, or make errors — not to test whether
the system works correctly.

### 1.3 Key Principle

During usability testing — do not help the participant.
Observe and record. Every struggle is valuable data.

---

## 2. Test Logistics

| Item | Detail |
| --- | --- |
| **Session duration** | 60 minutes per participant |
| **Number of participants** | 3 to 5 recommended |
| **Location** | Remote — screen share via video call |
| **Equipment** | Computer with browser, screen recording |
| **Moderator** | Your Name |
| **Observer** | Optional — takes notes while moderator facilitates |

---

## 3. Participant Profile

### Target participant characteristics

| Characteristic | Detail |
| --- | --- |
| Age | 18 to 55 |
| Tech comfort | Comfortable using websites — not technical |
| E-commerce experience | Has purchased something online before |
| Hotel booking experience | Has made a hotel booking online before |
| Availability | 60 minutes uninterrupted |

### Participant screening questions

Ask these before confirming a participant:

1.How often do you shop online? Daily / Weekly / Monthly / Rarely
2.Have you booked a hotel online in the last 12 months? Yes / No
3.How comfortable are you using websites on a scale of 1 to 5?
4.Do you have 60 minutes available for a research session?

---

## 4. Moderator Introduction Script

Read this to the participant at the start of the session:

---

*"Thank you for participating in today's session. My name is
[Your Name] and I will be facilitating.*

*We are testing two websites today — not testing you. There are
no right or wrong answers. If something is confusing or unclear
that is extremely valuable feedback for us.*

*Please think aloud as you work through each task. Tell me what
you are looking at, what you are thinking, and what you are
trying to do. This helps us understand your experience.*

*I may not answer questions during the tasks — I want to see
how you would handle things on your own. After each task I
will ask you some questions.*

*Do you have any questions before we start?"*

---

## 5. Sauce Demo — Usability Tasks

### Task SD-01 — Find and purchase a product

**Time allowed:** 10 minutes

**Scenario:**
*"Imagine you are shopping for a backpack online.
You have arrived at this website for the first time.
Please find a backpack and purchase it."*

**Starting point:** `https://www.saucedemo.com`
**Credentials to provide:** Username `standard_user` Password `secret_sauce`

**Success criteria:**
-Participant completes checkout successfully
-Reaches the order confirmation page

**Observation points:**

| Step | What to observe |
| --- | --- |
| Login | Does the participant understand the form? Any hesitation? |
| Inventory | How do they scan the products? Do they scroll or read? |
| Adding to cart | Is the Add to Cart button clear? |
| Cart navigation | Do they find the cart icon easily? |
| Checkout form | Do they understand all fields? Any confusion? |
| Confirmation | Do they understand the order was placed? |

**Post-task questions:**
1.How easy or difficult was that task on a scale of 1 to 5?
2.Was there anything confusing or unexpected?
3.Was there anything you expected to see that was missing?

---

### Task SD-02 — Find the cheapest product

**Time allowed:** 5 minutes

**Scenario:**
*"You want to find the least expensive item available.
Please find the cheapest product on this site."*

**Starting point:** Inventory page — already logged in

**Success criteria:**
-Participant uses the sort dropdown to sort by price
-Identifies the cheapest item correctly

**Observation points:**

| Step | What to observe |
| --- | --- |
| Sort discovery | Do they find the sort dropdown? How long does it take? |
| Sort usage | Do they understand the sort options? |
| Result | Do they correctly identify the cheapest item? |

**Post-task questions:**
1.How did you decide to find the cheapest item?
2.Was the sort feature easy to find?
3.What would you have done if there was no sort option?

---

### Task SD-03 — Remove an item from the cart

**Time allowed:** 5 minutes

**Scenario:**
*"You have added a few items to your cart but changed your mind
about one of them. Please remove one item from your cart."*

**Starting point:** Cart page with 2 items already added

**Success criteria:**
-Participant removes one item successfully
-Cart badge updates to show correct count

**Observation points:**

| Step | What to observe |
| --- | --- |
| Remove button | Is the Remove button obvious? |
| Confirmation | Do they expect a confirmation dialog? |
| Cart update | Do they notice the cart badge updating? |

**Post-task questions:**
1.Was it clear how to remove an item?
2.Did you expect a confirmation before the item was removed?
3.How confident were you that the item was removed?

---

## 6. Restful Booker — Usability Tasks

### Task RB-01 — Make a hotel booking

**Time allowed:** 10 minutes

**Scenario:**
*"You are planning a trip and want to book a hotel room.
Please book a room for 3 nights starting next Monday."*

**Starting point:** `https://restful-booker.herokuapp.com`

**Success criteria:**
-Participant attempts to fill in the booking form
-Clicks the Book Room button

**Observation points:**

| Step | What to observe |
| --- | --- |
| Room discovery | Do they find the room listing easily? |
| Date selection | Do they understand the date picker? |
| Date order | Do they enter check-in before check-out? |
| Required fields | Do they understand which fields are required? |
| Submission | Do they know if the booking was successful? |

**Post-task questions:**
1.How easy or difficult was that task on a scale of 1 to 5?
2.Did you feel confident the booking was made?
3.What would you expect to happen after clicking Book Room?
4.Was the date selection clear?

---

### Task RB-02 — Find booking confirmation

**Time allowed:** 5 minutes

**Scenario:**
*"You just made a booking. Please find your booking confirmation
or booking reference number."*

**Starting point:** Same page after previous task

**Success criteria:**
-Participant looks for confirmation
-Notes whether they can find any booking reference

**Observation points:**

| Step | What to observe |
| --- | --- |
| Expectation | What do they expect to see? |
| Search behaviour | Where do they look first? |
| Confusion | Do they express confusion at not finding confirmation? |
| Resolution | How do they handle not finding the information? |

**Post-task questions:**
1.Were you able to find your booking confirmation?
2.What would you normally expect after making a booking?
3.How would you feel if you could not find a confirmation?

---

## 7. Post-Session Questions

Ask these at the end of the full session:

### Overall experience

1.Overall, how would you rate your experience with these
   websites on a scale of 1 to 5?

2.Which website was easier to use — the shopping site
   or the hotel booking site?

3.What was the most frustrating part of either experience?

4.What did you like most about either website?

5.If you could change one thing about either website
   what would it be?

---

### System Usability Scale — SUS

Ask the participant to rate each statement from 1 to 5
where 1 is Strongly Disagree and 5 is Strongly Agree.

| # | Statement |
| --- | --- |
| 1 | I think I would like to use this system frequently |
| 2 | I found the system unnecessarily complex |
| 3 | I thought the system was easy to use |
| 4 | I think I would need the support of a technical person |
| 5 | I found the various functions well integrated |
| 6 | I thought there was too much inconsistency in this system |
| 7 | I would imagine that most people would learn quickly |
| 8 | I found the system very cumbersome to use |
| 9 | I felt very confident using the system |
| 10 | I needed to learn a lot of things before using this system |

**SUS score calculation:**
-For odd-numbered questions: score minus 1
-For even-numbered questions: 5 minus score
-Sum all converted scores and multiply by 2.5
-Result is between 0 and 100

| SUS Score | Grade | Adjective |
| --- | --- | --- |
| 90 to 100 | A | Excellent |
| 80 to 89 | B | Good |
| 70 to 79 | C | Okay |
| 60 to 69 | D | Poor |
| Below 60 | F | Awful |

---

## 8. Observation Recording Template

Use this during each task to record observations:
Task: [Task ID and name]
Participant: [P1 / P2 / P3]
Start time: [HH:MM]
End time: [HH:MM]
Completed: Yes / No / Partial
Observations:

Quotes from participant:

Errors made:

Hesitations noted:

Post-task rating: [1 to 5]

---

## 9. After the Session

| Activity | Detail |
| --- | --- |
| Thank participant | Express genuine appreciation |
| Stop recording | Confirm recording has stopped |
| Debrief with observer | Discuss key findings while fresh |
| Update results | Add findings to USABILITY_TEST_RESULTS.md |
| Raise UX bugs | Log any findings as UX bugs |
