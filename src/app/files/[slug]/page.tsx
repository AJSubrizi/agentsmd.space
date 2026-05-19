import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllFiles, getFile } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { CopyButton, DownloadButton } from "@/components/detail/CopyButton";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";

export function generateStaticParams() {
  return getAllFiles().map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const file = getFile(slug);
  if (!file) return { title: "Not found" };
  const url = `https://agentsmd.space/files/${file.slug}`;
  return {
    title: file.title,
    description: file.description,
    keywords: [file.type, ...file.agents, ...file.stack, ...file.tags, file.useCase],
    alternates: { canonical: url },
    openGraph: {
      title: file.title,
      description: file.description,
      url,
      type: "article",
      tags: file.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: file.title,
      description: file.description,
    },
  };
}

export default async function FileDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const file = getFile(slug);
  if (!file) return notFound();

  const html = await renderMarkdown(file.body);
  const isAgents = file.type === "AGENTS.md";
  const accent = isAgents ? "emerald" : "amber";
  const url = `https://agentsmd.space/files/${file.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: file.title,
        description: file.description,
        url,
        author: { "@type": "Person", name: file.author },
        keywords: [...file.stack, ...file.agents, ...file.tags].join(", "),
        articleSection: file.type,
        about: file.stack,
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://agentsmd.space" },
          { "@type": "ListItem", position: 2, name: "Files", item: "https://agentsmd.space/files" },
          { "@type": "ListItem", position: 3, name: file.title, item: url },
        ],
      },
    ],
  };

  return (
    <section className="py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Link
          href="/files"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-emerald transition-colors mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to all files
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 items-start">
          {/* Metadata panel */}
          <aside className="lg:sticky lg:top-20 space-y-6">
            <div>
              <span
                className={`font-mono text-[11px] px-2 py-1 rounded-md border ${
                  isAgents
                    ? "border-emerald/40 text-emerald-fg bg-emerald-bg dark:bg-emerald/10 dark:text-emerald"
                    : "border-amber/40 text-amber-fg bg-amber-bg dark:bg-amber/10 dark:text-amber"
                }`}
              >
                {file.type}
              </span>
              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.02em] leading-tight">{file.title}</h1>
              <p className="text-sm text-muted mt-2.5">{file.description}</p>
            </div>

            <BadgeBlock label="Compatible agents" items={file.agents} />
            <BadgeBlock label="Stack" items={file.stack} />
            <BadgeBlock label="Tags" items={file.tags} mono small />

            <div className="text-xs text-muted">
              by <span className="text-[color:var(--foreground)]">{file.author}</span> · <span className="font-mono">{file.useCase}</span>
            </div>

            <div className="border-t border-token pt-5 space-y-2.5">
              <CopyButton text={file.body} label="Copy file" className="w-full" />
              <DownloadButton text={file.body} filename={file.type} />
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(file.body)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full border border-token bg-card hover:border-emerald/50 transition-colors w-full"
              >
                <FileText className="h-4 w-4" /> View raw
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full border border-token bg-card hover:border-emerald/50 transition-colors w-full"
              >
                <ExternalLink className="h-4 w-4" /> View on GitHub
              </a>
            </div>
          </aside>

          {/* Markdown panel */}
          <article>
            <div className={`sticky top-14 z-10 bg-[color:var(--background)]/90 backdrop-blur-md border border-token rounded-t-2xl px-5 py-3 flex items-center justify-between`}>
              <div className="text-xs text-muted">
                Copy this file into the root of your project as <span className={`font-mono text-${accent}`}>{file.type}</span>.
              </div>
              <span className="font-mono text-[10px] text-muted hidden sm:block">read-only</span>
            </div>
            <div className="rounded-b-2xl border-x border-b border-token bg-card p-6 sm:p-10">
              <div className="prose-md" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function BadgeBlock({ label, items, mono, small }: { label: string; items: string[]; mono?: boolean; small?: boolean }) {
  if (!items?.length) return null;
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((i) => (
          <span
            key={i}
            className={`${mono ? "font-mono" : ""} ${small ? "text-[10px]" : "text-xs"} px-2 py-0.5 rounded-md border border-token bg-card`}
          >
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}
