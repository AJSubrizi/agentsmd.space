import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Agents — AGENTS.md and CLAUDE.md files for AI coding agents",
  description:
    "Browse community-made AGENTS.md and CLAUDE.md files for Codex, Claude Code, Cursor, Windsurf and more. Copy. Paste. Ship.",
  metadataBase: new URL("https://agentsmd.space"),
  openGraph: {
    title: "Agents — directory of AGENTS.md and CLAUDE.md files",
    description:
      "Community-curated instruction files for AI coding agents.",
    url: "https://agentsmd.space",
    siteName: "Agents",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans min-h-[100dvh] flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="pointer-events-none fixed inset-0 bg-grid -z-10" aria-hidden />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
