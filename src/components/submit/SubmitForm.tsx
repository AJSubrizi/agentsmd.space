"use client";

import { useMemo, useState } from "react";
import { Github, ArrowUpRight, Check, X, AlertTriangle } from "lucide-react";

const REPO = "AJSubrizi/agentsmd.space";
const AGENTS = ["Codex", "Claude Code", "Cursor", "Windsurf", "OpenCode", "Aider", "Gemini CLI", "Continue", "Cline"];
const STACKS = [
  "Next.js", "React", "Vue", "Svelte", "Astro",
  "Node.js", "Python", "FastAPI", "Django", "Flask",
  "Laravel", "PHP", "Ruby on Rails", "Go", "Rust",
  "Expo", "React Native", "Swift", "Kotlin",
  "PostgreSQL", "MySQL", "Supabase", "Firebase", "Redis",
  "Tailwind", "shadcn/ui", "TypeScript", "Prisma", "Drizzle",
  "Stripe", "Docker", "Kubernetes", "Turborepo", "Vite",
];
const USE_CASES = ["SaaS", "API", "Dashboard", "AI Agent", "Monorepo", "Mobile", "Open Source", "E-commerce", "Marketing site"];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/['"`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function yamlArray(items: string[]): string {
  return "[" + items.map((i) => `"${i.replace(/"/g, '\\"')}"`).join(", ") + "]";
}

function buildFile(d: FormData): string {
  return `---
title: "${d.title.replace(/"/g, '\\"')}"
slug: "${d.slug}"
type: "${d.type}"
description: "${d.description.replace(/"/g, '\\"')}"
agents: ${yamlArray(d.agents)}
stack: ${yamlArray(d.stack)}
tags: ${yamlArray(d.tags)}
useCase: "${d.useCase}"
author: "${d.author || "community"}"
---

${d.body.trim()}
`;
}

interface FormData {
  title: string;
  slug: string;
  type: "AGENTS.md" | "CLAUDE.md";
  description: string;
  agents: string[];
  stack: string[];
  tags: string[];
  useCase: string;
  author: string;
  body: string;
}

const DEFAULT_BODY = `# AGENTS.md

## Project

Brief overview of the project: stack, what it does, deployment target.

## Commands

- \`pnpm dev\` — start dev server
- \`pnpm build\` — production build
- \`pnpm typecheck\`
- \`pnpm test\`

## Code style

- TypeScript strict. No \`any\`.
- Tailwind only. Use \`cn()\` for class merging.

## Stack rules

- (specific rules for your stack)

## Before editing

1. Read the relevant schema / config.
2. Check existing patterns before introducing new ones.

## Constraints

- (things the agent should NOT do)
`;

export function SubmitForm({ existingSlugs }: { existingSlugs: string[] }) {
  const [data, setData] = useState<FormData>({
    title: "",
    slug: "",
    type: "AGENTS.md",
    description: "",
    agents: [],
    stack: [],
    tags: [],
    useCase: "",
    author: "",
    body: DEFAULT_BODY,
  });
  const [slugTouched, setSlugTouched] = useState(false);
  const [stackInput, setStackInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const onTitle = (v: string) => {
    setData((d) => ({ ...d, title: v, slug: slugTouched ? d.slug : slugify(v) }));
  };

  const toggle = (key: "agents" | "stack", value: string) => {
    setData((d) => {
      const arr = d[key];
      return { ...d, [key]: arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value] };
    });
  };

  const addCustom = (key: "stack" | "tags", value: string) => {
    const v = value.trim();
    if (!v) return;
    if (data[key].includes(v)) return;
    update(key, [...data[key], v]);
  };

  const removeFrom = (key: "stack" | "tags", value: string) =>
    update(key, data[key].filter((x) => x !== value));

  const isAgents = data.type === "AGENTS.md";
  const folder = isAgents ? "agents" : "claude";
  const accent = isAgents ? "emerald" : "amber";

  const slugConflict = data.slug && existingSlugs.includes(data.slug);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!data.title.trim()) e.title = "Required";
    if (!data.slug.trim()) e.slug = "Required";
    else if (!/^[a-z0-9][a-z0-9-]*$/.test(data.slug)) e.slug = "Lowercase, numbers, dashes only";
    else if (slugConflict) e.slug = "Slug already exists";
    if (!data.description.trim()) e.description = "Required";
    else if (data.description.length > 200) e.description = "Keep under 200 chars";
    if (data.agents.length === 0) e.agents = "Pick at least one";
    if (data.stack.length === 0) e.stack = "Pick at least one";
    if (!data.useCase) e.useCase = "Required";
    if (data.body.trim().length < 100) e.body = "Body too short (min 100 chars)";
    return e;
  }, [data, slugConflict]);

  const isValid = Object.keys(errors).length === 0;
  const fileContent = buildFile(data);

  const githubUrl = useMemo(() => {
    const params = new URLSearchParams({
      filename: `${data.slug || "your-file"}.md`,
      value: fileContent,
    });
    return `https://github.com/${REPO}/new/main/content/${folder}?${params.toString()}`;
  }, [data.slug, fileContent, folder]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 items-start">
      {/* FORM */}
      <div className="space-y-7">
        {/* Type */}
        <Field label="Type" hint="Which agent reads this file?">
          <div className="grid grid-cols-2 gap-2">
            {(["AGENTS.md", "CLAUDE.md"] as const).map((t) => {
              const on = data.type === t;
              const isA = t === "AGENTS.md";
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => update("type", t)}
                  className={`font-mono text-sm px-4 py-3 rounded-xl border transition-colors ${
                    on
                      ? isA
                        ? "border-emerald bg-emerald-bg dark:bg-emerald/10 text-emerald-fg dark:text-emerald"
                        : "border-amber bg-amber-bg dark:bg-amber/10 text-amber-fg dark:text-amber"
                      : "border-token bg-card text-muted hover:text-[color:var(--foreground)]"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="Title" error={errors.title} hint="e.g. AGENTS.md for Next.js + Supabase SaaS">
          <input
            value={data.title}
            onChange={(e) => onTitle(e.target.value)}
            placeholder="AGENTS.md for…"
            className={inputCls}
          />
        </Field>

        <Field label="Slug" error={errors.slug} hint="URL identifier — lowercase + dashes, auto-derived from title">
          <input
            value={data.slug}
            onChange={(e) => {
              setSlugTouched(true);
              update("slug", slugify(e.target.value));
            }}
            placeholder="nextjs-supabase-saas"
            className={`${inputCls} font-mono`}
          />
        </Field>

        <Field label="Description" error={errors.description} hint={`${data.description.length}/200 — one sentence`}>
          <input
            value={data.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Production-ready instructions for…"
            maxLength={220}
            className={inputCls}
          />
        </Field>

        <Field label="Compatible agents" error={errors.agents}>
          <ChipGroup options={AGENTS} active={data.agents} onToggle={(v) => toggle("agents", v)} accent={accent} />
        </Field>

        <Field label="Stack" error={errors.stack} hint="Pick from the list or type your own and press Enter">
          <ChipGroup options={STACKS} active={data.stack} onToggle={(v) => toggle("stack", v)} accent={accent} />
          <div className="mt-2 flex gap-2">
            <input
              value={stackInput}
              onChange={(e) => setStackInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustom("stack", stackInput);
                  setStackInput("");
                }
              }}
              placeholder="Add custom stack (e.g. Hono)"
              className={`${inputCls} text-sm`}
            />
          </div>
          {data.stack.filter((s) => !STACKS.includes(s)).length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {data.stack.filter((s) => !STACKS.includes(s)).map((s) => (
                <span key={s} className="inline-flex items-center gap-1 font-mono text-xs px-2 py-1 rounded-md border border-token bg-card">
                  {s}
                  <button type="button" onClick={() => removeFrom("stack", s)} aria-label={`Remove ${s}`}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </Field>

        <Field label="Tags" hint="Optional. Press Enter to add">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustom("tags", tagInput.toLowerCase());
                setTagInput("");
              }
            }}
            placeholder="saas, auth, typescript"
            className={`${inputCls} text-sm`}
          />
          {data.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {data.tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 font-mono text-xs px-2 py-1 rounded-md border border-token bg-card">
                  {t}
                  <button type="button" onClick={() => removeFrom("tags", t)} aria-label={`Remove ${t}`}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </Field>

        <Field label="Use case" error={errors.useCase}>
          <div className="flex flex-wrap gap-1.5">
            {USE_CASES.map((u) => {
              const on = data.useCase === u;
              return (
                <button
                  key={u}
                  type="button"
                  onClick={() => update("useCase", u)}
                  className={`text-xs px-2.5 py-1.5 rounded-full border transition-colors ${
                    on
                      ? "bg-[color:var(--foreground)] text-[color:var(--background)] border-transparent"
                      : "border-token bg-card text-muted hover:text-[color:var(--foreground)]"
                  }`}
                >
                  {u}
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="Author" hint="Your GitHub handle or display name. Optional.">
          <input
            value={data.author}
            onChange={(e) => update("author", e.target.value)}
            placeholder="community"
            className={inputCls}
          />
        </Field>

        <Field label="File body" error={errors.body} hint={`${data.body.length} chars — the actual markdown content`}>
          <textarea
            value={data.body}
            onChange={(e) => update("body", e.target.value)}
            rows={18}
            spellCheck={false}
            className={`${inputCls} font-mono text-[12px] leading-relaxed resize-y`}
          />
        </Field>
      </div>

      {/* PREVIEW + ACTION */}
      <aside className="lg:sticky lg:top-20 space-y-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Preview</div>

        <div className="rounded-2xl border border-token bg-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-token bg-[color:var(--background)]">
            <span className={`font-mono text-xs ${isAgents ? "text-emerald" : "text-amber"}`}>
              content/{folder}/{data.slug || "your-file"}.md
            </span>
            <span className="font-mono text-[10px] text-muted">{fileContent.length} bytes</span>
          </div>
          <pre className="font-mono text-[11px] leading-relaxed p-4 overflow-auto max-h-[420px]">
            <code>{fileContent}</code>
          </pre>
        </div>

        {/* Validation summary */}
        {Object.keys(errors).length > 0 ? (
          <div className="rounded-xl border border-amber/40 bg-amber-bg dark:bg-amber/5 p-4 text-sm">
            <div className="flex items-center gap-2 text-amber-fg dark:text-amber font-medium">
              <AlertTriangle className="h-4 w-4" />
              {Object.keys(errors).length} field{Object.keys(errors).length === 1 ? "" : "s"} need attention
            </div>
            <ul className="mt-2 text-xs text-muted space-y-0.5">
              {Object.entries(errors).map(([k, v]) => (
                <li key={k}><span className="font-mono">{k}</span>: {v}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="rounded-xl border border-emerald/40 bg-emerald-bg dark:bg-emerald/5 p-4 text-sm flex items-center gap-2 text-emerald-fg dark:text-emerald font-medium">
            <Check className="h-4 w-4" />
            Ready to submit
          </div>
        )}

        <a
          href={isValid ? githubUrl : undefined}
          target="_blank"
          rel="noreferrer"
          aria-disabled={!isValid}
          className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-medium text-sm transition-opacity ${
            isValid
              ? "bg-[color:var(--foreground)] text-[color:var(--background)] hover:opacity-90"
              : "bg-card border border-token text-muted cursor-not-allowed pointer-events-none"
          }`}
          onClick={(e) => {
            if (!isValid) e.preventDefault();
          }}
        >
          <Github className="h-4 w-4" />
          Open pull request on GitHub
          <ArrowUpRight className="h-4 w-4" />
        </a>

        <p className="text-xs text-muted leading-relaxed">
          GitHub opens with the file precompiled in its editor. Click <span className="font-mono">Propose new file</span> →
          your fork is created automatically and the PR is opened in this repo. We review and merge — your file goes live on the next deploy.
        </p>
      </aside>
    </div>
  );
}

const inputCls =
  "w-full bg-card border border-token rounded-xl px-3.5 py-2.5 text-sm focus:border-emerald/50 outline-none transition-colors placeholder:text-muted/60";

function Field({
  label, hint, error, children,
}: { label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-sm font-medium">{label}</label>
        {error ? (
          <span className="text-xs text-amber-fg dark:text-amber">{error}</span>
        ) : hint ? (
          <span className="text-xs text-muted">{hint}</span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function ChipGroup({
  options, active, onToggle, accent,
}: { options: string[]; active: string[]; onToggle: (v: string) => void; accent: string }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => {
        const on = active.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => onToggle(o)}
            className={`font-mono text-xs px-2.5 py-1 rounded-full border transition-colors ${
              on
                ? accent === "emerald"
                  ? "bg-emerald text-white border-emerald"
                  : "bg-amber text-white border-amber"
                : "border-token bg-card text-muted hover:text-[color:var(--foreground)]"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
