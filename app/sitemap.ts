import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/privacy", priority: 0.5 },
    { path: "/terms", priority: 0.5 },
    { path: "/support", priority: 0.6 },
    { path: "/delete-account", priority: 0.3 },
  ];
  return pages.map((p) => ({ url: `${SITE_URL}${p.path}`, changeFrequency: "monthly", priority: p.priority }));
}
