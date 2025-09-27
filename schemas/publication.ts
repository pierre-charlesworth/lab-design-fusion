import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorList',
      title: 'Author List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Author Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Team Member', value: 'teamMember'},
                  {title: 'Principal Investigator', value: 'principalInvestigator'},
                  {title: 'External Collaborator', value: 'external'},
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'teamMember',
              title: 'Team Member',
              type: 'reference',
              to: [{type: 'teamMember'}],
              hidden: ({parent}) => parent?.type !== 'teamMember',
              validation: (Rule) => Rule.custom((teamMember, context) => {
                const parent = context.parent as any;
                if (parent?.type === 'teamMember' && !teamMember) {
                  return 'Team member selection is required';
                }
                return true;
              }),
            },
            {
              name: 'principalInvestigator',
              title: 'Principal Investigator',
              type: 'reference',
              to: [{type: 'principalInvestigator'}],
              hidden: ({parent}) => parent?.type !== 'principalInvestigator',
              validation: (Rule) => Rule.custom((principalInvestigator, context) => {
                const parent = context.parent as any;
                if (parent?.type === 'principalInvestigator' && !principalInvestigator) {
                  return 'Principal investigator selection is required';
                }
                return true;
              }),
            },
            {
              name: 'externalName',
              title: 'External Author Name',
              type: 'string',
              placeholder: 'e.g., Johnson M, Harvard University',
              hidden: ({parent}) => parent?.type !== 'external',
              validation: (Rule) => Rule.custom((externalName, context) => {
                const parent = context.parent as any;
                if (parent?.type === 'external' && !externalName) {
                  return 'External author name is required';
                }
                return true;
              }),
            },
            {
              name: 'isCorresponding',
              title: 'Corresponding Author',
              type: 'boolean',
              description: 'Mark as corresponding author',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              type: 'type',
              teamMember: 'teamMember.name',
              teamMemberActive: 'teamMember.isActive',
              principalInvestigator: 'principalInvestigator.name',
              externalName: 'externalName',
              isCorresponding: 'isCorresponding',
            },
            prepare(selection) {
              const {type, teamMember, teamMemberActive, principalInvestigator, externalName, isCorresponding} = selection;
              const name = type === 'teamMember' ? teamMember
                         : type === 'principalInvestigator' ? principalInvestigator
                         : externalName;
              const title = name || 'Unnamed author';
              const statusIndicator = type === 'teamMember'
                ? (teamMemberActive === false ? ' (Inactive)' : ' (Active)')
                : '';
              const subtitle = `${type === 'teamMember' ? 'Team Member'
                               : type === 'principalInvestigator' ? 'Principal Investigator'
                               : 'External'}${statusIndicator}${isCorresponding ? ' (Corresponding)' : ''}`;
              return {
                title,
                subtitle,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('At least one author is required'),
    }),
    defineField({
      name: 'authors',
      title: 'Authors (Display Override)',
      type: 'string',
      description: 'Optional: Override the auto-generated author list for complex formatting',
    }),
    defineField({
      name: 'journal',
      title: 'Journal',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Publication Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(1900).max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: 'area',
      title: 'Research Area',
      type: 'string',
      options: {
        list: [
          {title: 'LPS Biogenesis', value: 'lps'},
          {title: 'Peptidoglycan Biosynthesis', value: 'peptidoglycan'},
          {title: 'Natural Product Screening', value: 'screening'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'doi',
      title: 'DOI',
      type: 'string',
      description: 'Digital Object Identifier (without https://doi.org/)',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Publication',
      type: 'boolean',
      description: 'Show this publication prominently',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'journal',
      year: 'year',
    },
    prepare(selection) {
      const {title, subtitle, year} = selection
      return {
        title,
        subtitle: `${subtitle} (${year})`,
      }
    },
  },
  orderings: [
    {
      title: 'Publication Year, Newest',
      name: 'yearDesc',
      by: [{field: 'year', direction: 'desc'}],
    },
    {
      title: 'Publication Year, Oldest',
      name: 'yearAsc',
      by: [{field: 'year', direction: 'asc'}],
    },
  ],
})