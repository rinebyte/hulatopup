import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Headset, MessageCircle, ShieldCheck, Zap } from "lucide-react";
import { games, paymentMethods } from "@/lib/games";
import { site, whatsappLink } from "@/lib/site";
import { GameCard } from "@/components/game-card";
import { GameCatalog } from "@/components/game-catalog";
import { HeroCarousel, type Slide } from "@/components/hero-carousel";
import { FlashSale } from "@/components/flash-sale";
import { PaymentLogo } from "@/components/payment-logo";
import { JsonLd } from "@/components/json-ld";
import {
  defaultDescription,
  defaultOgImages,
  defaultTitle,
  faqJsonLd,
  openGraph,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  alternates: { canonical: routes.home, languages: { "id-ID": routes.home, "x-default": routes.home } },
  openGraph: openGraph({ title: defaultTitle, description: defaultDescription, url: routes.home, images: defaultOgImages }),
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: defaultOgImages.map((i) => i.url),
  },
};

const slideCopy: Record<string, Pick<Slide, "eyebrow" | "title" | "subtitle">> = {
  "mobile-legends": {
    eyebrow: "Diamond mulai Rp1.500",
    title: "Push rank tanpa nunggu. Diamond masuk instan.",
    subtitle: "Weekly Diamond Pass, Twilight Pass, dan semua nominal Diamond MLBB dengan harga bersahabat.",
  },
  "genshin-impact": {
    eyebrow: "Welkin Moon tersedia",
    title: "Genesis Crystal untuk wish berikutnya.",
    subtitle: "Semua nominal Genesis Crystal & Welkin Moon tersedia. Masukkan UID, pilih server, selesai.",
  },
  roblox: {
    eyebrow: "Robux & Premium",
    title: "Robux murah buat avatar & game favoritmu.",
    subtitle: "Cukup username Roblox. Tanpa password, aman dan cepat.",
  },
};

const steps = [
  { title: "Pilih game", text: "Pilih game favoritmu dari katalog." },
  { title: "Isi ID & nominal", text: "Masukkan ID akun lalu pilih nominal." },
  { title: "Bayar", text: "QRIS, e-wallet, VA bank, atau gerai retail." },
  { title: "Item masuk", text: "Item dikirim otomatis ke akunmu." },
];

const perks = [
  { value: "1–5", unit: "menit", text: "Rata-rata waktu proses, otomatis 24 jam termasuk hari libur." },
  { value: "Rp0", unit: "biaya tersembunyi", text: "Biaya admin selalu terlihat sebelum kamu bayar." },
  { value: "0", unit: "password diminta", text: "Kami cuma butuh ID akun game kamu." },
  { value: String(paymentMethods.length), unit: "metode", text: "Pembayaran: QRIS, e-wallet, VA bank, dan gerai retail." },
];

const faqs = [
  {
    q: `Apakah topup di ${site.name} aman?`,
    a: "Aman. Kami hanya membutuhkan ID akun game, tidak pernah meminta password atau data login kamu.",
  },
  {
    q: "Berapa lama proses topup?",
    a: "Umumnya 1–5 menit setelah pembayaran terverifikasi. Pada jam sibuk bisa sedikit lebih lama.",
  },
  {
    q: "Bagaimana jika item belum masuk?",
    a: "Cek status pesanan di halaman Cek Transaksi menggunakan nomor invoice. Jika masih tertunda, hubungi CS kami lewat WhatsApp.",
  },
  {
    q: "Apakah bisa refund jika salah input ID?",
    a: "Pastikan ID akun sudah benar sebelum membayar. Kesalahan input ID oleh pembeli tidak dapat dibatalkan setelah item terkirim.",
  },
  {
    q: "Metode pembayaran apa saja yang tersedia?",
    a: "QRIS, DANA, OVO, GoPay, ShopeePay, Virtual Account BCA/BRI/Mandiri/BNI, serta Alfamart dan Indomaret.",
  },
  {
    q: "Apakah perlu membuat akun?",
    a: "Tidak perlu. Kamu bisa langsung topup tanpa daftar. Simpan nomor invoice untuk cek status pesanan.",
  },
];

function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-wider text-brand">{eyebrow}</p>
      <h2 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {children}
    </div>
  );
}

export default function Home() {
  const slides: Slide[] = games.map((g) => ({
    slug: g.slug,
    name: g.name,
    icon: g.images.icon,
    image: g.images.banner,
    focus: g.images.focus,
    accent: g.accent,
    ...slideCopy[g.slug],
  }));
  const genres = [...new Set(games.map((g) => g.genre))];

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={faqJsonLd(faqs)} />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-6">
        <h1 className="mb-4 text-sm text-muted sm:text-base">
          <span className="font-display font-extrabold text-ink">{site.name}</span>
          <span className="mx-2 text-subtle">·</span>
          Topup Diamond ML, Genesis Crystal &amp; Robux murah, instan 24 jam
        </h1>
        <HeroCarousel slides={slides} />
      </section>

      {/* Pintasan game + trust bar */}
      <section className="mx-auto max-w-7xl px-4 pt-6">
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="no-scrollbar -my-2 flex gap-3 overflow-x-auto py-2">
            {games.map((g) => (
              <Link
                key={g.slug}
                href={routes.topup(g.slug)}
                className="flex shrink-0 items-center gap-3 rounded-2xl bg-surface py-2.5 pl-2.5 pr-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <Image src={g.images.icon} alt="" width={44} height={44} className="size-11 rounded-xl" />
                <span>
                  <span className="block text-sm font-bold text-ink">{g.name}</span>
                  <span className="block text-xs text-muted">{g.currency}</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 text-xs">
            {[
              { icon: Zap, label: "Proses instan", tint: "text-amber-500" },
              { icon: ShieldCheck, label: "100% legal", tint: "text-emerald-500" },
              { icon: Headset, label: "CS 24/7", tint: "text-sky-500" },
            ].map(({ icon: Icon, label, tint }) => (
              <div key={label} className="flex items-center justify-center gap-2 rounded-2xl bg-surface px-3 py-3 shadow-soft">
                <Icon className={`size-4 ${tint}`} />
                <span className="font-bold text-ink">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FlashSale />

      {/* Katalog */}
      <section id="games" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Katalog" title="Game Populer" />
          <p className="max-w-sm text-sm text-muted">
            Pilih game, isi ID, dan item langsung terkirim. Semua harga sudah termasuk pajak.
          </p>
        </div>
        <GameCatalog
          genres={genres}
          cards={games.map((g) => ({ key: g.slug, genre: g.genre, node: <GameCard game={g} /> }))}
        />
      </section>

      {/* Keunggulan - bento */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-7 shadow-soft ring-1 ring-line sm:col-span-2 lg:row-span-2">
            <div className="dots absolute inset-0 [mask-image:linear-gradient(to_bottom_left,black,transparent_70%)]" />
            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-wider text-brand">Kenapa {site.name}?</p>
              <h2 className="mt-2 max-w-md font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
                Topup tanpa drama. Bayar, item masuk, <span className="text-gradient">lanjut main.</span>
              </h2>
              <p className="mt-3 max-w-md text-muted">
                Sistem otomatis memproses pesanan begitu pembayaran terverifikasi, tanpa perlu
                konfirmasi manual.
              </p>
            </div>
            <div className="relative mt-8 flex -space-x-4">
              {games.map((g, i) => (
                <Image
                  key={g.slug}
                  src={g.images.icon}
                  alt={g.name}
                  width={80}
                  height={80}
                  className="size-20 animate-float rounded-2xl shadow-xl ring-4 ring-white"
                  style={{ animationDelay: `${i * 0.6}s` }}
                />
              ))}
            </div>
          </div>
          {perks.map(({ value, unit, text }) => (
            <div key={value + unit} className="rounded-[2rem] bg-surface p-6 shadow-soft ring-1 ring-line">
              <p className="font-display text-4xl font-extrabold tracking-tight text-brand">
                {value}
                {unit && <span className="ml-1.5 text-lg font-bold text-ink">{unit}</span>}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cara topup */}
      <section id="cara-topup" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10">
        <SectionHeading eyebrow="Cara topup" title="4 langkah, tanpa daftar akun" />
        <ol className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ title, text }, i) => (
            <li key={title} className="relative rounded-[2rem] bg-surface p-6 shadow-soft ring-1 ring-line">
              <span className="font-display text-5xl font-extrabold leading-none text-indigo-200">0{i + 1}</span>
              <h3 className="mt-6 font-bold text-ink">{title}</h3>
              <p className="mt-1 text-sm text-muted">{text}</p>
              {i < steps.length - 1 && (
                <span aria-hidden className="absolute -right-3 top-1/2 z-10 hidden h-0.5 w-6 bg-indigo-200 lg:block" />
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* Metode pembayaran */}
      <section className="py-10">
        <p className="text-center text-sm font-bold text-muted">Metode pembayaran yang didukung</p>
        <div className="relative mt-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-marquee gap-3 py-2 hover:[animation-play-state:paused]">
            {[...paymentMethods, ...paymentMethods].map((m, i) => (
              <div key={`${m.id}-${i}`} className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-soft">
                <PaymentLogo id={m.id} />
                <span className="whitespace-nowrap text-sm font-medium text-muted">{m.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="FAQ" title="Pertanyaan yang sering ditanyakan">
            <p className="mt-3 text-muted">Tidak menemukan jawabannya? Tim CS kami siap membantu.</p>
            <a
              href={whatsappLink("Halo, saya ada pertanyaan.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600"
            >
              <MessageCircle className="size-4" /> Chat WhatsApp
            </a>
          </SectionHeading>
          <div className="space-y-3">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl bg-surface px-5 py-4 shadow-soft ring-1 ring-line open:ring-indigo-200"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink">
                  {item.q}
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-indigo-50 text-brand transition group-open:rotate-45 group-open:bg-brand group-open:text-white">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
