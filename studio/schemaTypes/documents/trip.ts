import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const trip = defineType({
  name: 'trip',
  title: 'Trip',
  type: 'document',
  icon: EarthGlobeIcon,
  groups: [
    {name: 'listing', title: 'Trip Card', default: true},
    {name: 'hero', title: 'Hero'},
    {name: 'overview', title: 'Overview'},
    {name: 'itinerary', title: 'Itinerary'},
    {name: 'landscapes', title: 'Landscapes'},
    {name: 'inclusions', title: 'Inclusions'},
    {name: 'relationships', title: 'Related Trips'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Trip Title',
      type: 'string',
      group: 'listing',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cardTitle',
      title: 'Trip Card Title',
      type: 'string',
      group: 'listing',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'listing',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'listing',
      description: 'Select every category this itinerary belongs to.',
      of: [defineArrayMember({type: 'string'})],
      options: {
        list: [
          {title: 'Safari', value: 'safari'},
          {title: 'Zanzibar', value: 'zanzibar'},
          {title: 'Kilimanjaro', value: 'kilimanjaro'},
        ],
        layout: 'grid',
      },
      validation: (rule) => rule.required().min(1).max(3).unique(),
    }),
    defineField({
      name: 'category',
      title: 'Legacy Category',
      type: 'string',
      group: 'listing',
      hidden: true,
      readOnly: true,
      deprecated: {reason: 'Replaced by the multi-select Categories field.'},
    }),
    defineField({
      name: 'locationLabel',
      title: 'Card Location Label',
      type: 'string',
      group: 'listing',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'durationDays',
      title: 'Duration in Days',
      type: 'number',
      group: 'listing',
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: 'startingPrice',
      title: 'Starting Price Per Person',
      type: 'money',
      group: 'listing',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cardImage',
      title: 'Trip Card Image',
      type: 'contentImage',
      group: 'listing',
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
      name: 'heroSummary',
      title: 'Hero Summary',
      type: 'text',
      rows: 3,
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overviewParagraphs',
      title: 'Overview Paragraphs',
      type: 'array',
      group: 'overview',
      of: [defineArrayMember({type: 'text', rows: 4})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'overviewImage',
      title: 'Overview Image',
      type: 'contentImage',
      group: 'overview',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'itineraryFor',
      title: 'Itinerary For',
      type: 'string',
      group: 'overview',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'travelDatesText',
      title: 'Travel Dates Text',
      type: 'string',
      group: 'overview',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'guestsText',
      title: 'Guests Text',
      type: 'string',
      group: 'overview',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'destinations',
      title: 'Destinations Included',
      type: 'array',
      group: 'itinerary',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: 'planningTitle',
      title: 'Planning Panel Title',
      type: 'string',
      group: 'itinerary',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'planningDescription',
      title: 'Planning Panel Description',
      type: 'text',
      rows: 3,
      group: 'itinerary',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'itinerary',
      title: 'Daily Itinerary',
      type: 'array',
      group: 'itinerary',
      of: [defineArrayMember({type: 'itineraryDay'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'landscapesTitle',
      title: 'Landscapes Section Title',
      type: 'string',
      group: 'landscapes',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'landscapes',
      title: 'Landscapes',
      type: 'array',
      group: 'landscapes',
      of: [defineArrayMember({type: 'landscape'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'inclusionsEyebrow',
      title: 'Inclusions Eyebrow',
      type: 'string',
      group: 'inclusions',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'inclusionsTitle',
      title: 'Inclusions Title',
      type: 'string',
      group: 'inclusions',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'inclusionsDescription',
      title: 'Inclusions Description',
      type: 'text',
      rows: 3,
      group: 'inclusions',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'inclusionGroups',
      title: 'Inclusion Groups',
      type: 'array',
      group: 'inclusions',
      of: [defineArrayMember({type: 'inclusionGroup'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'relatedTrips',
      title: 'Related Trips',
      type: 'array',
      group: 'relationships',
      description: 'Cards linking to existing trip or Kilimanjaro route pages.',
      of: [defineArrayMember({type: 'relatedTripCard'})],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
      validation: (rule) => rule.required(),
    }),
  ],
  validation: (rule) =>
    rule.custom((document) => {
      const durationDays = document?.durationDays as number | undefined
      const itinerary = document?.itinerary as unknown[] | undefined

      if (durationDays && itinerary && itinerary.length !== durationDays) {
        return `Daily itinerary must contain exactly ${durationDays} days.`
      }

      return true
    }),
  preview: {
    select: {
      title: 'title',
      categories: 'categories',
      durationDays: 'durationDays',
      media: 'cardImage',
    },
    prepare({title, categories, durationDays, media}) {
      const categoryLabel = Array.isArray(categories)
        ? categories
            .map((category) => category.charAt(0).toUpperCase() + category.slice(1))
            .join(', ')
        : ''
      return {
        title,
        subtitle: [categoryLabel, durationDays ? `${durationDays} days` : null]
          .filter(Boolean)
          .join(' · '),
        media,
      }
    },
  },
})
