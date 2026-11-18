"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Clock3, Copy, CreditCard, PackageCheck, Search, Info } from "lucide-react";
import { findOrder, loadOrders, type Order } from "@/lib/orders";
import { formatRupiah, whatsappLink } from "@/lib/site";
import { PaymentLogo } from "./payment-logo";
import { routes } from "@/lib/routes";

const timeline = [
  { key: "Menunggu Pembayaran", label: "Menunggu pembayaran", icon: CreditCard },
  { key: "Diproses", label: "Diproses", icon: Clock3 },
  { key: "Sukses", label: "Item terkirim", icon: PackageCheck },
] as const;

export function CheckOrder() {
  const router = useRouter();
  const initial = useSearchParams().get("invoice") ?? "";
  const [invoice, setInvoice] = useState(initial);
  const [result, setResult] = useState<Order | null>();
  const [recent, setRecent] = useState<Order[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // localStorage hanya tersedia di browser, jadi dibaca setelah mount.
    /* eslint-disable react-hooks/set-state-in-effect */
    setRecent(loadOrders().slice(0, 5));
    setInvoice(initial);
    setResult(initial ? (findOrder(initial) ?? null) : undefined);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [initial]);

  function search(e: React.FormEvent) {
    e.preventDefault();
    const q = invoice.trim().toUpperCase();
    if (q) router.replace(routes.cekTransaksi(q), { scroll: false });
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard tidak tersedia */
    }
  }

  const step = result ? timeline.findIndex((t) => t.key === result.status) : -1;

  return (
    <>
      <form onSubmit={search} className="mt-8 flex gap-2 rounded-2xl bg-surface p-2 shadow-soft ring-1 ring-line">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
          <input
            value={invoice}
            onChange={(e) => setInvoice(e.target.value)}
            placeholder="Masukkan nomor invoice"
            className="h-12 w-full rounded-xl bg-transparent pl-10 pr-3 uppercase text-ink placeholder:normal-case placeholder:text-subtle focus:outline-none"
          />
        </div>
        <button type="submit" className="rounded-xl bg-brand px-6 font-bold text-white shadow-md shadow-indigo-500/25 transition hover:bg-indigo-700">
          Cek
        </button>
      </form>

      {result === null && (
        <p className="mt-6 rounded-2xl bg-rose-50 px-5 py-4 text-sm text-rose-700 ring-1 ring-rose-200">
          Invoice <b>{initial}</b> tidak ditemukan di perangkat ini. Periksa kembali nomornya, atau{" "}
          <a href={whatsappLink(`Halo, saya ingin cek invoice ${initial}`)} className="font-semibold underline">
            hubungi CS
          </a>
          .
        </p>
      )}

      {result && (
        <div className="mt-6 overflow-hidden rounded-[1.75rem] bg-surface shadow-lift ring-1 ring-line animate-fade-up">
          <div className="bg-gradient-to-r from-indigo-600 via-violet-500 to-sky-500 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs text-white/80">Nomor invoice</p>
                <button
                  type="button"
                  onClick={() => copy(result.invoice)}
                  className="mt-0.5 flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight text-white"
                >
                  {result.invoice}
                  {copied ? <Check className="size-4 text-emerald-200" /> : <Copy className="size-4 text-white/70" />}
                </button>
              </div>
              <span className="rounded-full bg-amber-300 px-3 py-1.5 text-xs font-bold text-amber-950">
                {result.status}
              </span>
            </div>

            <ol className="mt-6 grid grid-cols-3 gap-2">
              {timeline.map((t, i) => {
                const reached = i <= step;
                const Icon = t.icon;
                return (
                  <li key={t.key} className="relative">
                    <div className={`h-1.5 rounded-full ${reached ? "bg-white" : "bg-white/30"}`} />
                    <div className="mt-3 flex items-center gap-2">
                      <Icon className={`size-4 ${reached ? "text-white" : "text-white/60"}`} />
                      <span className={`text-xs font-semibold ${reached ? "text-white" : "text-white/60"}`}>{t.label}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="grid gap-6 p-6 sm:grid-cols-2">
            <dl className="space-y-2.5 text-sm">
              {[
                ["Tanggal", new Date(result.createdAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })],
                ["Game", result.gameName],
                ...Object.entries(result.account),
                ["Item", result.productLabel],
                ["Harga", formatRupiah(result.price)],
                ["Biaya admin", formatRupiah(result.fee)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-right font-semibold text-ink">{v}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-4 border-t border-dashed border-slate-200 pt-3">
                <dt className="font-semibold text-ink">Total</dt>
                <dd className="font-display text-xl font-extrabold text-brand">{formatRupiah(result.total)}</dd>
              </div>
            </dl>

            <div className="rounded-2xl bg-surface-2 p-5">
              <div className="flex items-center gap-3">
                {result.paymentId && <PaymentLogo id={result.paymentId} />}
                <p className="font-bold text-ink">{result.paymentName}</p>
              </div>
              <div className="mt-4 flex gap-2.5 rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-900 ring-1 ring-amber-200">
                <Info className="size-4 shrink-0 text-amber-500" />
                <p>
                  Mode demo: instruksi pembayaran (kode QRIS / nomor VA) akan tampil di sini setelah
                  payment gateway dihubungkan.
                </p>
              </div>
              <a
                href={whatsappLink(`Halo, saya ingin konfirmasi invoice ${result.invoice}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block rounded-xl bg-white py-2.5 text-center text-sm font-bold text-brand shadow-sm hover:bg-indigo-50"
              >
                Butuh bantuan? Hubungi CS
              </a>
            </div>
          </div>
        </div>
      )}

      {recent.length > 0 && (
        <div className="mt-10">
          <h2 className="text-sm font-bold text-muted">Transaksi terakhir di perangkat ini</h2>
          <ul className="mt-3 divide-y divide-slate-100 overflow-hidden rounded-2xl bg-surface shadow-soft ring-1 ring-line">
            {recent.map((o) => (
              <li key={o.invoice}>
                <Link
                  href={routes.cekTransaksi(o.invoice)}
                  scroll={false}
                  className="flex items-center justify-between gap-4 px-5 py-3.5 transition hover:bg-indigo-50/60"
                >
                  <span>
                    <span className="block text-sm font-bold text-ink">{o.productLabel}</span>
                    <span className="block text-xs text-muted">
                      {o.gameName} · {o.invoice}
                    </span>
                  </span>
                  <span className="text-sm font-bold text-brand">{formatRupiah(o.total)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
