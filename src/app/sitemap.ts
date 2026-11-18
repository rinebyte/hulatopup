import type { MetadataRoute } from "next";
import { games } from "@/lib/games";
import { absoluteUrl } from "@/lib/site";
import { routes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl(routes.home), changeFrequency: "daily", priority: 1 },
    ...games.map((g) => ({
      url: absoluteUrl(routes.topup(g.slug)),
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
    { url: absoluteUrl(routes.cekTransaksi()), changeFrequency: "monthly", priority: 0.5 },
  ];
}
