import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePage } from "@/components/site";
import { HomeReferencePage, KilimanjaroReferencePage, KilimanjaroRouteDetailPage, SafariReferencePage, TripDetailReferencePage, TripsReferencePage, ZanzibarReferencePage } from "@/components/reference-pages";
import { pageMeta, routeKeyFromSlug } from "@/lib/routes";

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const key = routeKeyFromSlug(slug);
  if (!key) notFound();
  const meta = pageMeta[key];
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.path },
    openGraph: { title: meta.title, description: meta.description, url: meta.path, images: [{ url: meta.image, alt: meta.title }] },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: [meta.image] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const key = routeKeyFromSlug(slug);
  if (!key) notFound();
  switch (key) {
    case "home": return <HomeReferencePage />;
    case "kilimanjaro": return <KilimanjaroReferencePage />;
    case "machame": return <KilimanjaroRouteDetailPage route="machame" />;
    case "lemosho": return <KilimanjaroRouteDetailPage route="lemosho" />;
    case "marangu": return <KilimanjaroRouteDetailPage route="marangu" />;
    case "rongai": return <KilimanjaroRouteDetailPage route="rongai" />;
    case "northernCircuit": return <KilimanjaroRouteDetailPage route="northern-circuit" />;
    case "umbwe": return <KilimanjaroRouteDetailPage route="umbwe" />;
    case "safari": return <SafariReferencePage />;
    case "zanzibar": return <ZanzibarReferencePage />;
    case "trips": return <TripsReferencePage />;
    case "northernSerengeti": return <TripDetailReferencePage />;
    default: return <SitePage page={key} />;
  }
}
