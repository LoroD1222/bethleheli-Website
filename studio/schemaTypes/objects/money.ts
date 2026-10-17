import {defineField, defineType} from 'sanity'

export const money = defineType({
  name: 'money',
  title: 'Money',
  type: 'object',
  fields: [
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
      validation: (rule) => rule.required().min(0).precision(2),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'USD',
      options: {
        list: [{title: 'US Dollar', value: 'USD'}],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      amount: 'amount',
      currency: 'currency',
    },
    prepare({amount, currency}) {
      return {
        title: `${currency ?? 'USD'} ${Number(amount ?? 0).toLocaleString('en-US')}`,
      }
    },
  },
})
