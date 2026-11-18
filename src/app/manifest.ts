import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { defaultDescription } from "@/lib/seo";
import { routes } from "@/lib/routes";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: defaultDescription,
    lang: "id",
    start_url: routes.home,
    display: "standalone",
    background_color: "#f5f7fc",
    theme_color: "#4f46e5",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
