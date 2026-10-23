import type { Metadata } from "next";
import "./globals.css";
import "./reference.css";
import { ScrollMotion } from "@/components/site";
import { AdTrackingCapture } from "@/components/ad-tracking-capture";
import { WhatsAppWidget } from "@/components/whatsapp-widget";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://betheliexpeditions.com";

// src/app/icon.png is the dedicated 32x32 symbol-only browser favicon.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Betheli Expeditions | Tanzania journeys made personal",
    template: "%s | Betheli Expeditions",
  },
  description: "Explore Kilimanjaro climbs, Tanzania safaris and Zanzibar journeys with Betheli Expeditions.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Betheli Expeditions",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TourOperator",
    name: "Betheli Expeditions",
    email: "info@betheliexpeditions.com",
    telephone: "+255 692 796 412",
    address: { "@type": "PostalAddress", postOfficeBoxNumber: "15444", addressLocality: "Usa River, Arusha", addressCountry: "TZ" },
    areaServed: ["Tanzania", "Zanzibar"],
    url: siteUrl,
  };
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><AdTrackingCapture /><ScrollMotion />{children}<WhatsAppWidget /></body>
    </html>
  );
}
