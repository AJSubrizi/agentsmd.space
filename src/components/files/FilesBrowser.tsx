"use client";

import { useMemo, useState, useEffect } from "react";
import Fuse from "fuse.js";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { FileCard } from "@/components/files/FileCard";
import type { FileEntry } from "@/lib/content";

const TYPES = ["AGENTS.md", "CLAUDE.md"];
const AGENTS = ["Codex", "Claude Code", "Cursor", "Windsurf", "OpenCode", "Aider"];
const USE_CASES = ["SaaS", "API", "Dashboard", "AI Agent", "Monorepo", "Mobile", "Open Source"];

export function FilesBrowser({ files }: { files: FileEntry[] }) {
  const [query, setQuery] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [agents, setAgents] = useState<string[]>([]);
  const [stacks, setStacks] = useState<string[]>([]);
  const [useCases, setUseCases] = useState<string[]>([]);
  const [showMobile, setShowMobile] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const sp = new URLSearchParams(window.location.search);
    const t = sp.get("type"); if (t) setTypes([t]);
    const s = sp.get("stack"); if (s) setStacks([s]);
  }, []);

  const allStacks = useMemo(() => {
    const set = new Set<string>();
    files.forEach((f) => f.stack.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [files]);

  const fuse = useMemo(
    () => new Fuse(files, {
      keys: ["title", "description", "stack", "agents", "tags", "useCase"],
      threshold: 0.35,
      ignoreLocation: true,
    }),
    [files],
  );

  const filtered = useMemo(() => {
    let result = files;
    if (query.trim()) result = fuse.search(query).map((r) => r.item);
    if (types.length) result = result.filter((f) => types.includes(f.type));
    if (agents.length) result = result.filter((f) => agents.some((a) => f.agents.includes(a)));
    if (stacks.length) result = result.filter((f) => stacks.some((s) => f.stack.includes(s)));
    if (useCases.length) result = result.filter((f) => useCases.includes(f.useCase));
    return result;
  }, [files, query, types, agents, stacks, useCases, fuse]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const clearAll = () => {
    setQuery(""); setTypes([]); setAgents([]); setStacks([]); setUseCases([]);
  };

  const hasFilters = types.length || agents.length || stacks.length || useCases.length || query;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
      {/* mobile toggle */}
      <button
        onClick={() => setShowMobile((s) => !s)}
        className="lg:hidden inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-token bg-card text-sm self-start"
      >
        <SlidersHorizontal className="h-4 w-4" /> Filters
      </button>

      <aside className={`${showMobile ? "block" : "hidden"} lg:block space-y-7`}>
        <FilterGroup label="Type" options={TYPES} active={types} onToggle={(v) => toggle(types, setTypes, v)} mono />
        <FilterGroup label="Agent" options={AGENTS} active={agents} onToggle={(v) => toggle(agents, setAgents, v)} />
        <FilterGroup label="Stack" options={allStacks} active={stacks} onToggle={(v) => toggle(stacks, setStacks, v)} />
        <FilterGroup label="Use case" options={USE_CASES} active={useCases} onToggle={(v) => toggle(useCases, setUseCases, v)} />
        {hasFilters ? (
          <button onClick={clearAll} className="text-xs text-muted hover:text-emerald inline-flex items-center gap-1">
            <X className="h-3 w-3" /> Clear all filters
          </button>
        ) : null}
      </aside>

      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search files, stacks, agents…"
              className="w-full bg-card border border-token rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-emerald/50 outline-none transition-colors"
            />
          </div>
          <div className="font-mono text-xs text-muted whitespace-nowrap">
            {hydrated ? `${filtered.length} file${filtered.length === 1 ? "" : "s"}` : `${files.length} files`}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-token p-16 text-center">
            <div className="font-mono text-xs uppercase tracking-wider text-muted mb-3">empty</div>
            <h3 className="text-xl font-medium">No files found.</h3>
            <p className="text-muted text-sm mt-2">Try different filters or clear your search.</p>
            <button onClick={clearAll} className="mt-5 text-sm px-4 py-2 rounded-full border border-token hover:border-emerald/50 transition-colors">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((f, i) => <FileCard key={f.slug} file={f} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  label, options, active, onToggle, mono,
}: { label: string; options: string[]; active: string[]; onToggle: (v: string) => void; mono?: boolean }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-3">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const on = active.includes(o);
          return (
            <button
              key={o}
              onClick={() => onToggle(o)}
              className={`${mono ? "font-mono" : ""} text-xs px-2.5 py-1 rounded-full border transition-colors ${
                on
                  ? "bg-[color:var(--foreground)] text-[color:var(--background)] border-transparent"
                  : "border-token bg-card text-muted hover:text-[color:var(--foreground)] hover:border-emerald/40"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}
