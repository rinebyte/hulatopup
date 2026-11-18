/**
 * Semua halaman berada di bawah prefix bahasa `/id`. Root `/` di-redirect ke sini
 * (lihat `next.config.ts`). Pakai helper ini untuk link internal agar prefix konsisten.
 */
export const locale = "id";
const base = `/${locale}`;

export const routes = {
  home: base,
  section: (id: string) => `${base}#${id}`,
  topup: (slug: string, item?: string) =>
    `${base}/topup/${slug}${item ? `?item=${encodeURIComponent(item)}` : ""}`,
  cekTransaksi: (invoice?: string) =>
    `${base}/cek-transaksi${invoice ? `?invoice=${encodeURIComponent(invoice)}` : ""}`,
};
