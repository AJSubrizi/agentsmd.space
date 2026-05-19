---
title: "AGENTS.md for Turborepo Monorepo"
slug: "monorepo-turborepo"
type: "AGENTS.md"
description: "Multi-package monorepo with Turborepo, shared TypeScript configs, and pnpm workspaces."
agents: ["Codex", "Cursor", "Windsurf", "OpenCode"]
stack: ["Turborepo", "TypeScript", "pnpm", "Next.js", "React"]
tags: ["monorepo", "tooling", "typescript"]
useCase: "Monorepo"
author: "community"
---

# AGENTS.md

## Project

A Turborepo monorepo containing:
- `apps/web` — Next.js marketing + product site
- `apps/admin` — Vite + React admin SPA
- `apps/api` — Hono API (deployed to Cloudflare Workers)
- `packages/ui` — shared shadcn-based component library
- `packages/db` — Prisma client + schema, shared by api and web
- `packages/config-eslint` — shared ESLint config
- `packages/config-tsconfig` — shared `tsconfig.json` presets

Package manager: **pnpm**. Workspaces are declared in `pnpm-workspace.yaml`.

## Commands

- `pnpm install` — install everything
- `pnpm dev` — run all apps in parallel (Turborepo)
- `pnpm dev --filter=web` — run a single app
- `pnpm build` — build everything in dependency order
- `pnpm typecheck` — run `tsc` across all packages
- `pnpm lint` — ESLint across all packages
- `pnpm test` — Vitest across all packages
- `pnpm changeset` — record a versioned change

## Code style

- TypeScript strict everywhere. Each package extends from `@repo/config-tsconfig/base.json`.
- All internal packages are imported via `@repo/<name>`. No relative paths across package boundaries.
- ESLint extends from `@repo/config-eslint`.
- Every package has a `package.json` with `name`, `version`, and `exports` map. No `main`/`module` — use `exports` only.

## Stack rules

### Adding a new package

1. Create the folder under `packages/`.
2. Add `package.json` with `"name": "@repo/<name>"`, `"private": true`.
3. Add `tsconfig.json` extending `@repo/config-tsconfig/library.json`.
4. Add `exports` map. No barrel files for large packages — export by sub-path.
5. Run `pnpm install` to link.

### Adding a dependency

- App-only dependency → install in the app: `pnpm add <pkg> --filter=web`.
- Shared across packages → install in the relevant package and re-export.
- Never install the same dependency in two places — extract to a shared package.

### Turborepo

- Tasks are declared in `turbo.json`. Each task lists its `dependsOn` and `outputs`.
- Caching is on by default. If a task seems to give stale results, run with `--force`.
- Remote cache is configured via `TURBO_TOKEN` / `TURBO_TEAM` env vars.

## Before editing

1. Identify whether the change belongs in an app or a shared package.
2. If editing a shared package, run `pnpm typecheck` afterwards — type changes affect consumers.
3. For breaking changes to a shared package, add a Changeset (`pnpm changeset`).

## Constraints

- Do not introduce a second package manager. pnpm is fixed.
- Do not bypass workspace protocols (`workspace:*`). Internal deps are always linked.
- Do not put app-specific code into a shared package. The dependency direction is apps → packages, never the reverse.
- Do not commit `.next`, `dist`, `.turbo`, or `node_modules`.
