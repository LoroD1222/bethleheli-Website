const image = (path, alt) => ({path: `public/images/${path}`, alt})

const days = [
  {
    title: 'Into the rainforest',
    summary: 'Machame Gate → Machame Camp',
    hikingTime: 'Approximately 7 hours',
    distanceKm: 10.8,
    habitat: 'Montane forest',
    image: image('drive-library/machame-rainforest.webp', 'Trekkers entering the Machame Route rainforest'),
    experience:
      'After registration and a briefing at Machame Gate, enter Kilimanjaro’s humid montane forest. The trail climbs steadily beneath a dense canopy, giving the group time to settle into a comfortable walking rhythm before the first night at Machame Camp.',
  },
  {
    title: 'Climb onto the Shira Plateau',
    summary: 'Machame Camp → Shira 2 Camp',
    hikingTime: 'Approximately 4–6 hours',
    distanceKm: 5.3,
    habitat: 'Heath and moorland',
    image: image('drive-library/machame-hero.webp', 'Trekkers climbing toward the Shira Plateau on the Machame Route'),
    experience:
      'Leave the forest behind as the vegetation opens into heath and moorland. A sustained ascent over rocky ridges leads toward the Shira Plateau, where clear conditions can reveal broad views across the western side of Kilimanjaro.',
  },
  {
    title: 'Acclimatize via Lava Tower',
    summary: 'Shira 2 → Lava Tower → Barranco Camp',
    hikingTime: 'Approximately 6–8 hours',
    distanceKm: 10,
    habitat: 'Alpine desert',
    image: image('drive-library/machame-rocky-alpine-hikers.webp', 'Machame Route trekkers crossing rocky alpine terrain'),
    experience:
      'Trek into the alpine desert toward Lava Tower before descending into the sheltered Barranco Valley. This higher daytime point followed by a lower sleeping camp is an important part of the route’s acclimatization profile.',
  },
  {
    title: 'Cross the Barranco Wall',
    summary: 'Barranco Camp → Karanga Camp',
    hikingTime: 'Approximately 4–5 hours',
    distanceKm: 5,
    habitat: 'Alpine desert',
    image: image('drive-library/machame-barranco.webp', 'Trekkers crossing the Barranco Wall on the Machame Route'),
    experience:
      'Begin with the Barranco Wall, using hands for balance in a few places while guides manage the group through the standard trekking line. Continue across ridges and valleys beneath Kilimanjaro’s southern glaciers toward Karanga Camp.',
  },
  {
    title: 'Prepare at high camp',
    summary: 'Karanga Camp → Barafu Camp',
    hikingTime: 'Approximately 4–5 hours',
    distanceKm: 4,
    habitat: 'Alpine desert',
    image: image('drive-library/machame-camp.webp', 'Machame Route tents at high camp on Kilimanjaro'),
    experience:
      'Climb through sparse alpine desert to Barafu, the high camp used for the summit attempt. On arrival, the mountain team explains the night plan while you organize warm layers, headlamp, water and the equipment needed for the climb.',
  },
  {
    title: 'Summit attempt and descent',
    summary: 'Barafu Camp → Uhuru Peak → Mweka Camp',
    hikingTime: 'Approximately 12–16 hours',
    distanceKm: 17,
    habitat: 'Arctic summit and alpine desert',
    image: image('drive-library/machame-uhuru-peak-betheli-group.webp', 'Betheli Expeditions climbers at Uhuru Peak'),
    experience:
      'Set out in darkness and climb slowly toward Stella Point on the crater rim, then continue toward Uhuru Peak when conditions and wellbeing allow. After the summit attempt, descend past Barafu and continue to the lower, greener Mweka Camp.',
  },
  {
    title: 'Return through the forest',
    summary: 'Mweka Camp → Mweka Gate',
    hikingTime: 'Approximately 3–4 hours',
    distanceKm: 10,
    habitat: 'Montane forest',
    image: image('drive-library/machame-montane-rainforest.webp', 'Trekkers descending through Kilimanjaro montane forest'),
    experience:
      'Complete the descent through heath and rainforest to Mweka Gate. After park formalities and the farewell to the mountain crew, meet the onward transfer for the journey back to Moshi or Arusha.',
  },
]

export const machameTripSource = {
  title: '7-Day Kilimanjaro Machame Route',
  slug: 'machame-route',
  categories: ['kilimanjaro'],
  durationDays: 7,
  trekkingDays: 7,
  routeDistanceKm: 56.7,
  startingPrice: {amount: 2399, currency: 'USD'},
  heroImage: image('drive-library/machame-hero.webp', 'Trekkers on the seven-day Machame Route beneath Mount Kilimanjaro'),
  heroSummary:
    'A seven-day camping climb through rainforest, the Shira Plateau, Lava Tower and Barranco before the summit attempt from Barafu Camp.',
  overviewParagraphs: [
    'The Machame Route is a scenic camping approach on Kilimanjaro’s south-western side. It begins in montane rainforest, climbs onto the Shira Plateau and follows the mountain’s southern circuit through Lava Tower, Barranco and Karanga before reaching Barafu high camp.',
    'Seven trekking days allow a measured progression through changing landscapes and include a climb-high, sleep-lower acclimatization day. The route remains a serious high-altitude challenge that requires preparation, a deliberately slow pace and open communication with your guide.',
  ],
  overviewImages: [
    image('drive-library/machame-giant-groundsel-stream.webp', 'Giant groundsels beside a stream on the Machame Route'),
    image('drive-library/machame-barranco.webp', 'Trekkers crossing the rocky Barranco landscape'),
    image('drive-library/machame-camp-mountain-view.webp', 'Machame Route camp beneath Mount Kilimanjaro'),
  ],
  itineraryFor: 'Seven-day Machame Route climb',
  travelDatesText: 'Private dates and scheduled group departures',
  guestsText: 'Private or group climb',
  destinations: ['Machame Gate', 'Shira Plateau', 'Lava Tower', 'Barranco Camp', 'Karanga Camp', 'Barafu Camp', 'Uhuru Peak', 'Mweka Gate'],
  planningTitle: 'Plan your seven-day Machame Route climb.',
  planningDescription:
    'Share your preferred dates, trekking experience and group size so the local team can confirm availability and prepare your written proposal.',
  itinerary: days.map((entry) => ({
    ...entry,
    dayType: 'trekking',
    mealPlan: 'fullBoard',
    accommodationSlug: 'kilimanjaro-mountain-camps',
  })),
  practicalInformation: [
    {title: 'Route duration', details: 'This package contains seven trekking days from Machame Gate to Mweka Gate. Arrival, hotel and onward travel days are arranged separately.'},
    {title: 'Accommodation', details: 'The Machame Route uses supported mountain camping. The exact tent setup and any hotel nights are confirmed in the written proposal.'},
    {title: 'Altitude and pace', details: 'Altitude affects every climber differently. Walk slowly, drink regularly and report headaches, nausea or unusual fatigue to your guide immediately.'},
    {title: 'Summit night', details: 'The summit attempt is the longest and coldest stage. Reaching Uhuru Peak is never guaranteed, and guides may turn a climber around for safety.'},
  ],
  landscapesTitle: 'Machame Route environments',
  landscapes: [
    {
      name: 'Montane rainforest',
      descriptor: 'Lower mountain',
      iconKey: 'tree',
      image: image('drive-library/machame-rainforest.webp', 'Dense montane rainforest on the Machame Route'),
      description: 'The first and final trekking days pass through humid forest with moss-covered trees, roots and changing trail conditions.',
    },
    {
      name: 'Heath and moorland',
      descriptor: 'Shira Plateau',
      iconKey: 'grass',
      image: image('drive-library/machame-giant-groundsel-stream.webp', 'Moorland vegetation on the Machame Route'),
      description: 'Open moorland, giant groundsels and volcanic ridges replace the forest as the route climbs toward Shira.',
    },
    {
      name: 'Alpine desert',
      descriptor: 'High mountain',
      iconKey: 'mountain',
      image: image('drive-library/machame-rocky-alpine-hikers.webp', 'Rocky alpine desert on Mount Kilimanjaro'),
      description: 'Sparse vegetation, exposed volcanic ground and large temperature changes define the route above the plateau.',
    },
    {
      name: 'Uhuru Peak',
      descriptor: '5,895 metres',
      iconKey: 'mountain',
      image: image('drive-library/machame-uhuru-peak-betheli-group.webp', 'Betheli Expeditions group at Uhuru Peak'),
      description: 'The summit attempt reaches Kilimanjaro’s arctic zone and, when conditions and wellbeing allow, Uhuru Peak.',
    },
  ],
  inclusionsEyebrow: 'YOUR MACHAME CLIMB',
  inclusionsTitle: 'What is included in your climb',
  inclusionsDescription:
    'The core mountain services below are included for the seven-day Machame Route and are confirmed in your written proposal.',
  includedServiceKeys: [
    'personal-trip-planning',
    'pre-trip-briefing',
    'equipment-check',
    'trailhead-transfers',
    'mountain-camping',
    'mountain-guide',
    'assistant-guides',
    'porters',
    'mountain-cook',
    'full-board-meals',
    'drinking-water',
    'park-conservation-fees',
    'camping-hut-fees',
    'rescue-fees',
    'sleeping-mat',
    'mess-dining-tent',
    'safety-equipment',
    'first-aid-kit',
    'local-trip-coordination',
    'government-taxes',
  ],
  notIncluded: [
    'International and domestic flights unless specifically listed in the final proposal.',
    'Tanzania visa fees, travel insurance and personal medical expenses.',
    'Personal climbing clothing, footwear, sleeping bag and other personal equipment.',
    'Pre- or post-climb hotel accommodation unless specifically added to the proposal.',
    'Tips for guides, cooks and porters.',
  ],
  relatedTrips: [
    {
      title: '8-Day Lemosho Route',
      summary: 'Lemosho | Scenic western approach',
      durationLabel: '8 DAYS',
      image: image('drive-library/lemosho-hero.webp', 'Trekkers on the Lemosho Route'),
      href: '/kilimanjaro/lemosho-route',
    },
    {
      title: '6-Day Marangu Route',
      summary: 'Marangu | Mountain huts',
      durationLabel: '6 DAYS',
      image: image('drive-library/marangu-hero.webp', 'Trekkers on the Marangu Route'),
      href: '/trips/marangu-route-hotel-stay',
    },
    {
      title: '9-Day Northern Circuit',
      summary: 'Northern Circuit | Longer and quieter',
      durationLabel: '9 DAYS',
      image: image('drive-library/northern-circuit-hero.webp', 'Trekkers on the Northern Circuit'),
      href: '/trips/northern-circuit-route',
    },
  ],
  seo: {
    title: '7-Day Machame Route Kilimanjaro | Betheli Expeditions',
    description:
      'Explore the complete seven-day Machame Route itinerary with daily hiking time, distance, habitat, mountain camping and summit details.',
    canonicalPath: '/trips/machame-route',
    shareImage: image('drive-library/machame-hero.webp', 'Seven-day Machame Route on Mount Kilimanjaro'),
  },
}
