import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Zap } from "lucide-react";
import type { Game } from "@/lib/games";
import { startingPrice } from "@/lib/games";
import { formatRupiah } from "@/lib/site";
import { routes } from "@/lib/routes";

export function GameCard({ game }: { game: Game }) {
  return (
    <Link
      href={routes.topup(game.slug)}
      className="group relative isolate block overflow-hidden rounded-[1.75rem] bg-surface shadow-soft ring-1 ring-line transition duration-300 hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={game.images.card}
          alt={game.name}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-110"
          style={{ objectPosition: game.images.cardFocus ?? game.images.focus }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-ink shadow-sm backdrop-blur">
          <Zap className="size-3 fill-amber-400 text-amber-400" /> Proses instan
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-brand shadow-sm backdrop-blur">
          {game.genre}
        </span>
      </div>
      <div className="relative -mt-10 flex items-end gap-3 px-5">
        <Image
          src={game.images.icon}
          alt=""
          width={64}
          height={64}
          className="size-16 rounded-2xl shadow-lg ring-4 ring-white"
        />
        <div className="pb-1">
          <p className="text-xs font-medium text-muted">{game.publisher}</p>
          <h3 className="font-display text-lg font-bold leading-tight text-ink">{game.name}</h3>
        </div>
      </div>
      <div className="flex items-center justify-between px-5 pb-5 pt-4">
        <p className="text-sm text-muted">
          {game.currency} mulai
          <span className="block font-display text-base font-bold text-ink">
            {formatRupiah(startingPrice(game))}
          </span>
        </p>
        <span className="grid size-10 place-items-center rounded-full bg-indigo-50 text-brand transition group-hover:bg-brand group-hover:text-white">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
    </Link>
  );
}
