import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      validation: (rule) => rule.required().min(20).max(60),
    }),
    defineField({
      name: 'description',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().min(70).max(160),
    }),
    defineField({
      name: 'canonicalPath',
      title: 'Canonical Path',
      type: 'string',
      description: 'A site path beginning with a slash, for example /trips/northern-serengeti.',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value?.startsWith('/')) return 'Canonical path must begin with /'
          if (value.length > 1 && value.endsWith('/')) return 'Do not include a trailing slash'
          return true
        }),
    }),
    defineField({
      name: 'shareImage',
      title: 'Social Sharing Image',
      type: 'contentImage',
      validation: (rule) => rule.required(),
    }),
  ],
})
