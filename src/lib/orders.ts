/**
 * Penyimpanan pesanan DEMO di localStorage browser.
 * Untuk produksi, ganti dengan API backend + payment gateway (mis. Midtrans/Xendit/Tripay)
 * dan supplier topup (mis. Digiflazz/VIP Reseller).
 */
export type Order = {
  invoice: string;
  gameSlug: string;
  gameName: string;
  account: Record<string, string>;
  productLabel: string;
  paymentName: string;
  paymentId?: string;
  price: number;
  fee: number;
  total: number;
  whatsapp: string;
  status: "Menunggu Pembayaran" | "Diproses" | "Sukses";
  createdAt: string;
};

const KEY = "topup-orders";

export function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order) {
  try {
    localStorage.setItem(KEY, JSON.stringify([order, ...loadOrders()].slice(0, 20)));
  } catch {
    /* storage tidak tersedia — abaikan di mode demo */
  }
}

export function findOrder(invoice: string) {
  const needle = invoice.trim().toUpperCase();
  return loadOrders().find((o) => o.invoice === needle);
}

/** Nomor invoice unik berbasis waktu, mis. "HUMWM37O6I". */
export function createInvoiceId(prefix: string) {
  return `${prefix}${Date.now().toString(36).toUpperCase()}`;
}
