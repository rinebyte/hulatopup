# HULATOPUP — Situs Topup Game (Next.js)

Situs topup game online untuk **Mobile Legends**, **Genshin Impact**, dan **Roblox**.
Dibangun dengan Next.js 16 (App Router + Cache Components) dan Tailwind CSS 4.

## Menjalankan

```bash
npm install
cp .env.example .env   # lalu sesuaikan
npm run dev            # http://localhost:3000
```

## Mengganti brand

Semua nama brand & kontak diatur lewat `.env` (lihat `.env.example`):

| Variabel | Fungsi |
| --- | --- |
| `NEXT_PUBLIC_BRAND_NAME` | Nama brand (default `HULATOPUP`), dipakai untuk logo, favicon, judul halaman & prefix invoice |
| `NEXT_PUBLIC_BRAND_ALIASES` | Variasi penulisan brand dipisah koma (mis. `Hula Topup,Hula Top Up`) untuk SEO |
| `NEXT_PUBLIC_BRAND_TAGLINE` | Tagline di footer |
| `NEXT_PUBLIC_SITE_URL` | URL publik. **Wajib domain asli saat production**: canonical, sitemap, robots, OG |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Kode verifikasi Google Search Console (opsional) |
| `NEXT_PUBLIC_WHATSAPP` | Nomor WhatsApp CS (format `628…`) |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Email CS |
| `NEXT_PUBLIC_INSTAGRAM` | Username Instagram (kosongkan untuk menyembunyikan) |

Variabel `NEXT_PUBLIC_*` dibaca saat build — restart `npm run dev` atau build ulang setelah mengubahnya.

## SEO

Semua SEO berpusat di nama brand dan diatur di `src/lib/seo.ts`:

- **Judul & meta**: nama brand ada di setiap `<title>` (`… | HULATOPUP`), description, Open Graph & Twitter card. Tiap halaman punya canonical URL.
- **`<h1>`**: beranda diawali nama brand; halaman game memakai `Topup <Nama Game>`.
- **Structured data (JSON-LD)**: `Organization` + `WebSite` (dengan `alternateName` dari `NEXT_PUBLIC_BRAND_ALIASES`) di beranda supaya Google menampilkan nama situs dengan benar, `FAQPage` di beranda, serta `BreadcrumbList` + `Product` di halaman topup.
- **File otomatis**: `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/icon`, `/apple-icon`, `/opengraph-image`.

Setelah deploy: isi `NEXT_PUBLIC_SITE_URL` dengan domain asli, verifikasi situs di Google Search Console, lalu submit `https://domainmu/sitemap.xml`. Cek structured data di [Rich Results Test](https://search.google.com/test/rich-results).

## Struktur

Root `/` sengaja kosong (404 bawaan Next.js), dan semua halaman ada di bawah `/id`.

- `src/lib/site.ts` — konfigurasi brand dari env
- `src/lib/games.ts` — daftar game, nominal & harga, metode pembayaran (edit di sini)
- `src/lib/routes.ts` — helper URL internal (semua halaman di bawah `/id`)
- `src/app/id/layout.tsx` — header & footer situs
- `src/app/id/page.tsx` — beranda (`/id`)
- `src/app/id/topup/[slug]/page.tsx` — halaman topup per game (`/id/topup/<slug>`)
- `src/app/id/cek-transaksi/page.tsx` — cek status pesanan (`/id/cek-transaksi`)
- `src/components/topup-form.tsx` — form pemesanan

## Catatan: mode demo

Pesanan saat ini **hanya disimpan di localStorage browser** (`src/lib/orders.ts`) dan belum
terhubung ke payment gateway maupun supplier topup. Untuk produksi, buat Route Handler/API
yang membuat transaksi di payment gateway (mis. Midtrans, Xendit, Tripay) dan meneruskan
pesanan ke supplier (mis. Digiflazz) setelah pembayaran terverifikasi.

## Assets

| Lokasi | Isi | Sumber |
| --- | --- | --- |
| `public/games/*-icon.jpg` | Ikon game 512×512 | Listing App Store resmi (Moonton, HoYoverse/Cognosphere, Roblox Corporation) |
| `public/games/*-banner.jpg` | Key art lebar untuk hero & banner halaman topup | Screenshot promosi App Store resmi |
| `public/games/roblox-card.jpg` | Gambar kartu Roblox (di-crop) | Screenshot promosi App Store resmi |
| `src/components/currency-icon.tsx` | Ikon Diamond / Crystal / Coin | SVG orisinal |
| `src/components/payment-logo.tsx` | Badge metode pembayaran | Wordmark teks berwarna (bukan logo resmi) |
| `src/app/icon.tsx`, `src/app/opengraph-image.tsx` | Favicon & gambar share | Digenerate otomatis dari nama brand di `.env` |

Artwork game adalah milik pemegang hak cipta masing-masing. Pastikan kamu punya izin
(mis. program reseller/partner resmi) sebelum dipakai di produksi. Untuk logo pembayaran
resmi, ambil dari brand kit payment gateway yang kamu pakai.
