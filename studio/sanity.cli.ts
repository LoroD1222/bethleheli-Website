import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ife51h63',
    dataset: 'production',
  },
  typegen: {
    enabled: true,
    path: '../src/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../sanity.types.ts',
    overloadClientMethods: true,
  },
  deployment: {
    appId: 'ds8z7422x7ghlg5re8m14v00',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
