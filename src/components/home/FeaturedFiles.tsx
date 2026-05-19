import Link from "next/link";
import { FileCard } from "@/components/files/FileCard";
import { getFeatured } from "@/lib/content";
import { ArrowRight } from "lucide-react";

export function FeaturedFiles() {
  const featured = getFeatured();
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-2">Trending</div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em]">Trending files</h2>
          </div>
          <Link href="/files" className="hidden sm:flex items-center gap-1 text-sm text-muted hover:text-emerald transition-colors">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((f, i) => (
            <FileCard key={f.slug} file={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
