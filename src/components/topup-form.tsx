"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Check,
  ChevronDown,
  CircleHelp,
  Loader2,
  Lock,
  MessageCircle,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import type { AccountField, CurrencyKind, PaymentMethod, Product } from "@/lib/games";
import { discountPercent } from "@/lib/games";
import { brandInitials, formatRupiah } from "@/lib/site";
import { createInvoiceId, saveOrder, type Order } from "@/lib/orders";
import { CurrencyIcon } from "./currency-icon";
import { PaymentLogo } from "./payment-logo";
import { routes } from "@/lib/routes";

export type TopupGame = {
  slug: string;
  name: string;
  icon: string;
  currency: string;
  currencyKind: CurrencyKind;
  accent: string;
  fields: AccountField[];
  howToFindId: string;
  products: Product[];
};

type Props = { game: TopupGame; payments: PaymentMethod[] };

function Step({
  n,
  title,
  done,
  children,
  aside,
}: {
  n: number;
  title: string;
  done?: boolean;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="rounded-[1.75rem] bg-surface p-5 shadow-soft ring-1 ring-line sm:p-6">
      <header className="flex items-center gap-3">
        <span
          className={`grid size-8 place-items-center rounded-xl text-sm font-extrabold transition ${
            done ? "bg-emerald-500 text-white" : "bg-indigo-50 text-brand"
          }`}
        >
          {done ? <Check className="size-4" strokeWidth={3} /> : n}
        </span>
        <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
        <div className="ml-auto">{aside}</div>
      </header>
      <div className="mt-5">{children}</div>
    </section>
  );
}

const inputClass =
  "w-full rounded-xl bg-surface-2 px-4 py-3.5 text-ink ring-1 ring-transparent placeholder:text-subtle transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400";

const tileBase = "transition";
const tileIdle = "bg-white ring-1 ring-line hover:ring-indigo-300 hover:shadow-md";
const tileActive = "bg-indigo-50 ring-2 ring-brand shadow-md shadow-indigo-500/10";

export function TopupForm({ game, payments }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groups = useMemo(() => [...new Set(game.products.map((p) => p.group))], [game.products]);
  const preselect = game.products.find((p) => p.id === searchParams.get("item"));

  const [account, setAccount] = useState<Record<string, string>>({});
  const [productId, setProductId] = useState<string | undefined>(preselect?.id);
  const [tab, setTab] = useState(preselect?.group ?? groups[0]);
  const [paymentId, setPaymentId] = useState<string>();
  const [openGroup, setOpenGroup] = useState<string>("QRIS");
  const [whatsapp, setWhatsapp] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [error, setError] = useState<string>();
  const [confirming, setConfirming] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const product = game.products.find((p) => p.id === productId);
  const payment = payments.find((p) => p.id === paymentId);
  const total = product ? product.price + (payment?.fee ?? 0) : 0;

  const accountDone = game.fields.every((f) => account[f.name]?.trim());
  const waClean = whatsapp.replace(/[\s-]/g, "");
  const waValid = /^(\+?62|0)8\d{7,12}$/.test(waClean);

  const paymentGroups = useMemo(() => {
    const map = new Map<string, PaymentMethod[]>();
    for (const p of payments) map.set(p.group, [...(map.get(p.group) ?? []), p]);
    return [...map.entries()];
  }, [payments]);

  useEffect(() => {
    if (preselect) {
      document.getElementById("step-nominal")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [preselect]);

  function review(e: React.FormEvent) {
    e.preventDefault();
    const missing = game.fields.find((f) => !account[f.name]?.trim());
    if (missing) return setError(`${missing.label} wajib diisi.`);
    if (!product) return setError("Pilih nominal topup terlebih dahulu.");
    if (!payment) return setError("Pilih metode pembayaran.");
    if (!waValid) return setError("Nomor WhatsApp tidak valid. Contoh: 081234567890");
    setError(undefined);
    setConfirming(true);
  }

  function placeOrder() {
    if (!product || !payment) return;
    setSubmitting(true);
    const order: Order = {
      invoice: createInvoiceId(brandInitials),
      gameSlug: game.slug,
      gameName: game.name,
      account: Object.fromEntries(game.fields.map((f) => [f.label, account[f.name].trim()])),
      productLabel: product.label,
      paymentName: payment.name,
      paymentId: payment.id,
      price: product.price,
      fee: payment.fee,
      total,
      whatsapp: waClean,
      status: "Menunggu Pembayaran",
      createdAt: new Date().toISOString(),
    };
    saveOrder(order);
    router.push(routes.cekTransaksi(order.invoice));
  }

  const visibleProducts = game.products.filter((p) => p.group === tab);

  return (
    <>
      <form onSubmit={review} noValidate className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-5">
          {/* 1. Akun */}
          <Step
            n={1}
            title="Masukkan Data Akun"
            done={accountDone}
            aside={
              <button
                type="button"
                onClick={() => setShowHelp((s) => !s)}
                className="flex items-center gap-1 text-xs font-bold text-brand hover:text-indigo-700"
              >
                <CircleHelp className="size-4" /> Cara cek ID
              </button>
            }
          >
            {showHelp && (
              <p className="mb-4 rounded-xl bg-indigo-50 px-4 py-3 text-sm leading-relaxed text-indigo-900 animate-fade-up">
                {game.howToFindId}
              </p>
            )}
            <div className={`grid gap-4 ${game.fields.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {game.fields.map((field) => (
                <label key={field.name} className="block">
                  <span className="mb-2 block text-sm font-semibold text-ink">{field.label}</span>
                  {field.options ? (
                    <div className="relative">
                      <select
                        className={`${inputClass} appearance-none pr-10`}
                        value={account[field.name] ?? ""}
                        onChange={(e) => setAccount({ ...account, [field.name]: e.target.value })}
                      >
                        <option value="" disabled>
                          {field.placeholder}
                        </option>
                        {field.options.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
                    </div>
                  ) : (
                    <input
                      className={inputClass}
                      placeholder={field.placeholder}
                      inputMode={field.inputMode}
                      autoComplete="off"
                      value={account[field.name] ?? ""}
                      onChange={(e) => setAccount({ ...account, [field.name]: e.target.value })}
                    />
                  )}
                </label>
              ))}
            </div>
          </Step>

          {/* 2. Nominal */}
          <div id="step-nominal">
            <Step n={2} title="Pilih Nominal" done={!!product}>
              {groups.length > 1 && (
                <div className="mb-5 inline-flex rounded-xl bg-surface-2 p-1">
                  {groups.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setTab(g)}
                      className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                        g === tab ? "bg-white text-brand shadow-sm" : "text-muted hover:text-ink"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {visibleProducts.map((p) => {
                  const active = p.id === productId;
                  return (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => setProductId(p.id)}
                      aria-pressed={active}
                      className={`group relative overflow-hidden rounded-2xl p-4 text-left ${tileBase} ${active ? tileActive : tileIdle}`}
                    >
                      {p.originalPrice ? (
                        <span className="absolute right-0 top-0 rounded-bl-xl bg-rose-500 px-2 py-0.5 text-[10px] font-extrabold text-white">
                          -{discountPercent(p)}%
                        </span>
                      ) : p.hot ? (
                        <span className="absolute right-0 top-0 rounded-bl-xl bg-amber-400 px-2 py-0.5 text-[10px] font-extrabold uppercase text-amber-950">
                          Hot
                        </span>
                      ) : null}
                      <div className="flex items-center gap-2.5">
                        <CurrencyIcon
                          kind={game.currencyKind}
                          className="size-8 shrink-0 transition group-hover:scale-110"
                        />
                        <div className="min-w-0">
                          {p.amount ? (
                            <p className="font-display text-lg font-extrabold leading-none text-ink">{p.amount}</p>
                          ) : null}
                          <p className={`truncate text-xs ${p.amount ? "text-muted" : "font-bold text-ink"}`}>
                            {p.amount ? game.currency : p.label}
                          </p>
                        </div>
                      </div>
                      {p.note && <p className="mt-2 line-clamp-1 text-[11px] text-subtle">{p.note}</p>}
                      <div className="mt-3 border-t border-dashed border-slate-200 pt-2.5">
                        <p className="text-sm font-extrabold text-brand">{formatRupiah(p.price)}</p>
                        {p.originalPrice && (
                          <p className="text-[11px] text-subtle line-through">{formatRupiah(p.originalPrice)}</p>
                        )}
                      </div>
                      {active && (
                        <span className="absolute bottom-3 right-3 grid size-5 place-items-center rounded-full bg-brand text-white">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </Step>
          </div>

          {/* 3. Pembayaran */}
          <Step n={3} title="Pilih Pembayaran" done={!!payment}>
            <div className="space-y-3">
              {paymentGroups.map(([group, items]) => {
                const open = openGroup === group;
                const selectedHere = items.some((m) => m.id === paymentId);
                return (
                  <div key={group} className={`overflow-hidden rounded-2xl ring-1 ${open ? "bg-surface-2 ring-line" : "bg-white ring-line"}`}>
                    <button
                      type="button"
                      onClick={() => setOpenGroup(open ? "" : group)}
                      aria-expanded={open}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                    >
                      <span className="font-bold text-ink">{group}</span>
                      {selectedHere && !open && (
                        <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-brand">
                          {payment?.name}
                        </span>
                      )}
                      <span className="ml-auto flex items-center gap-1.5">
                        {!open && (
                          <span className="hidden gap-1.5 sm:flex">
                            {items.slice(0, 4).map((m) => (
                              <PaymentLogo key={m.id} id={m.id} className="h-6 min-w-0 px-1.5 text-[10px]" />
                            ))}
                          </span>
                        )}
                        <ChevronDown className={`size-4 text-subtle transition ${open ? "rotate-180" : ""}`} />
                      </span>
                    </button>
                    {open && (
                      <div className="grid gap-2 p-3 pt-0 sm:grid-cols-2">
                        {items.map((m) => {
                          const active = m.id === paymentId;
                          return (
                            <button
                              type="button"
                              key={m.id}
                              onClick={() => setPaymentId(m.id)}
                              aria-pressed={active}
                              className={`flex items-center gap-3 rounded-xl p-3 text-left ${tileBase} ${active ? tileActive : tileIdle}`}
                            >
                              <PaymentLogo id={m.id} />
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-bold text-ink">{m.name}</span>
                                <span className="block text-xs text-muted">
                                  {product
                                    ? formatRupiah(product.price + m.fee)
                                    : m.fee
                                      ? `Biaya ${formatRupiah(m.fee)}`
                                      : "Tanpa biaya admin"}
                                </span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Step>

          {/* 4. Kontak */}
          <Step n={4} title="Detail Kontak" done={waValid}>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-ink">Nomor WhatsApp</span>
              <div className="relative">
                <MessageCircle className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-subtle" />
                <input
                  className={`${inputClass} pl-11`}
                  placeholder="081234567890"
                  inputMode="tel"
                  autoComplete="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
              </div>
              <span className="mt-2 block text-xs text-muted">Bukti transaksi dikirim ke nomor ini.</span>
            </label>
          </Step>
        </div>

        {/* Ringkasan */}
        <aside className="lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-[1.75rem] bg-surface shadow-lift ring-1 ring-line">
            <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-500 p-5">
              <Image src={game.icon} alt="" width={44} height={44} className="size-11 rounded-xl ring-2 ring-white/40" />
              <div>
                <p className="text-xs text-white/80">Ringkasan pesanan</p>
                <p className="font-bold text-white">{game.name}</p>
              </div>
            </div>
            <dl className="space-y-3 p-5 text-sm">
              <Row label="Akun">
                {accountDone ? (
                  <span className="inline-flex items-center gap-1.5">
                    <UserRound className="size-3.5 text-subtle" />
                    {game.fields.map((f) => account[f.name]).join(" · ")}
                  </span>
                ) : (
                  <Muted>Belum diisi</Muted>
                )}
              </Row>
              <Row label="Item">{product ? product.label : <Muted>Belum dipilih</Muted>}</Row>
              <Row label="Pembayaran">{payment ? payment.name : <Muted>Belum dipilih</Muted>}</Row>
              <Row label="Harga">{product ? formatRupiah(product.price) : "-"}</Row>
              <Row label="Biaya admin">{payment ? formatRupiah(payment.fee) : "-"}</Row>
            </dl>
            <div className="border-t border-dashed border-slate-200 p-5">
              <div className="flex items-end justify-between">
                <span className="text-sm text-muted">Total bayar</span>
                <span className="font-display text-2xl font-extrabold text-ink">{formatRupiah(total)}</span>
              </div>
              {error && (
                <p role="alert" className="mt-4 rounded-xl bg-rose-50 px-3 py-2.5 text-sm font-medium text-rose-600 ring-1 ring-rose-200">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="mt-4 hidden w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 py-3.5 font-bold text-white shadow-lg shadow-indigo-500/30 transition hover:brightness-110 lg:flex"
              >
                <ShoppingCart className="size-5" /> Beli Sekarang
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
                <Lock className="size-3" /> Transaksi aman & terenkripsi
              </p>
            </div>
          </div>
        </aside>

        {/* Bar bawah (mobile) */}
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 p-3 shadow-[0_-8px_24px_-12px_rgb(15_23_42/0.15)] backdrop-blur-xl lg:hidden">
          {error && <p role="alert" className="mb-2 text-xs font-medium text-rose-600">{error}</p>}
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-muted">{product ? product.label : "Pilih nominal"}</p>
              <p className="font-display text-lg font-extrabold text-ink">{formatRupiah(total)}</p>
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-500/30"
            >
              <ShoppingCart className="size-4" /> Beli
            </button>
          </div>
        </div>
      </form>
      <div className="h-20 lg:hidden" />

      {confirming && product && payment && (
        <div
          className="fixed inset-0 z-50 grid place-items-end bg-slate-900/40 backdrop-blur-sm sm:place-items-center sm:p-4"
          onClick={() => !submitting && setConfirming(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl animate-fade-up sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 id="confirm-title" className="font-display text-xl font-bold text-ink">
                Konfirmasi pesanan
              </h2>
              <button type="button" onClick={() => setConfirming(false)} aria-label="Tutup" className="text-subtle hover:text-ink">
                <X className="size-5" />
              </button>
            </div>
            <p className="mt-1 text-sm text-muted">Pastikan data akun sudah benar. Item tidak bisa dibatalkan setelah dikirim.</p>
            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-indigo-50 p-4">
              <CurrencyIcon kind={game.currencyKind} className="size-10" />
              <div>
                <p className="font-bold text-ink">{product.label}</p>
                <p className="text-xs text-muted">{game.name}</p>
              </div>
            </div>
            <dl className="mt-4 space-y-2.5 text-sm">
              {game.fields.map((f) => (
                <Row key={f.name} label={f.label}>{account[f.name]}</Row>
              ))}
              <Row label="Pembayaran">
                <span className="inline-flex items-center gap-2">
                  <PaymentLogo id={payment.id} className="h-6 min-w-0 px-1.5 text-[10px]" /> {payment.name}
                </span>
              </Row>
              <Row label="WhatsApp">{waClean}</Row>
              <div className="flex justify-between border-t border-dashed border-slate-200 pt-3">
                <dt className="font-semibold text-ink">Total</dt>
                <dd className="font-display text-xl font-extrabold text-brand">{formatRupiah(total)}</dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={placeOrder}
              disabled={submitting}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 py-3.5 font-bold text-white shadow-lg shadow-indigo-500/30 disabled:opacity-70"
            >
              {submitting ? <Loader2 className="size-5 animate-spin" /> : <Lock className="size-4" />}
              {submitting ? "Membuat invoice…" : "Bayar Sekarang"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-semibold text-ink">{children}</dd>
    </div>
  );
}

function Muted({ children }: { children: React.ReactNode }) {
  return <span className="font-normal text-subtle">{children}</span>;
}
