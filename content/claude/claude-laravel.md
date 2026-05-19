---
title: "CLAUDE.md for a Laravel Project"
slug: "claude-laravel"
type: "CLAUDE.md"
description: "Claude Code instructions for a Laravel 11 application with Inertia + Vue and Pest tests."
agents: ["Claude Code"]
stack: ["Laravel", "PHP", "Inertia", "Vue", "Pest", "Tailwind"]
tags: ["laravel", "inertia", "vue"]
useCase: "SaaS"
author: "community"
---

# CLAUDE.md

## Project

Laravel 11 + Inertia 2 + Vue 3 (Composition API + `<script setup>`). PostgreSQL. Pest for tests. Pint for formatting. Larastan (PHPStan) for static analysis.

## Commands

- `composer install`
- `npm install`
- `php artisan serve` — http://localhost:8000
- `npm run dev` — Vite for assets
- `php artisan test`
- `php artisan test --filter=<pattern>`
- `vendor/bin/pint`
- `vendor/bin/phpstan analyse`
- `php artisan migrate`
- `php artisan ide-helper:generate` — keep IDE helpers fresh after model changes

Always run Pint + Pest + PHPStan before reporting work complete.

## Code style

- PHP 8.3+. `declare(strict_types=1);` at the top of every file.
- Typed properties, constructor promotion, enums where applicable.
- Vue: Composition API + `<script setup>` only. No Options API.
- TypeScript on the Vue side. `<script setup lang="ts">`.
- Tailwind utility classes — no global stylesheets beyond resets.

## Stack rules

### Backend

- Controllers are thin. Logic lives in actions (`app/Actions/`) or services.
- Use Form Requests (`app/Http/Requests/`) for all validation.
- Authorize via Policies. Never check `Auth::user()->role` inline.
- Eager-load relationships. N+1 in code review is a blocker.
- Database transactions wrap multi-step writes. Use `DB::transaction()`.

### Inertia

- Page components in `resources/js/Pages/`. Filename matches the route: `Users/Edit.vue`.
- Shared data registered in `app/Http/Middleware/HandleInertiaRequests.php`.
- Use `useForm()` for forms. Don't roll your own.
- Lazy partial reloads (`only:`) for tab-style navigation.

### Tests

- One Pest test file per feature. Use datasets (`with(...)`) instead of repeated test cases.
- Database refreshed via `RefreshDatabase` trait. Factories for everything — no manual `DB::insert`.
- HTTP tests use `actingAs($user)` then `$this->get(route('...'))`.

## Before editing

1. Read the model and its migration to understand columns and relationships.
2. Look at sibling actions/controllers for conventions.
3. Read the policy before adding authorization.

## Constraints

- No raw SQL unless Eloquent makes it materially worse.
- No jQuery, no Alpine. Vue handles client behavior.
- Do not modify a shipped migration. Add a new one.
- Don't add new ORM layers. Eloquent only.
