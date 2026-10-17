import {defineConfig, defineSingleton} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

const tripSettingsSingleton = defineSingleton({
  id: 'tripSettings',
  title: 'Trip Settings',
  schemaType: 'tripSettings',
  documentId: 'tripSettings',
})

const groupClimbsPageSingleton = defineSingleton({
  id: 'groupClimbsPage',
  title: 'Group Climbs Page',
  schemaType: 'groupClimbsPage',
  documentId: 'groupClimbsPage',
})

export default defineConfig({
  name: 'default',
  title: 'betleheli',

  projectId: 'ife51h63',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  document: {
    singletons: [tripSettingsSingleton, groupClimbsPageSingleton],
  },

  schema: {
    types: schemaTypes,
  },
})
