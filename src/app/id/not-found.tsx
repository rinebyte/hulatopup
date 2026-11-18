import Link from "next/link";
import { routes } from "@/lib/routes";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="text-6xl font-black text-indigo-100">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-ink">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-muted">Game atau halaman yang kamu cari tidak tersedia.</p>
      <Link
        href={routes.home}
        className="mt-8 inline-block rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 px-6 py-3 font-semibold text-white"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
