import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { absoluteUrl, site } from "@/lib/site";
import { routes } from "@/lib/routes";
import { brandKeywords, defaultDescription, defaultTitle, openGraph } from "@/lib/seo";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: defaultDescription,
  applicationName: site.name,
  keywords: brandKeywords,
  authors: [{ name: site.name, url: absoluteUrl(routes.home) }],
  creator: site.name,
  publisher: site.name,
  category: "games",
  openGraph: openGraph({ title: defaultTitle, description: defaultDescription }),
  twitter: { card: "summary_large_image", title: defaultTitle, description: defaultDescription },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
  ...(site.googleVerification ? { verification: { google: site.googleVerification } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#f5f7fc",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${bricolage.variable} h-full scroll-smooth antialiased`}
    >
      <body className="bg-aurora flex min-h-full flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
