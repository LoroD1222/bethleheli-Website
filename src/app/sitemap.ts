import type { MetadataRoute } from "next";

const paths = ["", "/kilimanjaro", "/kilimanjaro/machame-route", "/safari", "/zanzibar", "/plan-your-trip", "/contact", "/faq", "/trips", "/groups"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://betheliexpeditions.com";
  return paths.map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: "monthly", priority: path === "" ? 1 : 0.8 }));
}
