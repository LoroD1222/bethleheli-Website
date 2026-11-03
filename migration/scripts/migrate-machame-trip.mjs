import {createReadStream, existsSync, mkdirSync, statSync, writeFileSync} from 'node:fs'
import {createRequire} from 'node:module'
import {basename, dirname, resolve} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

import {machameTripSource} from '../machame-trip-source.mjs'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const repositoryRoot = resolve(scriptDirectory, '../..')
const reportDirectory = resolve(repositoryRoot, 'migration/reports')
const writeMode = process.env.BETHELI_MACHAME_TRIP_WRITE === '1'
const maximumImageBytes = 250_000

const collectImages = (value, images = new Map()) => {
  if (value && typeof value === 'object' && typeof value.path === 'string' && typeof value.alt === 'string') {
    images.set(value.path, value)
    return images
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectImages(item, images))
    return images
  }
  if (value && typeof value === 'object') Object.values(value).forEach((item) => collectImages(item, images))
  return images
}

const images = collectImages(machameTripSource)
const errors = []
if (machameTripSource.itinerary.length !== machameTripSource.durationDays) {
  errors.push('The itinerary length must match durationDays.')
}
if (machameTripSource.itinerary.filter(({dayType}) => dayType === 'trekking').length !== machameTripSource.trekkingDays) {
  errors.push('The trekking-day count must match trekkingDays.')
}
if (machameTripSource.seo.canonicalPath !== '/trips/' + machameTripSource.slug) {
  errors.push('The canonical path must match the trip slug.')
}
for (const [relativePath, image] of images) {
  const absolutePath = resolve(repositoryRoot, relativePath)
  if (!existsSync(absolutePath)) {
    errors.push('Missing image: ' + relativePath)
    continue
  }
  const bytes = statSync(absolutePath).size
  if (bytes >= maximumImageBytes) errors.push('Image must be below 250,000 bytes: ' + relativePath + ' (' + bytes + ' bytes)')
  if (image.alt.trim().length < 5) errors.push('Image alt text is too short: ' + relativePath)
}

mkdirSync(reportDirectory, {recursive: true})
const reportPath = resolve(reportDirectory, writeMode ? 'machame-trip-write.json' : 'machame-trip-dry-run.json')
const baseReport = {
  generatedAt: new Date().toISOString(),
  mode: writeMode ? 'production-write' : 'dry-run',
  projectId: 'ife51h63',
  dataset: 'production',
  scope: 'One published seven-day Machame Route trip document and its referenced image assets.',
  slug: machameTripSource.slug,
  counts: {
    trips: 1,
    itineraryDays: machameTripSource.itinerary.length,
    trekkingDays: machameTripSource.trekkingDays,
    uniqueImages: images.size,
  },
  qualityIssues: errors,
}

if (errors.length) {
  writeFileSync(reportPath, JSON.stringify({...baseReport, status: 'failed'}, null, 2) + '\n')
  console.error('Machame trip migration validation failed. Report: ' + reportPath)
  errors.forEach((error) => console.error('- ' + error))
  process.exitCode = 1
} else if (!writeMode) {
  writeFileSync(reportPath, JSON.stringify({...baseReport, status: 'ready-for-review'}, null, 2) + '\n')
  console.log('Machame trip migration dry run passed. No content was written to Sanity.')
  console.log('Report: ' + reportPath)
  console.log(JSON.stringify(baseReport.counts, null, 2))
} else {
  const studioRequire = createRequire(resolve(repositoryRoot, 'studio/package.json'))
  const studioSanityCli = studioRequire.resolve('sanity/cli')
  const {getCliClient} = await import(pathToFileURL(studioSanityCli).href)
  const client = getCliClient({apiVersion: '2026-11-03'}).withConfig({perspective: 'raw', useCdn: false})

  const accommodationId = await client.fetch(
    '*[_type == "accommodation" && !(_id in path("drafts.**")) && slug.current == $slug][0]._id',
    {slug: 'kilimanjaro-mountain-camps'},
  )
  if (!accommodationId) throw new Error('The published Kilimanjaro Mountain Camps accommodation was not found.')

  const assetIds = new Map()
  for (const [relativePath] of images) {
    const absolutePath = resolve(repositoryRoot, relativePath)
    const filename = basename(absolutePath)
    let assetId = await client.fetch(
      '*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id',
      {filename},
    )
    if (!assetId) {
      const asset = await client.assets.upload('image', createReadStream(absolutePath), {filename})
      assetId = asset._id
      console.log('Uploaded ' + relativePath)
    } else {
      console.log('Reused Sanity asset ' + filename)
    }
    assetIds.set(relativePath, assetId)
  }

  const contentImage = (value) => ({
    _type: 'contentImage',
    asset: {_type: 'reference', _ref: assetIds.get(value.path)},
    alt: value.alt,
  })
  const keyedImages = (entries, prefix) => entries.map((entry, index) => ({
    ...contentImage(entry),
    _key: prefix + '-' + (index + 1),
  }))

  const trip = machameTripSource
  const document = {
    _type: 'trip',
    title: trip.title,
    slug: {_type: 'slug', current: trip.slug},
    categories: trip.categories,
    durationDays: trip.durationDays,
    trekkingDays: trip.trekkingDays,
    routeDistanceKm: trip.routeDistanceKm,
    startingPrice: {_type: 'money', ...trip.startingPrice},
    heroImage: contentImage(trip.heroImage),
    heroSummary: trip.heroSummary,
    overviewParagraphs: trip.overviewParagraphs,
    overviewImages: keyedImages(trip.overviewImages, 'overview-image'),
    itineraryFor: trip.itineraryFor,
    travelDatesText: trip.travelDatesText,
    guestsText: trip.guestsText,
    destinations: trip.destinations,
    planningTitle: trip.planningTitle,
    planningDescription: trip.planningDescription,
    itinerary: trip.itinerary.map((day, index) => ({
      _key: 'day-' + (index + 1),
      _type: 'itineraryDay',
      dayType: day.dayType,
      title: day.title,
      summary: day.summary,
      hikingTime: day.hikingTime,
      distanceKm: day.distanceKm,
      habitat: day.habitat,
      image: contentImage(day.image),
      experience: day.experience,
      mealPlan: day.mealPlan,
      accommodations: [{
        _key: 'day-' + (index + 1) + '-stay-1',
        _type: 'reference',
        _ref: accommodationId,
      }],
    })),
    practicalInformation: trip.practicalInformation.map((item, index) => ({
      _key: 'practical-' + (index + 1),
      _type: 'practicalInfoItem',
      ...item,
    })),
    landscapesTitle: trip.landscapesTitle,
    landscapes: trip.landscapes.map((item, index) => ({
      _key: 'landscape-' + (index + 1),
      _type: 'landscape',
      name: item.name,
      descriptor: item.descriptor,
      iconKey: item.iconKey,
      image: contentImage(item.image),
      description: item.description,
    })),
    inclusionsEyebrow: trip.inclusionsEyebrow,
    inclusionsTitle: trip.inclusionsTitle,
    inclusionsDescription: trip.inclusionsDescription,
    includedServiceKeys: trip.includedServiceKeys,
    notIncluded: trip.notIncluded,
    relatedTrips: trip.relatedTrips.map((item, index) => ({
      _key: 'related-trip-' + (index + 1),
      _type: 'relatedTripCard',
      title: item.title,
      summary: item.summary,
      durationLabel: item.durationLabel,
      image: contentImage(item.image),
      href: item.href,
    })),
    seo: {
      _type: 'seo',
      title: trip.seo.title,
      description: trip.seo.description,
      canonicalPath: trip.seo.canonicalPath,
      shareImage: contentImage(trip.seo.shareImage),
    },
  }

  const existingId = await client.fetch(
    '*[_type == "trip" && slug.current == $slug][0]._id',
    {slug: trip.slug},
  )
  const result = existingId
    ? await client.createOrReplace({...document, _id: existingId})
    : await client.create(document)

  const verification = await client.fetch(
    '*[_id == $id][0] {' +
      '_id, title, "slug": slug.current, durationDays, trekkingDays, routeDistanceKm,' +
      '"itineraryDays": count(itinerary),' +
      '"daysWithFacts": count(itinerary[defined(hikingTime) && defined(distanceKm) && defined(habitat)]),' +
      '"daysWithImages": count(itinerary[defined(image.asset->_id)]),' +
      '"daysWithAccommodation": count(itinerary[count(accommodations[defined(@->_id)]) > 0]),' +
      '"heroImageResolved": defined(heroImage.asset->_id), "canonicalPath": seo.canonicalPath' +
    '}',
    {id: result._id},
  )
  const expectedDays = trip.itinerary.length
  if (
    verification.itineraryDays !== expectedDays ||
    verification.daysWithFacts !== expectedDays ||
    verification.daysWithImages !== expectedDays ||
    verification.daysWithAccommodation !== expectedDays ||
    !verification.heroImageResolved
  ) {
    throw new Error('Incomplete Machame trip after write: ' + JSON.stringify(verification))
  }

  writeFileSync(reportPath, JSON.stringify({
    ...baseReport,
    status: 'published',
    documentId: result._id,
    verification,
  }, null, 2) + '\n')
  console.log('Published Machame trip ' + result._id)
  console.log(JSON.stringify(verification, null, 2))
  console.log('Report: ' + reportPath)
}
