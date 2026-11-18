import type { Metadata } from "next";
import { absoluteUrl, site } from "./site";
import { type Game, startingPrice } from "./games";
import { routes } from "@/lib/routes";

/**
 * Semua metadata & structured data berpusat di nama brand (NEXT_PUBLIC_BRAND_NAME),
 * sehingga pencarian "HULATOPUP" / "Hula Topup" mengarah ke situs ini.
 */

export const brandNames = [site.name, ...site.aliases];

export const brandKeywords = [
  ...brandNames,
  `${site.name} topup`,
  `topup ${site.name}`,
  `${site.name} cek transaksi`,
  "topup game murah",
  "topup diamond mobile legends",
  "topup genesis crystal genshin impact",
  "beli robux murah",
];

export const defaultTitle = `${site.name} — Topup ML, Genshin Impact & Roblox Murah`;

export const defaultDescription = `${site.name}: topup Diamond Mobile Legends, Genesis Crystal Genshin Impact & Robux murah. Proses instan 24 jam, bayar via QRIS, e-wallet & VA bank.`;

/**
 * Metadata `openGraph` tidak di-merge dalam (shallow), jadi tiap halaman yang
 * menimpanya perlu membawa field dasar ini lagi.
 */
export function openGraph(og: NonNullable<Metadata["openGraph"]>): Metadata["openGraph"] {
  return { siteName: site.name, locale: "id_ID", type: "website", ...og };
}

type OgImage = { url: string; width?: number; height?: number; alt?: string };

/** Gambar share default (`app/opengraph-image.tsx`). */
export const defaultOgImages: OgImage[] = [{ url: "/opengraph-image", width: 1200, height: 630, alt: defaultTitle }];

/**
 * Metadata lengkap untuk satu halaman: judul (+ template "| Brand"), canonical,
 * Open Graph & Twitter. Override openGraph di halaman anak tidak mewarisi gambar
 * `opengraph-image` dari root, jadi gambarnya dipasang eksplisit di sini.
 */
export function pageMetadata({
  title,
  description,
  path,
  images = defaultOgImages,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  images?: OgImage[];
  keywords?: string[];
}): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path, languages: { "id-ID": path, "x-default": path } },
    openGraph: openGraph({ title: fullTitle, description, url: path, images }),
    twitter: { card: "summary_large_image", title: fullTitle, description, images: images.map((i) => i.url) },
  };
}

const orgId = absoluteUrl(`${routes.home}#organization`);
const websiteId = absoluteUrl(`${routes.home}#website`);

export function organizationJsonLd() {
  const sameAs = [site.instagram && `https://www.instagram.com/${site.instagram}`].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    ...(site.aliases.length ? { alternateName: site.aliases } : {}),
    url: absoluteUrl(routes.home),
    logo: absoluteUrl("/apple-icon"),
    description: defaultDescription,
    email: site.email,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${site.whatsapp}`,
      contactType: "customer service",
      areaServed: "ID",
      availableLanguage: ["Indonesian"],
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** WebSite + alternateName = sinyal utama Google untuk "site name" di hasil pencarian. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    ...(site.aliases.length ? { alternateName: site.aliases } : {}),
    url: absoluteUrl(routes.home),
    inLanguage: "id-ID",
    publisher: { "@id": orgId },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function topupJsonLd(game: Game) {
  const url = absoluteUrl(routes.topup(game.slug));
  const prices = game.products.map((p) => p.price);
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: site.name, item: absoluteUrl(routes.home) },
        { "@type": "ListItem", position: 2, name: `Topup ${game.name}`, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `Topup ${game.currency} ${game.name} — ${site.name}`,
      description: game.description,
      image: absoluteUrl(game.images.icon),
      url,
      brand: { "@type": "Brand", name: game.name },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "IDR",
        lowPrice: startingPrice(game),
        highPrice: Math.max(...prices),
        offerCount: prices.length,
        availability: "https://schema.org/InStock",
        seller: { "@id": orgId },
      },
    },
  ];
}
