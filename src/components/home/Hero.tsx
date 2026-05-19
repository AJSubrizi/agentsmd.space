"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Copy } from "lucide-react";

const sample = `# AGENTS.md

## Project
Next.js 15 + Supabase SaaS. App Router, Server Components.

## Commands
- pnpm dev
- pnpm build
- pnpm typecheck

## Code style
- TypeScript strict. No \`any\`.
- Server Components by default.
- Tailwind for styling.

## Before editing
- Read schema in supabase/migrations/
- Check existing patterns in src/lib/

## Stack rules
- Use Server Actions for mutations
- Use RLS for all queries`;

export function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 sm:pt-24 pb-12 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-start">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1 rounded-full border border-token bg-card mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
            v0.1 — open source, free forever
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.05 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.05]"
          >
            The best instruction files
            <br />
            for{" "}
            <span className="text-emerald">AI coding agents</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.12 }}
            className="mt-6 text-base sm:text-lg text-muted max-w-xl"
          >
            Browse community-made <span className="font-mono text-[0.95em] text-[color:var(--foreground)]">AGENTS.md</span>{" "}
            and <span className="font-mono text-[0.95em] text-[color:var(--foreground)]">CLAUDE.md</span> files for
            Codex, Claude Code, Cursor, Windsurf and more. Copy. Paste. Ship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/files"
              className="group inline-flex items-center gap-2 bg-[color:var(--foreground)] text-[color:var(--background)] px-5 py-2.5 rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Browse files
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 border border-token bg-card px-5 py-2.5 rounded-full font-medium text-sm hover:border-emerald/50 transition-colors"
            >
              Submit your file
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-10 flex items-center gap-6 text-xs text-muted"
          >
            <div><span className="font-mono text-[color:var(--foreground)]">12+</span> files</div>
            <div><span className="font-mono text-[color:var(--foreground)]">10+</span> agents</div>
            <div><span className="font-mono text-[color:var(--foreground)]">25+</span> stacks</div>
            <div className="hidden sm:block">No login. No fees.</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          className="lg:mt-6"
        >
          <div className="rounded-2xl border border-token bg-card overflow-hidden shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_24px_60px_-24px_rgba(16,185,129,0.18)]">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-token bg-[color:var(--background)]">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald/70" />
              </div>
              <span className="font-mono text-xs text-muted">AGENTS.md</span>
              <button
                onClick={() => navigator.clipboard?.writeText(sample)}
                className="font-mono text-xs flex items-center gap-1 text-muted hover:text-emerald transition-colors"
                aria-label="Copy"
              >
                <Copy className="h-3 w-3" /> copy
              </button>
            </div>
            <pre className="font-mono text-[12px] leading-relaxed p-4 overflow-x-auto max-h-[420px]">
              <code>{sample}</code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
