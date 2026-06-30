# ADR-003 — Why PostgreSQL over SQLite

## Status

Accepted

## Date

2026-06-30

## Context

The original v1 plan specified SQLite as the database layer technology, chosen for its zero-configuration setup and file-based simplicity, suitable for a portfolio project that needed to be quick to demonstrate. As the database layer (Phase 5) moved from planning into implementation, the goal shifted from "fastest to set up" to "most representative of a real production environment" — since the database layer exists specifically to demonstrate SDET capability around cross-service validation, which is a skill directly applicable to enterprise QA roles.

The constraint was no longer just speed of setup — it was whether the technology choice would be defensible and relevant in a Senior QA Engineer or SDET interview, where PostgreSQL is the de facto standard in production environments at most target companies (FinTech, tech product, consulting).

## Decision

Use PostgreSQL 15 running in a Docker container as the database layer for cross-validating API responses against persisted data, replacing the originally planned SQLite implementation.

## Alternatives considered

- **SQLite via better-sqlite3** — the original plan. Zero configuration, file-based, no external dependencies. Rejected because it does not reflect the technology most candidates will encounter in real QA roles, and does not demonstrate Docker or service-container orchestration, both of which are commonly asked about in SDET interviews.
- **MySQL** — widely used, similar production relevance to PostgreSQL. Considered but PostgreSQL has stronger adoption among the target companies (FinTech, tech product) and richer JSON/array support, which is more representative of modern API-backed schemas.
- **In-memory mock database (e.g. a JavaScript object store)** — fastest possible setup. Rejected outright because it provides no real SQL practice and would not demonstrate genuine database testing skill — the entire purpose of this phase.

## Reasons for this decision

- **Production relevance** — PostgreSQL is the standard relational database across the target company list (ANZ, NAB, Xero, Afterpay, SEEK, REA Group, Carsales). Demonstrating proficiency with it is directly transferable to interview discussions and on-the-job expectations.
- **Docker as a parallel skill demonstration** — running PostgreSQL via Docker, including a service container in GitHub Actions CI, demonstrates containerisation knowledge that SQLite's file-based model would not have required. This was a deliberate decision to broaden the skill surface of the portfolio, not just satisfy the database layer requirement in isolation.
- **CI/CD realism** — configuring a PostgreSQL service container in GitHub Actions (with health checks, port mapping, and environment variable injection) closely mirrors how real CI pipelines provision database dependencies for integration tests. SQLite would have skipped this entirely since it requires no service container.
- **SQL dialect consistency** — the parallel SQL learning track (Phase 3) is being practised against PostgreSQL-flavoured SQL, so using PostgreSQL for the actual test database keeps the syntax and behaviour consistent across both learning streams rather than splitting attention between two SQL dialects.

## Consequences

**Positive:**
- The database layer setup (Singleton connection pattern, Docker container, CI service container) is now a stronger, more defensible portfolio artefact for SDET interviews
- Local development requires Docker Desktop to be running, which is now documented as a prerequisite in the README Quick Start section
- The CI pipeline gained a PostgreSQL service container configuration, which is itself evidence of DevOps-adjacent QA skill

**Negative:**
- Adds a setup dependency — Docker Desktop must be installed and running before database tests can execute locally, unlike SQLite's zero-dependency file-based approach
- Slightly slower test startup locally compared to SQLite, since a container must be running and healthy before tests connect
- Requires `docker start qa-postgres` as a manual step each session unless Docker Desktop is configured to auto-start

**Mitigation of negatives:**
- The README Quick Start section documents the exact `docker run` command needed for first-time setup
- `DbClient`'s Singleton pattern means the connection overhead is paid once per test run, not per test
- CI does not have this friction at all — the GitHub Actions service container starts automatically as part of the workflow, with health checks ensuring readiness before tests run

## References

- PostgreSQL official documentation — https://www.postgresql.org/docs/
- Docker Desktop — https://www.docker.com/products/docker-desktop
- GitHub Actions service containers — https://docs.github.com/en/actions/using-containerized-services/about-service-containers
- node-postgres (pg) driver — https://node-postgres.com/