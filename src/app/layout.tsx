import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import {
  Header,
  Footer,
  MobileQuoteBar,
  WhatsAppFab,
  BackToTop,
  ServiceNotice,
} from "@/components/layout";
import { serviceSuburbs } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "carpet cleaning Brisbane",
    "couch cleaning Brisbane",
    "upholstery cleaning Brisbane",
    "mattress cleaning Brisbane",
    "curtain cleaning Brisbane",
    "blind cleaning Brisbane",
    "flood water extraction Brisbane",
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

/**
 * LocalBusiness structured data. Facts only — no aggregateRating is included
 * because the review figures are not yet verified against a live profile.
 */
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "CleaningService",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phoneHref.replace("tel:", ""),
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.suburb,
    addressRegion: site.address.state,
    postalCode: site.address.postcode,
    addressCountry: "AU",
  },
  areaServed: serviceSuburbs.map((s) => ({ "@type": "Place", name: `${s}, Brisbane` })),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        {/*
          Skip link — first focusable element on every page, so keyboard and
          screen-reader users can jump the header and announcement strip.
          Visually hidden until focused, then pinned top-left above all chrome.
        */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-btn focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-accent-foreground focus:shadow-elevation-2 focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>

        <Header />
        <div id="main" className="flex-1">
          {children}
        </div>
        {/* Service small print, immediately above the footer on every page. */}
        <ServiceNotice />
        <Footer />
        <MobileQuoteBar />
        <WhatsAppFab />
        <BackToTop />
      </body>
    </html>
  );
}
