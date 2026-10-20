import type { MetadataRoute } from "next";
import { getTripSlugs } from "@/sanity/lib/content";

const paths = ["", "/kilimanjaro", "/kilimanjaro/machame-route", "/kilimanjaro/lemosho-route", "/kilimanjaro/marangu-route", "/kilimanjaro/rongai-route", "/kilimanjaro/northern-circuit", "/kilimanjaro/umbwe-route", "/safari", "/zanzibar", "/plan-your-trip", "/contact", "/faq", "/trips", "/groups"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://betheliexpeditions.com";
  const tripPages = (await getTripSlugs()).flatMap((trip) => trip.slug ? [{
    url: `${baseUrl}/trips/${trip.slug}`,
    lastModified: trip._updatedAt ? new Date(trip._updatedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }] : []);
  return [
    ...paths.map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: path === "" ? 1 : 0.8 })),
    ...tripPages,
  ];
}
