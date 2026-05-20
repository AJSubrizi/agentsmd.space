import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const SITE_URL = "https://agentsmd.space";
const TITLE = "AgentsMD Space — Community templates for AGENTS.md and CLAUDE.md";
const DESCRIPTION =
  "Browse community-made AGENTS.md and CLAUDE.md files for Codex, Claude Code, Cursor, Windsurf, OpenCode and more. Copy. Paste. Ship.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Agents",
  },
  description: DESCRIPTION,
  applicationName: "AgentsMD Space",
  authors: [{ name: "agentsmd.space contributors" }],
  keywords: [
    "AGENTS.md",
    "CLAUDE.md",
    "AI coding agents",
    "Claude Code",
    "Codex",
    "Cursor",
    "Windsurf",
    "OpenCode",
    "Aider",
    "agent instructions",
    "AI rules",
    "Cursor rules",
    "Windsurf rules",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "AgentsMD Space",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@AJSubrizi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafb" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
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
