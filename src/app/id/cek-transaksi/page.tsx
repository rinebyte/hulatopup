import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckOrder } from "@/components/check-order";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";

const description = `Cek status pesanan topup ${site.name} pakai nomor invoice. Lacak pembayaran & pengiriman Diamond, Genesis Crystal, dan Robux kamu.`;

export const metadata: Metadata = pageMetadata({ title: "Cek Transaksi", description, path: routes.cekTransaksi() });

export default function CekTransaksiPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <p className="text-sm font-bold uppercase tracking-wider text-brand">Lacak pesanan</p>
      <h1 className="mt-1 font-display text-4xl font-extrabold tracking-tight text-ink">Cek Transaksi {site.name}</h1>
      <p className="mt-2 text-muted">
        Masukkan nomor invoice yang kamu terima setelah membuat pesanan untuk melihat statusnya.
      </p>
      <Suspense fallback={<div className="mt-8 h-16 animate-pulse rounded-2xl bg-surface-2" />}>
        <CheckOrder />
      </Suspense>
    </div>
  );
}
