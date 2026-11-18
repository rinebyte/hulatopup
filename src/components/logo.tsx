import Link from "next/link";
import { site } from "@/lib/site";
import { routes } from "@/lib/routes";

/** Logo berupa wordmark teks dari NEXT_PUBLIC_BRAND_NAME. */
export function Logo() {
  return (
    <Link
      href={routes.home}
      className="shrink-0 font-display text-xl font-extrabold tracking-tight text-ink transition hover:text-brand"
      aria-label={`${site.name} — beranda`}
    >
      {site.name}
    </Link>
  );
}
