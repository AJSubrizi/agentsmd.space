import { Search, Copy, FolderPlus } from "lucide-react";

const steps = [
  {
    icon: Search,
    n: "01",
    title: "Find a file",
    desc: "Filter by stack, agent, or use case. Search across hundreds of community-curated instructions.",
  },
  {
    icon: Copy,
    n: "02",
    title: "Copy or download",
    desc: "One-click copy of the raw markdown, or download as AGENTS.md / CLAUDE.md ready to drop in.",
  },
  {
    icon: FolderPlus,
    n: "03",
    title: "Add to your project",
    desc: "Place at the root of your repo. Your AI coding agent reads it automatically — no config needed.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 border-t border-token">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-2">Workflow</div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em]">How it works</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-token bg-card p-6">
              <div className="flex items-center justify-between mb-6">
                <s.icon className="h-5 w-5 text-emerald" />
                <span className="font-mono text-xs text-muted">{s.n}</span>
              </div>
              <h3 className="text-lg font-medium tracking-tight">{s.title}</h3>
              <p className="text-sm text-muted mt-1.5">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
