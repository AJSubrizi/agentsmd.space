import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-token mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div className="col-span-2 md:col-span-1">
          <div className="font-semibold">AgentsMD Space</div>
          <p className="text-muted mt-2 max-w-xs text-xs">
            Community templates for AGENTS.md and CLAUDE.md. Free, open-source, no login.
          </p>
        </div>

        <div>
          <div className="font-medium mb-3">Explore</div>
          <ul className="space-y-1.5 text-muted">
            <li><Link href="/files">All files</Link></li>
            <li><Link href="/categories">Categories</Link></li>
            <li><Link href="/files?type=AGENTS.md">AGENTS.md</Link></li>
            <li><Link href="/files?type=CLAUDE.md">CLAUDE.md</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-medium mb-3">Project</div>
          <ul className="space-y-1.5 text-muted">
            <li><Link href="/submit">Submit a file</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><a href="https://github.com/">GitHub</a></li>
          </ul>
        </div>

        <div>
          <div className="font-medium mb-3">Community</div>
          <ul className="space-y-1.5 text-muted">
            <li>MIT licensed</li>
            <li>Free forever</li>
            <li><Link href="/privacy">No tracking</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-token">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-5 flex flex-wrap justify-between items-center text-xs text-muted">
          <div>AgentsMD Space · agentsmd.space</div>
          <div className="font-mono">{new Date().getFullYear()}</div>
        </div>
      </div>
    </footer>
  );
}
