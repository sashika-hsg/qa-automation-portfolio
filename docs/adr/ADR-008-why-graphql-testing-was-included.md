# ADR-008 — Why GraphQL Testing Was Included

## Status

Accepted

## Date

2026-06-30

## Context

The original v1 plan listed GraphQL API testing as Phase 8, separate from the REST API testing already covered by ReqRes and Restful Booker. The question was whether GraphQL testing added genuine portfolio value beyond what REST API testing already demonstrated, given the additional time investment required to build a separate client, query strategy, and schema validation approach for a fundamentally different API paradigm.

The constraint was time — adding a third API testing approach (after UI and REST) needed to be justified by real differentiation value, not just breadth for its own sake, given the end-of-July job search deadline.

## Decision

Implement a dedicated GraphQL test suite against the Pokémon GraphQL API, using a standalone `GraphQLClient` that deliberately does not extend the existing REST `ApiClient`.

## Alternatives considered

- **Skip GraphQL entirely, focus only on REST** — would have saved approximately 1 day of work. Rejected because GraphQL is increasingly common in modern API architectures (used at companies like GitHub, Shopify, and many product companies on the target list), and its absence would be a visible gap to interviewers who specifically test for it.
- **Force GraphQLClient to extend ApiClient** — would have reduced new code by reusing the existing REST methods. Rejected because GraphQL's transport model (single POST endpoint, query-in-body) is fundamentally different from REST's multi-endpoint, multi-verb model. Forcing inheritance would have given `GraphQLClient` four unused HTTP methods (`put`, `patch`, `delete`, and the REST flavour of `get`), which is misleading and a textbook violation of the Interface Segregation Principle.
- **Test GraphQL using a third-party library (Apollo Client, graphql-request)** — would have added external dependencies and obscured the underlying mechanics. Rejected in favour of a custom lightweight client built directly on Playwright's `APIRequestContext`, consistent with how the REST clients were built from scratch rather than using a scaffold — this was a deliberate framework-wide decision (see ADR-002 and the SDET transition rationale).

## Reasons for this decision

- **Differentiates from typical QA portfolios** — most QA automation portfolios on LinkedIn only demonstrate REST API testing. GraphQL coverage is a genuine differentiator and signals breadth of API testing knowledge.
- **Tests a fundamentally different validation problem** — GraphQL always returns HTTP 200, even for errors, with failure information embedded in the response body's `errors` array. This requires schema-based validation rather than status-code-based validation, which is a distinct skill from REST testing and worth demonstrating explicitly.
- **Demonstrates judgement, not just pattern application** — the decision to not extend `ApiClient` is itself a portfolio artefact. It shows the ability to recognise when established patterns from a framework should not be force-applied, which is a stronger signal of seniority than uniformly applying inheritance everywhere.
- **Low marginal cost given the existing AJV schema validation infrastructure** — since AJV schema validation was already built for the REST API tests, extending the same validation approach to GraphQL responses required no new tooling, only new schemas.

## Consequences

**Positive:**
- The portfolio now demonstrates three distinct API testing paradigms (REST with auth, REST with API keys, and GraphQL) rather than just one
- The intentional non-inheritance decision for `GraphQLClient` is documented in `docs/design/DESIGN_PATTERNS.md` as a worked example of design judgement
- 10 GraphQL tests covering single queries, list queries, nested field queries, and negative cases (unknown name, empty string) add meaningful coverage without disproportionate time investment

**Negative:**
- A third query-string management approach was needed (`src/api/queries/pokemonQueries.ts`), separate from how REST endpoints are called, adding a small amount of structural complexity to the framework
- The Pokémon GraphQL API is a public third-party sandbox with the same reliability caveats as the REST sandboxes used elsewhere in the project (see the Restful Booker DELETE behaviour documented in the bookings test suite)

**Mitigation of negatives:**
- The query-string separation is intentional and documented — it mirrors the separation already present between REST schemas (`src/api/schemas/`) and REST clients (`src/api/clients/`), so it follows an established framework convention rather than introducing a new one
- Sandbox reliability risk is mitigated the same way as elsewhere in the project — tests document actual observed behaviour rather than asserting undocumented contracts where a discrepancy was found

## References

- GraphQL official documentation — https://graphql.org/learn/
- Pokémon GraphQL API — https://graphql-pokemon2.vercel.app
- Interface Segregation Principle — https://en.wikipedia.org/wiki/Interface_segregation_principle
- Apollo GraphQL — REST vs GraphQL — https://www.apollographql.com/blog/graphql-vs-rest