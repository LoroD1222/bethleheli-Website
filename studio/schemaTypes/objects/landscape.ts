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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'descriptor',
      title: 'Short Descriptor',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'iconKey',
      title: 'Icon Key',
      type: 'string',
      description: 'The matching icon identifier used by the website.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'contentImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
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
