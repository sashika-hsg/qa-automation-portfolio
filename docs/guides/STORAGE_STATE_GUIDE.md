# Understanding Playwright storageState

A complete reference covering what `storageState` captures, and how it behaves
across different authentication mechanisms: no auth, cookie sessions, JWT,
bearer tokens, and SSO/MFA.

## 1. What storageState actually is

`storageState` is a snapshot of a browser context's persistent storage:

- **Cookies** (all of them — session cookies, auth cookies, tracking cookies)
- **`localStorage`**, per origin

It does **not** capture:
- `sessionStorage` (intentionally — it's meant to be per-tab/session, not reused)
- In-memory JavaScript state (e.g. a Redux store that isn't persisted to
  localStorage)
- IndexedDB (not supported as of current Playwright versions)

The core mechanism: Playwright can dump this snapshot to a JSON file after
one context has it, then inject that same snapshot into a brand-new browser
context before any page loads. From the app's perspective, a context that
was just created ten milliseconds ago looks identical to one that's been
logged in for an hour — because the cookies/localStorage it's reading are
identical.

```typescript
// Capture
await context.storageState({ path: 'auth.json' });

// Reuse
const context = await browser.newContext({ storageState: 'auth.json' });
```

Everything below is really the same mechanism applied to different auth
architectures. What changes is **what exactly ends up in that JSON file**,
and **how hard it is to produce that file in the first place**.

---

## 2. Baseline: No auth

Nothing to capture. Every test just calls `browser.newContext()` with no
`storageState` option, and every page load is anonymous. This is the
default, and it's the reference point for everything else — `storageState`
is purely additive, it doesn't change how unauthenticated flows behave.

---

## 3. Cookie-based session auth (traditional server sessions)

**How the app works:** you POST a username/password to the server. The
server creates a session record (often in memory or Redis) and responds
with a `Set-Cookie` header containing a session ID (e.g.
`connect.sid=s%3AaBc123...`). The browser stores that cookie and sends it
back on every subsequent request. The server looks up the session ID
against its own store to know who you are.

**What storageState captures:** the session cookie itself. That's it — the
cookie *is* the credential.

**Setup (one-time capture, e.g. in `global-setup.ts`):**

```typescript
import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://your-app.com/login');
  await page.getByLabel('Username').fill('testuser');
  await page.getByLabel('Password').fill('testpass');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForURL('**/dashboard'); // confirm login succeeded

  await page.context().storageState({ path: 'playwright/.auth/user.json' });
  await browser.close();
}

export default globalSetup;
```

**Reuse in tests:**

```typescript
// playwright.config.ts
use: {
  storageState: 'playwright/.auth/user.json',
}
```

**Why it works:** the server doesn't care *how* the cookie arrived in the
browser — only that a valid cookie is present. Injecting it directly
skips the login form entirely, and the server is none the wiser.

**Gotcha:** session cookies often have a server-side expiry (e.g. 30
minutes of inactivity, or a hard 24-hour cap). If your CI run is long, or
you're reusing a captured state file across days, you can hit stale-session
failures that look like flaky tests but are actually expired auth. Re-run
global setup regularly, don't treat the captured file as permanent.

---

## 4. JWT stored in localStorage

**How the app works:** common in SPAs (React/Angular/Vue apps hitting a
REST/GraphQL API). On login, the server returns a JWT (a signed token
containing user claims) in the response body — not as a cookie. The
frontend JavaScript stores it in `localStorage` and manually attaches it
to future requests, usually as an `Authorization: Bearer <token>` header.

**What storageState captures:** the localStorage entry containing the JWT.

**Setup:** structurally identical to the cookie example above — you still
log in once via the UI and call `storageState()`. The difference is
invisible to you; Playwright grabs cookies *and* localStorage in the same
call. You don't need to handle JWT differently in the capture step.

```typescript
await page.context().storageState({ path: 'playwright/.auth/user.json' });
```

If you inspect the resulting JSON file, you'd see something like:

```json
{
  "cookies": [],
  "origins": [
    {
      "origin": "https://your-app.com",
      "localStorage": [
        { "name": "authToken", "value": "eyJhbGciOiJIUzI1NiIs..." }
      ]
    }
  ]
}
```

**Why it works:** same principle as cookies — the frontend JS reads
`localStorage.getItem('authToken')` on page load and uses it to build
request headers. It doesn't matter whether that value arrived via a real
login or was injected by Playwright before the page even loaded.

**Gotcha — this is the one most people miss:** JWTs are **self-contained
and time-limited by design** (there's usually an `exp` claim baked into the
token itself, checked client-side or server-side). A session cookie can
sometimes be sliding-expiry (renewed on activity); a JWT typically has a
hard expiry it can't renew itself. If your captured JWT expires between
capture and test run, tests fail with authenticated-looking-but-actually-401
errors. Some apps handle this with a refresh token (see below); if yours
doesn't, keep captured state files short-lived and regenerate often.

---

## 5. Bearer token / Authorization header auth (API-level)

This is really the same as JWT-in-localStorage from `storageState`'s point
of view when the frontend is doing the header attachment — but it's worth
separating out because **bearer tokens matter differently for API testing
than UI testing**.

**For UI tests:** if the app itself manages the bearer token (stores it in
localStorage, attaches it to `fetch`/`axios` calls automatically), you're
in the exact JWT scenario above — `storageState` handles it transparently.

**For pure API tests (no browser UI involved at all):** `storageState`
isn't really the right tool. You're not simulating a logged-in browser,
you're just making direct HTTP calls. The equivalent pattern is an
`extraHTTPHeaders` option on the request context:

```typescript
const apiContext = await request.newContext({
  baseURL: 'https://api.your-app.com',
  extraHTTPHeaders: {
    Authorization: `Bearer ${await getTestToken()}`,
  },
});
```

Where `getTestToken()` might call a token endpoint directly (e.g.
`POST /auth/token` with test credentials) rather than driving a browser at
all — much faster, since there's no page rendering involved.

**Rule of thumb:** if a real user would see a browser page during this
auth flow, use `storageState`. If it's a machine-to-machine token exchange
with no UI, skip the browser and get the token directly via API.

---

## 6. SSO / OAuth with MFA (Google, Microsoft, Okta, etc.)

This is the genuinely hard case, and it's worth being precise about *why*.

**How the app works:** your app doesn't issue its own credentials at all.
Login redirects the browser to an external identity provider (Google,
Microsoft, Okta). The user authenticates there — password, then an MFA
step (a 6-digit code via SMS/authenticator app, a push notification, a
hardware key). Only after that succeeds does the IdP redirect back to your
app with a token/code, which your app exchanges for its own session.

**The actual problem is not "MFA tokens expire quickly."** Plenty of
non-MFA tokens also expire quickly, and that alone wouldn't stop
`storageState` from working — you'd just recapture more often. The real
problem is **you cannot get a valid state to capture in the first place**
without a human completing a live, time-sensitive, out-of-band step (typing
a code that was just sent to a phone). Playwright can't script "wait for
a text message to arrive and read the code out of it" as a general
solution — that's not a browser-automatable action.

**What actually gets captured, once you're past login:** the same as any
other flow — cookies and/or localStorage that your app itself sets after
the IdP redirects back. `storageState` doesn't need to understand OAuth or
MFA at all; it only cares about the *end state*. The difficulty is entirely
in producing that end state once.

**Practical solutions, roughly in order of preference:**

1. **Test/service account with MFA disabled or bypassed.** Ask your
   identity provider admin (or DevOps) for a dedicated automation account
   that's exempt from MFA — common in enterprise setups, since this is a
   known, accepted automation problem. This is by far the cleanest fix.

2. **Direct token issuance via API**, bypassing the UI login entirely. Many
   IdPs support the OAuth "Resource Owner Password Credentials" grant or a
   client-credentials flow for trusted test clients — you get a token via
   a direct API call, then inject it into your app's expected cookie/
   localStorage location manually, without ever touching the login UI.

3. **Manual one-time capture.** A human logs in, solves the MFA prompt
   once, and saves the resulting `storageState` file. Tests reuse it until
   it expires, at which point someone manually repeats the process. Works,
   but doesn't scale to CI running unattended — someone has to be present
   periodically.

4. **Programmatic TOTP generation**, if the MFA method is a standard
   authenticator-app code (TOTP) rather than SMS. If you have the shared
   secret used to seed the authenticator (common for a dedicated test
   account you control), you can generate valid codes in code using a
   library like `otplib`, type it into the MFA field like a normal input,
   and the whole flow becomes fully automatable — no human required. This
   only works for TOTP, not SMS or push-notification MFA.

**What doesn't work:** trying to intercept/mock the SMS or push
notification itself. It's technically possible in tightly controlled test
environments but fragile, and most teams don't go there — options 1 and 2
above are far more common in practice.

---

## 7. Quick decision table

| Auth type | storageState captures | Setup difficulty | Key risk |
|---|---|---|---|
| None | Nothing needed | None | N/A |
| Cookie session | Session cookie | Low | Server-side session expiry |
| JWT (localStorage) | Token in localStorage | Low | Client-side token expiry (`exp` claim) |
| Bearer token (API-only) | N/A — use `extraHTTPHeaders` instead | Low | Token refresh handling |
| SSO, no MFA | Cookies your app sets post-redirect | Medium | IdP session timeout |
| SSO with MFA | Same as above | High | **Can't capture at all without solving the MFA step once** — needs a test account, direct token API, manual capture, or TOTP automation |

---

## 8. How this maps to this framework

`global-setup.ts` in this repo implements the cookie/JWT pattern from
sections 3–4: it logs in once via the UI before the full test suite runs,
captures `storageState`, and every test's browser context is created with
that state already loaded — so individual tests never touch the login
form. This is why login only happens once per test run, not once per test.