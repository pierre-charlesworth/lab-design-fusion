import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'researchFocus',
      title: 'Research Focus',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'expertise',
      title: 'Expertise Areas',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'publications',
      title: 'Publications Count',
      type: 'string',
      description: 'e.g., "45+ peer-reviewed publications"',
    }),
    defineField({
      name: 'currentProjects',
      title: 'Current Projects',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'isActive',
      title: 'Active Team Member',
      type: 'boolean',
      description: 'Show this member on the team page. Inactive members remain available as publication authors.',
      initialValue: true,
    }),
    defineField({
      name: 'showPublications',
      title: 'Show Publications',
      type: 'boolean',
      description: 'Display publication list on team member profile',
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
          initialValue: 5,
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
      subtitle: 'position',
      media: 'image',
    },
  },
})