/**
 * Logo metode pembayaran berupa wordmark teks berwarna (bukan file logo resmi).
 * Ganti dengan file SVG resmi dari brand kit payment gateway kamu bila tersedia.
 */
const styles: Record<string, { bg: string; fg: string; text: string; italic?: boolean }> = {
  qris: { bg: "#ffffff", fg: "#111827", text: "QRIS" },
  dana: { bg: "#118eea", fg: "#ffffff", text: "DANA" },
  ovo: { bg: "#4c3494", fg: "#ffffff", text: "OVO" },
  gopay: { bg: "#00aed6", fg: "#ffffff", text: "gopay" },
  shopeepay: { bg: "#ee4d2d", fg: "#ffffff", text: "ShopeePay" },
  bca: { bg: "#0060af", fg: "#ffffff", text: "BCA", italic: true },
  bri: { bg: "#00529c", fg: "#ffffff", text: "BRI" },
  mandiri: { bg: "#003d79", fg: "#fdb913", text: "mandiri" },
  bni: { bg: "#f15a23", fg: "#ffffff", text: "BNI" },
  alfamart: { bg: "#ffffff", fg: "#e31e24", text: "Alfamart" },
  indomaret: { bg: "#0054a6", fg: "#ffd200", text: "Indomaret" },
};

export function PaymentLogo({ id, className = "" }: { id: string; className?: string }) {
  const s = styles[id] ?? { bg: "#334155", fg: "#fff", text: id.toUpperCase() };
  return (
    <span
      className={`inline-grid h-8 min-w-16 place-items-center rounded-md px-2.5 text-[13px] font-extrabold tracking-tight ring-1 ring-inset ring-black/10 ${className}`}
      style={{ background: s.bg, color: s.fg, fontStyle: s.italic ? "italic" : undefined }}
    >
      {s.text}
    </span>
  );
}

export const paymentLogoIds = Object.keys(styles);
