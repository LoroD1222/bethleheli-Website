import {ImageIcon} from '@sanity/icons/Image'
import {defineField, defineType} from 'sanity'

export const contentImage = defineType({
  name: 'contentImage',
  title: 'Content Image',
  type: 'image',
  icon: ImageIcon,
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Describe the image for visitors who cannot see it.',
      validation: (rule) => rule.min(5).max(180),
    }),
  ],
})
