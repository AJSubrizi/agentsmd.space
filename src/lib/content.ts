import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type FileType = "AGENTS.md" | "CLAUDE.md";

export interface FileMeta {
  title: string;
  slug: string;
  type: FileType;
  description: string;
  agents: string[];
  stack: string[];
  tags: string[];
  useCase: string;
  author: string;
  featured?: boolean;
}

export interface FileEntry extends FileMeta {
  body: string;
  raw: string;
}

const ROOT = path.join(process.cwd(), "content");

function readDir(dir: string): FileEntry[] {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(abs, f), "utf8");
      const { data, content } = matter(raw);
      return { ...(data as FileMeta), body: content, raw };
    });
}

let _cache: FileEntry[] | null = null;
export function getAllFiles(): FileEntry[] {
  if (_cache) return _cache;
  _cache = [...readDir("agents"), ...readDir("claude")].sort((a, b) =>
    a.title.localeCompare(b.title),
  );
  return _cache;
}

export function getFile(slug: string): FileEntry | undefined {
  return getAllFiles().find((f) => f.slug === slug);
}

export function getFeatured(): FileEntry[] {
  return getAllFiles().filter((f) => f.featured).slice(0, 4);
}

export function getAllCategories() {
  const files = getAllFiles();
  const cats = new Map<string, number>();
  files.forEach((f) => {
    f.stack.forEach((s) => cats.set(s, (cats.get(s) || 0) + 1));
  });
  return Array.from(cats.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
