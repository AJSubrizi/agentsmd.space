import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-token mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div className="col-span-2 md:col-span-1">
          <div className="font-mono text-xs px-2 py-1 inline-block rounded-md border border-token">AGENTS.md</div>
          <p className="text-muted mt-3 max-w-xs">
            A free, open-source directory of instruction files for AI coding agents.
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
            <li>No tracking</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-token">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-5 flex flex-wrap justify-between items-center text-xs text-muted">
          <div>agentsmd.space — built by the community</div>
          <div className="font-mono">{new Date().getFullYear()}</div>
        </div>
      </div>
    </footer>
  );
}
