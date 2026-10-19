import {createReadStream, existsSync, mkdirSync, writeFileSync} from 'node:fs'
import {createRequire} from 'node:module'
import {basename, dirname, resolve} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

import {source} from '../source-data.mjs'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const repositoryRoot = resolve(scriptDirectory, '../..')
const reportDirectory = resolve(repositoryRoot, 'migration/reports')
const writeMode = process.env.BETHELI_MIGRATION_WRITE === '1'

const stableKey = (value) =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 96)

const isSourceImage = (value) =>
  value &&
  typeof value === 'object' &&
  typeof value.path === 'string' &&
  typeof value.alt === 'string'

const collectImages = (value, results = new Map()) => {
  if (isSourceImage(value)) {
    results.set(value.path, value)
    return results
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectImages(item, results))
    return results
  }
  if (value && typeof value === 'object') {
    Object.values(value).forEach((item) => collectImages(item, results))
  }
  return results
}

const validateSource = () => {
  const errors = []
  const accommodationSlugs = new Set(source.accommodations.map(({slug}) => slug))
  const images = collectImages(source)

  if (accommodationSlugs.size !== source.accommodations.length) {
    errors.push('Accommodation slugs must be unique.')
  }
  if (source.trip.itinerary.length !== source.trip.durationDays) {
    errors.push(
      `Trip duration is ${source.trip.durationDays} days but ${source.trip.itinerary.length} itinerary days were supplied.`,
    )
  }
  const allowedTripCategories = new Set(['safari', 'zanzibar', 'kilimanjaro'])
  if (!source.trip.categories.length) {
    errors.push('The trip must have at least one category.')
  }
  if (new Set(source.trip.categories).size !== source.trip.categories.length) {
    errors.push('Trip categories must be unique.')
  }
  source.trip.categories.forEach((category) => {
    if (!allowedTripCategories.has(category)) {
      errors.push(`Unknown trip category: ${category}.`)
    }
  })
  source.trip.itinerary.forEach((day, dayIndex) => {
    if (!day.accommodationSlugs.length) {
      errors.push(`Itinerary day ${dayIndex + 1} has no accommodation references.`)
    }
    day.accommodationSlugs.forEach((slug) => {
      if (!accommodationSlugs.has(slug)) {
        errors.push(`Itinerary day ${dayIndex + 1} references unknown accommodation ${slug}.`)
      }
    })
  })
  source.groupDepartures.forEach((departure) => {
    if (departure.endDate < departure.startDate) {
      errors.push(`${departure.routeName} ends before it starts.`)
    }
    if (departure.promotionStatus === 'discounted') {
      if (!departure.originalPrice || departure.originalPrice.amount <= departure.price.amount) {
        errors.push(`${departure.routeName} has an invalid original discounted price.`)
      }
    }
    if (departure.seasonStatus === 'rain' && !departure.seasonLabel) {
      errors.push(`${departure.routeName} is missing its rain-season label.`)
    }
  })
  images.forEach(({path, alt}) => {
    const absolutePath = resolve(repositoryRoot, path)
    if (!existsSync(absolutePath)) errors.push(`Missing image: ${path}`)
    if (alt.trim().length < 5) errors.push(`Image alt text is too short: ${path}`)
  })
  for (const [name, seo] of [['trip', source.trip.seo]]) {
    if (seo.title.length < 20 || seo.title.length > 60) {
      errors.push(`${name} SEO title must be between 20 and 60 characters.`)
    }
    if (seo.description.length < 70 || seo.description.length > 160) {
      errors.push(`${name} SEO description must be between 70 and 160 characters.`)
    }
    if (!seo.canonicalPath.startsWith('/')) {
      errors.push(`${name} canonical path must begin with a slash.`)
    }
  }

  return {errors, images}
}

const writeReport = (name, report) => {
  mkdirSync(reportDirectory, {recursive: true})
  const path = resolve(reportDirectory, name)
  writeFileSync(path, `${JSON.stringify(report, null, 2)}\n`)
  return path
}

const {errors, images} = validateSource()
const baseReport = {
  generatedAt: new Date().toISOString(),
  mode: writeMode ? 'production-write' : 'dry-run',
  projectId: 'ife51h63',
  dataset: 'production',
  source: source.inventory,
  counts: {
    tripSettings: 1,
    trips: 1,
    accommodations: source.accommodations.length,
    groupDepartures: source.groupDepartures.length,
    itineraryDays: source.trip.itinerary.length,
    itineraryAccommodationReferences: source.trip.itinerary.reduce(
      (total, day) => total + day.accommodationSlugs.length,
      0,
    ),
    relatedTripCards: source.trip.relatedTrips.length,
    uniqueImages: images.size,
  },
  qualityIssues: errors,
}

if (errors.length) {
  const path = writeReport('dry-run.json', {...baseReport, status: 'failed'})
  console.error(`Migration source validation failed. Report: ${path}`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
} else if (!writeMode) {
  const path = writeReport('dry-run.json', {...baseReport, status: 'ready-for-review'})
  console.log('Dry run passed. No content was written to Sanity.')
  console.log(`Report: ${path}`)
  console.log(JSON.stringify(baseReport.counts, null, 2))
} else {
  const studioRequire = createRequire(resolve(repositoryRoot, 'studio/package.json'))
  const studioSanityCli = studioRequire.resolve('sanity/cli')
  const {getCliClient} = await import(pathToFileURL(studioSanityCli).href)
  const client = getCliClient({apiVersion: '2026-10-16'})
  const uploadedAssets = new Map()
  const documentIds = {
    accommodations: {},
    departures: [],
  }

  for (const [relativePath] of images) {
    const absolutePath = resolve(repositoryRoot, relativePath)
    const asset = await client.assets.upload('image', createReadStream(absolutePath), {
      filename: basename(absolutePath),
    })
    uploadedAssets.set(relativePath, asset._id)
    console.log(`Uploaded ${relativePath}`)
  }

  const contentImage = (value) => ({
    _type: 'contentImage',
    asset: {_type: 'reference', _ref: uploadedAssets.get(value.path)},
    alt: value.alt,
  })
  const money = (value) => ({_type: 'money', ...value})
  const seo = (value) => ({
    _type: 'seo',
    title: value.title,
    description: value.description,
    canonicalPath: value.canonicalPath,
    shareImage: contentImage(value.shareImage),
  })

  const upsertByQuery = async ({query, params, document}) => {
    const existingId = await client.fetch(query, params)
    if (existingId) {
      return client.createOrReplace({...document, _id: existingId})
    }
    return client.create(document)
  }

  await client.createOrReplace({
    _id: 'tripSettings',
    _type: 'tripSettings',
    map: contentImage(source.tripSettings.map),
  })

  for (const accommodation of source.accommodations) {
    const document = {
      _type: 'accommodation',
      propertyName: accommodation.propertyName,
      slug: {_type: 'slug', current: accommodation.slug},
      tier: accommodation.tier,
      style: accommodation.style,
      destinationGroup: accommodation.destinationGroup,
      location: accommodation.location,
      description: accommodation.description,
      coverImage: contentImage(accommodation.coverImage),
      gallery: accommodation.gallery.map((galleryImage, index) => ({
        ...contentImage(galleryImage),
        _key: `${stableKey(accommodation.slug)}-gallery-${index + 1}`,
      })),
    }
    const result = await upsertByQuery({
      query: '*[_type == "accommodation" && slug.current == $slug][0]._id',
      params: {slug: accommodation.slug},
      document,
    })
    documentIds.accommodations[accommodation.slug] = result._id
    console.log(`Upserted accommodation ${accommodation.propertyName}`)
  }

  const trip = source.trip
  const tripDocument = {
    _type: 'trip',
    title: trip.title,
    cardTitle: trip.cardTitle,
    slug: {_type: 'slug', current: trip.slug},
    categories: trip.categories,
    locationLabel: trip.locationLabel,
    durationDays: trip.durationDays,
    startingPrice: money(trip.startingPrice),
    cardImage: contentImage(trip.cardImage),
    heroImage: contentImage(trip.heroImage),
    heroSummary: trip.heroSummary,
    overviewParagraphs: trip.overviewParagraphs,
    overviewImages: trip.overviewImages.map((overviewImage, index) => ({
      _key: `overview-image-${index + 1}`,
      ...contentImage(overviewImage),
    })),
    itineraryFor: trip.itineraryFor,
    travelDatesText: trip.travelDatesText,
    guestsText: trip.guestsText,
    destinations: trip.destinations,
    planningTitle: trip.planningTitle,
    planningDescription: trip.planningDescription,
    itinerary: trip.itinerary.map((day, dayIndex) => ({
      _key: `day-${dayIndex + 1}`,
      _type: 'itineraryDay',
      title: day.title,
      summary: day.summary,
      image: contentImage(day.image),
      experience: day.experience,
      mealPlan: day.mealPlan,
      accommodations: day.accommodationSlugs.map((slug, accommodationIndex) => ({
        _key: `day-${dayIndex + 1}-stay-${accommodationIndex + 1}`,
        _type: 'reference',
        _ref: documentIds.accommodations[slug],
      })),
    })),
    landscapesTitle: trip.landscapesTitle,
    landscapes: trip.landscapes.map((landscape, index) => ({
      _key: `landscape-${index + 1}`,
      _type: 'landscape',
      ...landscape,
      image: contentImage(landscape.image),
    })),
    inclusionsEyebrow: trip.inclusionsEyebrow,
    inclusionsTitle: trip.inclusionsTitle,
    inclusionsDescription: trip.inclusionsDescription,
    inclusionGroups: trip.inclusionGroups.map((group, groupIndex) => ({
      _key: `inclusion-group-${groupIndex + 1}`,
      _type: 'inclusionGroup',
      marker: group.marker,
      title: group.title,
      description: group.description,
      items: group.items.map((item, itemIndex) => ({
        _key: `inclusion-${groupIndex + 1}-${itemIndex + 1}`,
        _type: 'inclusionItem',
        ...item,
      })),
    })),
    relatedTrips: trip.relatedTrips.map((relatedTrip, index) => ({
      _key: `related-trip-${index + 1}`,
      _type: 'relatedTripCard',
      title: relatedTrip.title,
      summary: relatedTrip.summary,
      durationLabel: relatedTrip.durationLabel,
      image: contentImage(relatedTrip.image),
      href: relatedTrip.href,
    })),
    seo: seo(trip.seo),
  }
  const tripResult = await upsertByQuery({
    query: '*[_type == "trip" && slug.current == $slug][0]._id',
    params: {slug: trip.slug},
    document: tripDocument,
  })
  documentIds.trip = tripResult._id
  console.log(`Upserted trip ${trip.title}`)

  for (const departure of source.groupDepartures) {
    const departureDocument = {
      _type: 'groupDeparture',
      routeName: departure.routeName,
      durationDays: departure.durationDays,
      startDate: departure.startDate,
      endDate: departure.endDate,
      highlights: departure.highlights,
      price: money(departure.price),
      deposit: money(departure.deposit),
      bookingStatus: departure.bookingStatus,
      promotionStatus: departure.promotionStatus,
      ...(departure.originalPrice ? {originalPrice: money(departure.originalPrice)} : {}),
      seasonStatus: departure.seasonStatus,
      ...(departure.seasonLabel ? {seasonLabel: departure.seasonLabel} : {}),
    }
    const result = await upsertByQuery({
      query:
        '*[_type == "groupDeparture" && routeName == $routeName && startDate == $startDate][0]._id',
      params: {routeName: departure.routeName, startDate: departure.startDate},
      document: departureDocument,
    })
    documentIds.departures.push(result._id)
    console.log(`Upserted departure ${departure.routeName} (${departure.startDate})`)
  }

  const path = writeReport('import.json', {
    ...baseReport,
    status: 'import-complete-pending-validation',
    documentIds,
  })
  console.log(`Import finished. Report: ${path}`)
}
