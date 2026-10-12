export type PageKey = "home" | "kilimanjaro" | "machame" | "safari" | "zanzibar" | "plan" | "contact" | "faq" | "trips" | "groups";

type Meta = { title: string; description: string; path: string; image: string };

export const pageMeta: Record<PageKey, Meta> = {
  home: { title: "Tanzania journeys made personal", description: "Kilimanjaro climbs, Tanzania safaris and Zanzibar journeys from Betheli Expeditions.", path: "/", image: "/images/figma-home-hero.png" },
  kilimanjaro: { title: "Climb Mount Kilimanjaro", description: "Explore Kilimanjaro routes, the journey and tailored climb planning.", path: "/kilimanjaro", image: "/images/figma-home-gallery3.png" },
  machame: { title: "Machame Route", description: "Explore the Machame Route on Mount Kilimanjaro.", path: "/kilimanjaro/machame-route", image: "/images/figma-machame-hero.png" },
  safari: { title: "Tanzania Safari", description: "Explore Tanzania safari parks, wildlife and itinerary ideas.", path: "/safari", image: "/images/figma-safari-hero.png" },
  zanzibar: { title: "Discover Zanzibar", description: "Explore Zanzibar beaches, Stone Town and island journeys.", path: "/zanzibar", image: "/images/figma-zanzibar-hero.png" },
  plan: { title: "Plan Your Tanzania Adventure", description: "Share your travel interests and begin planning a Tanzania journey.", path: "/plan-your-trip", image: "/images/figma-plan-hero.png" },
  contact: { title: "Contact Bathiel Expeditions", description: "Start a conversation with the Bathiel Expeditions team.", path: "/contact", image: "/images/figma-contact-hero.jpg" },
  faq: { title: "Tanzania Travel Questions", description: "Answers to common Kilimanjaro, safari, Zanzibar and booking questions.", path: "/faq", image: "/images/figma-faq-hero.jpg" },
  trips: { title: "Northern Serengeti River Crossing Safari", description: "View a six-day Northern Serengeti River Crossing Safari itinerary.", path: "/trips", image: "/images/figma-trips-hero.png" },
  groups: { title: "Kilimanjaro Climbing Groups", description: "View upcoming Kilimanjaro climbing group departures.", path: "/groups", image: "/images/home-10.jpg" },
};

export function routeKeyFromSlug(slug?: string[]): PageKey | null {
  const path = `/${(slug || []).join("/")}`.replace(/\/$/, "") || "/";
  const routes: Record<string, PageKey> = {
    "/": "home", "/kilimanjaro": "kilimanjaro", "/kilimanjaro/machame-route": "machame", "/safari": "safari", "/zanzibar": "zanzibar", "/plan-your-trip": "plan", "/contact": "contact", "/faq": "faq", "/trips": "trips", "/groups": "groups",
  };
  return routes[path] || null;
}
