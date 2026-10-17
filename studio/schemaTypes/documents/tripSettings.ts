import {CogIcon} from '@sanity/icons/Cog'
import {defineField, defineType} from 'sanity'

export const tripSettings = defineType({
  name: 'tripSettings',
  title: 'Trip Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'map',
      title: 'Shared Tanzania Map',
      type: 'contentImage',
      description: 'This single map is displayed on every trip itinerary page.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Trip Settings'}
    },
  },
})
