import {defineArrayMember, defineField, defineType} from 'sanity'

export const inclusionGroup = defineType({
  name: 'inclusionGroup',
  title: 'Inclusion Group',
  type: 'object',
  fields: [
    defineField({
      name: 'marker',
      title: 'Marker',
      type: 'string',
      description: 'For example 01 / PREPARATION.',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'items',
      title: 'Included Services',
      type: 'array',
      of: [defineArrayMember({type: 'inclusionItem'})],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'marker',
    },
  },
})
