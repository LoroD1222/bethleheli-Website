import {HomeIcon} from '@sanity/icons/Home'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const accommodation = defineType({
  name: 'accommodation',
  title: 'Accommodation',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'propertyName',
      title: 'Property Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'propertyName', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tier',
      title: 'Accommodation Tier',
      type: 'string',
      options: {
        list: [
          {title: 'Budget', value: 'budget'},
          {title: 'Mid-range', value: 'midRange'},
          {title: 'Luxury', value: 'luxury'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'style',
      title: 'Property Style',
      type: 'string',
      options: {
        list: [
          {title: 'Safari Camp', value: 'safariCamp'},
          {title: 'Tented Suite', value: 'tentedSuite'},
          {title: 'Forest Lodge', value: 'forestLodge'},
          {title: 'Garden Lodge', value: 'gardenLodge'},
          {title: 'Hotel', value: 'hotel'},
          {title: 'Resort', value: 'resort'},
          {title: 'Villa', value: 'villa'},
          {title: 'Private Suite', value: 'privateSuite'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'destinationGroup',
      title: 'Destination Group',
      type: 'string',
      options: {
        list: [
          {title: 'Safari / Mainland', value: 'safariMainland'},
          {title: 'Zanzibar', value: 'zanzibar'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'contentImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      description: 'Images rotate automatically and can also be changed with the slider controls.',
      of: [defineArrayMember({type: 'contentImage'})],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'propertyName',
      tier: 'tier',
      location: 'location',
      media: 'coverImage',
    },
    prepare({title, tier, location, media}) {
      const tierLabels: Record<string, string> = {
        budget: 'Budget',
        midRange: 'Mid-range',
        luxury: 'Luxury',
      }

      return {
        title,
        subtitle: [tierLabels[tier] ?? tier, location].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
