import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'principalInvestigator',
  title: 'Principal Investigator',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      description: 'e.g., Principal Investigator & Laboratory Director',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'institution',
      title: 'Institution',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'researchExpertise',
      title: 'Research Expertise',
      type: 'text',
      rows: 4,
      description: 'Description of research focus and expertise areas',
    }),
    defineField({
      name: 'education',
      title: 'Education & Career',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'degree',
              title: 'Degree/Position',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'institution',
              title: 'Institution',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'period',
              title: 'Time Period',
              type: 'string',
              description: 'e.g., 2010-Present, or just year for degrees',
            },
          ],
          preview: {
            select: {
              title: 'degree',
              subtitle: 'institution',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'honors',
      title: 'Selected Honors & Awards',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of awards, honors, and recognitions',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'address',
      title: 'Office Address',
      type: 'object',
      fields: [
        {
          name: 'street',
          title: 'Street Address',
          type: 'string',
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
        },
        {
          name: 'postalCode',
          title: 'Postal Code',
          type: 'string',
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'string',
      description: 'When available for meetings',
    }),
    defineField({
      name: 'showPublications',
      title: 'Show Publications',
      type: 'boolean',
      description: 'Display publication list on PI profile',
      initialValue: true,
    }),
    defineField({
      name: 'publicationSettings',
      title: 'Publication Display Settings',
      type: 'object',
      hidden: ({parent}) => parent?.showPublications !== true,
      fields: [
        {
          name: 'maxPublications',
          title: 'Max Publications to Show',
          type: 'number',
          description: 'Maximum number of publications to display (0 = show all)',
          initialValue: 10,
          validation: (Rule) => Rule.min(0),
        },
        {
          name: 'yearsLimit',
          title: 'Years to Include',
          type: 'number',
          description: 'Only show publications from last X years (0 = all years)',
          initialValue: 0,
          validation: (Rule) => Rule.min(0),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
    },
  },
})