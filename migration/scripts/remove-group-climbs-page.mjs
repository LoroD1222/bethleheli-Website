import {createRequire} from 'node:module'
import {dirname, resolve} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const repositoryRoot = resolve(scriptDirectory, '../..')
const studioRequire = createRequire(resolve(repositoryRoot, 'studio/package.json'))
const studioSanityCli = studioRequire.resolve('sanity/cli')
const {getCliClient} = await import(pathToFileURL(studioSanityCli).href)
const client = getCliClient({apiVersion: '2026-10-19'})

await client
  .transaction()
  .delete('groupClimbsPage')
  .delete('drafts.groupClimbsPage')
  .commit()

console.log('Removed the Group Climbs Page singleton from Sanity.')
