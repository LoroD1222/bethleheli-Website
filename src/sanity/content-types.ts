export type CmsImage = {
  src: string;
  alt: string;
};

export type CmsTripStay = {
  property: string;
  tier: "Luxury" | "Mid-range" | "Budget";
  image: string;
  alt: string;
  slides: Array<{
    property: string;
    tier: "Luxury" | "Mid-range" | "Budget";
    image: string;
    alt: string;
  }>;
};

export type CmsTripPageData = {
  title: string;
  durationDays: number;
  startingPrice: string;
  heroImage: CmsImage;
  heroSummary: string;
  overviewParagraphs: string[];
  overviewImage: CmsImage;
  itineraryFor: string;
  travelDatesText: string;
  guestsText: string;
  map: CmsImage;
  destinations: string[];
  planningTitle: string;
  planningDescription: string;
  itinerary: Array<{
    key: string;
    title: string;
    summary: string;
    image: CmsImage;
    experience: string;
    mealPlan: string;
    stays: CmsTripStay[];
  }>;
  landscapesTitle: string;
  landscapes: Array<{
    key: string;
    icon: string;
    title: string;
    descriptor: string;
    image: CmsImage;
    description: string;
  }>;
  inclusionsEyebrow: string;
  inclusionsTitle: string;
  inclusionsDescription: string;
  inclusionGroups: Array<{
    key: string;
    marker: string;
    title: string;
    description: string;
    items: Array<{
      key: string;
      icon: string;
      title: string;
      description: string;
    }>;
  }>;
  relatedTrips: Array<{
    title: string;
    copy: string;
    note: string;
    image: string;
    href: string;
  }>;
};

export type CmsGroupDeparture = {
  id: string;
  day: string;
  month: string;
  monthIndex: number;
  year: string;
  dateTime: string;
  title: string;
  range: string;
  highlights: string[];
  price: string;
  deposit: string;
  originalPrice?: string;
  discountPercent?: number;
  seasonLabel?: string;
};

export type CmsGroupClimbsData = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: CmsImage;
  benefits: Array<{
    key: string;
    iconKey: string;
    title: string;
    description: string;
  }>;
  scheduleEyebrow: string;
  scheduleTitle: string;
  emptyStateTitle: string;
  emptyStateDescription: string;
  departures: CmsGroupDeparture[];
};

export type CmsSeo = {
  title: string;
  description: string;
  canonicalPath: string;
  shareImage: CmsImage;
};
