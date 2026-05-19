import Link from "next/link";
import { getAllCategories } from "@/lib/content";

const FALLBACK = [
  "Next.js", "React", "Python", "Laravel", "Supabase", "AI Agents",
  "Monorepo", "SaaS", "Mobile", "DevOps", "Testing", "Open Source",
];

const sizes = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
  "lg:col-span-1",
];

export function Categories() {
  const real = getAllCategories();
  const items = real.length > 0 ? real.slice(0, 12) : FALLBACK.map((name) => ({ name, count: 0 }));

  return (
    <section className="py-20 border-t border-token">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 items-start mb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-2">Categories</div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em]">Popular categories</h2>
            <p className="text-muted text-sm mt-3 max-w-sm">
              Browse instruction files by stack, framework, or use case. From SaaS apps to AI agents.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:auto-rows-[120px] gap-3">
            {items.map((c, i) => (
              <Link
                key={c.name}
                href={`/files?stack=${encodeURIComponent(c.name)}`}
                className={`${sizes[i % sizes.length]} group relative rounded-2xl border border-token bg-card p-4 flex flex-col justify-between hover:border-emerald/40 transition-colors`}
              >
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  {c.count > 0 ? `${c.count} file${c.count > 1 ? "s" : ""}` : "category"}
                </span>
                <span className="text-lg font-medium tracking-tight group-hover:text-emerald transition-colors">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
