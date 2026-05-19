import { Github } from "lucide-react";

export const metadata = { title: "Submit a file — Agents" };

const schema = `---
title: "AGENTS.md for Next.js + Supabase SaaS"
slug: "nextjs-supabase-saas"
type: "AGENTS.md"
description: "Production-ready instructions for AI agents working on a modern SaaS app."
agents: ["Codex", "Cursor", "Windsurf", "OpenCode"]
stack: ["Next.js", "Supabase", "Tailwind", "shadcn/ui", "Stripe"]
tags: ["saas", "typescript", "auth", "database"]
useCase: "SaaS"
author: "community"
featured: true
---`;

const steps = [
  { n: "01", title: "Fork the repository", body: "Fork the agentsmd repo to your own GitHub account." },
  { n: "02", title: "Add your file", body: "Create a new .md file inside /content/agents/ (for AGENTS.md) or /content/claude/ (for CLAUDE.md)." },
  { n: "03", title: "Add frontmatter", body: "Each file needs YAML frontmatter at the top. Schema shown below." },
  { n: "04", title: "Open a pull request", body: "We'll review and merge. Approved files go live within 24 hours." },
];

export default function SubmitPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-2">Contribute</div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em]">Submit a file</h1>
          <p className="text-muted mt-4 max-w-xl">
            Got a great <span className="font-mono text-[color:var(--foreground)]">AGENTS.md</span> or{" "}
            <span className="font-mono text-[color:var(--foreground)]">CLAUDE.md</span>? Share it with the community.
            Submission is via GitHub PR — no account needed beyond GitHub.
          </p>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-[color:var(--foreground)] text-[color:var(--background)] px-5 py-2.5 rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <Github className="h-4 w-4" /> Submit via GitHub
          </a>

          <div className="mt-12 space-y-4">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-token bg-card p-5 grid grid-cols-[auto_1fr] gap-5 items-start">
                <span className="font-mono text-xs text-emerald">{s.n}</span>
                <div>
                  <div className="font-medium tracking-tight">{s.title}</div>
                  <p className="text-sm text-muted mt-1">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-20 self-start">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2">Frontmatter schema</div>
          <div className="rounded-2xl border border-token bg-card overflow-hidden">
            <div className="px-4 py-2 border-b border-token text-xs text-muted font-mono">frontmatter.yaml</div>
            <pre className="font-mono text-[12px] leading-relaxed p-4 overflow-x-auto">
              <code>{schema}</code>
            </pre>
          </div>
          <p className="text-xs text-muted mt-3">
            <span className="font-mono">slug</span> must be unique and kebab-case. <span className="font-mono">type</span> is either{" "}
            <span className="font-mono">"AGENTS.md"</span> or <span className="font-mono">"CLAUDE.md"</span>.
          </p>
        </aside>
      </div>
    </section>
  );
}
