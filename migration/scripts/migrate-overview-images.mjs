import {createRequire} from 'node:module'
import {dirname, resolve} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const repositoryRoot = resolve(scriptDirectory, '../..')
const studioRequire = createRequire(resolve(repositoryRoot, 'studio/package.json'))
const studioSanityCli = studioRequire.resolve('sanity/cli')
const {getCliClient} = await import(pathToFileURL(studioSanityCli).href)
const client = getCliClient({apiVersion: '2026-10-19'}).withConfig({perspective: 'raw'})

const trips = await client.fetch(
  '*[_type == "trip" && !defined(overviewImages)]{_id, overviewImage}',
)

if (!trips.length) {
  console.log('All trip documents already use the Overview Images slider field.')
} else {
  let transaction = client.transaction()
  for (const trip of trips) {
    let overviewImages = trip.overviewImage ? [{...trip.overviewImage, _key: 'overview-image-1'}] : null
    if (!overviewImages && trip._id.startsWith('drafts.')) {
      const publishedId = trip._id.replace(/^drafts\./, '')
      overviewImages = await client.fetch(
        '*[_id == $publishedId][0].overviewImages',
        {publishedId},
      )
    }
    if (!overviewImages?.length) {
      console.warn(`Skipped ${trip._id}: no legacy or published overview image was available.`)
      continue
    }
    transaction = transaction.patch(trip._id, {
      set: {
        overviewImages,
      },
    })
  }
  await transaction.commit()
  console.log(`Migrated ${trips.length} trip document(s) to overview image sliders.`)
}
