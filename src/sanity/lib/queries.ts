import { defineQuery } from "next-sanity";

const imageFields = /* groq */ `
  asset,
  alt,
  crop,
  hotspot,
  "lqip": asset->metadata.lqip,
  "dimensions": asset->metadata.dimensions
`;

export const TRIP_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "trip" && slug.current == $slug][0] {
    _id,
    title,
    durationDays,
    startingPrice { amount, currency },
    heroImage { ${imageFields} },
    heroSummary,
    overviewParagraphs,
    overviewImage { ${imageFields} },
    itineraryFor,
    travelDatesText,
    guestsText,
    destinations,
    planningTitle,
    planningDescription,
    itinerary[] {
      _key,
      title,
      summary,
      image { ${imageFields} },
      experience,
      mealPlan,
      accommodations[]-> {
        _id,
        propertyName,
        tier,
        coverImage { ${imageFields} },
        gallery[] { ${imageFields} }
      }
    },
    landscapesTitle,
    landscapes[] {
      _key,
      name,
      descriptor,
      iconKey,
      image { ${imageFields} },
      description
    },
    inclusionsEyebrow,
    inclusionsTitle,
    inclusionsDescription,
    inclusionGroups[] {
      _key,
      marker,
      title,
      description,
      items[] { _key, iconKey, title, description }
    },
    relatedTrips[] {
      _key,
      title,
      summary,
      durationLabel,
      image { ${imageFields} },
      href
    },
    seo {
      title,
      description,
      canonicalPath,
      shareImage { ${imageFields} }
    },
    "sharedMap": *[_id == "tripSettings"][0].map { ${imageFields} }
  }
`);

export const GROUP_CLIMBS_QUERY = defineQuery(/* groq */ `
  {
    "page": *[_id == "groupClimbsPage"][0] {
      _id,
      heroEyebrow,
      heroTitle,
      heroDescription,
      heroImage { ${imageFields} },
      benefits[] { _key, iconKey, title, description },
      scheduleEyebrow,
      scheduleTitle,
      emptyStateTitle,
      emptyStateDescription,
      seo {
        title,
        description,
        canonicalPath,
        shareImage { ${imageFields} }
      }
    },
    "departures": *[_type == "groupDeparture" && bookingStatus == "scheduled"] | order(startDate asc) {
      _id,
      routeName,
      durationDays,
      startDate,
      endDate,
      highlights,
      price { amount, currency },
      deposit { amount, currency },
      promotionStatus,
      originalPrice { amount, currency },
      seasonStatus,
      seasonLabel
    }
  }
`);

export const TRIP_SEO_QUERY = defineQuery(/* groq */ `
  *[_type == "trip" && slug.current == $slug][0].seo {
    title,
    description,
    canonicalPath,
    shareImage { ${imageFields} }
  }
`);

export const GROUP_CLIMBS_SEO_QUERY = defineQuery(/* groq */ `
  *[_id == "groupClimbsPage"][0].seo {
    title,
    description,
    canonicalPath,
    shareImage { ${imageFields} }
  }
`);
