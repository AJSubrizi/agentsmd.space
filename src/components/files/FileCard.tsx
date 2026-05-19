"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import type { FileEntry } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

export function FileCard({ file, index = 0 }: { file: FileEntry; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isAgents = file.type === "AGENTS.md";

  const handleMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.04 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "spotlight group relative rounded-2xl border border-token bg-card p-5 flex flex-col gap-4 will-change-transform",
        !isAgents && "spotlight-amber",
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "font-mono text-[11px] px-2 py-1 rounded-md border",
            isAgents
              ? "text-emerald-fg border-emerald/40 bg-emerald-bg dark:bg-emerald/10 dark:text-emerald"
              : "text-amber-fg border-amber/40 bg-amber-bg dark:bg-amber/10 dark:text-amber",
          )}
        >
          {file.type}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          {file.useCase}
        </span>
      </div>

      <div>
        <Link href={`/files/${file.slug}`} className="block">
          <h3 className="text-lg font-semibold tracking-tight leading-tight group-hover:underline underline-offset-4 decoration-1">
            {file.title}
          </h3>
        </Link>
        <p className="text-sm text-muted mt-1.5 line-clamp-2">{file.description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {file.stack.slice(0, 4).map((s) => (
          <span key={s} className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-token text-muted">
            {s}
          </span>
        ))}
        {file.stack.length > 4 && (
          <span className="font-mono text-[10px] px-1.5 py-0.5 text-muted">+{file.stack.length - 4}</span>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-token">
        <span className="text-xs text-muted">by {file.author}</span>
        <Link
          href={`/files/${file.slug}`}
          className="text-xs flex items-center gap-1 text-[color:var(--foreground)] hover:text-emerald transition-colors"
          aria-label={`View ${file.title}`}
        >
          View <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </motion.div>
  );
}
