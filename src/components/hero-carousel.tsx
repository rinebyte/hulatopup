"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { routes } from "@/lib/routes";

export type Slide = {
  slug: string;
  name: string;
  icon: string;
  image: string;
  focus?: string;
  accent: string;
  eyebrow: string;
  title: string;
  subtitle: string;
};

const INTERVAL = 6000;

export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => setIndex((next + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  return (
    <div
      className="group relative overflow-hidden rounded-[2rem] bg-surface shadow-lift ring-1 ring-line"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
      aria-roledescription="carousel"
    >
      <div className="relative aspect-[3/4] sm:aspect-[16/9] lg:aspect-[21/9]">
        {slides.map((s, i) => (
          <div
            key={s.slug}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            <Image
              src={s.image}
              alt={s.name}
              fill
              priority={i === 0}
              sizes="(min-width: 1280px) 1240px, 100vw"
              className={`object-cover transition-transform duration-[7000ms] ease-out ${
                i === index ? "scale-105" : "scale-100"
              }`}
              style={{ objectPosition: s.focus }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 via-45% to-white/0 sm:bg-gradient-to-r sm:from-white sm:via-white/80 sm:via-40% sm:to-white/0" />
            <div
              className="absolute -bottom-24 -left-24 size-96 rounded-full opacity-25 blur-3xl"
              style={{ background: s.accent }}
            />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:inset-y-0 sm:flex sm:max-w-xl sm:flex-col sm:justify-center sm:p-10 lg:p-14">
              {i === index && (
                <div key={index} className="animate-fade-up">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                    <Zap className="size-3.5 fill-current" />
                    {s.eyebrow}
                  </span>
                  <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-4xl lg:text-5xl">
                    {s.title}
                  </h2>
                  <p className="mt-3 max-w-md text-sm text-muted sm:text-base">{s.subtitle}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <Link
                      href={routes.topup(s.slug)}
                      className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition hover:gap-3"
                    >
                      Topup Sekarang <ArrowRight className="size-4" />
                    </Link>
                    <span className="hidden items-center gap-2 text-sm font-semibold text-muted sm:flex">
                      <Image src={s.icon} alt="" width={28} height={28} className="size-7 rounded-lg shadow-sm" />
                      {s.name}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Kontrol */}
      <div className="absolute left-6 top-6 flex items-center gap-2 sm:left-auto sm:top-auto sm:bottom-6 sm:right-6">
        {slides.map((s, i) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1}: ${s.name}`}
            className="relative h-1.5 w-8 overflow-hidden rounded-full bg-white/60 shadow-sm"
          >
            {i === index && (
              <span
                key={`${index}-${paused}`}
                className="absolute inset-y-0 left-0 rounded-full bg-brand"
                style={{
                  animation: paused ? "none" : `progress ${INTERVAL}ms linear forwards`,
                  width: paused ? "100%" : undefined,
                }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="absolute right-5 top-5 hidden gap-2 opacity-0 transition group-hover:opacity-100 sm:flex">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Sebelumnya"
          className="grid size-10 place-items-center rounded-full bg-white/90 text-ink shadow-md backdrop-blur hover:bg-white"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Berikutnya"
          className="grid size-10 place-items-center rounded-full bg-white/90 text-ink shadow-md backdrop-blur hover:bg-white"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
      <style>{`@keyframes progress { from { width: 0 } to { width: 100% } }`}</style>
    </div>
  );
}
