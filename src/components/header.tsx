import Link from "next/link";
import { Headset } from "lucide-react";
import { Logo } from "./logo";
import { GameSearch } from "./game-search";
import { games } from "@/lib/games";
import { whatsappLink } from "@/lib/site";
import { routes } from "@/lib/routes";

const nav = [
  { href: routes.section("games"), label: "Semua Game" },
  { href: routes.section("flash-sale"), label: "Flash Sale" },
  { href: routes.section("cara-topup"), label: "Cara Topup" },
  { href: routes.section("faq"), label: "FAQ" },
];

export function Header() {
  const searchItems = games.map((g) => ({
    slug: g.slug,
    name: g.name,
    publisher: g.publisher,
    icon: g.images.icon,
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <Logo />
        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-muted transition hover:bg-indigo-50 hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <GameSearch items={searchItems} />
          <Link
            href={routes.cekTransaksi()}
            className="hidden rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:block"
          >
            Cek Transaksi
          </Link>
          <a
            href={whatsappLink("Halo, saya butuh bantuan topup.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bantuan via WhatsApp"
            className="grid size-9 place-items-center rounded-xl bg-surface-2 text-ink transition hover:bg-indigo-50 hover:text-brand"
          >
            <Headset className="size-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
