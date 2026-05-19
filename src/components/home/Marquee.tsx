"use client";

const agents = [
  "Codex", "Claude Code", "Cursor", "Windsurf", "OpenCode", "Aider", "Gemini CLI",
  "Continue", "Cline", "Roo Code", "Zed AI",
];

const stack = [
  "Next.js", "React", "Supabase", "Laravel", "Python", "FastAPI",
  "Tailwind", "TypeScript", "shadcn/ui", "Stripe", "Prisma", "Drizzle",
  "Expo", "Vue", "Django", "Node.js", "PostgreSQL", "Redis",
];

function Row({ items, dir }: { items: string[]; dir: "left" | "right" }) {
  const doubled = [...items, ...items];
  return (
    <div className="group relative overflow-hidden">
      <div
        className="flex gap-3 w-max [animation-play-state:running] group-hover:[animation-play-state:paused]"
        style={{ animation: `${dir === "left" ? "scroll-left" : "scroll-right"} 40s linear infinite` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-mono text-sm px-4 py-2 rounded-full border border-token bg-card whitespace-nowrap flex items-center gap-2"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${dir === "left" ? "bg-emerald" : "bg-amber"}`} />
            {item}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[color:var(--background)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[color:var(--background)] to-transparent" />
    </div>
  );
}

export function Marquee() {
  return (
    <section className="py-14 border-y border-token">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-6">Works with</div>
      </div>
      <div className="space-y-3">
        <Row items={agents} dir="left" />
        <Row items={stack} dir="right" />
      </div>
    </section>
  );
}
