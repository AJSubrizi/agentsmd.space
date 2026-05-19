---
title: "AGENTS.md for Next.js + Supabase SaaS"
slug: "nextjs-supabase-saas"
type: "AGENTS.md"
description: "Production-ready instructions for AI agents working on a modern SaaS app with auth, billing, and RLS."
agents: ["Codex", "Cursor", "Windsurf", "OpenCode", "Aider"]
stack: ["Next.js", "Supabase", "Tailwind", "shadcn/ui", "Stripe", "TypeScript"]
tags: ["saas", "typescript", "auth", "database", "stripe"]
useCase: "SaaS"
author: "community"
featured: true
---

# AGENTS.md

## Project

A multi-tenant SaaS built on Next.js 15 (App Router) with Supabase for auth, database, and storage. Stripe handles subscriptions. shadcn/ui + Tailwind for the UI layer.

## Commands

- `pnpm install` — install dependencies
- `pnpm dev` — start dev server on http://localhost:3000
- `pnpm build` — production build
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm lint` — ESLint
- `pnpm test` — Vitest unit tests
- `pnpm e2e` — Playwright end-to-end tests
- `pnpm db:push` — push schema changes to Supabase
- `pnpm db:types` — regenerate TypeScript types from Supabase

After making a change, always run `pnpm typecheck` and `pnpm lint`. Do not commit if either fails.

## Code style

- TypeScript strict mode. No `any` — use `unknown` if the type is truly unknown.
- Server Components by default. Add `"use client"` only when you need state, effects, or browser APIs.
- Prefer Server Actions for mutations over API routes.
- Use the `cn()` helper from `src/lib/utils.ts` for conditional classnames.
- Tailwind only. No CSS modules. No styled-components. Component variants via `class-variance-authority`.
- File names: kebab-case for utilities, PascalCase for components.
- Imports: use `@/` alias for absolute imports.

## Stack rules

### Supabase

- All tables use Row Level Security (RLS). Every new table needs an RLS policy.
- Never bypass RLS with the service role key from the client.
- Use the typed client from `src/lib/supabase/server.ts` (server) or `src/lib/supabase/client.ts` (client).
- Schema lives in `supabase/migrations/`. Use `pnpm db:push` after edits.
- After schema changes run `pnpm db:types` to update TypeScript types.

### Stripe

- Subscription state is mirrored to a `subscriptions` table via webhook (`/api/webhooks/stripe`).
- Never trust `session.subscription` from the client — always re-read from Stripe in webhook handlers.
- Use idempotency keys for write operations.

### Auth

- Auth happens via Supabase Auth helpers. Sessions are set in middleware.
- Server Components must use `createServerClient()` and pass cookies.
- Protected routes go under `app/(protected)/` with a layout that redirects unauthenticated users.

## Before editing

1. Read the relevant migration in `supabase/migrations/` to understand the schema.
2. Check existing patterns in `src/lib/` and `src/components/`.
3. If adding a new dependency, check `package.json` for an existing alternative first.
4. For UI changes, look at `src/components/ui/` (shadcn) before creating a new primitive.

## Constraints

- Do not introduce new state management libraries. Use React state, URL state, or Server Actions.
- Do not add a backend service. Everything goes through Supabase or Next.js Server Actions.
- Avoid `useEffect` for data fetching — use Server Components or Server Actions instead.
- Don't write tests for trivial getters/setters. Focus on business logic and integration paths.
- Do not commit `.env.local`. Use `.env.example` to document new env vars.
