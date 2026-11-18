"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { routes } from "@/lib/routes";

type Item = { slug: string; name: string; publisher: string; icon: string };

export function GameSearch({ items }: { items: Item[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = items.filter((i) =>
    `${i.name} ${i.publisher}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function go(slug: string) {
    setOpen(false);
    setQuery("");
    router.push(routes.topup(slug));
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-9 items-center gap-2 rounded-xl bg-surface-2 px-3 text-sm text-muted transition hover:bg-indigo-50 md:w-56"
      >
        <Search className="size-4" />
        <span className="hidden md:inline">Cari game…</span>
        <kbd className="ml-auto hidden rounded bg-white px-1.5 text-[10px] font-semibold text-subtle shadow-sm md:inline">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/30 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-label="Cari game"
            className="mx-auto max-w-lg overflow-hidden rounded-2xl bg-surface shadow-2xl ring-1 ring-line animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="size-5 text-subtle" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") setActive((a) => Math.min(a + 1, results.length - 1));
                  if (e.key === "ArrowUp") setActive((a) => Math.max(a - 1, 0));
                  if (e.key === "Enter" && results[active]) go(results[active].slug);
                }}
                placeholder="Cari game, mis. Mobile Legends"
                className="h-14 flex-1 bg-transparent text-ink placeholder:text-subtle focus:outline-none"
              />
              <button type="button" onClick={() => setOpen(false)} aria-label="Tutup" className="text-subtle hover:text-ink">
                <X className="size-5" />
              </button>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-muted">Game tidak ditemukan.</li>
              )}
              {results.map((item, i) => (
                <li key={item.slug}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(item.slug)}
                    className={`flex w-full items-center gap-3 rounded-xl p-2 text-left ${
                      i === active ? "bg-indigo-50" : ""
                    }`}
                  >
                    <Image src={item.icon} alt="" width={40} height={40} className="size-10 rounded-lg" />
                    <span>
                      <span className="block text-sm font-semibold text-ink">{item.name}</span>
                      <span className="block text-xs text-muted">{item.publisher}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
