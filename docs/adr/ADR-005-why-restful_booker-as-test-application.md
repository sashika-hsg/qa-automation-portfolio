# ADR-005 — Why Restful Booker as Test Application

## Status

Accepted

## Date

2026-06-15

## Context

The framework needed a second REST API target alongside ReqRes to demonstrate breadth across different authentication models and CRUD complexity. ReqRes is a simple, stateless mock API with no real authentication and limited resource relationships. A second API was needed that would exercise token-based authentication, full CRUD lifecycle management, and a more realistic resource shape (a booking with nested date ranges), without requiring the overhead of standing up and maintaining a custom backend purely for portfolio purposes.

## Decision

Use Restful Booker (`restful-booker.herokuapp.com`) as the second REST API target, specifically to demonstrate cookie-based token authentication and full CRUD operations against a stateful resource.

## Alternatives considered

- **A second mock API similar to ReqRes (e.g. JSONPlaceholder)** — rejected because it would duplicate the same testing patterns already demonstrated against ReqRes (stateless, no real auth) without adding new skill coverage.
- **Building a custom Express/Node backend purely for testing** — would have allowed full control over the API surface and the ability to add deliberate bugs or edge cases. Rejected due to time cost relative to portfolio value — maintaining a custom backend is infrastructure overhead that doesn't itself demonstrate QA skill, and Restful Booker already provides the needed authentication and CRUD complexity for free.
- **A real-world public API requiring registration (e.g. Stripe sandbox, Twilio)** — rejected because most require API keys tied to a real account with usage limits or costs, adding friction for anyone reviewing or running the portfolio.

## Reasons for this decision

- **Purpose-built for API testing practice** — Restful Booker was created specifically as a testing sandbox by Mark Winteringham, a recognised figure in the API testing community, which lends credibility to its use as a learning and demonstration target.
- **Cookie-based token authentication** — unlike ReqRes's static API key model, Restful Booker requires an `auth` call to obtain a token, which must then be passed as a `Cookie` header on subsequent requests. This is a meaningfully different authentication pattern worth demonstrating separately, and is closer to how many real internal APIs handle session-based auth.
- **Full CRUD lifecycle on a stateful resource** — bookings can be created, read, updated (both full PUT and partial PATCH), and deleted, with nested date range data (`bookingdates`). This is more representative of real application data than ReqRes's flat user objects, and justified building the Builder pattern (`BookingBuilder`) specifically around it.
- **Documented quirks make for genuine negative testing material** — the sandbox's undocumented behaviour (unauthenticated DELETE returning 200 instead of the documented 403) became a real test case demonstrating the difference between asserting a documented contract versus asserting actual observed behaviour — a distinction worth being able to discuss in interviews.
- **Dual-purpose application** — Restful Booker also has a UI component (admin login, booking search), which keeps the option open to later add UI tests against the same domain if the portfolio is extended, without introducing a new application.

## Consequences

**Positive:**
- The framework now demonstrates two distinct authentication models (static API key vs cookie-based token) across two different REST API testing suites
- The Builder pattern has a genuine, non-trivial use case (`BookingBuilder`) built specifically around Restful Booker's nested date object
- The undocumented DELETE behaviour is now a documented, deliberate test case rather than a flaky failure, demonstrating the QA skill of distinguishing expected versus observed behaviour

**Negative:**
- Restful Booker is a public, shared sandbox with no SLA — it has shown eventual-consistency delays (a created booking is not always immediately retrievable), requiring a `toPass()` retry pattern in the test setup
- As a third-party hosted service, it can occasionally be slow or briefly unavailable, which is a risk shared with the other public sandboxes used in this project (ReqRes, Pokémon GraphQL API)

**Mitigation of negatives:**
- The `toPass()` retry pattern in `beforeEach` (`tests/api/restfulBooker/bookings.spec.ts`) explicitly handles the eventual-consistency delay before each test proceeds
- The undocumented DELETE behaviour is captured as an explicit negative test with inline documentation explaining the discrepancy between expected and observed behaviour, rather than being silently ignored or causing flaky failures
- Sandbox unavailability risk is accepted as a known trade-off consistent with using any free public testing sandbox, and is the same trade-off already accepted for ReqRes and the Pokémon GraphQL API

## References

- Restful Booker — https://restful-booker.herokuapp.com
- Restful Booker API documentation — https://restful-booker.herokuapp.com/apidoc/index.html
- Mark Winteringham — API testing resources — https://www.mwtestconsultancy.co.uk/