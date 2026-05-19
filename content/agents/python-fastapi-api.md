---
title: "AGENTS.md for Python + FastAPI REST API"
slug: "python-fastapi-api"
type: "AGENTS.md"
description: "Async REST API with FastAPI, SQLAlchemy 2.0, Alembic, and pytest. Production-grade defaults."
agents: ["Codex", "Cursor", "Windsurf", "Aider", "OpenCode"]
stack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Alembic", "pytest"]
tags: ["api", "backend", "async", "rest"]
useCase: "API"
author: "community"
featured: true
---

# AGENTS.md

## Project

Async REST API built with FastAPI. PostgreSQL via SQLAlchemy 2.0 (async engine). Alembic for migrations. Auth via JWT. Background jobs via ARQ (Redis-backed). Containerised with Docker.

## Commands

- `uv sync` — install dependencies (uses uv, not pip)
- `uv run uvicorn app.main:app --reload` — dev server on http://localhost:8000
- `uv run pytest` — run tests
- `uv run pytest -k <pattern>` — run a subset
- `uv run ruff check .` — lint
- `uv run ruff format .` — format
- `uv run mypy app/` — type check
- `uv run alembic revision --autogenerate -m "<msg>"` — create migration
- `uv run alembic upgrade head` — apply migrations

Always run `ruff check`, `mypy`, and `pytest` before considering work done.

## Code style

- Python 3.12+. Use modern syntax: `list[str]` not `List[str]`, `str | None` not `Optional[str]`.
- Type-annotate every function signature. No untyped `**kwargs`.
- Use `pydantic` v2 models for all request/response bodies.
- Module structure mirrors domain: `app/users/`, `app/orders/`, etc. Each module has `router.py`, `service.py`, `schemas.py`, `models.py`.
- Never import from `tests/` in application code.
- Logging via `structlog`. No `print()`.

## Stack rules

### Database

- All DB access through repository classes in `app/<module>/repository.py`. Routers do not touch sessions directly.
- Use the `async_session` dependency for FastAPI handlers.
- Every model has a `created_at` and `updated_at` (UTC, timezone-aware).
- Migrations are reviewed before running on production. Never `--autogenerate` without inspecting the diff.
- Use `select()` (2.0 style), not the legacy query API.

### API design

- URLs are plural nouns: `/users`, `/orders/{id}`. No verbs in paths.
- 2xx for success, 4xx for client error, 5xx for server error. Map `IntegrityError` to 409.
- Pagination: cursor-based, never offset, for any list endpoint.
- Errors return `{ "detail": "...", "code": "snake_case_code" }`.

### Auth

- JWT in `Authorization: Bearer <token>` header. Refresh tokens stored in DB with rotation.
- Roles checked via `Depends(require_role("admin"))`.
- Passwords hashed with `argon2`.

### Testing

- pytest with `pytest-asyncio` mode = "auto".
- Use `httpx.AsyncClient` against the app, not the real network.
- One DB transaction per test, rolled back via fixture.
- Aim for ≥80% coverage on `services/` and `repositories/`. Routers covered by integration tests.

## Before editing

1. Read the relevant module's `schemas.py` and `models.py`.
2. Check `app/core/exceptions.py` for the right exception to raise.
3. Look at `tests/conftest.py` for available fixtures before creating new ones.

## Constraints

- No synchronous DB calls. Everything is `async`/`await`.
- No global mutable state outside of the app factory.
- No bare `except:`. Always catch a specific exception.
- Do not add Celery — ARQ is the chosen background-jobs library.
