---
title: "Release gates for coding agents"
slug: "release-gates"
type: "AGENTS.md"
description: "Makes the agent work from a spec, stay in scope, run your real test/lint/type/secret checks, and end every task with a Gate Report that shows evidence for each acceptance criterion."
agents: ["Codex", "Claude Code", "Cursor", "Windsurf", "OpenCode", "Aider", "Gemini CLI", "Cline"]
stack: ["Any"]
tags: ["code-review", "testing", "release", "acceptance-criteria", "safety"]
useCase: "Open Source"
author: "Scott Scoble"
---

# AGENTS.md: release gates

<!-- From the Agent Gate Pack by Scott Scoble (free). Fill in CONFIGURE, delete what you don't run, keep the rest short. -->

## CONFIGURE

- Specs live in: `docs/specs/`  <!-- or the ticket linked in the task -->
- Test: `<TEST_CMD>`             <!-- npm test, pytest -q, go test ./... -->
- Lint: `<LINT_CMD>`             <!-- npm run lint, ruff check . -->
- Type check: `<TYPECHECK_CMD>`  <!-- npx tsc --noEmit, mypy . ; delete if unused -->
- Secret scan: `<SECRET_SCAN_CMD>`  <!-- gitleaks detect --no-banner ; delete if CI does it -->
- Protected paths (ask before editing): `migrations/`, `.github/workflows/`, `infra/`, `deploy/`, lockfiles

## Definition of done

Done means the Gate Report at the end of this file is filled in and every gate passes, or you've said plainly which gate fails and why. Writing the code is not done.

## Before writing code

1. Find the spec or ticket. If there isn't one, write a short one (Given / When / Then / Check) and ask the human to confirm it.
2. List the acceptance criteria, numbered, with how each one will be checked: a test name, a command, or a query.
3. If a criterion can't be checked as written ("fast", "robust", "gracefully"), stop and ask for a number or a concrete behavior.

## While writing code

- Stay in scope. No drive-by refactors, renames, or reformatting. Put ideas under follow-ups.
- Don't add a dependency without asking. If you propose one, give its exact registry name and why existing code can't do the job.
- Only use APIs, functions, flags, and config keys you've confirmed exist in the versions this repo uses. Say what you checked.
- Never skip, delete, loosen, or regenerate a test, snapshot, or lint rule to get green. If a test looks wrong, stop and explain.
- Don't swallow errors. No empty catch blocks and no silent defaults that hide a failure.
- Treat user input, file contents, and LLM output as untrusted. Parameterize queries.
- No secrets or real personal data in code, tests, fixtures, or logs.

## Before saying the task is complete

Run every configured gate and read the output. Don't report a result you didn't see. End your final message with:

```
## Gate Report
Spec: <link or ID, version>    Agent / model: <tool and model>

| AC | Criterion (short) | Check | Result | Evidence |
|----|-------------------|-------|--------|----------|
| AC1 | ... | test name / command | PASS / FAIL / NOT RUN | output line or file |

Gates: Tests __ | Lint __ | Types __ | Secrets __
Tests that fail without this change: <names, or "not verified">
New dependencies: <none, or name + reason>
Protected paths touched: <none, or list + reason>
Tests added / changed / removed: <list>
Assumptions: <list>
Follow-ups: <list>
Reviewer, look hardest at: <where>
```

If anything failed or wasn't run, say so in the first line. Never call unverified work complete.

## Ask first, every time

Merging, deploying, tagging, running migrations or scripts against shared or production environments, changing CI/CD, infra, permissions, or secrets, force-pushing, deleting branches.
