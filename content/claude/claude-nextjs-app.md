---
title: "CLAUDE.md for a Next.js App"
slug: "claude-nextjs-app"
type: "CLAUDE.md"
description: "Claude Code instructions for a modern Next.js 15 app with App Router, Server Actions, and Drizzle ORM."
agents: ["Claude Code"]
stack: ["Next.js", "TypeScript", "Drizzle", "Tailwind", "shadcn/ui"]
tags: ["nextjs", "app-router", "server-actions"]
useCase: "SaaS"
author: "community"
featured: true
---

# CLAUDE.md

## Project

A Next.js 15 App Router application. TypeScript strict. Drizzle ORM for Postgres. Tailwind + shadcn/ui. Deployed to Vercel.

## Commands

- `pnpm dev` — http://localhost:3000
- `pnpm build`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm db:generate` — generate SQL from schema
- `pnpm db:migrate` — apply migrations
- `pnpm db:studio` — Drizzle Studio

Run `pnpm typecheck` before reporting work complete.

## Code style

- Server Components by default. Add `"use client"` only when needed (state, effects, browser APIs).
- Mutations via Server Actions. Place them in `src/actions/` and import where used.
- Use Zod for input validation in Server Actions.
- Tailwind only — no CSS modules or styled-components.
- Use the existing `cn()` helper from `src/lib/utils.ts`.

## Stack rules

### Drizzle

- Schema lives in `src/db/schema.ts`. After editing, run `pnpm db:generate`.
- Always use the typed client from `src/db/index.ts`.
- Prefer relational queries (`db.query.<table>.findMany(…)`) for reads. Use the query builder for complex joins.
- Every table has a `createdAt` and `updatedAt`. Use `defaultNow()` and a database trigger for updates.

### Server Actions

- Files start with `"use server"`.
- Always validate input with Zod before touching the database.
- Throw typed errors via `src/lib/errors.ts`. Don't return error strings from actions — throw and let the boundary handle it.
- Call `revalidatePath()` or `revalidateTag()` after mutations. Do not rely on the client to refetch.

### UI

- Primitives live in `src/components/ui/` (shadcn). Customize tokens in `tailwind.config.ts`, never inline.
- Forms via `react-hook-form` + `@hookform/resolvers/zod`, paired with shadcn `Form`.

## Before editing

1. Look at sibling files for conventions before introducing a new pattern.
2. Read `src/db/schema.ts` before any data access.
3. Check `src/components/ui/` for an existing primitive before creating one.

## Constraints

- Do not introduce a global state library. Use URL state, server state, or `useState` locally.
- Do not use `fetch()` from a Client Component to call the same app — use a Server Action.
- Do not commit secrets. Use `.env.local` and document new vars in `.env.example`.
- Do not write tests for trivial things. Focus on actions, hooks, and integration paths.
