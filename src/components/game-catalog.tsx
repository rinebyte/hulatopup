"use client";

import { useState, type ReactNode } from "react";

/**
 * Tab filter genre. Kartu dirender di server lalu dikirim sebagai `cards`
 * agar komponen ini tetap ringan.
 */
export function GameCatalog({
  genres,
  cards,
}: {
  genres: string[];
  cards: { genre: string; node: ReactNode; key: string }[];
}) {
  const [genre, setGenre] = useState("Semua");
  const tabs = ["Semua", ...genres];
  const visible = cards.filter((c) => genre === "Semua" || c.genre === genre);

  return (
    <>
      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto" role="tablist">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={t === genre}
            onClick={() => setGenre(t)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              t === genre
                ? "bg-brand text-white shadow-md shadow-indigo-500/25"
                : "bg-white text-muted shadow-soft hover:text-brand"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((c) => (
          <div key={c.key} className="animate-fade-up">
            {c.node}
          </div>
        ))}
      </div>
    </>
  );
}
