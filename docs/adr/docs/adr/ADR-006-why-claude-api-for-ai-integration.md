# ADR-006 — Why Claude API for AI Integration

## Status

Accepted

## Date

2026-07-21

## Context

AI integration was included in the v1 roadmap as Phase 10. The question was whether to include AI-powered capabilities in a QA automation framework, and if so, which AI provider and which use cases to target. The QA industry is rapidly adopting AI tools — AI-assisted test generation, failure analysis, and test data generation are becoming expected capabilities in senior QA and SDET roles. Demonstrating awareness and practical implementation of AI in testing is increasingly a differentiator in job interviews.

The constraint was choosing an AI provider that was accessible, had a well-documented API, and whose capabilities aligned with practical QA use cases — not just using AI as a buzzword but demonstrating genuine, testable value.

## Decision

Use the Anthropic Claude API to power AI-assisted test data generation and test failure analysis within the framework.

## Alternatives considered

- **OpenAI GPT API** — the most widely known option. Rejected in favour of Claude because Claude demonstrates stronger performance on structured output tasks (generating valid JSON test data), has a more predictable response format, and Anthropic's safety-focused approach reduces the risk of unpredictable outputs in a CI/CD context.
- **GitHub Copilot API** — primarily a code completion tool, not suitable for runtime test data generation or failure analysis. Rejected because it doesn't provide an API suitable for programmatic integration into a test framework.
- **No AI integration** — considered. Rejected because AI in testing is a genuine and growing skill requirement in senior QA roles, particularly in FinTech and product companies. A framework without any AI component would be missing an increasingly expected capability.
- **Local LLM (Ollama)** — would avoid API costs and keep data local. Rejected because local models require significant compute resources, produce less reliable structured output, and don't represent the enterprise reality where cloud AI APIs are the standard approach.

## Reasons for this decision

- **Practical QA use cases** — Claude API is used for two genuine QA problems: generating contextually appropriate test data (instead of hardcoded constants) and analysing test failures to suggest root causes. Both are real productivity improvements, not just demonstrations.
- **Structured output reliability** — Claude produces reliable JSON output when prompted correctly, which is essential for test data generation where the output must match AJV schemas before being used in tests.
- **Framework consistency** — the framework is built on TypeScript throughout. Claude API integration uses a standard `fetch` call to the Anthropic API, consistent with how other HTTP clients are built in the framework.
- **Interview relevance** — Anthropic and Claude are widely known in the Australian tech market. Being able to discuss Claude's capabilities, limitations, and appropriate use cases in testing demonstrates genuine AI literacy rather than surface-level awareness.
- **Cost transparency** — Claude API pricing is transparent and usage-based. For a portfolio project with limited test runs, the cost is negligible while the demonstration value is high.

## Consequences

**Positive:**
- The framework demonstrates awareness of AI's role in modern QA tooling — a genuine differentiator in senior QA interviews
- AI-generated test data reduces the maintenance burden of keeping hardcoded test data constants current
- Failure analysis capability reduces debugging time in CI — AI can suggest root causes from stack traces

**Negative:**
- Adds an external API dependency to the test framework — tests that use AI-generated data require network access and a valid API key
- Non-deterministic output — Claude may generate slightly different test data on each run, which requires schema validation (AJV) to ensure generated data is always valid before use
- API rate limits and costs — in a large CI/CD environment, frequent AI calls could hit rate limits or incur unexpected costs

**Mitigation of negatives:**
- `CLAUDE_API_KEY` is stored as a GitHub Actions secret — never exposed in code or logs
- All AI-generated data is validated against AJV schemas before use in tests — non-determinism is bounded by schema constraints
- AI integration is isolated in `src/ai/` — tests that don't use AI-generated data are unaffected by API availability
- The `AI_ENABLED` environment variable allows AI features to be toggled off in environments without API access

## References

- Anthropic Claude API documentation — https://docs.anthropic.com
- Claude API pricing — https://www.anthropic.com/pricing
- AI in QA testing — https://www.anthropic.com/research