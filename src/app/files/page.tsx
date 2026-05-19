import { FilesBrowser } from "@/components/files/FilesBrowser";
import { getAllFiles } from "@/lib/content";

export const metadata = { title: "All files — Agents" };

export default function FilesPage() {
  const files = getAllFiles();
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 items-end">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-2">Directory</div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em]">Browse files</h1>
          </div>
          <p className="text-muted text-sm">
            Filter by type, agent, stack, or use case. All files are MIT-licensed and free to copy.
          </p>
        </div>
        <FilesBrowser files={files} />
      </div>
    </section>
  );
}
