import { ImageResponse } from "next/og";

export const alt = "Agents — AGENTS.md and CLAUDE.md files for AI coding agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          color: "#fafafa",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              background: "#000",
              color: "#fff",
              fontSize: 28,
              fontWeight: 700,
              padding: "10px 16px",
              borderRadius: 12,
              letterSpacing: "-0.03em",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            .md
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>Agents</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              maxWidth: 980,
              display: "flex",
              flexWrap: "wrap",
              gap: 18,
            }}
          >
            <span>The best instruction files for</span>
            <span style={{ color: "#10b981" }}>AI coding agents.</span>
          </div>
          <div style={{ fontSize: 28, color: "#a1a1aa", maxWidth: 880, lineHeight: 1.4 }}>
            Community-curated AGENTS.md and CLAUDE.md files for Codex, Claude Code, Cursor, Windsurf and more.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, color: "#71717a" }}>
          <div>agentsmd.space</div>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ padding: "6px 14px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999 }}>AGENTS.md</span>
            <span style={{ padding: "6px 14px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999 }}>CLAUDE.md</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
