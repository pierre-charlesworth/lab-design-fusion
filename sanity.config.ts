import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Polissi Lab',

  projectId: 'fe6bomwn',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Main')
              .child(
                S.list()
                  .title('Main Content')
                  .items([
                    S.listItem()
                      .title('Hero Section')
                      .child(
                        S.documentTypeList('heroSection')
                          .title('Hero Section')
                          .filter('page == "main"')
                      ),
                    S.documentTypeListItem('contactInfo').title('Contact Information'),
                  ])
              ),

            S.divider(),

            S.listItem()
              .title('Research')
              .child(
                S.list()
                  .title('Research Content')
                  .items([
                    S.listItem()
                      .title('Hero Section')
                      .child(
                        S.documentTypeList('heroSection')
                          .title('Hero Section')
                          .filter('page == "research"')
                      ),
                    S.documentTypeListItem('researchArea').title('Research Areas'),
                    S.documentTypeListItem('publication').title('Publications'),
                  ])
              ),

            S.divider(),

            S.listItem()
              .title('People')
              .child(
                S.list()
                  .title('People Content')
                  .items([
                    S.listItem()
                      .title('Hero Section')
                      .child(
                        S.documentTypeList('heroSection')
                          .title('Hero Section')
                          .filter('page == "people"')
                      ),
                    S.documentTypeListItem('principalInvestigator').title('Principal Investigator'),
                    S.documentTypeListItem('teamMember').title('Team Members'),
                  ])
              ),
          ])
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})