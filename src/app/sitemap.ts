import type { MetadataRoute } from "next";
import { getAllFiles } from "@/lib/content";

const BASE = "https://agentsmd.space";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["", "/files", "/categories", "/submit", "/about"].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const fileRoutes = getAllFiles().map((f) => ({
    url: `${BASE}/files/${f.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...fileRoutes];
}
