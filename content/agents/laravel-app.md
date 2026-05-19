---
title: "AGENTS.md for Laravel Application"
slug: "laravel-app"
type: "AGENTS.md"
description: "Laravel 11 monolith with Livewire, Filament admin, and a Postgres database."
agents: ["Codex", "Cursor", "Windsurf", "Aider"]
stack: ["Laravel", "PHP", "PostgreSQL", "Livewire", "Filament", "Tailwind"]
tags: ["monolith", "php", "admin", "blade"]
useCase: "SaaS"
author: "community"
---

# AGENTS.md

## Project

Laravel 11 monolith. Server-rendered Blade + Livewire 3 for the public app. Filament v3 for the admin panel. PostgreSQL. Queues via Laravel Horizon (Redis). Background jobs and scheduling are first-class.

## Commands

- `composer install` — install PHP dependencies
- `npm install` — install JS dependencies
- `php artisan serve` — dev server on http://localhost:8000
- `npm run dev` — Vite for assets
- `php artisan test` — run Pest tests
- `php artisan test --filter=<pattern>` — subset
- `vendor/bin/pint` — format (Laravel Pint)
- `vendor/bin/phpstan analyse` — static analysis
- `php artisan migrate` — run migrations
- `php artisan queue:work` — work the queue locally

Always run `vendor/bin/pint` and `php artisan test` before considering work done.

## Code style

- PHP 8.3+. Use typed properties, constructor promotion, enums, readonly where applicable.
- Strict types: every PHP file starts with `declare(strict_types=1);`.
- PSR-12, enforced by Pint.
- One class per file. Filename matches class name.
- Use form requests (`app/Http/Requests/`) for validation, not inline validation in controllers.
- Use policies for authorization. Never check roles inline.

## Stack rules

### Eloquent

- Always eager-load relationships. Spotting an `N+1` is a blocker — fix at the query, not via caching.
- Use scopes for reusable query constraints.
- Prefer `firstOrFail()` over `find()` + manual check.
- Mass assignment: always use `$fillable`, never `$guarded = []`.

### Livewire

- Component classes go under `app/Livewire/`. Views under `resources/views/livewire/`.
- Public properties on a component are part of its public API — name them deliberately.
- Use `#[Computed]` for derived values. Use `#[Locked]` for properties that must not be modified from the frontend.
- Avoid `wire:model.live` unless you need real-time. Default to `wire:model.blur` or `wire:model.lazy`.

### Filament

- Resources live in `app/Filament/Resources/`.
- Use tables, forms, and infolists schemas — don't build admin views from scratch.
- Bulk actions must be authorized via a policy.

### Migrations

- Migrations are append-only in production. Don't modify a shipped migration; write a new one.
- Use Postgres-native column types where it makes sense (`jsonb`, `uuid`, `inet`).

## Before editing

1. Read the model and its migration to understand columns and relationships.
2. Check `app/Policies/` for the relevant authorization rules.
3. Look at sibling components in `app/Livewire/` for conventions.

## Constraints

- No raw SQL unless the equivalent Eloquent query is materially worse.
- Do not add inline JavaScript. Use Alpine.js via Livewire or Vite-bundled JS.
- Do not bypass the queue for slow operations — emails and external API calls go through jobs.
- Do not commit `.env`. Use `.env.example`.
