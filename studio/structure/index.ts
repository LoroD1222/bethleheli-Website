import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website Content')
    .items([
      S.listItem().singleton('tripSettings'),
      S.listItem().singleton('groupClimbsPage'),
      S.divider(),
      S.documentTypeListItem('trip').title('Trips'),
      S.documentTypeListItem('accommodation').title('Accommodations'),
      S.documentTypeListItem('groupDeparture').title('Group Departures'),
    ])
