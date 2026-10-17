import {defineField, defineType} from 'sanity'

export const inclusionItem = defineType({
  name: 'inclusionItem',
  title: 'Inclusion Item',
  type: 'object',
  fields: [
    defineField({
      name: 'iconKey',
      title: 'Icon Key',
      type: 'string',
      description: 'The matching icon identifier used by the website.',
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
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
