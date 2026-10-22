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
      title: 'Landscape Icon',
      type: 'string',
      description: 'Choose the symbol shown beside this landscape on the website.',
      options: {
        list: [
          {title: '🌳 Forest / Trees', value: 'tree'},
          {title: '⛰️ Mountain / Highlands', value: 'mountain'},
          {title: '🦓 Wildlife / Safari', value: 'zebra'},
          {title: '🌾 Grassland / Plains', value: 'grass'},
          {title: '🌊 Water / Coast', value: 'water'},
        ],
        layout: 'radio',
      },
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
