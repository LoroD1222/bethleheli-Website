# Betheli Sanity Migration

This migration moves the existing published content from the React source files and `public/images` into Sanity project `ife51h63`, dataset `production`.

## Scope

- 1 shared Trip Settings singleton and Tanzania map
- 10 reusable accommodations used by the current itinerary
- 1 complete Northern Serengeti trip with six itinerary days
- 4 existing related Kilimanjaro route cards
- 1 Group Climbs page singleton
- 5 scheduled group departures
- All referenced local images uploaded into Sanity

Seven additional homepage/trips listing cards are not migrated as independent Trip documents because they intentionally redirect to the Northern Serengeti page and have no unique itinerary content. The migration does not invent duplicate itineraries.

## Commands

```bash
npm run sanity:migrate:dry-run
npm run sanity:migrate:write
npm run sanity:migrate:validate
```

The write command is idempotent: ordinary documents are found by slug or departure route/date and retain their real Sanity IDs. The two singletons use their configured singleton IDs. Images are uploaded before documents, accommodations before the trip that references them, and the validation command checks counts, references and image resolution.

## Cutover

After validation passes, connect the trip detail and group-climb frontend routes to typed GROQ queries. Keep the hardcoded content as a temporary fallback until both routes have been checked visually. No redirects are required because the existing public URLs remain unchanged.
