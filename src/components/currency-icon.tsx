import { useId } from "react";
import type { CurrencyKind } from "@/lib/games";

/** Ikon mata uang orisinal (SVG) — bukan aset resmi game. */
export function CurrencyIcon({ kind, className = "size-8" }: { kind: CurrencyKind; className?: string }) {
  const id = useId().replace(/:/g, "");

  if (kind === "diamond") {
    return (
      <svg viewBox="0 0 48 48" className={className} aria-hidden>
        <defs>
          <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a5f3fc" />
            <stop offset="0.5" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#6366f1" />
          </linearGradient>
        </defs>
        <path d="M14 8h20l10 12-20 22L4 20z" fill={`url(#${id}a)`} />
        <path d="M4 20h40L24 42z" fill="#1d4ed8" opacity=".35" />
        <path d="M14 8l4 12 6-12 6 12 4-12" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="1.2" />
        <path d="M4 20h40M18 20l6 22 6-22" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="1.2" />
        <path d="M16 10l-6 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".8" />
      </svg>
    );
  }

  if (kind === "crystal") {
    return (
      <svg viewBox="0 0 48 48" className={className} aria-hidden>
        <defs>
          <linearGradient id={`${id}a`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f5d0fe" />
            <stop offset="0.55" stopColor="#c084fc" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id={`${id}b`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fde68a" />
            <stop offset="1" stopColor="#d97706" />
          </linearGradient>
        </defs>
        <path d="M24 3l9 17-9 25-9-25z" fill={`url(#${id}a)`} />
        <path d="M24 3v42l9-25z" fill="#4c1d95" opacity=".3" />
        <path d="M15 20h18" stroke="#fff" strokeOpacity=".55" strokeWidth="1.2" />
        <path d="M9 24c4-1 7-3 8-7m22 7c-4-1-7-3-8-7" fill="none" stroke={`url(#${id}b)`} strokeWidth="3" strokeLinecap="round" />
        <circle cx="38" cy="10" r="2" fill="#fde68a" />
        <circle cx="10" cy="36" r="1.5" fill="#fde68a" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fef08a" />
          <stop offset="0.5" stopColor="#facc15" />
          <stop offset="1" stopColor="#ca8a04" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="20" fill={`url(#${id}a)`} />
      <circle cx="24" cy="24" r="15" fill="none" stroke="#a16207" strokeOpacity=".5" strokeWidth="2" />
      <path d="M24 14l9 5v10l-9 5-9-5V19z" fill="#fff" fillOpacity=".85" />
      <path d="M24 20l4 2.3v4.4L24 29l-4-2.3v-4.4z" fill="#ca8a04" />
      <path d="M12 16a14 14 0 0 1 8-6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity=".7" fill="none" />
    </svg>
  );
}
