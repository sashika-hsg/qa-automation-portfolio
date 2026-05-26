# Test Cases

**Project:** QA Automation Portfolio
**Version:** 1.0
**Date:** 2026-05-26
**Author:** Sashika Samaragunaratne
**Status:** Approved

---

## 1. Test Case Format

Each test case follows this structure:

| Field | Description |
| --- | --- |
| **ID** | Unique identifier — TC-APP-NUMBER |
| **Title** | Short description of what is being tested |
| **Requirement** | Linked requirement from REQUIREMENTS.md |
| **Type** | Functional, Non-functional, Security etc. |
| **Priority** | High, Medium, Low |
| **Preconditions** | What must be true before the test runs |
| **Steps** | Numbered steps to execute |
| **Expected result** | What should happen |
| **Test data** | Data used in this test |
| **Tags** | @smoke @regression @critical @edge @negative |

---

## 2. Sauce Demo — Authentication Test Cases

### TC-SD-001 — Standard user login with valid credentials

| Field | Detail |
| --- | --- |
| **ID** | TC-SD-001 |
| **Title** | Standard user can log in with valid credentials |
| **Requirement** | FR-001-01 |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @smoke @critical @regression |

**Preconditions:**
-Browser is open
-Sauce Demo login page is loaded

**Steps:**
1.Navigate to `https://www.saucedemo.com`
2.Enter username `standard_user` in the username field
3.Enter password `secret_sauce` in the password field
4.Click the Login button

**Expected result:**
-User is redirected to the inventory page
-URL contains `/inventory.html`
-Page displays product catalogue

**Test data:**
-Username: `standard_user`
-Password: `secret_sauce`

---

### TC-SD-002 — Locked out user cannot log in

| Field | Detail |
| --- | --- |
| **ID** | TC-SD-002 |
| **Title** | Locked out user sees error message on login attempt |
| **Requirement** | FR-001-02 |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @regression @negative @critical |

**Preconditions:**
-Browser is open
-Sauce Demo login page is loaded

**Steps:**
1.Navigate to `https://www.saucedemo.com`
2.Enter username `locked_out_user` in the username field
3.Enter password `secret_sauce` in the password field
4.Click the Login button

**Expected result:**
-User remains on login page
-Error message displays: "Sorry, this user has been locked out"
-No redirect to inventory page

**Test data:**
-Username: `locked_out_user`
-Password: `secret_sauce`

---

### TC-SD-003 — Login with invalid password

| Field | Detail |
| --- | --- |
| **ID** | TC-SD-003 |
| **Title** | Invalid password shows error message |
| **Requirement** | FR-001-03 |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @regression @negative |

**Preconditions:**
-Browser is open
-Sauce Demo login page is loaded

**Steps:**
1.Navigate to `https://www.saucedemo.com`
2.Enter username `standard_user` in the username field
3.Enter password `wrongpassword` in the password field
4.Click the Login button

**Expected result:**
-User remains on login page
-Error message displays username and password do not match

**Test data:**
-Username: `standard_user`
-Password: `wrongpassword`

---

### TC-SD-004 — Login with empty username

| Field | Detail |
| --- | --- |
| **ID** | TC-SD-004 |
| **Title** | Empty username field shows validation error |
| **Requirement** | FR-001-04 |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @regression @negative @edge |

**Preconditions:**
-Browser is open
-Sauce Demo login page is loaded

**Steps:**
1.Navigate to `https://www.saucedemo.com`
2.Leave the username field empty
3.Enter password `secret_sauce` in the password field
4.Click the Login button

**Expected result:**
-User remains on login page
-Error message displays: "Username is required"

**Test data:**
-Username: empty
-Password: `secret_sauce`

---

### TC-SD-005 — Login with empty password

| Field | Detail |
| --- | --- |
| **ID** | TC-SD-005 |
| **Title** | Empty password field shows validation error |
| **Requirement** | FR-001-04 |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @regression @negative @edge |

**Preconditions:**
-Browser is open
-Sauce Demo login page is loaded

**Steps:**
1.Navigate to `https://www.saucedemo.com`
2.Enter username `standard_user` in the username field
3.Leave the password field empty
4.Click the Login button

**Expected result:**
-User remains on login page
-Error message displays: "Password is required"

**Test data:**
-Username: `standard_user`
-Password: empty

---

### TC-SD-006 — Successful logout

| Field | Detail |
| --- | --- |
| **ID** | TC-SD-006 |
| **Title** | Logged in user can successfully log out |
| **Requirement** | FR-001-05 |
| **Type** | Functional |
| **Priority** | Medium |
| **Tags** | @regression |

**Preconditions:**
-User is logged in as `standard_user`
-Inventory page is displayed

**Steps:**
1.Click the hamburger menu button
2.Click the Logout link

**Expected result:**
-User is redirected to login page
-Session is cleared
-Navigating back does not restore the session

**Test data:**
-Username: `standard_user`
-Password: `secret_sauce`

---

## 3. Sauce Demo — Inventory Test Cases

### TC-SD-007 — Inventory page displays all products

| Field | Detail |
| --- | --- |
| **ID** | TC-SD-007 |
| **Title** | Inventory page displays all 6 products |
| **Requirement** | FR-002-01 |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @smoke @regression |

**Preconditions:**
-User is logged in as `standard_user`

**Steps:**
1.Observe the inventory page after login

**Expected result:**
-Exactly 6 products are displayed
-Each product shows name, description, image, and price

---

### TC-SD-008 — Sort products by price low to high

| Field | Detail |
| --- | --- |
| **ID** | TC-SD-008 |
| **Title** | Products can be sorted by price low to high |
| **Requirement** | FR-002-04 |
| **Type** | Functional |
| **Priority** | Medium |
| **Tags** | @regression |

**Preconditions:**
-User is logged in as `standard_user`
-Inventory page is displayed

**Steps:**
1.Click the sort dropdown
2.Select "Price (low to high)"

**Expected result:**
-Products are reordered
-First product has the lowest price
-Last product has the highest price
-Prices are in ascending order

---

## 4. Sauce Demo — Cart Test Cases

### TC-SD-009 — Add single item to cart

| Field | Detail |
| --- | --- |
| **ID** | TC-SD-009 |
| **Title** | User can add a single product to the cart |
| **Requirement** | FR-003-01 |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @smoke @regression @critical |

**Preconditions:**
-User is logged in as `standard_user`
-Inventory page is displayed

**Steps:**
1.Click "Add to cart" on the first product
2.Observe the cart icon

**Expected result:**
-Cart badge shows count of 1
-Button text changes to "Remove"

---

### TC-SD-010 — Remove item from cart

| Field | Detail |
| --- | --- |
| **ID** | TC-SD-010 |
| **Title** | User can remove a product from the cart |
| **Requirement** | FR-003-02 |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @regression |

**Preconditions:**
-User is logged in as `standard_user`
-One item is already in the cart

**Steps:**
1.Click "Remove" on a product already in the cart

**Expected result:**
-Cart badge count decreases by 1
-Button text changes back to "Add to cart"

---

## 5. Sauce Demo — Checkout Test Cases

### TC-SD-011 — Complete checkout successfully

| Field | Detail |
| --- | --- |
| **ID** | TC-SD-011 |
| **Title** | User can complete a full checkout flow |
| **Requirement** | FR-004-01, FR-004-05 |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @smoke @critical @regression |

**Preconditions:**
-User is logged in as `standard_user`
-At least one item is in the cart

**Steps:**
1.Click the cart icon
2.Click "Checkout"
3.Enter first name "Jane"
4.Enter last name "Doe"
5.Enter postal code "3000"
6.Click "Continue"
7.Review the order summary
8.Click "Finish"

**Expected result:**
-Success message displays "Thank you for your order"
-Cart is cleared
-User is on the order confirmation page

**Test data:**
-First name: Jane
-Last name: Doe
-Postal code: 3000

---

### TC-SD-012 — Checkout fails with missing first name

| Field | Detail |
| --- | --- |
| **ID** | TC-SD-012 |
| **Title** | Checkout shows error when first name is missing |
| **Requirement** | FR-004-03 |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @regression @negative |

**Preconditions:**
-User is logged in as `standard_user`
-At least one item is in the cart
-User is on the checkout information page

**Steps:**
1.Leave first name field empty
2.Enter last name "Doe"
3.Enter postal code "3000"
4.Click "Continue"

**Expected result:**
-Error message displays: "First Name is required"
-User remains on checkout information page

---

## 6. Restful Booker API Test Cases

### TC-RB-001 — Generate authentication token

| Field | Detail |
| --- | --- |
| **ID** | TC-RB-001 |
| **Title** | Valid credentials return authentication token |
| **Requirement** | FR-005-01 |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @smoke @critical @regression |

**Preconditions:**
-Restful Booker API is available

**Steps:**
1.Send POST request to `/auth`
2.Include body: `{"username": "admin", "password": "password123"}`

**Expected result:**
-Response status is 200
-Response body contains `token` field
-Token is a non-empty string

**Test data:**
-Username: `admin`
-Password: `password123`

---

### TC-RB-002 — Invalid credentials return error

| Field | Detail |
| --- | --- |
| **ID** | TC-RB-002 |
| **Title** | Invalid credentials return error response |
| **Requirement** | FR-005-02 |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @regression @negative |

**Preconditions:**
-Restful Booker API is available

**Steps:**
1.Send POST request to `/auth`
2.Include body: `{"username": "wrong", "password": "wrong"}`

**Expected result:**
-Response body contains reason field with error message
-No token is returned

---

### TC-RB-003 — Get all bookings

| Field | Detail |
| --- | --- |
| **ID** | TC-RB-003 |
| **Title** | GET all bookings returns list of booking IDs |
| **Requirement** | FR-006-01 |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @smoke @regression |

**Preconditions:**
-Restful Booker API is available

**Steps:**
1.Send GET request to `/booking`

**Expected result:**
-Response status is 200
-Response body is an array
-Each item contains a `bookingid` field

---

### TC-RB-004 — Create a new booking

| Field | Detail |
| --- | --- |
| **ID** | TC-RB-004 |
| **Title** | Valid booking data creates a new booking |
| **Requirement** | FR-006-03 |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @smoke @critical @regression |

**Preconditions:**
-Restful Booker API is available

**Steps:**
1.Send POST request to `/booking`
2.Include valid booking body with all required fields

**Expected result:**
-Response status is 200
-Response contains `bookingid` — a positive integer
-Response contains `booking` object matching the request data

**Test data:**
-firstname: Jane
-lastname: Doe
-totalprice: 150
-depositpaid: true
-checkin: 2025-01-15
-checkout: 2025-01-20

---

### TC-RB-005 — Get booking by ID

| Field | Detail |
| --- | --- |
| **ID** | TC-RB-005 |
| **Title** | GET booking by valid ID returns correct booking |
| **Requirement** | FR-006-02 |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @regression |

**Preconditions:**
-A booking exists with a known ID

**Steps:**
1.Send GET request to `/booking/{id}` with a valid booking ID

**Expected result:**
-Response status is 200
-Response body matches the booking interface
-All required fields are present

---

### TC-RB-006 — Get non-existent booking returns 404

| Field | Detail |
| --- | --- |
| **ID** | TC-RB-006 |
| **Title** | GET booking with invalid ID returns 404 |
| **Requirement** | FR-006-07 |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @regression @negative |

**Preconditions:**
-Restful Booker API is available

**Steps:**
1.Send GET request to `/booking/999999`

**Expected result:**
-Response status is 404

**Test data:**
-Booking ID: 999999 — non-existent

---

### TC-RB-007 — Update booking with PUT

| Field | Detail |
| --- | --- |
| **ID** | TC-RB-007 |
| **Title** | PUT request fully updates an existing booking |
| **Requirement** | FR-006-04 |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @regression |

**Preconditions:**
-A booking exists with a known ID
-Valid authentication token is available

**Steps:**
1.Send PUT request to `/booking/{id}`
2.Include valid token in Cookie header
3.Include complete updated booking body

**Expected result:**
-Response status is 200
-Response body reflects all updated values

---

### TC-RB-008 — Partial update booking with PATCH

| Field | Detail |
| --- | --- |
| **ID** | TC-RB-008 |
| **Title** | PATCH request partially updates a booking |
| **Requirement** | FR-006-05 |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @regression |

**Preconditions:**
-A booking exists with a known ID
-Valid authentication token is available

**Steps:**
1.Send PATCH request to `/booking/{id}`
2.Include valid token in Cookie header
3.Include only the fields to update: `{"totalprice": 200}`

**Expected result:**
-Response status is 200
-Updated field reflects new value
-Other fields remain unchanged

**Test data:**
-Updated price: 200

---

### TC-RB-009 — Delete booking

| Field | Detail |
| --- | --- |
| **ID** | TC-RB-009 |
| **Title** | DELETE request removes an existing booking |
| **Requirement** | FR-006-06 |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @regression |

**Preconditions:**
-A booking exists with a known ID
-Valid authentication token is available

**Steps:**
1.Send DELETE request to `/booking/{id}`
2.Include valid token in Cookie header

**Expected result:**
-Response status is 201
-Subsequent GET request to same ID returns 404

---

### TC-RB-010 — Delete without token returns 403

| Field | Detail |
| --- | --- |
| **ID** | TC-RB-010 |
| **Title** | DELETE without authentication token returns 403 |
| **Requirement** | FR-005-03 |
| **Type** | Security |
| **Priority** | High |
| **Tags** | @regression @negative @security |

**Preconditions:**
-A booking exists with a known ID

**Steps:**
1.Send DELETE request to `/booking/{id}`
2.Do NOT include authentication token

**Expected result:**
-Response status is 403
-Booking is not deleted

---

## 7. GraphQL Test Cases

### TC-GQ-001 — Query single Pokemon by name

| Field | Detail |
| --- | --- |
| **ID** | TC-GQ-001 |
| **Title** | Query returns correct Pokemon data by name |
| **Requirement** | GraphQL functional coverage |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @smoke @regression |

**Preconditions:**
-Pokemon GraphQL API is available

**Steps:**
1.Send GraphQL query for Pokemon with name "Pikachu"
2.Request fields: id, name, types, maxHP, maxCP

**Expected result:**
-Response contains data object
-Pokemon name is "Pikachu"
-Types array contains "Electric"
-No errors array in response

---

### TC-GQ-002 — Query non-existent Pokemon returns null

| Field | Detail |
| -- | --- |
| **ID** | TC-GQ-002 |
| **Title** | Query for non-existent Pokemon returns null data |
| **Requirement** | GraphQL functional coverage |
| **Type** | Functional |
| **Priority** | Medium |
| **Tags** | @regression @negative |

**Preconditions:**
-Pokemon GraphQL API is available

**Steps:**
1.Send GraphQL query for Pokemon with name "NotAPokemon"

**Expected result:**
-Response has no errors
-Pokemon field in data is null

---

## 8. Database Validation Test Cases

### TC-DB-001 — Seeded user exists in database

| Field | Detail |
| --- | --- |
| **ID** | TC-DB-001 |
| **Title** | Seeded standard user record exists with correct role |
| **Requirement** | DB validation coverage |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @regression |

**Preconditions:**
-Database seed script has been executed

**Steps:**
1.Query database for user with email `standard@saucedemo.com`

**Expected result:**
-Record exists
-Role is `standard_user`
-firstName is `Standard`

---

### TC-DB-002 — API response matches database record

| Field | Detail |
| --- | --- |
| **ID** | TC-DB-002 |
| **Title** | Booking created via API matches database record |
| **Requirement** | DB validation coverage |
| **Type** | Functional |
| **Priority** | High |
| **Tags** | @regression |

**Preconditions:**
-Database is available
-API is available

**Steps:**
1.Create a booking via API
2.Capture the returned bookingid
3.Query database for matching record
4.Compare API response fields with database record

**Expected result:**
-Database record exists
-All fields match the API response
-No data corruption or loss

---

## 9. Accessibility Test Cases

### TC-A11Y-001 — Login page passes WCAG 2.1 AA

| Field | Detail |
| --- | --- |
| **ID** | TC-A11Y-001 |
| **Title** | Sauce Demo login page has no accessibility violations |
| **Requirement** | NFR-003 |
| **Type** | Accessibility |
| **Priority** | Medium |
| **Tags** | @accessibility @regression |

**Preconditions:**
-Browser is open
-Login page is loaded

**Steps:**
1.Navigate to Sauce Demo login page
2.Run axe-core accessibility scan
3.Check results for WCAG 2.1 AA violations

**Expected result:**
-Zero critical or serious accessibility violations

---

## 10. Performance Test Cases

### TC-PERF-001 — Booking API handles load

| Field | Detail |
| --- | --- |
| **ID** | TC-PERF-001 |
| **Title** | Booking API maintains response times under load |
| **Requirement** | NFR-006 |
| **Type** | Performance |
| **Priority** | Medium |
| **Tags** | @performance |

**Preconditions:**
-Restful Booker API is available
-k6 is installed

**Steps:**
1.Execute k6 load test script
2.Ramp up to 10 virtual users over 30 seconds
3.Maintain 10 users for 1 minute
4.Ramp down over 30 seconds

**Expected result:**
-95th percentile response time under 2000ms
-Error rate below 1%
-All requests return valid responses
