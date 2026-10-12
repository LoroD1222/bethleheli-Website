# Betheli Expeditions

Next.js and TypeScript implementation of the supplied Bathiel/Betheli Expeditions Figma website. The public pages are `/`, `/kilimanjaro`, `/kilimanjaro/machame-route`, `/safari`, `/zanzibar`, `/trips`, `/groups`, `/plan-your-trip`, `/contact`, and `/faq`.

## Run locally

```sh
npm install
npm run dev
```

Run `npm run lint`, `npm run typecheck`, and `npm run build` before publishing. Set `NEXT_PUBLIC_SITE_URL` to the final public origin so canonical, Open Graph, sitemap, and structured-data URLs use the correct domain.

## Enquiry forms

Contact and trip-request forms POST to `/api/enquiry`. The route validates required fields and forwards the submitted JSON to the server-side `ENQUIRY_WEBHOOK_URL` environment variable. It reports success only after the webhook returns a successful HTTP response. Without this setting, the forms explicitly report that enquiries cannot be sent. Connect and test a trusted enquiry service before publishing; do not put the webhook URL in `NEXT_PUBLIC_` variables.

Newsletter sign-up is a visual preview because no subscription service was supplied. WhatsApp, phone, verification, booking, and privacy details remain marked as pending where the design marks them as pending. Confirm these details with the company before publication.

The route and pricing copy in the supplied design is reproduced for visual fidelity; all availability, itinerary, departure, and price details must be confirmed with the company before accepting bookings. No payment is taken by this site.
