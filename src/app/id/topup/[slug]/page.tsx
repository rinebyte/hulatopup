import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ChevronRight, Clock3, Headset, ShieldCheck, Zap } from "lucide-react";
import { games, getGame, paymentMethods, startingPrice } from "@/lib/games";
import { formatRupiah, site } from "@/lib/site";
import { pageMetadata, topupJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { TopupForm } from "@/components/topup-form";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/id/topup/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return {};
  const title = `Topup ${game.name} Murah — ${game.currency} Instan`;
  const description = `Topup ${game.currency} ${game.name} di ${site.name} mulai ${formatRupiah(startingPrice(game))}. Proses instan 24 jam, cukup ID akun, bayar via QRIS, e-wallet & VA bank.`;
  return pageMetadata({
    title,
    description,
    path: routes.topup(game.slug),
    images: [{ url: game.images.banner, alt: `Topup ${game.name} di ${site.name}` }],
    keywords: [`topup ${game.name} ${site.name}`, `${site.name} ${game.currency}`, `topup ${game.currency}`, `${game.currency} murah`, game.name],
  });
}

export default function TopupPage({ params }: PageProps<"/id/topup/[slug]">) {
  // `params` dibaca di dalam <Suspense> agar App Shell bisa diprefetch & navigasi terasa instan.
  return (
    <Suspense fallback={<TopupSkeleton />}>
      <TopupContent params={params} />
    </Suspense>
  );
}

function TopupSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-72 bg-surface-2" />
      <div className="mx-auto mt-8 grid max-w-7xl gap-6 px-4 lg:grid-cols-[1fr_380px]">
        <div className="space-y-5">
          <div className="h-40 rounded-3xl bg-surface-2" />
          <div className="h-96 rounded-3xl bg-surface-2" />
        </div>
        <div className="h-80 rounded-3xl bg-surface-2" />
      </div>
    </div>
  );
}

async function TopupContent({ params }: { params: PageProps<"/id/topup/[slug]">["params"] }) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  return (
    <>
      {topupJsonLd(game).map((data) => (
        <JsonLd key={data["@type"]} data={data} />
      ))}
      {/* Banner game */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <Image
          src={game.images.banner}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
          style={{ objectPosition: game.images.focus }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-white/70 via-40% to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/80 via-white/10 to-transparent" />

        <div className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:pt-10">
          <nav className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1.5 text-sm font-medium text-muted shadow-sm backdrop-blur">
            <Link href={routes.home} className="hover:text-brand">Beranda</Link>
            <ChevronRight className="size-4" />
            <span className="text-ink">Topup {game.name}</span>
          </nav>

          <div className="mt-10 flex flex-col gap-4 sm:mt-24 sm:flex-row sm:items-end sm:gap-5">
            <Image
              src={game.images.icon}
              alt={game.name}
              width={112}
              height={112}
              className="size-24 rounded-3xl shadow-xl ring-4 ring-white sm:size-28"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-muted">{game.publisher}</p>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
                <span className="text-muted">Topup</span> {game.name}
              </h1>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                {[
                  { icon: Zap, label: "Proses instan" },
                  { icon: ShieldCheck, label: "Aman & legal" },
                  { icon: Clock3, label: "Buka 24 jam" },
                  { icon: Headset, label: "CS siap bantu" },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-ink shadow-sm">
                    <Icon className="size-3.5 text-brand" /> {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="hidden rounded-2xl bg-white px-5 py-3 text-right shadow-soft md:block">
              <p className="text-xs text-muted">{game.currency} mulai</p>
              <p className="font-display text-2xl font-extrabold text-brand">{formatRupiah(startingPrice(game))}</p>
            </div>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">{game.description}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <TopupForm
          game={{
            slug: game.slug,
            name: game.name,
            icon: game.images.icon,
            currency: game.currency,
            currencyKind: game.currencyKind,
            accent: game.accent,
            fields: game.fields,
            howToFindId: game.howToFindId,
            products: game.products,
          }}
          payments={paymentMethods}
        />
      </div>
    </>
  );
}
