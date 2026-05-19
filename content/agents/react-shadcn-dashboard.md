---
title: "AGENTS.md for React + shadcn/ui Dashboard"
slug: "react-shadcn-dashboard"
type: "AGENTS.md"
description: "Single-page admin dashboard with React Router, TanStack Query, and shadcn/ui."
agents: ["Codex", "Cursor", "Windsurf", "Aider"]
stack: ["React", "Vite", "shadcn/ui", "Tailwind", "TypeScript", "TanStack Query"]
tags: ["dashboard", "spa", "typescript", "admin"]
useCase: "Dashboard"
author: "community"
featured: true
---

# AGENTS.md

## Project

A client-side admin dashboard. Vite + React 19 + TypeScript. Talks to a REST API. State server-side via TanStack Query, client state via Zustand for cross-cutting concerns (sidebar collapsed, theme). Routing via React Router v6.

## Commands

- `pnpm dev` — Vite dev server on http://localhost:5173
- `pnpm build` — production build to `dist/`
- `pnpm preview` — preview the production build locally
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm lint` — ESLint
- `pnpm test` — Vitest

## Code style

- TypeScript strict. No `any`, no non-null assertions outside of test setup.
- Components: function declarations, not arrow functions, for top-level component exports.
- File layout: one component per file. Filename matches export.
- Use `cn()` from `src/lib/utils.ts` for class merging.
- Forms via `react-hook-form` + `zod`. No uncontrolled form state.

## Stack rules

### Data fetching

- All server data through TanStack Query. Never `fetch` inside a component directly.
- Query keys live in `src/lib/queries/keys.ts` — one source of truth.
- Mutations invalidate the relevant query keys. Do not refetch manually with `refetch()`.
- Stale time defaults to 60s. Increase for slow-changing data, never decrease below 10s.

### UI

- All primitives (Button, Input, Dialog, Select…) come from `src/components/ui/` (shadcn).
- Customize via the existing tokens in `tailwind.config.ts`. Never hard-code colors.
- Tables use `@tanstack/react-table` with the wrapper in `src/components/table/`.
- Charts use `recharts`. Wrap with `<ChartContainer>` from shadcn for theming.

### Routing

- Routes are declared centrally in `src/routes.tsx`.
- Use loaders for data that must exist before the route renders.
- Protected routes wrap children in `<RequireAuth />`.

## Before editing

1. Check `src/components/ui/` for an existing primitive before building one.
2. Look at sibling routes in `src/pages/` for the project's conventions.
3. Read the API spec in `openapi.yaml` before adding a new query.

## Constraints

- No Redux, no MobX. Zustand for client-only state.
- No CSS-in-JS. Tailwind only.
- No new icon libraries — use `lucide-react`.
- No new routing libraries — React Router v6 is fixed.
- Bundle size matters: avoid adding deps over 30 KB gzipped without flagging it.
