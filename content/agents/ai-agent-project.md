---
title: "AGENTS.md for an AI Agent Project"
slug: "ai-agent-project"
type: "AGENTS.md"
description: "Instructions for building a multi-step AI agent with tool calls, evals, and observability."
agents: ["Codex", "Cursor", "Windsurf", "Aider"]
stack: ["Python", "TypeScript", "OpenAI", "Anthropic", "PostgreSQL"]
tags: ["ai", "agents", "llm", "tools", "evals"]
useCase: "AI Agent"
author: "community"
---

# AGENTS.md

## Project

An autonomous task-runner agent. Takes a natural-language goal, decomposes it, calls tools (search, file I/O, code execution), and reports back. Built in TypeScript with the Anthropic SDK. Traces persisted to Postgres for later evaluation.

## Commands

- `pnpm dev` — start the agent runner locally
- `pnpm eval` — run the eval suite against a frozen test set
- `pnpm trace <run-id>` — print the trace for a single run
- `pnpm typecheck`
- `pnpm test` — Vitest

## Code style

- TypeScript strict. Every tool definition is fully typed (input schema + output type).
- Tool schemas use Zod. The Zod schema is the source of truth — derive both the JSON schema (sent to the model) and the TS type from it.
- Functions over classes. Pure where possible. Side effects are isolated in `src/effects/`.
- Logs go through `src/lib/log.ts` (structured JSON). Never `console.log` in production paths.

## Stack rules

### Tools

- Each tool lives in `src/tools/<name>/`. Folder contains `schema.ts`, `handler.ts`, `index.ts`.
- Handlers are pure functions: `(input, ctx) => Promise<output>`. They must not call other tools directly — composition happens at the agent loop.
- Every tool emits a span (start, end, error). Spans are appended to the trace.
- Tools must be idempotent or explicitly marked as `dangerous: true`. Dangerous tools require human approval in the runtime.

### Model calls

- Use the Anthropic SDK from `@anthropic-ai/sdk`. Always pass `model`, `system`, `messages`, `tools`.
- Default model is `claude-opus-4-7`. Override per-task via `runner.config.model`.
- Always enable prompt caching for system prompts and tool definitions — they don't change between calls.
- Token usage is recorded per turn in the trace.

### Evals

- Eval cases live in `evals/cases/*.json`. Each case has `input`, `expected`, `metric`.
- Run with `pnpm eval`. CI fails if pass rate drops below the baseline in `evals/baseline.json`.
- Never modify `baseline.json` without recording a justification in the PR description.

### Persistence

- Traces written to Postgres via Drizzle. Schema in `src/db/schema.ts`.
- Each trace has: `run_id`, `parent_id`, `tool`, `input`, `output`, `latency_ms`, `tokens_in`, `tokens_out`, `error`.

## Before editing

1. Read the related tool's `schema.ts` to understand its contract.
2. Run `pnpm eval` to capture the baseline before changing prompts or tool behavior.
3. Check `src/runner/loop.ts` to understand the control flow.

## Constraints

- Do not call tools directly from prompt templates. Tool execution goes through the runtime.
- Do not introduce non-determinism into eval setup — fix seeds, fix model versions, freeze inputs.
- Never log raw user inputs or model outputs containing secrets. Redact via `src/lib/redact.ts`.
- No streaming UI in this repo. This is the headless runner. UI lives in the separate `console` app.
