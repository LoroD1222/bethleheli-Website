import {CalendarIcon} from '@sanity/icons/Calendar'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const itineraryDay = defineType({
  name: 'itineraryDay',
  title: 'Itinerary Day',
  type: 'object',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Day Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Experience Image',
      type: 'contentImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'experience',
      title: 'Experience Description',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mealPlan',
      title: 'Meal Plan',
      type: 'string',
      options: {
        list: [
          {title: 'Breakfast', value: 'breakfast'},
          {title: 'Half Board', value: 'halfBoard'},
          {title: 'Full Board', value: 'fullBoard'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'accommodations',
      title: 'Accommodation Choices',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'accommodation'}],
        }),
      ],
      validation: (rule) => rule.required().min(1).unique(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'mealPlan',
      media: 'image',
    },
  },
})
