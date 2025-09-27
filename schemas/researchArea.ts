import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'researchArea',
  title: 'Research Area',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Short subtitle displayed under the title',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief description for cards and previews',
    }),
    defineField({
      name: 'detailedDescription',
      title: 'Detailed Description',
      type: 'text',
      rows: 6,
      description: 'Full description for the research page',
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'methods',
      title: 'Research Methods',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Key research methods and techniques used',
    }),
    defineField({
      name: 'currentProjects',
      title: 'Current Projects',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Project Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 2},
            {name: 'status', title: 'Status', type: 'string',
             options: {list: ['Planning', 'Active', 'Completed']}},
          ],
        },
      ],
    }),
    defineField({
      name: 'keyFindings',
      title: 'Key Findings',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Major research findings and discoveries',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which research areas appear',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
  },
})