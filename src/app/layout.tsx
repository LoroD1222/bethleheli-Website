import type { Metadata } from "next";
import "./globals.css";
import "./reference.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://betheliexpeditions.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Betheli Expeditions | Tanzania journeys made personal",
    template: "%s | Betheli Expeditions",
  },
  description: "Explore Kilimanjaro climbs, Tanzania safaris and Zanzibar journeys with Betheli Expeditions.",
  icons: { icon: "/images/logo.png", apple: "/images/logo.png" },
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
    telephone: "+255 754 411 965",
    address: { "@type": "PostalAddress", addressLocality: "Arusha", addressCountry: "TZ" },
    areaServed: ["Tanzania", "Zanzibar"],
    url: siteUrl,
  };
  return (
    <html lang="en">
      <body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{children}</body>
    </html>
  );
}
