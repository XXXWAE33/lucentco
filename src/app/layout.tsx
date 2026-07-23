import type { Metadata, Viewport } from "next";
import { inter, geist } from "./fonts";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Header, Footer, MobileQuoteBar } from "@/components/layout";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "cleaning Brisbane",
    "eco cleaning",
    "end of lease cleaning Brisbane",
    "bond clean",
    "commercial cleaning Brisbane",
    "Airbnb cleaning",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#3f6447",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={cn(inter.variable, geist.variable)}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <MobileQuoteBar />
      </body>
    </html>
  );
}
