# AGENTS.md

## Project

This is the source for [agentsmd.space](https://agentsmd.space) — a static directory of `AGENTS.md` and `CLAUDE.md` files. Next.js 15 App Router, TypeScript strict, Tailwind. No backend, no database.

## Commands

- `pnpm dev` — http://localhost:3000
- `pnpm build`
- `pnpm typecheck`
- `pnpm lint`

Run `pnpm typecheck` and `pnpm build` before considering work done.

## Code style

- TypeScript strict. No `any`.
- Server Components by default. `"use client"` only when needed.
- Tailwind only. Use `cn()` from `src/lib/utils.ts` for class merging.
- Filenames: PascalCase for components, kebab-case for utilities.

## Stack rules

- Content lives in `content/agents/*.md` and `content/claude/*.md`. Each file has YAML frontmatter (see any existing file for the schema).
- New files are picked up at build time via `src/lib/content.ts`. No registry to update.
- Animations use `transform` and `opacity` only — keep them hardware-accelerated.
- Accent colors are semantic: emerald for `AGENTS.md`, amber for `CLAUDE.md`. Don't mix.
- Mono font is reserved for filenames, type badges, and code.

## Before editing

1. If adding a new content file, just drop it in `content/agents/` or `content/claude/` — nothing else to wire up.
2. If touching UI, check `src/components/` for an existing primitive first.
3. If changing the design, keep it asymmetric — left-aligned hero, bento grids, monospace accents. No centered hero. No purple gradients.

## Constraints

- No backend. No database. No auth. No analytics.
- No new state libraries (URL state or local `useState` only).
- No images of people. No stock photography.
- Don't commit `.next/`, `.vercel/`, or anything from `.gitignore`.
