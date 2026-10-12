# Betheli Expeditions

Next.js and TypeScript implementation of the supplied Bathiel/Betheli Expeditions Figma website. The public pages are `/`, `/kilimanjaro`, `/kilimanjaro/machame-route`, `/safari`, `/zanzibar`, `/trips`, `/groups`, `/plan-your-trip`, `/contact`, and `/faq`.

## Run locally

```sh
npm install
npm run dev
```

Run `npm run lint`, `npm run typecheck`, and `npm run build` before publishing. Set `NEXT_PUBLIC_SITE_URL` to the final public origin so canonical, Open Graph, sitemap, and structured-data URLs use the correct domain.

## Enquiry forms

Contact and trip-request forms POST to `/api/enquiry`. The route validates required fields and sends them to Web3Forms, reporting success only when Web3Forms confirms delivery. Create a Web3Forms access key for the team's inbox, then set `WEB3FORMS_ACCESS_KEY` in `.env.local` (see `.env.example`) and in your deployment environment. Restart the development server after adding the key. Do not commit the real key or prefix it with `NEXT_PUBLIC_`. Test both forms and confirm receipt at the destination inbox before publishing.

Newsletter sign-up is a visual preview because no subscription service was supplied. WhatsApp, phone, verification, booking, and privacy details remain marked as pending where the design marks them as pending. Confirm these details with the company before publication.

The route and pricing copy in the supplied design is reproduced for visual fidelity; all availability, itinerary, departure, and price details must be confirmed with the company before accepting bookings. No payment is taken by this site.
