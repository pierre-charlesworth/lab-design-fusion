import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Lab Contact Information',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headerTitle',
      title: 'Header Title',
      type: 'string',
      description: 'Main contact section title',
      initialValue: 'contact information',
    }),
    defineField({
      name: 'headerSubtitle',
      title: 'Header Subtitle',
      type: 'text',
      rows: 3,
      description: 'Description text under the header',
      initialValue: 'Ready to collaborate or have questions about our research? We\'d love to hear from you.',
    }),
    defineField({
      name: 'labName',
      title: 'Lab Name',
      type: 'string',
      description: 'Laboratory name',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        {name: 'street', title: 'Street Address', type: 'string'},
        {name: 'city', title: 'City', type: 'string'},
        {name: 'postalCode', title: 'Postal Code', type: 'string'},
        {name: 'country', title: 'Country', type: 'string'},
      ],
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'googleMapsEmbed',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'IMPORTANT: Use the embed URL format starting with "https://www.google.com/maps/embed". Do NOT use maps.app.goo.gl or other short URLs. To get the correct URL: 1) Go to Google Maps, 2) Search for your location, 3) Click "Share" button, 4) Click "Embed a map" tab, 5) Copy the src URL from the iframe code.',
      validation: (Rule) => Rule.custom((value) => {
        if (!value) return true; // Allow empty values
        if (typeof value === 'string' && value.startsWith('https://www.google.com/maps/embed')) {
          return true;
        }
        return 'Please use a proper Google Maps embed URL starting with "https://www.google.com/maps/embed". Short URLs like maps.app.goo.gl cannot be embedded due to security restrictions.';
      }),
    }),
    defineField({
      name: 'researchOpportunities',
      title: 'Research Opportunities',
      type: 'object',
      fields: [
        {name: 'title', title: 'Section Title', type: 'string', initialValue: 'Research Opportunities'},
        {name: 'description', title: 'Description', type: 'text', rows: 4},
      ],
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'string',
      description: 'Optional office hours information',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'email',
    },
  },
})