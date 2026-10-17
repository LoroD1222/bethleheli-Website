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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Included Services',
      type: 'array',
      of: [defineArrayMember({type: 'inclusionItem'})],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'marker',
    },
  },
})
