import { Github, ExternalLink } from "lucide-react";
import { SubmitForm } from "@/components/submit/SubmitForm";
import { getAllFiles } from "@/lib/content";

export const metadata = {
  title: "Submit a file",
  description: "Add your AGENTS.md or CLAUDE.md to the directory. Fill the form and open a PR in one click.",
};

const steps = [
  { n: "01", title: "Fill the form", body: "All fields are validated as you type. A live preview shows exactly what will be committed." },
  { n: "02", title: "Open pull request", body: "One click opens GitHub with the file precompiled. GitHub forks the repo for you and opens the PR." },
  { n: "03", title: "Review & merge", body: "We review for clarity and accuracy. Approved files go live on the next deploy." },
];

export default function SubmitPage() {
  const existingSlugs = getAllFiles().map((f) => f.slug);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-end mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-2">Contribute</div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em]">Submit a file</h1>
            <p className="text-muted mt-4 max-w-xl">
              Fill out the form, hit the button, and GitHub takes it from there. No CLI, no manual frontmatter,
              no editing YAML by hand.
            </p>
          </div>
          <a
            href="https://github.com/AJSubrizi/agentsmd.space"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-emerald transition-colors self-end justify-self-start lg:justify-self-end"
          >
            <Github className="h-4 w-4" />
            View repository
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <SubmitForm existingSlugs={existingSlugs} />

        {/* How it works */}
        <div className="mt-24 border-t border-token pt-12">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-2">How it works</div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] mb-8">Three steps. No setup.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-token bg-card p-5">
                <span className="font-mono text-xs text-emerald">{s.n}</span>
                <div className="font-medium tracking-tight mt-3">{s.title}</div>
                <p className="text-sm text-muted mt-1.5">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted mt-6">
            You need a GitHub account to open the PR — that's it. We use GitHub's standard <em>create file</em> flow,
            so nothing leaves your browser until you submit on GitHub itself.
          </p>
        </div>
      </div>
    </section>
  );
}
