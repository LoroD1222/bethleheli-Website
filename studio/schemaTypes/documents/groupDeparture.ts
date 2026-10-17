import {CalendarIcon} from '@sanity/icons/Calendar'
import {defineArrayMember, defineField, defineType} from 'sanity'

type ParentValues = {
  price?: {amount?: number}
  promotionStatus?: string
  seasonStatus?: string
  startDate?: string
}

export const groupDeparture = defineType({
  name: 'groupDeparture',
  title: 'Group Departure',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    {name: 'departure', title: 'Departure', default: true},
    {name: 'pricing', title: 'Pricing'},
    {name: 'status', title: 'Status'},
  ],
  fields: [
    defineField({
      name: 'routeName',
      title: 'Route Name',
      type: 'string',
      group: 'departure',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'durationDays',
      title: 'Duration in Days',
      type: 'number',
      group: 'departure',
      validation: (rule) => rule.required().integer().min(1).max(30),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      group: 'departure',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      group: 'departure',
      validation: (rule) =>
        rule.required().custom((endDate, context) => {
          const {startDate} = (context.parent ?? {}) as ParentValues
          if (startDate && endDate && endDate < startDate) {
            return 'End date must be on or after the start date.'
          }
          return true
        }),
    }),
    defineField({
      name: 'highlights',
      title: 'Departure Highlights',
      type: 'array',
      group: 'departure',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: 'price',
      title: 'Price Per Person',
      type: 'money',
      group: 'pricing',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'deposit',
      title: 'Deposit',
      type: 'money',
      group: 'pricing',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'promotionStatus',
      title: 'Promotion Status',
      type: 'string',
      group: 'pricing',
      initialValue: 'standard',
      options: {
        list: [
          {title: 'Standard Price', value: 'standard'},
          {title: 'Discounted Price', value: 'discounted'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'originalPrice',
      title: 'Original Price',
      type: 'money',
      group: 'pricing',
      hidden: ({parent}) => (parent as ParentValues | undefined)?.promotionStatus !== 'discounted',
      validation: (rule) =>
        rule.custom((originalPrice, context) => {
          const parent = (context.parent ?? {}) as ParentValues
          if (parent.promotionStatus !== 'discounted') return true
          if (!originalPrice) return 'Original price is required for a discounted departure.'

          const originalAmount = (originalPrice as {amount?: number}).amount
          const currentAmount = parent.price?.amount
          if (originalAmount === undefined) return 'Enter the original price amount.'
          if (currentAmount !== undefined && originalAmount <= currentAmount) {
            return 'Original price must be higher than the current price.'
          }
          return true
        }),
    }),
    defineField({
      name: 'bookingStatus',
      title: 'Booking Status',
      type: 'string',
      group: 'status',
      initialValue: 'scheduled',
      options: {
        list: [
          {title: 'Scheduled', value: 'scheduled'},
          {title: 'Full', value: 'full'},
          {title: 'Cancelled', value: 'cancelled'},
          {title: 'Completed', value: 'completed'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seasonStatus',
      title: 'Season Status',
      type: 'string',
      group: 'status',
      initialValue: 'standard',
      options: {
        list: [
          {title: 'Standard Season', value: 'standard'},
          {title: 'Rain Season', value: 'rain'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seasonLabel',
      title: 'Season Label',
      type: 'string',
      group: 'status',
      hidden: ({parent}) => (parent as ParentValues | undefined)?.seasonStatus !== 'rain',
      validation: (rule) =>
        rule.custom((seasonLabel, context) => {
          const {seasonStatus} = (context.parent ?? {}) as ParentValues
          if (seasonStatus === 'rain' && !seasonLabel) {
            return 'Season label is required for a rain-season departure.'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: 'routeName',
      startDate: 'startDate',
      endDate: 'endDate',
      amount: 'price.amount',
      currency: 'price.currency',
    },
    prepare({title, startDate, endDate, amount, currency}) {
      const dateRange = [startDate, endDate].filter(Boolean).join(' → ')
      const price = amount === undefined ? '' : `${currency ?? 'USD'} ${amount}`
      return {
        title,
        subtitle: [dateRange, price].filter(Boolean).join(' · '),
      }
    },
  },
})
