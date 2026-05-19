import Link from "next/link";
import { getAllCategories } from "@/lib/content";

export const metadata = { title: "Categories — Agents" };

export default function CategoriesPage() {
  const cats = getAllCategories();
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-2">Browse</div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em]">Categories</h1>
          <p className="text-muted mt-3 text-sm max-w-xl">
            Every stack and framework in the directory, with the count of files available for each.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {cats.map((c) => (
            <Link
              key={c.name}
              href={`/files?stack=${encodeURIComponent(c.name)}`}
              className="rounded-2xl border border-token bg-card p-5 hover:border-emerald/40 transition-colors flex flex-col gap-2"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                {c.count} file{c.count > 1 ? "s" : ""}
              </span>
              <span className="text-lg font-medium tracking-tight">{c.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
