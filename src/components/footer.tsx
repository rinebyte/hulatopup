import Image from "next/image";
import Link from "next/link";
import { AtSign, Mail, MessageCircle } from "lucide-react";
import { Logo } from "./logo";
import { PaymentLogo } from "./payment-logo";
import { games, paymentMethods } from "@/lib/games";
import { site, whatsappLink } from "@/lib/site";
import { routes } from "@/lib/routes";

const iconBtn =
  "grid size-10 place-items-center rounded-xl bg-surface-2 text-muted transition hover:bg-indigo-50 hover:text-brand";

export function Footer() {
  return (
    <footer className="mt-20">
      {/* CTA */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-500 to-sky-500 px-6 py-10 shadow-lift sm:px-12">
          <div className="grid-lines absolute inset-0" />
          <div className="absolute -right-10 -top-16 size-56 rounded-full bg-white/20 blur-2xl" />
          <div className="relative flex flex-wrap items-center justify-between gap-5">
            <div>
              <h2 className="font-display text-3xl font-extrabold text-white">Siap topup sekarang?</h2>
              <p className="mt-1 text-white/85">Pilih game dan selesaikan dalam kurang dari semenit.</p>
            </div>
            <Link
              href={routes.section("games")}
              className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-700 shadow-lg transition hover:-translate-y-0.5"
            >
              Mulai Topup
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-line bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {site.name} — {site.tagline}. Topup Diamond Mobile Legends, Genesis Crystal Genshin
              Impact, dan Robux 24 jam.
            </p>
            <div className="mt-5 flex gap-2">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={iconBtn}>
                <MessageCircle className="size-4" />
              </a>
              <a href={`mailto:${site.email}`} aria-label="Email" className={iconBtn}>
                <Mail className="size-4" />
              </a>
              {site.instagram && (
                <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={iconBtn}>
                  <AtSign className="size-4" />
                </a>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-ink">Topup Game</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {games.map((g) => (
                <li key={g.slug}>
                  <Link href={routes.topup(g.slug)} className="flex items-center gap-2 hover:text-brand">
                    <Image src={g.images.icon} alt="" width={20} height={20} className="size-5 rounded" />
                    {g.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-ink">Bantuan</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li><Link href={routes.cekTransaksi()} className="hover:text-brand">Cek Transaksi</Link></li>
              <li><Link href={routes.section("cara-topup")} className="hover:text-brand">Cara Topup</Link></li>
              <li><Link href={routes.section("faq")} className="hover:text-brand">FAQ</Link></li>
              <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-brand">+{site.whatsapp}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-ink">Pembayaran</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {paymentMethods.map((m) => (
                <PaymentLogo key={m.id} id={m.id} className="h-7 min-w-0 text-[11px]" />
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-line">
          <p className="mx-auto max-w-7xl px-4 py-5 text-xs leading-relaxed text-subtle">
            © {site.name}. Mobile Legends: Bang Bang © Moonton, Genshin Impact © HoYoverse, Roblox ©
            Roblox Corporation. Semua merek dagang dan artwork adalah milik pemiliknya masing-masing.
          </p>
        </div>
      </div>
    </footer>
  );
}
