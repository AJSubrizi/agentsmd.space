"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ShieldCheck } from "lucide-react";

const STORAGE_KEY = "agentsmd:privacy-ack";

export function PrivacyNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const acked = window.localStorage.getItem(STORAGE_KEY);
    if (acked) return;
    const t = setTimeout(() => setVisible(true), 700);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ type: "spring", stiffness: 120, damping: 22 }}
          role="region"
          aria-label="Privacy notice"
          className="fixed bottom-4 left-4 right-4 sm:right-6 sm:left-auto sm:bottom-6 z-50 sm:max-w-[340px] rounded-2xl border border-token bg-card backdrop-blur-md shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]"
        >
          <div className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald" aria-hidden />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Privacy</span>
              </div>
              <button
                onClick={dismiss}
                className="text-muted hover:text-[color:var(--foreground)] -mr-1 -mt-1 p-1 rounded-md transition-colors"
                aria-label="Dismiss notice"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <p className="text-sm mt-3 leading-relaxed">
              No cookies, no tracking, no analytics. Only a theme preference stored locally in your browser.
            </p>

            <div className="flex items-center justify-between mt-4">
              <Link
                href="/privacy"
                className="text-xs text-muted hover:text-emerald transition-colors"
              >
                Learn more →
              </Link>
              <button
                onClick={dismiss}
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-[color:var(--foreground)] text-[color:var(--background)] hover:opacity-90 transition-opacity"
              >
                Got it
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
