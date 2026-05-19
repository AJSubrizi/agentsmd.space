---
title: "CLAUDE.md for a Python Project"
slug: "claude-python"
type: "CLAUDE.md"
description: "Claude Code instructions for a modern Python project using uv, ruff, and pytest."
agents: ["Claude Code"]
stack: ["Python", "uv", "ruff", "pytest", "mypy"]
tags: ["python", "tooling", "testing"]
useCase: "API"
author: "community"
---

# CLAUDE.md

## Project

A Python 3.12+ application. Dependencies managed by `uv`. Linting and formatting via `ruff`. Tests with `pytest`. Type-checked with `mypy --strict`.

## Commands

- `uv sync` — install dependencies
- `uv run <command>` — run inside the project venv
- `uv run pytest`
- `uv run pytest -k <pattern>`
- `uv run ruff check .`
- `uv run ruff format .`
- `uv run mypy <pkg>/`

After any edit, run `ruff check`, `mypy`, and `pytest`. Do not declare work complete with a failing check.

## Code style

- Type-annotate every function signature. No untyped `*args` / `**kwargs`.
- Use modern syntax: `list[str]`, `dict[str, int]`, `str | None`.
- Prefer `dataclass(frozen=True, slots=True)` or `pydantic.BaseModel` for structured data. Never bare dicts for domain objects.
- Module layout: prefer flat packages with a clear `__init__.py` that exposes the public API.
- Logging via `structlog` (if available) or `logging` — never `print()` in library code.

## Stack rules

### Dependencies

- All deps go in `pyproject.toml`. Never `pip install` ad-hoc.
- Pin major versions for runtime deps. Loose for dev deps.
- After adding a dep, run `uv sync` and commit `uv.lock`.

### Testing

- pytest with `tmp_path` and `monkeypatch` over manual `os.environ` manipulation.
- Fixtures live in `conftest.py` at the appropriate scope.
- Mark slow/integration tests with `@pytest.mark.slow` so they can be excluded.
- Use `pytest-asyncio` (`mode = "auto"`) for async code.

### Errors

- Define domain-specific exceptions in `<pkg>/exceptions.py`. Never raise bare `Exception`.
- Never `except:` without a type. Catch the narrowest exception.
- Re-raise with `from` to preserve traceback context.

## Before editing

1. Read `pyproject.toml` to understand declared deps and entry points.
2. Look at sibling modules for the project's idioms.
3. Run the test suite to know the baseline state before you change things.

## Constraints

- No new dependency without a reason. Prefer stdlib.
- No `Any`. If you can't type it, use `object` and narrow with `isinstance`.
- No mutable default arguments.
- Don't introduce a new packaging tool — `uv` is the standard here.
