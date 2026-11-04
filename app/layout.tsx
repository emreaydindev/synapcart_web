import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_URL, site } from "@/lib/site";
import "./globals.css";

// Bundled (OFL, see app/fonts/OFL.txt) so builds don't depend on Google Fonts.
const jakarta = localFont({
  src: [
    { path: "./fonts/plus_jakarta_sans_regular.ttf", weight: "400" },
    { path: "./fonts/plus_jakarta_sans_medium.ttf", weight: "500" },
    { path: "./fonts/plus_jakarta_sans_semibold.ttf", weight: "600" },
    { path: "./fonts/plus_jakarta_sans_bold.ttf", weight: "700" },
    { path: "./fonts/plus_jakarta_sans_extrabold.ttf", weight: "800" },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SynapCart · Yapay zekâ destekli alışveriş asistanı",
    template: "%s · SynapCart",
  },
  description: site.description,
  applicationName: site.name,
  keywords: ["alışveriş asistanı", "yapay zekâ", "fiyat karşılaştırma", "ürün önerisi", "SynapCart"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: site.name,
    url: "/",
    title: "SynapCart · Yapay zekâ destekli alışveriş asistanı",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "SynapCart · Yapay zekâ destekli alışveriş asistanı",
    description: site.description,
  },
  other: {
    "google-play-app": `app-id=${site.packageName}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#060B14",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={jakarta.variable}>
      <body>
        <a href="#icerik" className="skip-link">
          İçeriğe geç
        </a>
        <SiteHeader />
        <main id="icerik">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
