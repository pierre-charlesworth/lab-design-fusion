import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          {title: 'Main/Home Page', value: 'main'},
          {title: 'Research Page', value: 'research'},
          {title: 'People Page', value: 'people'},
        ]
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Hero background image',
    }),
    defineField({
      name: 'tagline',
      title: 'Top Tagline',
      type: 'string',
      description: 'Small text above the main title (e.g., "Science is a statement of discovery.")',
    }),
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'object',
      description: 'Main hero title - for main page, ignore since "The Polissi Laboratory" is fixed',
      fields: [
        {name: 'line1', title: 'First Line', type: 'string'},
        {name: 'line2', title: 'Second Line (optional)', type: 'string'},
        {name: 'line3', title: 'Third Line (optional)', type: 'string'},
      ],
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle/Description',
      type: 'text',
      rows: 4,
      description: 'Main description text below the title',
    }),
    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: [
        {name: 'text', title: 'Button Text', type: 'string'},
        {name: 'link', title: 'Button Link', type: 'string'},
      ],
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        {name: 'text', title: 'Button Text', type: 'string'},
        {name: 'link', title: 'Button Link', type: 'string'},
      ],
    }),
    defineField({
      name: 'showScrollIndicator',
      title: 'Show Scroll Indicator',
      type: 'boolean',
      description: 'Show the animated down arrow',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'page',
      subtitle: 'tagline',
      media: 'backgroundImage',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: `Hero Section - ${title?.charAt(0).toUpperCase() + title?.slice(1)} Page`,
        subtitle: subtitle,
      }
    },
  },
})