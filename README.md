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

Newsletter sign-up is a visual preview because no subscription service was supplied. WhatsApp links open a prefilled chat at +255 692 796 412 by default. To override the destination or message, set `NEXT_PUBLIC_WHATSAPP_NUMBER` and `NEXT_PUBLIC_WHATSAPP_MESSAGE` in the deployment environment and redeploy. Verification, booking, and privacy details still need company confirmation.

The route and pricing copy in the supplied design is reproduced for visual fidelity; all availability, itinerary, departure, and price details must be confirmed with the company before accepting bookings. No payment is taken by this site.
