# Merge Conflict Resolution Guide

> A practical guide to resolving Git merge conflicts.
> Written from a real example encountered while merging
> `feat/stripe-payment-api` into `main` on this project.

---

## What is a merge conflict?

A merge conflict occurs when two branches have made changes to the
same part of the same file, and Git cannot automatically determine
which change to keep.

Git will pause the merge and mark the conflicting sections in the
file so you can resolve them manually.

---

## How to identify a conflict

When you run `git merge main` and a conflict exists, Git will output:

```
Auto-merging package.json
CONFLICT (content): Merge conflict in package.json
Automatic merge failed; fix conflicts and then commit the result.
```

Running `git status` will show:

```
Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   package.json
```

---

## What the conflict markers look like

Git inserts conflict markers directly into the file:

```
<<<<<<< HEAD
"test:newman:reqres": "newman run postman/collections/ReqRes...",
=======
"test:newman:ci": "newman run postman/collections/ReqRes...",
>>>>>>> main
```

| Marker | Meaning |
|---|---|
| `<<<<<<< HEAD` | Start of YOUR branch's changes |
| `=======` | Divider between the two versions |
| `>>>>>>> main` | End of the INCOMING branch's changes |

---

## Step-by-step resolution process

### Step 1 — Identify conflicting files

```bash
git status
```

Look for files listed under `Unmerged paths`.

### Step 2 — Open the file in VS Code

VS Code highlights conflicts with colour-coded sections and provides
buttons to accept changes:

- **Accept Current Change** — keeps YOUR branch's version
- **Accept Incoming Change** — keeps the OTHER branch's version
- **Accept Both Changes** — keeps both versions
- **Compare Changes** — shows a side-by-side diff

### Step 3 — Resolve the conflict

Decide which changes to keep. Options:

**Keep your changes only:**
```
"test:newman:reqres": "newman run postman/collections/ReqRes...",
```

**Keep incoming changes only:**
```
"test:newman:ci": "newman run postman/collections/ReqRes...",
```

**Keep both (most common in `package.json` scripts):**
```json
"test:newman:ci": "newman run postman/collections/ReqRes...",
"test:newman:reqres": "newman run postman/collections/ReqRes...",
```

Remove ALL conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) before saving.

### Step 4 — Mark the file as resolved

```bash
git add package.json
```

### Step 5 — Complete the merge

```bash
git merge --continue
```

Git will open an editor for the merge commit message. Save and close
it to complete the merge.

### Step 6 — Verify the resolution

```bash
git status
git log --oneline -3
```

Confirm the merge commit appears and no unmerged files remain.

### Step 7 — Push

```bash
git push
```

---

## Real example from this project

**Scenario:** `feat/stripe-payment-api` was created months before merging.
During that time, `package.json` scripts were updated on `main` with
new Newman scripts. The Stripe branch also added Newman scripts.
Both branches modified the same section of `package.json`.

**Conflict in `package.json`:**
```
<<<<<<< HEAD
"test:newman:stripe": "newman run postman/collections/Stripe...",
"test:newman:all": "npm run test:newman:reqres && npm run test:newman:stripe",
=======
"test:newman:ci": "newman run postman/collections/ReqRes...",
"test:newman:reqres": "newman run postman/collections/ReqRes...",
>>>>>>> main
```

**Resolution:** Keep all scripts from both branches — they are
additive, not contradictory:

```json
"test:newman:ci": "newman run postman/collections/ReqRes...",
"test:newman:reqres": "newman run postman/collections/ReqRes...",
"test:newman:stripe": "newman run postman/collections/Stripe...",
"test:newman:all": "npm run test:newman:reqres && npm run test:newman:stripe",
```

---

## Common mistakes to avoid

- **Leaving conflict markers in the file** — the code will fail to
  compile or parse if `<<<<<<<`, `=======`, or `>>>>>>>` remain
- **Discarding all incoming changes** — always review both sides
  before deciding what to keep
- **Not running tests after resolution** — always run the relevant
  tests after resolving to confirm the merge did not break anything
- **Committing without `git add`** — you must stage resolved files
  before running `git merge --continue`

---

## Quick reference

```bash
# Check which files have conflicts
git status

# After resolving a file, mark it as resolved
git add <filename>

# Complete the merge
git merge --continue

# Abort the merge entirely and start over
git merge --abort

# Check for remaining conflict markers
grep -r "<<<<<<" .
```

---

## Prevention tips

- **Merge main into your branch frequently** — the longer a branch
  lives without syncing, the more likely conflicts become
- **Keep PRs small and focused** — smaller changes are less likely
  to conflict with other work
- **Communicate with your team** — if two people are editing the
  same file, coordinate to avoid conflicts
- **Use feature flags** — instead of long-lived feature branches,
  merge small increments behind feature flags

---

*Added: July 2026*
*Real example: `feat/stripe-payment-api` merge conflict in `package.json`*