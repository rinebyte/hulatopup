/**
 * Konfigurasi brand. Semua teks brand diambil dari environment variable
 * (lihat `.env.example`) sehingga nama situs bisa diganti tanpa mengubah kode.
 */
const brandName = process.env.NEXT_PUBLIC_BRAND_NAME?.trim() || "HULATOPUP";

export const site = {
  name: brandName,
  tagline:
    process.env.NEXT_PUBLIC_BRAND_TAGLINE?.trim() ||
    "Topup game online cepat, murah & terpercaya",
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP?.trim() || "6281234567890",
  email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "support@example.com",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM?.trim() || "",
  /** Variasi penulisan brand (mis. "Hula Topup") agar mesin pencari mengenali semuanya. */
  aliases: (process.env.NEXT_PUBLIC_BRAND_ALIASES ?? "")
    .split(",")
    .map((a) => a.trim())
    .filter((a) => a && a.toLowerCase() !== brandName.toLowerCase()),
  /** Kode verifikasi Google Search Console (opsional). */
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || "",
};

/** URL absolut berdasarkan NEXT_PUBLIC_SITE_URL. */
export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

/** Dua huruf pertama brand, dipakai sebagai prefix nomor invoice. */
export const brandInitials = brandName
  .replace(/[^A-Za-z0-9]/g, "")
  .slice(0, 2)
  .toUpperCase();

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
