import {UsersIcon} from '@sanity/icons/Users'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const groupClimbsPage = defineType({
  name: 'groupClimbsPage',
  title: 'Group Climbs Page',
  type: 'document',
  icon: UsersIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'schedule', title: 'Schedule'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 4,
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'contentImage',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'benefits',
      title: 'Hero Benefits',
      type: 'array',
      group: 'hero',
      of: [defineArrayMember({type: 'benefit'})],
      validation: (rule) => rule.required().length(3),
    }),
    defineField({
      name: 'scheduleEyebrow',
      title: 'Schedule Eyebrow',
      type: 'string',
      group: 'schedule',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'scheduleTitle',
      title: 'Schedule Title',
      type: 'string',
      group: 'schedule',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'emptyStateTitle',
      title: 'No Departures Title',
      type: 'string',
      group: 'schedule',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'emptyStateDescription',
      title: 'No Departures Description',
      type: 'text',
      rows: 3,
      group: 'schedule',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Group Climbs Page'}
    },
  },
})
