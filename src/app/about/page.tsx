import Link from "next/link";

export const metadata = { title: "About — Agents" };

export default function AboutPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-2">About</div>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em]">Built for AI coding agents.</h1>

        <div className="prose-md mt-8 text-[color:var(--foreground)]">
          <p>
            <strong>Agents</strong> is a free, open-source directory of <code>AGENTS.md</code> and <code>CLAUDE.md</code>
            {" "}instruction files. Think of it as <em>skills.sh</em> but for the markdown configuration files that
            modern AI coding agents read to understand your project.
          </p>
          <p>
            When you drop an <code>AGENTS.md</code> at the root of your repo, agents like Codex, Cursor, Windsurf,
            OpenCode and Aider automatically read it. <code>CLAUDE.md</code> is the equivalent for Claude Code.
            They tell the agent your stack, your conventions, your commands, and your constraints — so it doesn't
            guess.
          </p>

          <h2>Why this exists</h2>
          <p>
            Writing a good instruction file is hard. Most teams either skip it or copy a generic template.
            This directory collects the best, real-world examples so you don't have to start from zero.
          </p>

          <h2>Principles</h2>
          <ul>
            <li>Free forever. No login. No tracking. No fees.</li>
            <li>Open source. MIT licensed. Hosted on GitHub.</li>
            <li>Community-driven. Every file is a PR.</li>
            <li>Static. Fast. No backend. Built with Next.js.</li>
          </ul>

          <h2>Contributing</h2>
          <p>
            Submit a file via GitHub — see <Link href="/submit">the submission guide</Link>.
            Pull requests are reviewed for clarity, accuracy, and originality.
          </p>
        </div>
      </div>
    </section>
  );
}
