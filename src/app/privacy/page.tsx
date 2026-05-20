import Link from "next/link";

export const metadata = {
  title: "Privacy",
  description: "AgentsMD Space doesn't track you. No analytics, no third-party cookies, no profiling.",
};

const items: { title: string; body: string }[] = [
  {
    title: "What we collect",
    body: "Nothing. We have no analytics, no telemetry, no tracking pixels, no fingerprinting. Your visits are not logged by us beyond what your hosting provider's infrastructure records by default (request logs, no personal identifiers).",
  },
  {
    title: "Cookies",
    body: "We do not set any cookies. The site is fully static and served over HTTPS. Your hosting provider (Vercel) may set strictly necessary cookies for load balancing or security — these are exempt from consent under GDPR / ePrivacy.",
  },
  {
    title: "Local storage",
    body: "We store one item in your browser's localStorage: your theme preference (light or dark). It never leaves your device. You can clear it any time from your browser settings.",
  },
  {
    title: "Third parties",
    body: "Outbound links go to GitHub. When you submit a file, your browser navigates to GitHub's own interface — at that point GitHub's privacy policy applies. We do not embed any third-party scripts, widgets, or trackers.",
  },
  {
    title: "Contact",
    body: "Questions? Open an issue on GitHub.",
  },
];

export default function PrivacyPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-2">Privacy</div>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em]">No tracking. Period.</h1>
        <p className="text-muted mt-4 max-w-xl">
          AgentsMD Space is a static directory. It doesn't profile you, doesn't follow you across sites,
          and doesn't sell anything. Here's what that means in practice.
        </p>

        <div className="mt-10 space-y-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-token bg-card p-5">
              <h2 className="font-medium tracking-tight">{item.title}</h2>
              <p className="text-sm text-muted mt-1.5 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted mt-10">
          This page reflects how the site is built — verifiable in the{" "}
          <Link href="https://github.com/AJSubrizi/agentsmd.space" className="underline hover:text-emerald">
            source code
          </Link>.
        </p>
      </div>
    </section>
  );
}
