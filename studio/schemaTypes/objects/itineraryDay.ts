import {CalendarIcon} from '@sanity/icons/Calendar'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const itineraryDay = defineType({
  name: 'itineraryDay',
  title: 'Itinerary Day',
  type: 'object',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'dayType',
      title: 'Day Type',
      type: 'string',
      description:
        'For Kilimanjaro trips, only days marked Trekking day count toward the public trip duration.',
      options: {
        list: [
          {title: 'Trekking day', value: 'trekking'},
          {title: 'Arrival / pre-climb day', value: 'arrival'},
          {title: 'Recovery / departure day', value: 'departure'},
          {title: 'Other trip day', value: 'other'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'title',
      title: 'Day Title',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Route / Summary',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'hikingTime',
      title: 'Hiking Time',
      type: 'string',
      description: 'Approximate walking time for this day, for example “Approximately 7 hours”.',
    }),
    defineField({
      name: 'distanceKm',
      title: 'Distance (km)',
      type: 'number',
      description: 'Approximate trail distance for this day in kilometres.',
      validation: (rule) => rule.min(0).max(50),
    }),
    defineField({
      name: 'habitat',
      title: 'Habitat',
      type: 'string',
      description: 'Primary ecological zone or terrain for this day.',
    }),
    defineField({
      name: 'image',
      title: 'Experience Image',
      type: 'contentImage',
    }),
    defineField({
      name: 'experience',
      title: 'Experience Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'mealPlan',
      title: 'Meal Plan',
      type: 'string',
      options: {
        list: [
          {title: 'Breakfast', value: 'breakfast'},
          {title: 'Lunch', value: 'lunch'},
          {title: 'Breakfast and lunch', value: 'breakfastLunch'},
          {title: 'Lunch and dinner', value: 'lunchDinner'},
          {title: 'Half Board', value: 'halfBoard'},
          {title: 'Full Board', value: 'fullBoard'},
        ],
        layout: 'radio',
      },
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
      validation: (rule) => rule.unique(),
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
