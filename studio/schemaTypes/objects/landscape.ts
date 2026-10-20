import {ImageIcon} from '@sanity/icons/Image'
import {defineField, defineType} from 'sanity'

export const landscape = defineType({
  name: 'landscape',
  title: 'Landscape',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'descriptor',
      title: 'Short Descriptor',
      type: 'string',
    }),
    defineField({
      name: 'iconKey',
      title: 'Icon Key',
      type: 'string',
      description: 'The matching icon identifier used by the website.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'contentImage',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'descriptor',
      media: 'image',
    },
  },
})
