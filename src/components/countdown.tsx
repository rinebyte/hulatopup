"use client";

import { useEffect, useState } from "react";

/** Sisa waktu (ms) sampai tengah malam WIB (UTC+7). */
function msUntilMidnightWIB() {
  const now = Date.now();
  const wib = now + 7 * 3600_000;
  const nextMidnight = Math.floor(wib / 86_400_000 + 1) * 86_400_000;
  return nextMidnight - wib;
}

export function Countdown() {
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setMs(msUntilMidnightWIB());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const parts =
    ms === null
      ? ["--", "--", "--"]
      : [ms / 3600_000, (ms / 60_000) % 60, (ms / 1000) % 60].map((n) =>
          String(Math.floor(n)).padStart(2, "0"),
        );

  return (
    <div className="flex items-center gap-1.5" aria-label="Sisa waktu flash sale" suppressHydrationWarning>
      {parts.map((p, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="grid h-10 min-w-10 place-items-center rounded-xl bg-white font-display text-lg font-extrabold tabular-nums text-rose-600 shadow-md">
            {p}
          </span>
          {i < 2 && <span className="font-bold text-white">:</span>}
        </span>
      ))}
    </div>
  );
}
