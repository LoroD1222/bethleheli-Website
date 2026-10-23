import { Header } from "@/components/site";
import { HomeFooter } from "@/components/home-footer";

const terms = [
  ["1 — The Booking", [
    "Bookings and subsequent contracts are concluded in Arusha, Tanzania, and interpreted according to the laws of the United Republic of Tanzania. The Company may decline a booking without giving reasons.",
    "Betheli Expeditions (T) Ltd creates tailor-made holidays to suit each client’s needs. A binding contract begins when we receive a deposit of 20% of the quoted price, or full payment when a booking is made less than 45 days before departure. No contract exists until those monies have been received.",
  ]],
  ["2 — Payment Terms", [
    "A deposit of 20% is due once a booking is confirmed. The remaining 80% is due 45 days before arrival in Africa or the safari/program start. A booking confirmed within 45 days of arrival must be paid in full immediately.",
    "Net rates are valid for the stated trip dates, except government park fees and flights, which may change with or without notice. If park fees or taxes change, our rates will increase accordingly. Early booking is recommended so arrangements can be made properly.",
  ]],
  ["3 — Booking Amendments", [
    "Client- or agent-requested amendments to an existing booking—such as dates, air tickets, accommodation or participant numbers—are subject to a USD 50 handling fee per booking, in addition to service-provider fees.",
  ]],
  ["4 — Cancellations and Penalties", [
    "Cancellations must be sent to Betheli Expeditions (T) Ltd in writing and take effect on the date the cancellation notice is received.",
    "A cancellation made 45 days or less before the safari or trip begins is subject to a 100% cancellation charge on the total amount due.",
    "A cancellation made 60 days or more, but fewer than 130 days, is subject to a 50% charge on the total amount due.",
    "For cancellations made 130 days or more before departure, we retain the 20% booking deposit as handling charges.",
    "We may reroute an itinerary or use similar lodges when original arrangements are unavailable. Park fees and airline prices may change without notice; increases beyond our control will be passed on to the client.",
    "Quoted prices are based on the dates shown in the expedition proposal. Changing dates may change the safari or trek price.",
    "The Company may cancel a tour when cancellation is unavoidable. In that case, monies already paid will be refunded. This refund is the Company’s sole responsibility and no additional claim for damages shall arise.",
  ]],
  ["5 — Passports, Visas and Travel Documents", [
    "The client is solely responsible for ensuring that passports, visas, health certificates, proof of vaccination and all other required documents are in order. The Company is not liable for consequences, damages or claims arising when the client has not attended to these matters before the tour.",
  ]],
  ["6 — Luggage", [
    "All baggage and personal effects remain the client’s responsibility. The Company accepts no liability for loss of or damage to personal effects, however caused.",
    "Clients may bring one soft bag or backpack weighing no more than 15 kg, plus a daypack. Hard-shell suitcases are not accepted. The Company may refuse excess baggage. Different rules may apply to trekking tours and domestic flights.",
  ]],
  ["7 — Carriers", [
    "Air and sea carriage is subject to the carrier’s terms and applicable international conventions. Betheli Expeditions (T) Ltd accepts no liability for cancellations, strikes, timetable changes, diversions, unrelated technical issues, lost luggage, rescheduling costs, missed accommodation or delays caused by a carrier’s operational decision.",
    "Betheli Expeditions (T) Ltd accepts no liability for death, injury or illness arising from carriage by air or sea.",
  ]],
  ["8 — Risk and Responsibility", [
    "The client accepts that tours are adventurous and involve personal risk. Neither the Company nor its agents can be held liable for injury, loss of life or damage to property. The client indemnifies the Company, its agents, assigns and servants from such claims and accepts full responsibility for the risks involved.",
  ]],
  ["9 — Authority on Tour", [
    "The decisions of the Company’s guide or driver while on tour are final and binding. The client must comply with the laws, customs and foreign-exchange regulations of every country visited.",
  ]],
  ["10 — Marketing", [
    "Betheli Expeditions (T) Ltd may use photographs and videos taken during tours for marketing or advertising. The client consents to this use and authorizes the Company to retain copyright in such materials.",
  ]],
  ["11 — Force Majeure", [
    "Unforeseen circumstances—including war, mechanical breakdown, weather, riots and other events beyond the Company’s control—may delay or alter a tour. The Company is not liable for these events or consequences arising from them.",
  ]],
  ["12 — Price Changes", [
    "Prices are based on current national park fees and taxes. If Tanzanian authorities increase fees or taxes, including unscheduled increases, those increases will be passed on to the client.",
  ]],
  ["13 — Access", [
    "The Company is not responsible for road or airstrip conditions that make travel impossible. Any resulting itinerary change remains subject to these conditions and applicable rates, regardless of access or weather conditions.",
  ]],
  ["14 — Insurance", [
    "Betheli Expeditions requires each client to purchase adequate travel insurance, including death, medical treatment and evacuation cover, for any loss or damage that may arise.",
  ]],
  ["15 — Child Policy", [
    "We do not accept a booking made by anyone under 18 unless they are accompanied by a parent.",
  ]],
  ["16 — Governing Law", [
    "This contract and all matters arising from it are governed by Tanzanian law. The courts of Tanzania have exclusive jurisdiction over proceedings relating to or arising from the contract.",
  ]],
] as const;

export function TermsPage() {
  return <><Header overlay={false} /><main className="legal-page"><header className="legal-hero"><div className="shell"><p className="eyebrow">PLEASE READ CAREFULLY</p><h1>Booking Terms &amp; Conditions</h1><p>Betheli Expeditions (T) Ltd terms and conditions. We strongly recommend purchasing comprehensive travel insurance before your trip.</p></div></header><div className="shell legal-layout"><aside><strong>Betheli Expeditions (T) Ltd</strong><span>Usa River, Arusha</span><span>P.O. Box 15444</span><span>Arusha, Tanzania, East Africa</span><a href="mailto:info@betheliexpeditions.com">info@betheliexpeditions.com</a><a href="https://betheliexpeditions.com">betheliexpeditions.com</a></aside><article>{terms.map(([title, paragraphs]) => <section key={title}><h2>{title}</h2>{paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}</article></div></main><HomeFooter /></>;
}
