import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

/** Kerangka situs (header + footer) untuk semua halaman di bawah /id. Root `/` dibiarkan polos. */
export default function IdLayout({ children }: LayoutProps<"/id">) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
