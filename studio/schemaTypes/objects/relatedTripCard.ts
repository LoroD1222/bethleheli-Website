import {LinkIcon} from '@sanity/icons/Link'
import {defineField, defineType} from 'sanity'

export const relatedTripCard = defineType({
  name: 'relatedTripCard',
  title: 'Related Trip Card',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Route and Difficulty',
      type: 'string',
    }),
    defineField({
      name: 'durationLabel',
      title: 'Duration Label',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'contentImage',
    }),
    defineField({
      name: 'href',
      title: 'Destination Path',
      type: 'string',
      description: 'An existing website path beginning with a slash.',
      validation: (rule) =>
        rule.custom((value) =>
          !value || value.startsWith('/') ? true : 'Destination path must begin with /',
        ),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'summary',
      media: 'image',
    },
  },
})
