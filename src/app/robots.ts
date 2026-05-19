import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://agentsmd.space/sitemap.xml",
    host: "https://agentsmd.space",
  };
}
