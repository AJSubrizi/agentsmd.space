# Agents

A small directory of `AGENTS.md` and `CLAUDE.md` files for AI coding agents.

Live at **[agentsmd.space](https://agentsmd.space)**.

---

I kept getting asked _"what should I put in my AGENTS.md?"_, so I built a place to collect good ones. Copy a file, drop it at the root of your project, ship. That's it.

Works with Codex, Claude Code, Cursor, Windsurf, OpenCode, Aider — anything that reads these files.

## Run it locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Add your file

1. Fork the repo.
2. Drop a `.md` into `content/agents/` or `content/claude/`.
3. Add the frontmatter (any existing file is a fine template).
4. Open a PR.

Approved files go live on the next deploy.

## Stack

Next.js 15, TypeScript, Tailwind, Framer Motion, Fuse.js. Static site — no backend, no database, no tracking. Deployed on Vercel.

## License

[MIT](./LICENSE). Use the files however you want.
