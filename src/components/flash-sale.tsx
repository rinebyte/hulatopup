import Image from "next/image";
import Link from "next/link";
import { discountPercent, flashSale } from "@/lib/games";
import { formatRupiah } from "@/lib/site";
import { Countdown } from "./countdown";
import { CurrencyIcon } from "./currency-icon";
import { routes } from "@/lib/routes";

export function FlashSale() {
  return (
    <section id="flash-sale" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-rose-500 via-orange-400 to-amber-300 p-5 shadow-lg shadow-orange-500/20 sm:p-7">
        <div className="grid-lines absolute inset-0 opacity-40" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Flash Sale
              </h2>
              <p className="text-sm text-white/80">Harga spesial, berakhir tengah malam WIB.</p>
            </div>
          </div>
          <Countdown />
        </div>

        <div className="no-scrollbar relative -mx-5 mt-6 flex snap-x gap-3 overflow-x-auto px-5 pb-1 sm:-mx-7 sm:px-7">
          {flashSale.map(({ game, product }) => (
            <Link
              key={product.id}
              href={routes.topup(game.slug, product.id)}
              className="group w-48 shrink-0 snap-start rounded-2xl bg-white p-4 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <Image src={game.images.icon} alt={game.name} width={28} height={28} className="size-7 rounded-lg" />
                <span className="rounded-md bg-rose-500 px-1.5 py-0.5 text-[11px] font-extrabold text-white">
                  -{discountPercent(product)}%
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <CurrencyIcon kind={game.currencyKind} className="size-9 shrink-0 transition group-hover:animate-float" />
                <p className="line-clamp-2 text-sm font-bold leading-tight text-ink">{product.label}</p>
              </div>
              <p className="mt-3 text-xs text-subtle line-through">{formatRupiah(product.originalPrice!)}</p>
              <p className="font-display text-lg font-extrabold text-rose-600">{formatRupiah(product.price)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
