---
title: "CLAUDE.md for an Open-Source Project"
slug: "claude-open-source"
type: "CLAUDE.md"
description: "Conventions for an open-source repository with semantic commits, contributor guidelines, and CI."
agents: ["Claude Code"]
stack: ["TypeScript", "GitHub Actions", "Changesets"]
tags: ["open-source", "ci", "conventions"]
useCase: "Open Source"
author: "community"
---

# CLAUDE.md

## Project

A community-maintained open-source library. Public-facing, MIT-licensed, with external contributors. Releases automated via Changesets and GitHub Actions.

## Commands

- `pnpm install`
- `pnpm build`
- `pnpm test`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm format` — Prettier
- `pnpm changeset` — record a versioned change

Every change that affects published behavior requires a Changeset entry. CI will fail PRs that change `src/` without one.

## Code style

- TypeScript strict.
- Public exports are documented with JSDoc. Include `@example` blocks for non-trivial APIs.
- File and folder names use kebab-case.
- Test files live next to their source: `foo.ts` + `foo.test.ts`.

## Stack rules

### Commits

- Conventional Commits format: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`, `perf:`.
- Scope optional: `feat(parser): …`.
- Body explains the *why*. Imperative mood, present tense.

### Pull requests

- One concern per PR. Refactors do not ship with feature changes.
- PR description includes: what changed, why, and how it was tested.
- Link related issues with `Closes #123`.
- Include a Changeset for any behavior change.

### Tests

- Cover bug fixes with a regression test that fails before the fix.
- Coverage threshold enforced in CI. Don't lower it.
- Use property-based tests (`fast-check`) for pure data utilities.

### Documentation

- README is the front door — keep it current.
- `docs/` for long-form. API reference is auto-generated from JSDoc, don't write it by hand.
- Every breaking change updates the migration guide.

## Before editing

1. Search existing issues and PRs — the change may already be discussed.
2. For non-trivial changes, open an issue first to align on approach.
3. Run the full test suite before opening a PR.

## Constraints

- Do not introduce a runtime dependency without an issue discussing it.
- Do not break public API in a minor release. Bump major or add a parallel API.
- Do not bypass CI. Don't add `[skip ci]` to commits on `main`.
- Do not commit anything that requires a license incompatible with MIT.
