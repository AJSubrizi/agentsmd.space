import { Github } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="rounded-3xl border border-token bg-card p-10 sm:p-16 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30 -z-0" aria-hidden />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] max-w-xl">
              Missing your stack? Submit your own file.
            </h2>
            <p className="text-muted mt-3 max-w-md text-sm">
              Open a PR on GitHub with your AGENTS.md or CLAUDE.md file. It gets reviewed and added to the directory.
            </p>
          </div>
          <div className="relative flex lg:justify-end">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[color:var(--foreground)] text-[color:var(--background)] px-5 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Github className="h-4 w-4" />
              Submit via GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
