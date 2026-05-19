---
title: "CLAUDE.md for a TypeScript Library"
slug: "claude-typescript"
type: "CLAUDE.md"
description: "Authoring an npm-published TypeScript library with tsup, Vitest, and Changesets."
agents: ["Claude Code"]
stack: ["TypeScript", "tsup", "Vitest", "Changesets"]
tags: ["library", "npm", "tooling"]
useCase: "Open Source"
author: "community"
featured: true
---

# CLAUDE.md

## Project

A standalone TypeScript library published to npm. Zero runtime dependencies preferred. Dual-published as ESM + CJS via tsup. Public types declared in `src/index.ts`.

## Commands

- `pnpm install`
- `pnpm dev` — tsup in watch mode
- `pnpm build` — emit ESM, CJS, and `.d.ts`
- `pnpm test` — Vitest
- `pnpm test:watch`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm changeset` — record a versioned change

## Code style

- TypeScript strict + `noUncheckedIndexedAccess`.
- Public API surface is intentional and small. Every export from `src/index.ts` is part of the contract.
- Functions over classes. Pure functions where possible.
- No default exports. Always named exports.
- JSDoc on every public export. Examples in JSDoc when behavior is non-obvious.

## Stack rules

### Builds

- tsup config in `tsup.config.ts`. Don't manually edit emitted output.
- Outputs go to `dist/`. The `exports` map in `package.json` is the source of truth for entry points.
- No `default` exports in package.json `exports` — only `import` and `require`.

### Testing

- Tests live next to source: `src/foo.ts` + `src/foo.test.ts`.
- Each public export must have a test. Coverage target: 95% for `src/`, but skip trivial re-exports.
- Vitest config: `pool: 'forks'`, `coverage.provider: 'v8'`.
- Use `expect.poll` for any test that touches async timing — no hard-coded `setTimeout`.

### Versioning

- Every PR that changes behavior includes a Changeset. Run `pnpm changeset` and commit the file.
- Patch: bug fix. Minor: new export, additive type change. Major: removed export, renamed export, narrowed return type.
- Releases are automated via `changesets/action` on merge to `main`.

## Before editing

1. Check if the export already exists. The public surface is intentionally small.
2. Read the existing tests for the module — they document the expected behavior.
3. If you're about to widen the public API, ask whether the addition belongs in core or in a separate package.

## Constraints

- Do not add a runtime dependency without a strong justification. This library is zero-dep.
- Do not break backward compatibility without bumping a major. Use overloads or new exports instead.
- Do not put environment-specific code (Node-only, browser-only) in the main entry. Use a sub-export.
- Do not commit `dist/` — it's generated.
