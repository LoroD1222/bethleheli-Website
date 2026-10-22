import {defineField, defineType} from 'sanity'

export const inclusionItem = defineType({
  name: 'inclusionItem',
  title: 'Inclusion Item',
  type: 'object',
  fields: [
    defineField({
      name: 'iconKey',
      title: 'Icon',
      type: 'string',
      description: 'Choose the icon that best represents this included service.',
      options: {
        list: [
          {title: 'Route / Transfers', value: 'route'},
          {title: 'Checklist / Briefing', value: 'clipboard'},
          {title: 'Ticket / Park Fees', value: 'ticket'},
          {title: 'Mountain / Professional Guide', value: 'mountain'},
          {title: 'Backpack / Equipment', value: 'backpack'},
          {title: 'Tent / Accommodation', value: 'tent'},
          {title: 'Cutlery / Meals', value: 'utensils'},
          {title: 'Water Droplets / Drinking Water', value: 'droplets'},
          {title: 'Heart / Care and Support', value: 'heart'},
          {title: 'Message / Coordination', value: 'message'},
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
