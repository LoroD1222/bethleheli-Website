import {mkdirSync, writeFileSync} from 'node:fs'
import {createRequire} from 'node:module'
import {dirname, resolve} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

import {source} from '../source-data.mjs'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const repositoryRoot = resolve(scriptDirectory, '../..')
const reportDirectory = resolve(repositoryRoot, 'migration/reports')
const studioRequire = createRequire(resolve(repositoryRoot, 'studio/package.json'))
const studioSanityCli = studioRequire.resolve('sanity/cli')
const {getCliClient} = await import(pathToFileURL(studioSanityCli).href)
const client = getCliClient({apiVersion: '2026-10-16'})

const data = await client.fetch(`{
  "tripSettings": *[_id == "tripSettings"][0]{_id, "hasMap": defined(map.asset->_id)},
  "groupClimbsPage": *[_id == "groupClimbsPage"][0]{_id, "benefitCount": count(benefits), "hasHeroImage": defined(heroImage.asset->_id)},
  "trips": *[_type == "trip" && slug.current == $tripSlug]{
    _id,
    title,
    durationDays,
    "itineraryCount": count(itinerary),
    "relatedTripCount": count(relatedTrips),
    "missingAccommodationReferences": count(itinerary[].accommodations[!defined(@->_id)]),
    "missingImages": count([cardImage, heroImage, overviewImage, seo.shareImage][!defined(asset->_id)])
  },
  "accommodations": *[_type == "accommodation" && slug.current in $accommodationSlugs]{
    _id,
    "slug": slug.current,
    "galleryCount": count(gallery),
    "hasCoverImage": defined(coverImage.asset->_id)
  },
  "departures": *[_type == "groupDeparture" && startDate in $departureDates]{
    _id,
    routeName,
    startDate,
    endDate,
    promotionStatus,
    seasonStatus
  }
}`,
  {
    tripSlug: source.trip.slug,
    accommodationSlugs: source.accommodations.map(({slug}) => slug),
    departureDates: source.groupDepartures.map(({startDate}) => startDate),
  },
)

const errors = []
if (!data.tripSettings?.hasMap) errors.push('Trip Settings map is missing or unresolved.')
if (data.groupClimbsPage?.benefitCount !== 3) errors.push('Group Climbs page does not have three benefits.')
if (!data.groupClimbsPage?.hasHeroImage) errors.push('Group Climbs hero image is missing.')
if (data.trips.length !== 1) errors.push(`Expected 1 migrated trip; found ${data.trips.length}.`)
if (data.accommodations.length !== source.accommodations.length) {
  errors.push(
    `Expected ${source.accommodations.length} accommodations; found ${data.accommodations.length}.`,
  )
}
if (data.departures.length !== source.groupDepartures.length) {
  errors.push(`Expected ${source.groupDepartures.length} departures; found ${data.departures.length}.`)
}
for (const trip of data.trips) {
  if (trip.itineraryCount !== trip.durationDays) {
    errors.push(`${trip.title} itinerary count does not match its duration.`)
  }
  if (trip.relatedTripCount !== source.trip.relatedTrips.length) {
    errors.push(`${trip.title} related-trip count is incorrect.`)
  }
  if (trip.missingAccommodationReferences) {
    errors.push(`${trip.title} has ${trip.missingAccommodationReferences} broken accommodation references.`)
  }
  if (trip.missingImages) errors.push(`${trip.title} has ${trip.missingImages} unresolved primary images.`)
}
for (const accommodation of data.accommodations) {
  if (!accommodation.hasCoverImage) errors.push(`${accommodation.slug} has no resolved cover image.`)
  if (accommodation.galleryCount < 1) errors.push(`${accommodation.slug} has an empty gallery.`)
}

const report = {
  generatedAt: new Date().toISOString(),
  projectId: 'ife51h63',
  dataset: 'production',
  status: errors.length ? 'failed' : 'passed',
  counts: {
    trips: data.trips.length,
    accommodations: data.accommodations.length,
    groupDepartures: data.departures.length,
    tripSettings: data.tripSettings ? 1 : 0,
    groupClimbsPages: data.groupClimbsPage ? 1 : 0,
  },
  errors,
  sample: data,
}

mkdirSync(reportDirectory, {recursive: true})
const reportPath = resolve(reportDirectory, 'validation.json')
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`)
console.log(`Validation ${report.status}. Report: ${reportPath}`)
errors.forEach((error) => console.error(`- ${error}`))
if (errors.length) process.exitCode = 1
