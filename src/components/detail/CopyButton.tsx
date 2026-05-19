"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyButton({ text, label = "Copy file", className = "" }: { text: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className={`inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full bg-[color:var(--foreground)] text-[color:var(--background)] hover:opacity-90 transition-opacity ${className}`}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : label}
    </button>
  );
}

export function DownloadButton({ text, filename }: { text: string; filename: string }) {
  return (
    <button
      onClick={() => {
        const blob = new Blob([text], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = filename; a.click();
        URL.revokeObjectURL(url);
      }}
      className="inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full border border-token bg-card hover:border-emerald/50 transition-colors w-full"
    >
      Download {filename}
    </button>
  );
}
