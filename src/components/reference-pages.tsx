"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HomeFooter } from "@/components/home-footer";
import { whatsappHref } from "@/lib/whatsapp";
import {
  Accordion,
  ArrowIcon,
  CtaBanner,
  Footer,
  faqAnswers,
  faqCategories,
  Header,
  Photo,
  PrimaryLink,
  RatingStars,
  Testimonials,
  TripadvisorLogo,
} from "@/components/site";

type Card = { title: string; copy: string; note?: string; image: string; href?: string };
const image = (name: string) => `/images/${name}`;

function ReferenceHero({
  imageSrc, eyebrow, title, lead, copy, action, actionHref = "/plan-your-trip", secondAction, secondActionHref = "#explore", active, navVariant = "destinations", trustItems, routeFacts, heroClass = "",
}: {
  imageSrc: string; eyebrow: string; title: string; lead?: string; copy: string;
  action: string; actionHref?: string; secondAction: string; secondActionHref?: string; active: string; navVariant?: "classic" | "destinations";
  trustItems?: string[]; routeFacts?: string[]; heroClass?: string;
}) {
  return <section className={`ref-hero ${heroClass}`}>
    <Photo src={imageSrc} alt="" priority className="ref-hero-image" sizes="100vw" />
    <div className="ref-hero-scrim" />
    <Header active={active} variant={navVariant} />
    <div className="shell ref-hero-body">
      <p className="eyebrow light">{eyebrow}</p>
      <h1>{title}</h1>
      {lead && <p className="ref-hero-lead">{lead}</p>}
      <p>{copy}</p>
      <div className="ref-actions"><PrimaryLink href={actionHref}>{action}</PrimaryLink><Link className="ghost-button" href={secondActionHref}>{secondAction}<span className="arrow">↗</span></Link></div>
    </div>
    {routeFacts ? <div className="shell ref-hero-route-facts">{routeFacts.map((fact, index) => <span key={fact}><b aria-hidden="true">{["▣", "△", "▧", "◇"][index]}</b>{fact}</span>)}</div> :
      <div className="shell ref-hero-trust"><div className="ref-hero-rating"><TripadvisorLogo light compact /><small>5.0 {heroClass === "ref-hero-zanzibar" ? <span className="ref-zanzibar-hero-stars" role="img" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, i) => <span key={i}><Image src={image("figma-zanzibar-hero-star.svg")} alt="" width={16.6309} height={15.915} /></span>)}</span> : <RatingStars size={14} />}</small></div>{(trustItems || ["Local Tanzanian team", "Personal trip planning", "Your journey, your pace"]).map(item => <span key={item}><b aria-hidden="true">✓</b>{item}</span>)}<span className="sr-only">Current section: {active}</span></div>}
  </section>;
}

function Intro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="ref-intro"><span>{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

function PlaceGrid({ eyebrow, title, copy, cards, id = "explore", variant }: { eyebrow: string; title: string; copy: string; cards: Card[]; id?: string; variant?: "kilimanjaro" }) {
  return <section className="ref-section ref-places" id={id}><div className="shell"><Intro eyebrow={eyebrow} title={title} copy={copy} />
    <div className={`ref-place-grid ${variant === "kilimanjaro" ? "ref-route-grid" : ""}`}>{cards.map((card, index) => <article className="ref-place" key={card.title}>
      <Photo src={card.image} alt={card.title} /><div className="ref-place-copy"><h3>{card.title}</h3>{variant === "kilimanjaro" && <div className="ref-route-tags"><span>{card.note}</span><span>{index === 0 ? "Hard" : index === 5 ? "Very hard" : "Moderate–hard"}</span></div>}<p>{card.copy}</p>{variant === "kilimanjaro" ? <div className="ref-route-action"><span>From [price] / person</span><Link href={card.href || "/plan-your-trip"}>View Route <Image src={image("figma-kili-route-arrow.svg")} alt="" width={18} height={18} /></Link></div> : <>{card.note && <small>{card.note}</small>}<Link href={card.href || "/plan-your-trip"}>Explore this journey <span aria-hidden="true">↗</span></Link></>}</div>
    </article>)}</div>
  </div></section>;
}

function ImageCards({ eyebrow, title, copy, cards, dark = false, variant, className = "" }: { eyebrow: string; title: string; copy?: string; cards: Card[]; dark?: boolean; variant?: "climbs"; className?: string }) {
  return <section className={`ref-section ref-card-section ${dark ? "ref-dark" : ""} ${className}`}><div className="shell"><Intro eyebrow={eyebrow} title={title} copy={copy} />
    <div className={`ref-image-cards ${variant === "climbs" ? "ref-climb-cards" : ""}`}>{cards.map(card => <Link href={card.href || "/plan-your-trip"} className="ref-image-card" key={card.title}>
      <Photo src={card.image} alt="" /><div className="ref-image-shade" /><div className="ref-image-card-copy">{variant === "climbs" ? <><div className="ref-climb-card-head"><h3>{card.title}</h3><small>{card.note}</small></div><div className="ref-climb-card-details"><p>{card.copy}</p><strong>From [price] / person</strong><span>Plan This Climb <Image src={image("figma-kili-group-button-arrow.svg")} alt="" width={40} height={40} /></span></div></> : <><small>{card.note}</small><h3>{card.title}</h3><p>{card.copy}</p><span>{className === "ref-zanzibar-combinations" ? "Start planning" : "Plan this trip"}{className === "ref-zanzibar-combinations" ? <Image src={image("figma-kili-group-button-arrow.svg")} alt="" width={40} height={40} /> : <b aria-hidden="true"><ArrowIcon /></b>}</span></>}</div>
    </Link>)}</div>
  </div></section>;
}

function DarkStory({ eyebrow, title, paragraphs, photo, photoAlt = "", reversed = false }: { eyebrow: string; title: string; paragraphs: string[]; photo: string; photoAlt?: string; reversed?: boolean }) {
  return <section className="ref-section ref-dark"><div className={`shell ref-dark-story ${reversed ? "reversed" : ""}`}>
    <div><Intro eyebrow={eyebrow} title={title} />{paragraphs.map(p => <p key={p}>{p}</p>)}</div>
    <Photo src={photo} alt={photoAlt} />
  </div></section>;
}

function ZanzibarOceanActivities() {
  return <section className="ref-section ref-dark ref-zanzibar-ocean" aria-labelledby="zanzibar-activities-title">
    <Photo className="ref-zanzibar-ocean-photo" src={image("figma-zanzibar-ocean-ocean-photograph.png")} alt="" sizes="100vw" />
    <Photo className="ref-zanzibar-ocean-scrim" src={image("figma-zanzibar-ocean-scrim.png")} alt="" sizes="100vw" />
    <div className="shell ref-zanzibar-ocean-content"><div><p className="eyebrow">CLASSIC ZANZIBAR ACTIVITIES</p><h2 id="zanzibar-activities-title">Explore Stone Town, spice farms and the ocean.</h2><p>Discover classic Zanzibar experiences: Stone Town walks, spice farm tours, sunset dhow sailing and snorkeling. These timeless activities offer a deeper look at the island’s culture, history and coastline.</p></div>
      <div className="ref-zanzibar-ocean-mini"><figure><Photo src={image("figma-zanzibar-ocean-rectangle.png")} alt="Sunset dhow sailing" /><figcaption>Sunset dhow sailing</figcaption></figure><figure><Photo src={image("figma-zanzibar-ocean-rectangle1.png")} alt="Stone Town street" /><figcaption>Stone Town exploration</figcaption></figure></div>
    </div>
  </section>;
}

function ZanzibarIslandIntro() {
  return <section className="ref-section ref-dark ref-zanzibar-intro"><div className="shell ref-zanzibar-intro-grid"><div className="ref-zanzibar-intro-copy"><p className="eyebrow">AN ISLAND WITH MANY STORIES</p><h2>More than a beach at the end of a trip.</h2><p>Zanzibar rewards the traveler who takes their time. Historic lanes in Stone Town, spice gardens in the interior, snorkeling reefs off the coast and long stretches of sand where the pace slows right down.</p><p>Tell us what genuinely interests you. We&apos;ll help you build an island stay that doesn&apos;t try to do everything in five days.</p><div className="ref-zanzibar-intro-tags">{["Beach","Stone Town","Spices","Ocean","Culture"].map(tag => <span key={tag}>{tag}</span>)}</div></div><div className="ref-zanzibar-intro-visual"><Photo src={image("figma-zanzibar-intro-bob056321.png")} alt="Zanzibar beach at dusk" /><div className="ref-zanzibar-intro-card"><Photo src={image("figma-zanzibar-intro-rectangle128.png")} alt="Traveller exploring a garden path" /><Image src={image("figma-kili-group-button-arrow.svg")} alt="" width={40} height={40} /><p>Betheli Expeditions is a proud Tanzanian owned tour operator company.</p></div><Image className="ref-zanzibar-intro-logo" src={image("figma-zanzibar-intro-logo.png")} alt="Betheli Expeditions" width={142} height={80} /></div></div></section>;
}

function ZanzibarFaq() {
  const items = [["When is the best time to visit?","Often-drier periods suit beach travel while rainy periods need more flexibility. Wind, tides and sea conditions vary around the island. Check current conditions for your activities."],["Which part of the island is right for me?","The north has a popular beach scene, the east coast has a stronger tidal rhythm and Stone Town centers on cultural exploring. The exact property and beach matter as much as the area."],["Can I combine Zanzibar with a safari or climb?","Discuss connections and recovery time with the team."],["What should I pack and wear?","Ask for guidance tailored to your plans and season."],["Can beginners snorkel or dive?","Confirm activities and conditions with the team."],["Are transfers and activities included?","Inclusions are confirmed in your written quote."]];
  return <section className="ref-section ref-zanzibar-faq"><div className="shell"><div className="ref-zanzibar-faq-head"><div><p className="eyebrow">GOOD QUESTIONS. HONEST ANSWERS.</p><h2>Zanzibar<br />frequently asked.</h2></div><p>General guidance to help you choose. Package details confirmed during planning.</p></div><Accordion items={items} openCount={2} /></div></section>;
}

function WhyGrid({ title, imageSrc, items, copy }: { title: string; imageSrc: string; items: [string, string][]; copy?: string }) {
  const kilimanjaroIcons = ["figma-kili-value-users.svg", "figma-kili-value-message.svg", "figma-kili-value-tent.svg", "figma-kili-value-mountain.svg", "figma-kili-value-shield.svg", "figma-kili-value-flag.svg"];
  return <section className="ref-section ref-dark ref-why-grid"><div className="shell"><Intro eyebrow="LOCAL KNOWLEDGE. PERSONAL CARE." title={title} copy={copy} />
    <Photo src={imageSrc} alt="Bathiel Expeditions team" sizes="(max-width: 700px) 100vw, 1200px" />
    <div className="ref-why-items">{items.map(([heading, text], index) => <article key={`${heading}-${index}`}>{title.includes("Kilimanjaro") ? <Image src={image(kilimanjaroIcons[index])} alt="" width={28} height={28} /> : <span aria-hidden="true">✦</span>}<h3>{heading}</h3><p>{text}</p></article>)}</div>
  </div></section>;
}

function StaySelector({ eyebrow, title, copy, items, photo, thumbnails }: { eyebrow: string; title: string; copy: string; items: [string,string][]; photo: string; thumbnails: string[] }) {
  const [selected, setSelected] = useState(0);
  const photos = [photo, ...thumbnails];
  return <section className="ref-section ref-stay"><div className="shell"><Intro eyebrow={eyebrow} title={title} copy={copy} /><div className="ref-stay-grid">
    <div className="ref-stay-options">{items.map(([name, text], i) => <div className={selected === i ? "active" : ""} key={name}><button type="button" aria-expanded={selected === i} onClick={() => setSelected(i)}>{eyebrow.includes("ROOM") && <span className="ref-stay-icon"><Image src={image(["figma-zanzibar-stay-building.svg","figma-zanzibar-stay-house.svg","figma-zanzibar-stay-bed.svg","figma-zanzibar-stay-users.svg"][i])} alt="" width={20} height={20} /></span>}{name}</button>{selected === i && <p>{text}</p>}</div>)}</div>
    <div className="ref-stay-photo"><Photo key={photos[selected]} src={photos[selected]} alt={items[selected][0]} /><div className="ref-thumbs">{photos.map((src, i) => <button type="button" className={selected === i ? "active" : ""} aria-label={`Show ${items[i]?.[0] || `accommodation ${i+1}`}`} aria-pressed={selected === i} onClick={() => setSelected(i)} key={src}><Photo src={src} alt="" /></button>)}</div></div>
  </div></div></section>;
}

function Seasons({ eyebrow, title, copy, items, imageSrc }: { eyebrow: string; title: string; copy?: string; items: [string,string,string][]; imageSrc?: string }) {
  return <section className={`ref-section ref-seasons ${imageSrc ? "with-image" : ""}`}><div className="shell"><Intro eyebrow={eyebrow} title={title} copy={copy} />
    <div className="ref-season-grid">{items.map(([date,title,text]) => <article key={date}><b>{date}</b><h3>{title}</h3><p>{text}</p></article>)}</div>
  </div>{imageSrc && <Photo src={imageSrc} alt="" />}</section>;
}

function Safety() {
  const [selected, setSelected] = useState(0);
  const items = [
    { title: "Experienced mountain guides", copy: "Ask about your guide team’s experience and the support available on your chosen route.", icon: "users", photo: "figma-kili-safety-expedition-team-photograph.png" },
    { title: "Acclimatization strategy", copy: "Discuss the daily altitude profile, rest opportunities and a pace that suits your itinerary.", icon: "chart", photo: "figma-kili-journey-journey-landscape2.png" },
    { title: "Emergency procedures", copy: "Before booking, confirm communication, evacuation arrangements and insurance requirements.", icon: "shield", photo: "figma-kili-journey-summit-panorama.png" },
    { title: "Guide-to-client ratios", copy: "Request the confirmed guide-to-client ratio and group size for your departure.", icon: "group", photo: "figma-kili-group-trip-landscape3.png" },
    { title: "Mountain equipment", copy: "Confirm the equipment provided, rental options and what you will need to bring.", icon: "equipment", photo: "figma-kili-journey-journey-landscape1.png" },
    { title: "Health monitoring", copy: "Discuss check-ins and how the team responds to symptoms. Seek personal medical advice before travel.", icon: "heart", photo: "figma-kili-journey-journey-landscape3.png" },
  ];
  const paths: Record<string, React.ReactNode> = {
    users: <><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2"/><path d="M17 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 2 4v2"/></>,
    chart: <><path d="M3 20h18M4 16l5-5 4 3 7-8"/><path d="M16 6h4v4"/></>,
    shield: <><path d="M12 2 4 5v6c0 5 3.3 8.6 8 11 4.7-2.4 8-6 8-11V5z"/><path d="M12 7v6m0 3h.01"/></>,
    group: <><circle cx="9" cy="8" r="3"/><path d="M4 20v-2a5 5 0 0 1 10 0v2M17 6l4 4m0-4-4 4"/></>,
    equipment: <><path d="M3 9h18v11H3zM8 9V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3M3 14h18m-11-2v4h4v-4"/></>,
    heart: <><path d="M20.8 8.4c0 4.7-8.8 11.2-8.8 11.2S3.2 13.1 3.2 8.4a4.4 4.4 0 0 1 8.8-.4 4.4 4.4 0 0 1 8.8.4Z"/><path d="M5 12h4l2-3 2 6 2-3h4"/></>,
  };
  return <section className="ref-section ref-dark ref-safety" id="safety"><div className="shell ref-safety-grid"><div><Intro eyebrow="CARE BEFORE THE SUMMIT" title="Your Safety Comes First" copy="The mountain deserves respect. So do your questions. Talk to us about the support and arrangements for your climb before you book." /><Photo key={items[selected].photo} src={image(items[selected].photo)} alt={`${items[selected].title} on Kilimanjaro`} /><p>Reaching the summit is never more important than returning safely. No itinerary can remove the risks of high altitude.</p></div><div className="ref-safety-list">{items.map((item, index) => <button className={`ref-safety-topic ${selected === index ? "active" : ""}`} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} key={item.title}><span className="ref-safety-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[item.icon]}</svg></span><span><strong>{item.title}</strong><small>{item.copy}</small></span></button>)}<Link className="ref-safety-cta" href="/contact">Talk to a Guide <span aria-hidden="true">↗</span></Link></div></div></section>;
}

function FaqPreview({ title, items, openCount = 1, id, variant }: { title: string; items?: string[][]; openCount?: number; id?: string; variant?: "kilimanjaro" }) {
  return <section className={`ref-section ref-faq ${variant === "kilimanjaro" ? "ref-kili-faq" : ""}`} id={id}><div className="shell"><Intro eyebrow={variant === "kilimanjaro" ? "GOOD QUESTIONS. HONEST ANSWERS." : "GOOD QUESTIONS"} title={title} copy={variant === "kilimanjaro" ? "A little clarity before a big adventure. Talk to our team about the details of your own climb." : "Useful answers for the first conversation and the planning that follows."} /><Accordion items={items} openCount={openCount} />{variant === "kilimanjaro" ? <p className="ref-kili-faq-note">Before booking, confirm your packing list, seasonal conditions, total cost and altitude support arrangements. This layout shows the first answer expanded.</p> : <Link className="ref-text-link" href="/faq">Explore all questions ↗</Link>}</div></section>;
}

function KilimanjaroStyleCards() {
  const styles = [
    { title: "SOLO", subtitle: "Travel your way", badge: "Travel Independently", copy: "A personalised safari designed around your interests, pace and plans.", best: "independent travellers", imageSrc: "figma-home-style1.png", href: "/plan-your-trip", action: "Start planning" },
    { title: "PRIVATE GROUP", subtitle: "Travel with your people", badge: "Just Your People", copy: "A private vehicle and itinerary for your partner, family or friends.", best: "couples, family, friends", imageSrc: "figma-home-style2.png", href: "/plan-your-trip", action: "Start planning" },
    { title: "JOIN A GROUP", subtitle: "Meet new people", badge: "Social & Shared", copy: "Join a small group and share the safari experience with other travellers.", best: "solo travellers & social travellers", imageSrc: "figma-home-style3.png", href: "/groups", action: "Check group dates" },
  ];
  return <div className="ref-kili-style-grid">{styles.map(item => <article className="ref-kili-style-card" key={item.title}>
    <div className="ref-kili-style-photo"><Photo src={image(item.imageSrc)} alt="" /><span className="ref-kili-style-badge">{item.badge}</span><div className="ref-kili-style-name"><h3>{item.title}</h3><p>{item.subtitle}</p></div></div>
    <div className="ref-kili-style-details"><p>{item.copy}</p><strong>Best for: {item.best}</strong><Link href={item.href}>{item.action}<Image src={image("figma-kili-group-button-arrow.svg")} alt="" width={40} height={40} /></Link></div>
  </article>)}</div>;
}

const tripSections = [
  ["general", "GENERAL"],
  ["overview", "OVERVIEW"],
  ["itinerary", "ITINERARY"],
  ["inclusions", "INCLUSIONS"],
  ["exclusions", "EXCLUSIONS"],
  ["questions", "FREQUENTLY ASKED QUESTIONS"],
] as const;

function TripSectionNav() {
  const [activeSection, setActiveSection] = useState<string>("general");

  useEffect(() => {
    let frame = 0;
    const updateActiveSection = () => {
      const navHeight = document.querySelector(".trip-ref-nav")?.getBoundingClientRect().height ?? 0;
      const threshold = navHeight + 24;
      let current: string = tripSections[0][0];
      for (const [id] of tripSections) {
        const target = document.getElementById(id);
        if (target && target.getBoundingClientRect().top <= threshold) current = id;
      }
      setActiveSection(current);
    };
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveSection);
    };
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, []);

  return <nav className="trip-ref-nav" aria-label="Trip sections"><div className="shell">
    <div className="trip-ref-nav-links">{tripSections.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} onClick={() => setActiveSection(id)}>{label}</a>)}</div>
    <PrimaryLink>Start planning</PrimaryLink>
  </div></nav>;
}

const safariParks: Card[] = [
  ["Serengeti","Wide grasslands, scattered acacias and wildlife on an extraordinary scale. Choose a region around your dates, rather than expecting the herds in one fixed place.","Best known for: Open plains, predators and seasonal migration",0],
  ["Ngorongoro Crater","Descend into a remarkable volcanic caldera with grassland, wetland and woodland habitats. Pair this landscape with other northern parks for contrast.","Best known for: Caldera scenery and varied habitats",1],
  ["Tarangire","Baobabs and the Tarangire River shape a distinctive safari landscape. In drier periods, animals may gather near water; every visit is different.","Best known for: Elephants, baobabs and river landscapes",2],
  ["Lake Manyara","Forest, lake and the Rift Valley escarpment create a more intimate setting. Birdlife and lake conditions vary with water levels and the season.","Best known for: Lakeshore, forest and Rift Valley views",3],
  ["Arusha National Park","Green foothills and Mount Meru views offer a quieter contrast to the open plains. Ask which activities and access arrangements suit your trip.","Best known for: Mount Meru scenery and forest habitats",4],
  ["Ruaha","A different side of Tanzania: broad dry-country scenery, baobabs and river habitats. Discuss the extra travel time needed for a southern safari.","Best known for: Wild landscapes and a southern safari setting",5],
].map(([title,copy,note,n]) => ({ title: title as string, copy: copy as string, note: note as string, image: image(`figma-safari-destinations-destination-photograph${n || ""}.png`) }));

const zanzibarPlaces: Card[] = [
  ["Stone Town","Wander narrow alleys, visit historic landmarks and soak up the island’s cultural rhythm. It is a place to slow down and absorb the atmosphere.","Best known for: Architecture, markets and island history",0],
  ["Nungwi","A northern beach destination with a relaxed atmosphere, scenic coastline and a chance to see local fishing communities.","Best known for: Beaches, sunsets and coastal scenery",1],
  ["Paje","A southeastern beach destination known for its scenic coastline, water sports and laid-back island atmosphere.","Best known for: Beaches, water sports and coastal scenery",2],
  ["Kendwa","A quieter northern beach with calm waters and a peaceful setting. It is ideal for relaxation and sunset views.","Best known for: Quiet beaches and sunset views",3],
  ["Matemwe","A northeastern beach destination with a more secluded feel, scenic views and access to Mnemba Atoll for snorkeling.","Best known for: Secluded beaches and snorkeling",4],
  ["Prison Island","A short boat trip from Stone Town with giant tortoises, a historic prison and a beautiful beach for a day visit.","Best known for: Giant tortoises and island history",5],
].map(([title,copy,note,n]) => ({ title: title as string, copy: copy as string, note: note as string, image: image(`figma-zanzibar-mosaic-destination-photograph${n || ""}.png`) }));

export function SafariReferencePage() {
  const safaris: Card[] = [
    {title:"3-day Serengeti",copy:"A focused Serengeti idea for travelers with limited time.",note:"3 DAYS",image:image("figma-safari-packages-trip-card1.png"),href:"/trips"},
    {title:"4-day Northern Tanzania",copy:"A short journey through contrasting northern parks.",note:"4 DAYS",image:image("figma-safari-packages-trip-card2.png")},
    {title:"5-day Tanzania Safari",copy:"More time in the wild, at a pace that works for you.",note:"5 DAYS",image:image("figma-safari-packages-trip-card3.png")},
    {title:"7-day Tanzania Safari",copy:"A longer itinerary with room to slow down.",note:"7 DAYS",image:image("figma-safari-packages-trip-card4.png")},
  ];
  return <><ReferenceHero imageSrc={image("figma-safari-hero.png")} eyebrow="TANZANIA SAFARIS" title="Experience the Wild Side of Tanzania" copy="Explore Serengeti, Ngorongoro, Tarangire and beyond. Your pace, your interests — shaped by a local Tanzanian team that knows these places well." action="Explore Safaris" actionHref="#explore" secondAction="Plan My Safari" secondActionHref="/plan-your-trip" active="Safari" />
    <main><PlaceGrid eyebrow="FROM ICONIC PLAINS TO QUIETER WILDERNESS" title="Where Will Your Safari Take You?" copy="Get to know the places before choosing a route. Each destination brings its own landscape, rhythm and possibilities." cards={safariParks} />
      <ImageCards eyebrow="POPULAR PLANNING IDEAS" title="Choose Your Safari" copy="Four starting points, not fixed departures. Itinerary, availability and pricing are confirmed when you plan with us." cards={safaris} />
      <DarkStory eyebrow="MORE THAN A WILDLIFE CHECKLIST" title="What Makes a Tanzania Safari Special?" paragraphs={["A safari is a chance to slow down and watch a living landscape: grasslands, river valleys, forests and the animals that move between them.","Make room for the human side of Tanzania, too. Discuss respectful cultural experiences, local context and the visits that genuinely interest you."]} photo={image("figma-safari-special-bob056321.png")} photoAlt="Safari travellers in Tanzania" />
      <section className="ref-section"><div className="shell"><Intro eyebrow="SAFARI VEHICLES" title="Comfortable Rides for the Wild" /><div className="ref-three-cards">{[["Open-top safari vehicle","Great for unhindered views, photography and the immersive feel of a classic safari drive.","figma-safari-vehicles-img91031.png"],["Closed vehicle with pop-up roof","A practical option for rainier days, longer transfers and groups who want a quieter cabin.","figma-safari-vehicles-img93051.png"],["Comfort and practicalities","Ask about the practical details of your safari vehicle before confirming your trip.","figma-safari-vehicles-img93061.png"]].map(([title,copy,src])=><article key={title}><Photo src={image(src)} alt={title} /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
      <StaySelector eyebrow="CHOOSE A SAFARI STYLE, NOT JUST A CAMP" title="What kind of safari stay is right for you?" copy="These are safari stay styles, not specific camps. Properties, location and availability confirmed in your quote." items={[["Classic safari camp","A traditional bush stay with canvas, campfires and early morning departures. Great for first-time safari travelers and classic wildlife experiences."],["Tented suite","Elevated comfort, private decks and a more immersive bush experience."],["Luxury lodge","High-end service, premium amenities and a polished safari experience."],["Family safari lodge","A practical base with flexible rooms, activities and space for everyone."]]} photo={image("figma-safari-stay-slide1active.png")} thumbnails={["figma-safari-stay-rectangle.png","figma-safari-stay-rectangle1.png","figma-safari-stay-rectangle2.png"].map(image)} />
<WhyGrid title="Why Travel With Bathiel Expeditions?" imageSrc={image("figma-safari-why-image2.png")} copy="Start with a conversation. A Tanzanian-owned team — not a booking engine — helps you shape the journey that fits you." items={[["Local perspective","Start with a Tanzanian team and a conversation about the places you want to see."],["Personal planning","Share your interests, available time and preferred pace before choosing an outline."],["Clear choices","Ask for a written quote showing your proposed itinerary and all the details to confirm."],["Thoughtful travel","Discuss wildlife etiquette, community visits and low-impact travel with the team."],["A journey that fits","Private and small-group preferences can be discussed; availability is confirmed with your quote."],["Local perspective","Start with a Tanzanian team and a conversation about the places you want to see."]]} />
      <Seasons eyebrow="PLAN AROUND THE SEASONS" title="When to Go on Safari" copy="There is no single perfect month. Match your interests to the season, then check current conditions with the team." items={[["JAN — FEB","Green plains","Seasonal herd activity in some areas. Showers remain possible."],["MAR — MAY","Longer rains","Expect changing conditions and discuss suitable locations."],["JUN — OCT","Drier days","Dry-season conditions can bring wildlife toward remaining water."],["NOV — DEC","Shorter rains","Fresh vegetation and changing light reshape the landscape."]]} />
      <Testimonials /><CtaBanner title="Ready for the Machame Route?" image={image("figma-zanzibar-combine-frame.png")} /><FaqPreview title="Tanzania Safari Questions" openCount={2} items={[["When is the best time for a Tanzania safari?","Drier periods often make wildlife easier to observe near water. Green seasons bring different scenery and birdlife. Migration movements follow rainfall and grazing, so sightings and crossings are never guaranteed."],["How many days should I allow?","Consider travel time as well as park days. A short trip may suit one region; more time allows a broader route. Ask the team to compare realistic options for your available days."],["What should I pack?","Please confirm a packing list for your safari with the team."],["What safari vehicles are used?","Ask the team to confirm your vehicle in the trip proposal."],["What accommodation can I choose?","Accommodation choices are confirmed in your quote."],["Can families go on safari?","Discuss your family’s needs and ages with the team."],["Can I travel privately or in a small group?","Ask the team about private and group options for your dates."]]} /></main><Footer /></>;
}

export function ZanzibarReferencePage() {
  return <><ReferenceHero imageSrc={image("figma-zanzibar-hero.png")} eyebrow="ZANZIBAR · THE INDIAN OCEAN" title="Discover Zanzibar" copy="White-sand beaches, turquoise water, historic Stone Town and island life that moves at its own pace." action="Plan My Zanzibar Trip" secondAction="Explore the Island" active="Zanzibar" heroClass="ref-hero-zanzibar" trustItems={["Local Tanzanian team", "Personal trip planning", "Your journey, your pace", "Quote on request, no pressure"]} />
    <main><PlaceGrid eyebrow="ISLAND BEACHES, STONE TOWNS AND COASTAL EXPLORATION" title="Where Will Your Zanzibar Journey Take You?" copy="Get to know the island’s distinct corners before choosing your route. Each destination brings its own pace, scenery and experiences." cards={zanzibarPlaces} />
      <ZanzibarOceanActivities />
      <ZanzibarIslandIntro />
      <StaySelector eyebrow="CHOOSE A STYLE, NOT JUST A ROOM" title="What kind of accommodation is right for you?" copy="These are accommodation styles, not hotel recommendations. Properties, beach access and availability confirmed in your quote." items={[["Boutique hotel","A curated stay with character, service and thoughtful details. Often a good fit for couples and travelers who value atmosphere."],["Beachfront villa","Space, privacy and direct access to the ocean. Useful for families, groups or longer stays."],["Private suite","A more secluded room or suite with extra comfort and calm."],["Family-friendly resort","A practical base with amenities, activities and space for everyone."]]} photo={image("figma-zanzibar-stay-slide1active.png")} thumbnails={["figma-zanzibar-stay-rectangle.png","figma-zanzibar-stay-rectangle1.png","figma-zanzibar-stay-rectangle2.png"].map(image)} />
      <Seasons eyebrow="PLAN AROUND THE SEASONS" title="Best time to visit Zanzibar." items={[["JAN — FEB","Warm island days","Warm with beach time between showers. Sea conditions and visibility vary."],["MAR — MAY","Longer rains","More frequent rain. Flexible plans needed for beach and boat days."],["JUN — OCT","Often drier","Less humid, a popular period. Wind and tides affect water activities."],["NOV — DEC","Shorter rains","Showers with sunny intervals. Holiday periods can bring more demand."]]} imageSrc={image("figma-zanzibar-hero.png")} />
      <ImageCards className="ref-zanzibar-combinations" eyebrow="A DIFFERENT KIND OF FINISH" title="Combine Zanzibar with Tanzania." copy="Choose the contrasts you want, then build in realistic travel and recovery time. Connections and park selection to confirm." cards={[{note:"SAFARI",title:"Wildlife, and nature",copy:"Park choices and onward connections tailored around your dates.",image:image("figma-zanzibar-combine-frame.png"),href:"/safari"},{note:"KILIMANJARO",title:"Summit, the roof of Africa",copy:"Space to rest after the climb. The island at your own pace.",image:image("figma-zanzibar-combine-frame1.png"),href:"/kilimanjaro"},{title:"Zanzibar island",copy:"One journey across the full range of Tanzania. Sequence to confirm.",image:image("figma-zanzibar-combine-frame2.png") }]} />
      <Testimonials /><ZanzibarFaq /><CtaBanner title="Ready to explore Zanzibar?" image={image("figma-zanzibar-hero.png")} /></main><Footer /></>;
}

const kilimanjaroRoutes: Card[] = [
  ["Machame Route","A scenic southern approach, camping beneath big skies and crossing dramatic ridges.","6–7 days typical",0,"/kilimanjaro/machame-route"],
  ["Lemosho Route","A quieter western start through forest, opening onto the broad Shira Plateau.","7–8 days typical",1,"/plan-your-trip"],
  ["Marangu Route","The hut-based trail, with a direct approach and the same route for the descent.","5–6 days typical",2,"/plan-your-trip"],
  ["Rongai Route","Approach from the north, with a gentler early gradient and quieter trails.","6–7 days typical",3,"/plan-your-trip"],
  ["Northern Circuit","A longer journey around the mountain’s northern slopes, with time to settle into the pace.","8–9 days typical",4,"/plan-your-trip"],
  ["Umbwe Route","A steep, direct start for experienced trekkers; discuss acclimatization carefully.","6–7 days typical",5,"/plan-your-trip"],
].map(([title,copy,note,n,href]) => ({title:title as string,copy:copy as string,note:note as string,image:image(`figma-kili-routes-route-landscape${n || ""}.png`),href:href as string}));

const relatedTrips: Card[] = [
  ["6-Day Machame Route", "Machame • Hard", "6 DAYS", 0, "/kilimanjaro/machame-route"],
  ["7-Day Machame Route", "Machame • Hard", "7 DAYS", 1, "/kilimanjaro/machame-route"],
  ["7-Day Lemosho Route", "Lemosho • Moderate–hard", "7 DAYS", 2, "/plan-your-trip"],
  ["8-Day Lemosho Route", "Lemosho • Moderate–hard", "8 DAYS", 3, "/plan-your-trip"],
].map(([title, copy, note, n, href]) => ({
  title: title as string,
  copy: copy as string,
  note: note as string,
  image: image(`figma-kili-group-trip-landscape${n || ""}.png`),
  href: href as string,
}));

export function KilimanjaroReferencePage() {
  return <><ReferenceHero imageSrc={image("figma-home-gallery3.png")} eyebrow="TANZANIA • THE ROOF OF AFRICA" title="Climb Mount Kilimanjaro" copy="Reach the Roof of Africa with experienced local guides, carefully planned routes and a team that knows the mountain from the ground up." action="Plan My Climb" secondAction="Explore Routes" active="Kilimanjaro" navVariant="classic" heroClass="ref-hero-kilimanjaro" trustItems={["Local Tanzanian guides", "Safety-focused", "Personal support", "Small groups"]} />
    <main><section className="ref-section ref-kili-intro"><div className="shell ref-intro-split"><div><Intro eyebrow="THE MOUNTAIN, AND EVERYTHING BETWEEN" title="More Than a Summit" copy="Kilimanjaro is a journey through worlds. Walk beneath a rainforest canopy, emerge into open moorland and cross the quiet, rocky alpine desert before reaching the Arctic summit." /><p>With Bathiel Expeditions, the climb begins with a conversation about you: your time, your experience and the kind of mountain journey you want.</p><p className="ref-kili-accent">One mountain. A different landscape every day.</p></div><Photo src={image("figma-kili-intro-climbers-above-the-clouds.png")} alt="Climbers above the clouds on Kilimanjaro" /></div><div className="shell ref-kili-facts">{[["figma-kili-fact-mountain.svg","5,895 m","Above sea level"],["figma-kili-fact-layers.svg","5 ecological zones","From forest to ice"],["figma-kili-fact-map.svg","6+ climbing routes","Find your own path"],["figma-kili-fact-star.svg","1 unforgettable experience","More than the summit"]].map(([icon,title,copy])=><div key={title}><span><Image src={image(icon)} alt="" width={24} height={24} /></span><div><b>{title}</b><small>{copy}</small></div></div>)}</div></section>
      <WhyGrid title="Why Climb Kilimanjaro With Us?" imageSrc={image("figma-kili-why-image2.png")} items={[["Small Groups","Space to find your rhythm. Confirm group size for your departure."],["Personal Support","Real people to help with route choices, preparation and travel plans."],["Quality Equipment","Ask us for the current mountain equipment list and what to bring."],["Experienced Local Guides","Local knowledge, mountain experience and a warm Tanzanian welcome."],["Safety First","A thoughtful pace and clear conversations about your wellbeing."],["High Summit Success","Verified summit-success rate: rate pending verification. No summit is guaranteed."]]} />
      <PlaceGrid eyebrow="SIX WAYS TO THE ROOF OF AFRICA" title="Which Kilimanjaro Route Is Right For You?" copy="Every route offers a different experience. Compare them and find the climb that fits your time, fitness and travel style." cards={kilimanjaroRoutes} variant="kilimanjaro" />
      <section className="ref-section ref-comparison"><div className="shell"><Intro eyebrow="AT A GLANCE" title="Compare Kilimanjaro Routes" /><div className="ref-table-wrap"><table><thead><tr><th>Route</th><th>Days</th><th>Difficulty</th><th>Scenery</th><th>Crowds</th><th>Starting From</th></tr></thead><tbody>{kilimanjaroRoutes.map((route,i)=><tr key={route.title}><th>{route.title}</th><td>{route.note?.replace(" typical","")}</td><td><span className="ref-difficulty"><span>{i===0?"Hard":i===5?"Very hard":"Moderate–hard"}</span><span aria-hidden="true">{Array.from({length:5},(_,j)=><i key={j} className={j<(i===5?5:i===0?4:3)?"active":""} />)}</span></span></td><td>{["Very varied","Very varied","Forest & moorland","Northern wilderness","Panoramic","Steep forest & ridges"][i]}</td><td>{["High","Medium","High","Low","Low","Low early on"][i]}</td><td>From [price] / person</td></tr>)}</tbody></table></div></div></section>
      <section className="ref-section ref-dark ref-kili-journey"><div className="shell"><Intro eyebrow="RAINFOREST → MOORLAND → ALPINE DESERT → SUMMIT → DESCENT" title="What the Journey Looks Like" copy="Not just an ascent. A remarkable passage through changing landscapes, one step at a time." /><div className="ref-journey">{[["01 / RAINFOREST","The world turns green.","The trail begins in the forest: damp earth, moss and tall trees. Slow down and let the mountain set the pace.","figma-kili-journey-journey-landscape.png"],["02 / MOORLAND","Step into the open.","Heather gives way to wide horizons and giant groundsels. The summit feels closer, but the days remain unhurried.","figma-kili-journey-journey-landscape1.png"],["03 / ALPINE DESERT","A quieter kind of wilderness.","Vegetation thins, the air cools and volcanic rock stretches toward the sky. Every step becomes a little more deliberate.","figma-kili-journey-journey-landscape2.png"],["04 / SUMMIT • 5,895 M","A summit you carry home.","The final ascent is cold, slow and demanding. At Uhuru Peak, the African continent unfolds below the clouds.","figma-kili-journey-summit-panorama.png"],["05 / DESCENT","Back through the worlds you crossed.","Return to warmer air and greener trails. There is time to rest, share stories and appreciate the whole journey.","figma-kili-journey-journey-landscape3.png"]].map(([step,title,copy,src],index)=><article key={step}><Photo src={image(src)} alt={title} /><div><small>{step}</small>{index === 3 ? <div className="ref-journey-summit-title"><Image src={image("figma-kili-journey-summit-mountain.svg")} alt="" width={53} height={45} /><h3>{title}</h3></div> : <h3>{title}</h3>}<p>{copy}</p></div></article>)}</div></div></section>
      <section className="ref-section ref-kili-styles"><div className="shell"><div className="ref-kili-style-intro"><h2>Choose your travel style</h2><p>Whether you want to meet new people, travel privately with your people, or explore Tanzania independently, choose the safari style that fits your journey.</p></div><KilimanjaroStyleCards /></div></section>
      <section className="ref-section ref-life-section"><div className="shell"><Intro eyebrow="BEFORE YOU LACE UP YOUR BOOTS" title="What Is Climbing Kilimanjaro Really Like?" copy="A practical picture of the experience, from preparing at home to your last day on the trail." /><div className="ref-fact-grid ref-life-grid">{[["Training & Preparation","Build walking endurance on hills, practise with your daypack and wear in your boots. Leave time to prepare."],["Arrival in Tanzania","Allow time for arrival, rest and a briefing. Confirm your transfers, accommodation and equipment check with us."],["First Days on the Mountain","Expect steady walking, changing weather and a slower pace than at home. Settle into life on the trail."],["Altitude & Acclimatization","More time can help you adapt, but altitude affects everyone differently. Tell your guide how you feel."],["Summit Night","Often a pre-dawn start, with cold temperatures and a long climb. Take it step by step; turning back is always valid."],["Descent & Celebration","The descent takes effort too. Rest afterwards and celebrate the journey, whether or not you reached the summit."]].map(([title,copy],i)=><article key={title}><small>{String(i+1).padStart(2,"0")}</small><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
      <Safety />
      <ImageCards eyebrow="YOUR NEXT CHAPTER" title="Join a group" copy="A few starting points for your conversation with us. We’ll help you weigh up your time on the mountain." cards={["6-Day Machame Route","7-Day Machame Route","7-Day Lemosho Route","8-Day Lemosho Route"].map((title,i)=>({title,copy:["Machame • Hard","Machame • Hard","Lemosho • Moderate–hard","Lemosho • Moderate–hard"][i],note:`${title[0]} DAYS`,image:image(`figma-kili-group-trip-landscape${i || ""}.png`),href:"/groups"}))} variant="climbs" />
      <Testimonials /><FaqPreview variant="kilimanjaro" title="Kilimanjaro Frequently Asked Questions" items={[["How difficult is Kilimanjaro?","Kilimanjaro is a demanding high-altitude trek, not a technical climb on the usual trekking routes. Long walking days, cold weather and thinner air make it challenging, even for fit walkers. Prepare with regular hikes, choose an itinerary with time to acclimatize and tell your guide promptly if you feel unwell. Reaching the summit is never guaranteed."],...["Which route is best for beginners?","How many days should I spend on Kilimanjaro?","What is the best time to climb?","What should I pack?","What happens if I struggle with altitude?","How fit do I need to be?","Can I climb Kilimanjaro without previous mountain experience?","How much does it cost?","What happens after I reach the summit?"].map(q=>[q,"Discuss the details of your climb with the Bathiel team before booking."])]} /><CtaBanner title="Ready to Climb Kilimanjaro?" image={image("figma-kili-group-trip-landscape3.png")} /></main><Footer /></>;
}

export function MachameReferencePage() {
  const days = [
    ["01","Into the rainforest","Begin on shaded forest trails. Settle into a steady walking rhythm as the mountain journey gets underway."],
    ["02","Above the forest","Continue toward more open terrain, with time to notice the changing vegetation and widening views."],
    ["03","A day to find your pace","Follow a gradual trekking rhythm through higher terrain. The day’s ascent and rest plan depend on your final itinerary."],
    ["04","Across the mountain","Move through rugged mountain scenery at a measured pace. Take breaks and discuss how you feel with your guide."],
    ["05","Prepare for the summit","Continue toward the summit approach. Prepare layers, organize essentials and rest ahead of a possible summit attempt."],
    ["06","Summit attempt & descent","An early start and a slow ascent may lead toward sunrise and Uhuru Peak. Conditions and your ability guide every decision."],
    ["07","Return from the mountain","Continue down toward the lower slopes. The final descent and onward arrangements will be confirmed with your climb plan."],
  ];
  return <><ReferenceHero imageSrc={image("figma-machame-hero.png")} eyebrow="KILIMANJARO ROUTE" title="Machame Route" lead="The scenic route to the Roof of Africa." copy="From rainforest trails to open volcanic landscapes, discover a climb that changes with every day. Plan your Machame adventure with Bathiel Expeditions." action="Plan This Climb" secondAction="Get a Quote" secondActionHref="/plan-your-trip" active="Home" navVariant="classic" routeFacts={["6–7 Days", "Difficulty: Challenging", "Scenery: Excellent", "Starting From: $XXX"]} />
    <main><section className="ref-section"><div className="shell ref-intro-split"><Photo src={image("figma-machame-overview-expedition-photograph.png")} alt="Climbers on the Machame route" /><div><Intro eyebrow="THE CLIMB AT A GLANCE" title="Machame Route Overview" /><p>The Machame Route offers changing scenery and a memorable approach to the summit. Discuss your time, experience and preferred pace with the team.</p><dl className="ref-facts"><div><dt>Duration</dt><dd>6–7 Days</dd></div><div><dt>Difficulty</dt><dd>Challenging</dd></div><div><dt>Style</dt><dd>Camping route</dd></div></dl></div></div></section>
      <section className="ref-section ref-why-route"><div className="shell"><Intro eyebrow="MORE THAN A WAY TO THE TOP" title="Why Choose the Machame Route?" /><div className="ref-fact-grid four">{[["Scenic landscapes","Big mountain views, forest trails and a striking approach to the summit."],["Varied terrain","A route that moves through many of Kilimanjaro’s landscapes."],["Time to acclimatise","A 6–7 day climb with time to settle into the journey."],["A rewarding challenge","A demanding climb for prepared walkers."]].map(([a,b])=><article key={a}><h3>{a}</h3><p>{b}</p></article>)}</div></div></section>
      <DarkStory eyebrow="SEE THE JOURNEY" title="Your Route to the Roof of Africa" paragraphs={["A visual introduction to the ascent, the summit and the return.","Machame • schematic route. Illustrative only — not to scale and not for navigation."]} photo={image("figma-machame-map-illustrative-descent.png")} photoAlt="Illustrative Machame route map" />
      <section className="ref-section ref-machame-itinerary"><div className="shell ref-itinerary"><div><Intro eyebrow="ONE MOUNTAIN. SEVEN DAYS." title="Machame Route Itinerary" copy="A 7-day outline, with every day visible so you can understand the journey before you book." /><p>6-day alternative available to discuss. It compresses the outline and may allow less time to adjust to altitude. Final itinerary, camp sequence and daily measurements to confirm.</p><Photo src={image("figma-machame-itinerary-expedition-photograph.png")} alt="Kilimanjaro landscape" /></div><div className="ref-machame-days">{days.map(([number,title,copy],i)=><article key={number}><span>{number}</span><div><small>DAY {i+1}</small><h3>{title}</h3><p>Route / location: {i===5?"[High camp] → Uhuru Peak → [Camp]":"[Start → next camp to confirm]"}</p><p>{copy}</p><div className="ref-machame-day-facts"><span>Distance: [XX km to confirm]</span><span>Walking time: [XX hours to confirm]</span><span>Elevation: [XX m → XX m to confirm]</span><span>Accommodation / camp: [To confirm]</span></div>{i===2 && <Photo src={image("figma-machame-itinerary-expedition-photograph1.png")} alt="Climbers on the route" />}</div></article>)}</div></div></section>
      <DarkStory eyebrow="A MOUNTAIN OF MANY WORLDS" title="Environments of Kilimanjaro" paragraphs={["Cultivation Zone · 1,000–1,800m","Montane Forest · 1,800–3,000m","Heath & Moorland · 3,000–4,000m","Alpine Desert · 4,000–5,000m","Arctic / Summit Zone · 5,000–5,895m"]} photo={image("figma-machame-environment-rectangle56.png")} photoAlt="Kilimanjaro alpine environment" />
      <section className="ref-section"><div className="shell"><Intro eyebrow="YOUR CLIMB, TAKEN CARE OF" title="What’s Included in Your Climb" copy="Use this package checklist when planning your enquiry. All package details are subject to confirmation in your quote." /><div className="ref-included">{[["Before the climb","Arrival and departure transfers","Pre-climb briefing and equipment check"],["On the mountain","Mountain guide and support team","Camping and meals"],["Support & safety","Safety planning and emergency support","Details confirmed in your quote"]].map(([title,...items])=><article key={title}><h3>{title}</h3>{items.map(x=><p key={x}>✓ {x}</p>)}</article>)}</div></div></section>
      <DarkStory eyebrow="THE MOUNTAIN’S MOST DEMANDING MOMENT" title="Summit Night" paragraphs={["Slow steps. Cold air. The possibility of sunrise above the clouds.","Talk to the team about preparing for the summit attempt and when to turn back."]} photo={image("figma-machame-summit-summit-day.png")} photoAlt="Kilimanjaro summit at sunrise" />
      <section className="ref-section"><div className="shell ref-intro-split"><Photo src={image("figma-machame-packing-expedition-photograph.png")} alt="Mountain equipment" /><div><Intro eyebrow="PREPARE FOR CHANGING CONDITIONS" title="What Should You Bring?" copy="Pack for a progression from forest trails to a cold, exposed summit environment." /><div className="ref-packing">{["Clothing","Footwear","Daypack","Sleeping gear","Personal items","Documents"].map(x=><span key={x}>✓ {x}</span>)}</div><PrimaryLink>Ask for a packing list</PrimaryLink></div></div></section>
      <Safety />
      <section className="ref-section"><div className="shell"><Intro eyebrow="CHOOSE THE CLIMB THAT FITS YOU" title="Is This Route Right For You?" copy="Machame is a rewarding option for people who enjoy the journey and are willing to prepare for a serious mountain challenge." /><div className="ref-fact-grid"><article><h3>Good for</h3><p>Prepared hikers who enjoy varied scenery and a camping route.</p></article><article><h3>Consider carefully</h3><p>Altitude, cold summit conditions and long walking days affect everyone differently.</p></article></div></div></section>
      <Testimonials /><ImageCards eyebrow="COMPARE YOUR OPTIONS" title="Compare other routes" cards={kilimanjaroRoutes.slice(0,4)} /><FaqPreview title="Machame Route Frequently Asked Questions" openCount={10} items={[["How difficult is the Machame Route?","Challenging. Sustained hiking, changing weather and altitude all add to the demands. Prepare with regular hiking and discuss your fitness and experience before booking."],["How many days should I choose?","Compare the 6- and 7-day options with the team. More time can provide additional opportunities to adjust to altitude, but no itinerary guarantees acclimatization. Final daily plans are to confirm."],["Is Machame suitable for beginners?","Some well-prepared first-time high-altitude hikers may consider it, but it is not an easy introduction. Discuss your hiking background, endurance and comfort with long days before choosing."],["What is the best time to climb?","Weather and trail conditions vary by season, and mountain weather can change quickly. Share your preferred dates for advice; recommended travel periods for your plan are to confirm."],["How difficult is summit night?","It is typically the most demanding part: an early start, cold temperatures, a slow ascent and a long descent. Guides assess conditions and your ability; a summit attempt may need to stop."],["Where do we sleep?","Accommodation and camp arrangements are to confirm. Ask for the overnight plan, sleeping setup and any pre- or post-climb accommodation in your quote."],["What happens if I cannot continue?","Tell your guide promptly if you feel unwell or cannot continue. Confirm the operator’s descent, emergency response and evacuation procedures, as well as any associated costs, before departure."],["What equipment is provided?","Supplied equipment and rental options are to confirm. Request an itemized list and check the condition, specifications and any extra charges. Do not assume personal gear is included."],["How much does the Machame Route cost?","Pricing is pending confirmation and depends on your chosen itinerary and package. Request a written quote with inclusions, exclusions and payment terms."],["What should I pack?","Prepare layers, suitable footwear, cold-weather essentials, personal items and travel documents. Use the packing guide above, then confirm the final equipment list and sleeping requirements with the team."]]} /><CtaBanner title="Ready to climb Machame?" image={image("figma-kili-group-trip-landscape3.png")} /></main><Footer /></>;
}

function HomeFaq() {
  const [tab, setTab] = useState("All");
  const categories = ["All", ...faqCategories.map(([category]) => category.charAt(0) + category.slice(1).toLowerCase())];
  const featuredQuestions = ["Is airfare included in the package price?", "How difficult is Kilimanjaro?", "Will I see the Big Five or the Migration?", "Which coast should I choose?", "Do I need a visa for Tanzania?", "Can I combine Kilimanjaro, safari and Zanzibar?"];
  const selectedQuestions = tab === "All" ? featuredQuestions : faqCategories.find(([category]) => category.toLowerCase() === tab.toLowerCase())?.[2] || [];
  const questions = selectedQuestions.map(question => [question, faqAnswers[question] || "Please ask the Bathiel team to confirm this detail for your proposed trip."]);
  return <section className="home-ref-faq shell"><Intro eyebrow="" title="Frequently Asked Questions" copy="Whether you want to meet new people, travel privately with your people, or explore" /><div className="home-ref-faq-tabs" role="group" aria-label="FAQ categories">{categories.map(category => <button type="button" aria-pressed={tab === category} className={tab === category ? "active" : ""} onClick={() => setTab(category)} key={category}>{category}</button>)}<PrimaryLink>Start planning</PrimaryLink></div><Accordion key={tab} items={questions} openCount={0} /><Link className="home-ref-faq-more" href="/faq">View all questions <ArrowIcon /></Link></section>;
}

function HomeAdventures() {
  const [location, setLocation] = useState("All locations");
  const [price, setPrice] = useState("All prices");
  const [duration, setDuration] = useState("Any duration");
  const trips = [["Family Safari & Beach Escape","figma-home-hero.png","/kilimanjaro","Kilimanjaro"],["Family Safari & Beach Escape","figma-zanzibar-hero.png","/zanzibar","Zanzibar"],["Family Safari & Beach Escape","figma-home-hero.png","/kilimanjaro","Kilimanjaro"],["Family Safari & Beach Escape","home-15.jpg","/safari","Safari"],["Family Safari & Beach Escape","home-01.jpg","/safari","Safari"]];
  const visible = trips.filter((trip) => (location === "All locations" || trip[3] === location) && (price === "All prices" || price === "$2,286") && (duration === "Any duration" || duration === "8 days"));
  return <div className="shell home-ref-adventures"><div><h2>Kilimanjaro, Safari and Zanzibar.</h2><div className="home-ref-adventure-filters"><select aria-label="Filter by location" value={location} onChange={e => setLocation(e.target.value)}>{["All locations","Kilimanjaro","Safari","Zanzibar"].map(x=><option key={x}>{x}</option>)}</select><select aria-label="Filter by price" value={price} onChange={e => setPrice(e.target.value)}><option>All prices</option><option>$2,286</option></select><select aria-label="Filter by duration" value={duration} onChange={e => setDuration(e.target.value)}><option>Any duration</option><option>8 days</option></select></div></div><div className="home-ref-adventure-cards">{visible.map(([title,src,href],i)=><Link href={href} key={`${src}-${i}`}><Photo src={image(src)} alt="" /><h3>{title}</h3><small>8 DAYS</small><div className="home-ref-trip-bottom"><span className="home-ref-trip-price">starts from<br /><b>$2,286</b><br />per person</span><span className="home-ref-trip-link">View Trip</span></div></Link>)}</div></div>;
}

function HomeAdventureSelector() {
  const adventures = [
    { title: "Kilimanjaro", copy: "Choose a route and begin planning your mountain journey.", src: "figma-kili-routes-route-landscape.png", href: "/kilimanjaro" },
    { title: "Safari", copy: "Explore Tanzania's national parks, wildlife and open landscapes.", src: "figma-safari-packages-trip-card1.png", href: "/safari" },
    { title: "Zanzibar", copy: "Discover beaches, Stone Town and the Indian Ocean coast.", src: "figma-zanzibar-hero.png", href: "/zanzibar" },
    { title: "Tanzania Packages", copy: "Bring mountain, safari and coast together in one journey.", src: "figma-home-hero.png", href: "/plan-your-trip" },
  ];

  return <section className="home-ref-select">
    <div className="shell">
      <Intro eyebrow="" title="Select your Tanzanian adventure" copy="Whether you want to meet new people, travel privately with your people, or explore Tanzania independently, choose the safari style that fits your journey." />
      <div className="home-ref-select-cards">{adventures.map((adventure) => <Link href={adventure.href} key={adventure.title} className="home-ref-select-card">
        <Photo src={image(adventure.src)} alt="" />
        <div><h3>{adventure.title}</h3><p>{adventure.copy}</p><span>Explore <Image src={image("figma-kili-group-button-arrow.svg")} alt="" width={40} height={40} /></span></div>
      </Link>)}</div>
    </div>
  </section>;
}

function HomeRouteExplorer() {
  const routes = [
    { name: "Rongai Route", src: "route-map-rongai.png", alt: "Illustrated Kilimanjaro route map for the Rongai Route", href: "/kilimanjaro", copy: "The Rongai Route approaches Kilimanjaro from the north-east, following a quieter trail before joining the summit path near Kibo Hut." },
    { name: "Lemosho Route", src: "figma-home-map.png", alt: "Illustrated Kilimanjaro route map for the Lemosho Route", href: "/kilimanjaro", copy: "The Lemosho Route begins on the quieter western side of Kilimanjaro and is known for its spectacular scenery and excellent acclimatisation. With a longer itinerary and lower traffic during the first days, it is one of the most enjoyable ways to experience the mountain." },
    { name: "Machame Route", src: "route-map-machame.png", alt: "Illustrated Kilimanjaro route map for the Machame Route", href: "/kilimanjaro/machame-route", copy: "The Machame Route climbs from the south-west through Shira, Barranco and Karanga before reaching the summit approach from Barafu Camp." },
    { name: "Northern Circuit Route", src: "route-map-northern-circuit.png", alt: "Illustrated Kilimanjaro route map for the Northern Circuit Route", href: "/kilimanjaro", copy: "The Northern Circuit follows the western approach before circling Kilimanjaro's quieter northern slopes and turning toward the summit." },
    { name: "Marangu Route", src: "route-map-marangu.png", alt: "Illustrated Kilimanjaro route map for the Marangu Route", href: "/kilimanjaro", copy: "The Marangu Route approaches from the south-east, passing Mandara, Horombo and Kibo huts on the way to Uhuru Peak." },
  ];
  const [selectedIndex, setSelectedIndex] = useState(1);
  const selectedRoute = routes[selectedIndex];

  return <div className="shell home-ref-map">
    <div className="home-ref-route-image" aria-live="polite"><Photo key={selectedRoute.src} src={image(selectedRoute.src)} alt={selectedRoute.alt} /></div>
    <div className="home-ref-route-list"><h2>Routes that we offer</h2><div role="tablist" aria-label="Kilimanjaro routes">{routes.map((route, index) => <article key={route.name} className={index === selectedIndex ? "active" : ""}>
      <button type="button" role="tab" aria-selected={index === selectedIndex} aria-controls={`route-panel-${index}`} id={`route-tab-${index}`} onClick={() => setSelectedIndex(index)}>{index + 1}. {route.name}<span><ArrowIcon /></span></button>
      {index === selectedIndex && <div id={`route-panel-${index}`} role="tabpanel" aria-labelledby={`route-tab-${index}`}>{route.copy && <p>{route.copy}</p>}<Link href={route.href}>Explore route</Link></div>}
    </article>)}</div></div>
  </div>;
}

function HomeMoments() {
  const scroller = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(false);
  const moments = [
    ["figma-kili-routes-route-landscape.png", "Climbers crossing a snow-covered Kilimanjaro slope"],
    ["figma-kili-routes-route-landscape4.png", "Climbers crossing Kilimanjaro's alpine desert"],
    ["figma-kili-routes-route-landscape2.png", "Climbers walking through Kilimanjaro forest"],
    ["zanzibar-03.jpg", "Climbers resting above the clouds"],
    ["figma-kili-routes-route-landscape3.png", "Climbers crossing Kilimanjaro's green moorland"],
    ["figma-kili-why-image2.png", "Bathiel Expeditions climbing team"],
  ];
  const move = (direction: number) => {
    const viewport = scroller.current;
    if (!viewport) return;
    const next = Math.max(0, Math.min(viewport.scrollWidth - viewport.clientWidth, viewport.scrollLeft + direction * 253));
    viewport.scrollTo({ left: next, behavior: "smooth" });
    setPosition(next / Math.max(1, viewport.scrollWidth - viewport.clientWidth));
  };
  const seek = (percent: number) => {
    const viewport = scroller.current;
    if (!viewport) return;
    const next = Math.max(0, Math.min(100, percent)) / 100;
    setPosition(next);
    viewport.scrollTo({ left: next * Math.max(0, viewport.scrollWidth - viewport.clientWidth), behavior: "auto" });
  };
  useEffect(() => {
    const viewport = scroller.current;
    if (!viewport) return;
    const updateOverflow = () => {
      const scrollable = viewport.scrollWidth - viewport.clientWidth > 4;
      setHasOverflow(scrollable);
      if (!scrollable) setPosition(0);
    };
    updateOverflow();
    const observer = new ResizeObserver(updateOverflow);
    observer.observe(viewport);
    window.addEventListener("resize", updateOverflow);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateOverflow);
    };
  }, []);

  return <section className="home-ref-moments" id="moments"><div className="shell"><Intro eyebrow="" title="Unforgettable Moments in the Heart of Mount Kilimanjaro" copy="Experience breathtaking sunrises, explore volcanic landscapes, and create memories at one of Africa’s most iconic destinations." /></div><div className="home-ref-moment-viewport" ref={scroller} onScroll={event => setPosition(event.currentTarget.scrollLeft / Math.max(1, event.currentTarget.scrollWidth - event.currentTarget.clientWidth))}><div className="home-ref-moment-images">{moments.map(([src, alt], index) => <figure key={src} className={index === 3 ? "featured" : ""}><Photo src={image(src)} alt={alt} />{index === 3 && <figcaption><span>Sea of Sand Exploration</span><b aria-hidden="true"><ArrowIcon /></b><small>Cross the vast volcanic desert by 4×4 jeep or on foot.</small></figcaption>}</figure>)}</div></div>{hasOverflow && <div className="home-ref-moment-controls" aria-label="Moments gallery controls"><button type="button" onClick={() => move(-1)} aria-label="Previous moments" disabled={position <= 0}>←</button><input type="range" min="0" max="100" value={Math.round(position * 100)} aria-label="Moments slider position" aria-valuetext={`${Math.round(position * 100)}% through the moments gallery`} onChange={event => seek(Number(event.target.value))} style={{ background: `linear-gradient(90deg,#fff 0 ${Math.max(12, position * 100)}%,rgba(255,255,255,.25) ${Math.max(12, position * 100)}% 100%)` }} /><button type="button" onClick={() => move(1)} aria-label="Next moments" disabled={position >= .99}>→</button></div>}</section>;
}

export function HomeReferencePage() {
  const styleCards = [
    {eyebrow:"Travel Independently",title:"SOLO",subtitle:"Travel your way",copy:"A personalised safari designed around your interests, pace and plans.",best:"Best for: independent travellers",src:"figma-home-style1.png",href:"/plan-your-trip",action:"Start planning"},
    {eyebrow:"Just Your People",title:"PRIVATE GROUP",subtitle:"Travel with your people",copy:"A private vehicle and itinerary for your partner, family or friends.",best:"Best for: couples, family, friends",src:"figma-home-style2.png",href:"/plan-your-trip",action:"Start planning"},
    {eyebrow:"Social & Shared",title:"JOIN A GROUP",subtitle:"Meet new people",copy:"Join a small group and share the safari experience with other travellers.",best:"Best for: solo travellers & social travellers",src:"figma-home-style3.png",href:"/groups",action:"Check group dates"},
  ];
  return <><section className="home-ref-hero"><Photo src={image("figma-home-hero.png")} alt="" priority className="home-ref-hero-image" /><div className="home-ref-hero-scrim" /><Header active="Home" variant="classic" /><div className="shell home-ref-hero-copy"><h1>Climbing Kilimanjaro is an experience of a lifetime</h1><p>Three routes, chosen because they give you the acclimatisation days the mountain actually demands. Guides who have walked them since they were teenagers. And when your legs are done, the Serengeti and Zanzibar are a short flight away.</p><PrimaryLink>Start planning</PrimaryLink></div><aside className="home-ref-floating"><div className="home-ref-floating-top"><div className="home-ref-avatar-stack" aria-hidden="true">{["figma-home-team1.png","figma-home-team2.png","figma-home-team3.png"].map(src => <Photo key={src} src={image(src)} alt="" />)}<span>500+</span></div><strong>Summit Climbers</strong></div><p>Travel through volcanic landscapes, golden skies, and timeless beauty with expertly guided Mount Kilimanjaro tours.</p><Link href="/kilimanjaro">Book now <b><ArrowIcon /></b></Link></aside></section>
    <main><section className="home-ref-trust shell"><div><TripadvisorLogo /><span className="home-ref-rating-row">5.0 <RatingStars size={20} /></span><small>Rated from 23 reviews</small></div><div className="home-ref-photo-strip">{["figma-home-gallery1.png","figma-home-gallery2.png","figma-home-gallery3.png","figma-home-gallery4.png"].map((src,i)=><figure key={src}><Photo src={image(src)} alt={["Hikers on Kilimanjaro snow","Tanzania explorers","Kilimanjaro landscape","Tents on Mount Kilimanjaro"][i]} />{i===0&&<figcaption><b>A peak of Kilimanjaro</b><small>Where courage meets nature, reaching Tanzania’s highest peak.</small></figcaption>}</figure>)}</div></section>
      <section className="home-ref-styles shell"><Intro eyebrow="" title="Choose your travel style" copy="Whether you want to meet new people, travel privately with your people, or explore Tanzania independently, choose the safari style that fits your journey." /><div className="home-ref-style-grid">{styleCards.map(card=><article key={card.title}><Photo src={image(card.src)} alt="" /><div className="home-ref-style-label">{card.eyebrow}</div><div className="home-ref-style-copy"><h3>{card.title}</h3><span>{card.subtitle}</span><p>{card.copy}</p><small>{card.best}</small><Link href={card.href}>{card.action}<b><ArrowIcon /></b></Link></div></article>)}</div><div className="home-ref-stats">{[["5,895 m","Uhuru Peak, the Roof of Africa"],["94 %","Of our climbers reach it"],["7–9 day","On the mountain, three routes"],["$2,399","Uhuru Peak, the Roof of Africa"]].map(([stat,copy])=><div key={stat}><b>{stat}</b><span>{copy}</span></div>)}</div></section>
      <HomeAdventureSelector />
      <HomeMoments />
      <section className="home-ref-dark"><HomeRouteExplorer /><HomeAdventures /></section>
      <section className="home-ref-story"><div className="shell"><div className="home-ref-story-visual"><Photo src={image("figma-home-story-guide.png")} alt="Local guide with travellers in Tanzania" /><div className="home-ref-story-overlay"><Photo src={image("figma-home-story-climber.png")} alt="Climber above the clouds at sunset" /><Image className="home-ref-story-overlay-arrow" src={image("figma-kili-group-button-arrow.svg")} alt="" width={40} height={40} /><span>Betheli Expeditions is a proud Tanzanian owned tour operator company.</span><Image className="home-ref-story-brand" src={image("figma-home-story-brand.png")} alt="" width={133} height={86} /></div></div><div><h2>Your Trusted Guide to the Heart of Africa</h2><p>Betheli Expeditions is a proud Tanzanian-owned tour operator company, rooted in the ancient and revered Maasai tribe, known for our unwavering passion and deep reverence for wildlife. With over a decade of invaluable experience in the East African tourism industry, covering captivating destinations like Tanzania, Zanzibar, Kenya, Uganda, and Rwanda, we have embarked on a thrilling and challenging journey as the proprietors of Betheli Expeditions.</p><div className="home-ref-story-end"><strong>94%<small>of our travelers<br />reach the summit</small></strong><Link href="/zanzibar"><Photo src={image("figma-home-story-zanzibar.png")} alt="Zanzibar beach" /><Image src={image("figma-home-story-card-arrow.svg")} alt="" width={31} height={31} />Zanzibar island</Link><Link href="/safari"><Photo src={image("figma-home-story-wildlife.png")} alt="Cheetahs in Tanzania" /><Image src={image("figma-home-story-card-arrow.svg")} alt="" width={31} height={31} />Wildlife safari</Link></div></div></div></section>
      <section className="home-ref-team shell" id="team"><Intro eyebrow="" title="Meet the team" copy="Whether you want to meet new people, travel privately with your people, or explore" /><div>{[1,2,3].map(i=><article key={i}><Photo src={image(`figma-home-team${i}.png`)} alt="Bathiel Expeditions team member" /><h3>Jacqueline Laizer</h3><p>Co-Founder of Betheli Expeditions</p></article>)}</div></section>
      <div id="reviews"><Testimonials /></div><CtaBanner title="Ready to Climb Kilimanjaro?" image={image("figma-kili-group-trip-landscape3.png")} />
      <HomeFaq /></main><HomeFooter /></>;
}

function TripAccommodation({ day, mealPlan, signature, premium }: { day: number; mealPlan: string; signature?: string; premium?: string }) {
  const confirmed = Boolean(signature && premium);
  const [selectedTier, setSelectedTier] = useState<"signature" | "premium">("signature");
  const [mealInfoOpen, setMealInfoOpen] = useState(false);
  const options = {
    signature: {
      label: "Signature",
      property: signature ?? "Property to be confirmed",
      icon: "figma-trips-signature-star.svg",
      image: "figma-trips-lodge-photo.png",
      alt: "Signature lodge accommodation",
    },
    premium: {
      label: "Premium",
      property: premium ?? "Property to be confirmed",
      icon: "figma-trips-premium-crown.svg",
      image: day % 2 === 0 ? "figma-trips-day2.png" : "figma-trips-day1.png",
      alt: "Premium safari accommodation",
    },
  } as const;
  const selected = options[selectedTier];
  return <>
    <div className="trip-ref-day-meta">
      <span className="trip-ref-accommodation-label"><Image src={image("figma-trips-accommodation.svg")} alt="" width={45} height={45} />Day {day} | Accommodation</span>
      <button className="trip-ref-meal" type="button" aria-expanded={mealInfoOpen} aria-controls={`meal-note-${day}`} onClick={() => setMealInfoOpen(open => !open)}><Image src={image("figma-trips-meal.png")} alt="" width={20} height={20} />Meal Plan: {mealPlan}<Image src={image("figma-trips-meal-info.svg")} alt="More information" width={20} height={20} /></button>
    </div>
    {mealInfoOpen && <p className="trip-ref-meal-note" id={`meal-note-${day}`}>The daily meal plan and any dietary arrangements are confirmed in your final trip proposal.</p>}
    <div className="trip-ref-lodge">
      <div className="trip-ref-lodge-options" role="group" aria-label={`Day ${day} accommodation options`}>
        <p>Options based on your packages:</p>
        {(Object.keys(options) as Array<keyof typeof options>).map((tier) => {
          const option = options[tier];
          const selectedOption = selectedTier === tier;
          return <button type="button" className={`trip-ref-lodge-option${selectedOption ? " active" : ""}`} aria-pressed={selectedOption} onClick={() => setSelectedTier(tier)} key={tier}><span className="trip-ref-lodge-tier"><span className="trip-ref-lodge-tier-icon"><Image src={image(option.icon)} alt="" width={28} height={28} /></span>{option.label}</span><span className="trip-ref-lodge-name">{option.property}</span></button>;
        })}
        {!confirmed && <small>Accommodation options will be confirmed in your trip proposal.</small>}
      </div>
      <figure aria-live="polite"><Photo key={selected.image} src={image(selected.image)} alt={selected.alt} /><figcaption>{confirmed ? `${selected.label} accommodation option` : `Illustrative ${selected.label.toLowerCase()} accommodation`}</figcaption></figure>
    </div>
  </>;
}

const tripInclusionChapters = [
  {
    marker: "01 / PREPARATION", title: "Before your safari", description: "Get ready for the journey ahead.",
    items: [
      { icon: "route", title: "Arrival and departure transfers", description: "Transfers at the start and end of your trip." },
      { icon: "clipboard", title: "Pre-safari briefing", description: "Review your day-by-day plan and practical arrangements before setting off." },
    ],
  },
  {
    marker: "02 / SAFARI DAYS", title: "On safari", description: "The vehicle, guiding and daily essentials.",
    items: [
      { icon: "ticket", title: "Park and conservation fees", description: "Entry fees listed in your confirmed proposal." },
      { icon: "mountain", title: "Professional safari guide", description: "Local guiding throughout the route." },
      { icon: "backpack", title: "4×4 safari vehicle", description: "A vehicle arranged for the group and itinerary." },
      { icon: "tent", title: "Accommodation as confirmed", description: "Lodge or camp nights selected for your package." },
      { icon: "utensils", title: "Meals as listed", description: "Meal plans confirmed for each overnight stay." },
      { icon: "droplets", title: "Drinking water", description: "Water provisions for safari days as confirmed." },
    ],
  },
  {
    marker: "03 / ONGOING CARE", title: "Support throughout", description: "Care and coordination along the way.",
    items: [
      { icon: "heart", title: "Thoughtful pacing and practical support", description: "Help with the day-to-day details of your journey." },
      { icon: "message", title: "On-trip coordination and support", description: "Help with the day-to-day details of your safari." },
    ],
  },
];

function TripFacts() {
  const facts = [
    { label: "Itinerary for", value: "Northern Serengeti Safari", icon: "route" },
    { label: "Travel Dates", value: "To be confirmed", icon: "calendar" },
    { label: "Guests", value: "2 Adults", icon: "guests" },
  ] as const;
  return <div className="trip-ref-facts">{facts.map(fact => <div className="trip-ref-fact" key={fact.label}><span className="trip-ref-fact-icon" aria-hidden="true"><TripFactIcon type={fact.icon} /></span><span><small>{fact.label}</small><strong>{fact.value}</strong></span></div>)}</div>;
}

function TripFactIcon({ type }: { type: "route" | "calendar" | "guests" }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" focusable="false">
    {type === "route" && <><path d="M3 19.5 9 5l3.1 7.2 2.3-4.8L21 19.5H3Z" /><path d="m6.6 14 2.3 1.5 2.1-1.3 2.1 1.4 2-1.2" /></>}
    {type === "calendar" && <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18" /><path d="m9.5 15.5 1.7 1.7 3.5-3.6" /></>}
    {type === "guests" && <><circle cx="9" cy="8" r="3" /><path d="M3.5 20v-1.5a5.5 5.5 0 0 1 11 0V20h-11Z" /><path d="M16 5.2a3 3 0 0 1 0 5.6M17.2 13a5.5 5.5 0 0 1 3.3 5v2H18" /></>}
  </svg>;
}

const tripEnvironments = [
  { icon: "🌳", title: "Tarangire", altitude: "Baobabs & elephants", photo: "figma-safari-destinations-destination-photograph2.png", copy: "Tarangire combines open savannah, ancient baobabs and seasonal wildlife around the river. Game drives are paced around the day’s conditions and your group’s interests." },
  { icon: "⛰️", title: "Ngorongoro", altitude: "Crater floor", photo: "figma-safari-destinations-destination-photograph1.png", copy: "The crater’s grasslands, woodland and soda lake create a compact wildlife landscape. Your guide helps shape the day around the best conditions and a respectful pace." },
  { icon: "🦓", title: "Central Serengeti", altitude: "Open plains", photo: "figma-safari-packages-trip-card1.png", copy: "Central Serengeti offers long horizons, resident wildlife and a strong base for game drives as the route moves north." },
  { icon: "🌾", title: "Northern Serengeti", altitude: "Migration country", photo: "figma-trips-lion-photo.png", copy: "Northern Serengeti is shaped by the seasonal movement of wildebeest and zebra. Exact sightings and river crossings can never be guaranteed." },
  { icon: "🌊", title: "Mara River", altitude: "Seasonal crossings", photo: "figma-trips-hero.png", copy: "The Mara River is a dramatic landscape to explore with your guide. Wildlife movements, water levels and road conditions guide the day’s plan." },
];

function TripEnvironments() {
  const [selected, setSelected] = useState(1);
  const current = tripEnvironments[selected];
  return <section className="ref-section ref-dark trip-ref-environments" aria-labelledby="trip-environments-title"><div className="shell trip-ref-environments-grid">
    <div className="trip-ref-environment-photo" aria-live="polite"><Photo src={image(current.photo)} alt={`${current.title} on safari`} /></div>
    <div className="trip-ref-environment-content"><h2 id="trip-environments-title">Landscapes of Northern Tanzania</h2><div className="trip-ref-environment-options">{tripEnvironments.map((zone, index) => <div className="trip-ref-environment-option" key={zone.title}><button type="button" aria-expanded={selected === index} aria-controls={`trip-environment-detail-${index}`} onClick={() => setSelected(index)}><span aria-hidden="true">{zone.icon}</span>{zone.title} <small>{zone.altitude}</small></button>{selected === index && <p id={`trip-environment-detail-${index}`}>{zone.copy}</p>}</div>)}</div></div>
  </div></section>;
}

const tripFaqItems = [
  { category: "Booking", question: "Is airfare included in the package price?", answer: faqAnswers["Is airfare included in the package price?"] },
  { category: "Kilimanjaro", question: "How difficult is Kilimanjaro?", answer: faqAnswers["How difficult is Kilimanjaro?"] },
  { category: "Safari", question: "Will I see the Big Five or the Migration?", answer: faqAnswers["Will I see the Big Five or the Migration?"] },
  { category: "Zanzibar", question: "Which coast should I choose?", answer: faqAnswers["Which coast should I choose?"] },
  { category: "Travel", question: "Do I need a visa for Tanzania?", answer: faqAnswers["Do I need a visa for Tanzania?"] },
  { category: "General", question: "Can I combine Kilimanjaro, safari and Zanzibar?", answer: faqAnswers["Can I combine Kilimanjaro, safari and Zanzibar?"] },
];

function TripFaq() {
  const [category, setCategory] = useState("All");
  const categories = ["All", "Booking", "Kilimanjaro", "Safari", "Zanzibar", "Travel", "General"];
  const items = tripFaqItems.filter(item => category === "All" || item.category === category).map(item => [item.question, item.answer]);
  return <section className="ref-section trip-ref-faq" id="questions"><div className="shell"><h2>Frequently Asked Questions</h2><p>Useful answers for the first conversation and the planning that follows.</p><div className="trip-ref-faq-toolbar"><div className="trip-ref-faq-tabs" role="group" aria-label="Filter frequently asked questions">{categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><PrimaryLink>Start planning</PrimaryLink></div><Accordion key={category} items={items} openCount={0} /></div></section>;
}

export function TripsReferencePage() {
  const [openDays, setOpenDays] = useState<Set<number>>(() => new Set([0]));
  const days = [
    { title: "Arrival", copy: "The group arrives at Kilimanjaro International Airport (JRO). A Betheli Expeditions representative meets you and transfers you to your hotel in Arusha.", image: "figma-trips-day1.png", alt: "Arrival in Arusha", experience: "Settle in, meet your travel team and take time to rest after your flight. Your guide will confirm the following morning’s departure, luggage arrangements and the rhythm of the safari ahead.", mealPlan: "Half Board", signature: "Ngare Sero Mountain Lodge 4*", premium: "Elewana Arusha Coffee Lodge 5*" },
    { title: "Tarangire National Park", copy: "Leave Arusha for Tarangire National Park, a landscape of baobabs, open grassland and elephant herds. Timings and activities are confirmed with your guide.", image: "figma-trips-day2.png", alt: "Safari wildlife in Tarangire", experience: "Enjoy an unhurried first game drive as you get used to the vehicle and the pace of safari days. Tarangire’s river and ancient baobabs create a beautiful setting for watching wildlife in the afternoon light.", mealPlan: "Full Board" },
    { title: "Ngorongoro Crater", copy: "Travel to the Ngorongoro Conservation Area and descend into the crater to explore one of East Africa’s most remarkable wildlife habitats.", image: "figma-safari-destinations-destination-photograph1.png", alt: "Ngorongoro Crater landscape", experience: "The crater floor brings grassland, woodland and lake edges into one extraordinary day. Your guide follows wildlife movement and road conditions, leaving room for quiet observation as well as classic big-game sightings.", mealPlan: "Full Board" },
    { title: "Central Serengeti", copy: "Continue into the Serengeti, with game viewing along the way as the landscape opens into long horizons and kopjes.", image: "figma-trips-lion-photo.png", alt: "Lion in the Central Serengeti", experience: "Arriving in the central plains is part of the experience: every transfer can become a game drive. Keep your camera ready for lions, giraffe, zebra and the smaller moments that make the Serengeti feel alive.", mealPlan: "Full Board" },
    { title: "Northern Serengeti", copy: "Explore Northern Serengeti and the Mara River region, where seasonal migration movements shape the day’s route.", image: "figma-safari-packages-trip-card1.png", alt: "Wildebeest and zebra in Northern Serengeti", experience: "Spend time around the northern plains and river country with the flexibility to follow wildlife. From July to October, wildebeest and zebra may gather near the Mara River, but crossings and sightings are always guided by nature rather than a timetable.", mealPlan: "Full Board" },
    { title: "Northern Serengeti to Arusha", copy: "Take a final morning in the north before beginning the return journey to Arusha. Your exact travel arrangement is confirmed with the team.", image: "figma-trips-hero.png", alt: "Northern Tanzania safari landscape", experience: "Use the final drive to reflect on the landscapes, wildlife and people you have met along the way. Your team can help with onward travel details and a smooth connection to the next part of your journey.", mealPlan: "Breakfast" },
  ];
  const allDaysOpen = openDays.size === days.length;
  return <><section className="trip-ref-hero" id="general"><Photo src={image("figma-trips-hero.png")} alt="" priority sizes="100vw" /><div className="trip-ref-hero-shade" /><Header active="Home" variant="classic" /><div className="shell trip-ref-hero-copy"><p>From <b>$1,732</b></p><h1>6-Day Northern Serengeti River Crossing Safari</h1><p>A migration-focused safari through Tarangire, Central Serengeti, Northern Serengeti and Ngorongoro, with a full day at the Mara River.</p><div className="trip-ref-rating"><TripadvisorLogo light compact /><small>5.0 <RatingStars size={14} /></small></div></div></section>
    <TripSectionNav />
    <main><section className="ref-section ref-dark trip-ref-overview" id="overview"><div className="shell"><div><h2>6-Day Northern Serengeti River Crossing Safari</h2><p>Experience Tanzania’s Great Migration on this 6-day safari through Tarangire, Central Serengeti, Northern Serengeti and Ngorongoro Crater. Designed around the river-crossing season, the journey includes a full day exploring Northern Serengeti and the Mara River, where wildebeest and zebra gather in dramatic numbers.</p><p>From the elephant-filled plains of Tarangire to the dramatic Mara River and the endless Serengeti, this safari brings together Tanzania’s unforgettable landscapes, diverse wildlife and the extraordinary spectacle of the Great Migration.</p><TripFacts /></div><Photo src={image("figma-trips-day2.png")} alt="Safari travellers in Northern Tanzania" /></div></section>
<section className="ref-section trip-ref-itinerary" id="itinerary"><div className="shell"><aside><span className="trip-ref-map-hint">Tap for a closer look <Image src={image("figma-trips-map-search.svg")} alt="" width={20} height={20} /></span><Photo src={image("figma-trips-map-photo.png")} alt="Illustrative Northern Tanzania safari route map" /><h3>Destinations Included</h3><ul><li>Tarangire National Park</li><li>Ngorongoro Crater</li><li>Central Serengeti</li><li>Northern Serengeti – Mara River</li></ul><div className="trip-ref-quote"><div className="trip-ref-quote-heading"><Image src={image("figma-trips-quote-plan.svg")} alt="" width={20} height={18} /><span>Plan Trip</span></div><h3>Experience the 6-Day Northern Serengeti Safari for yourself.</h3><p>Speak with a senior planner for a thoughtful first proposal built around your dates and priorities.</p><div className="trip-ref-quote-actions"><Link href="/plan-your-trip" className="trip-ref-quote-button">Request a Quote<Image src={image("figma-trips-quote-arrow.svg")} alt="" width={34} height={34} /></Link><a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="trip-ref-quote-whatsapp"><Image src={image("figma-trips-quote-whatsapp.svg")} alt="" width={31} height={31} />WhatsApp Us</a></div></div></aside><div><div className="trip-ref-itinerary-title"><h2>Itinerary</h2><button type="button" aria-expanded={allDaysOpen} onClick={()=>setOpenDays(allDaysOpen ? new Set() : new Set(days.map((_, index) => index)))}>{allDaysOpen ? "Collapse All Days" : "Show All Days"}</button></div>{days.map((day,i)=><details key={day.title} open={openDays.has(i)}><summary onClick={(event)=>{event.preventDefault();setOpenDays(current=>{const next=new Set(current);if(next.has(i))next.delete(i);else next.add(i);return next;});}}><span className="trip-ref-day-number">Day {i+1}</span><span className="trip-ref-day-dot" aria-hidden="true" /><span className="trip-ref-day-name">{day.title}</span><Image className="trip-ref-day-chevron" src={image("figma-trips-itinerary-chevron.svg")} alt="" width={50} height={50} /></summary><p>{day.copy}</p><div className="trip-ref-day-experience"><Photo src={image(day.image)} alt={day.alt} /><p>{day.experience}</p></div><TripAccommodation day={i+1} mealPlan={day.mealPlan} signature={day.signature} premium={day.premium} /></details>)}</div></div></section>
      <TripEnvironments />
      <section className="ref-section trip-ref-inclusions" id="inclusions"><div className="shell"><Intro eyebrow="YOUR SAFARI, TAKEN CARE OF" title="What’s included in your safari" copy="Use this checklist when planning your enquiry. All package details are subject to confirmation in your quote." /><div className="trip-ref-chapters">{tripInclusionChapters.map(chapter=><article className="trip-ref-chapter" key={chapter.title}><div className="trip-ref-chapter-heading"><span>{chapter.marker}</span><h3>{chapter.title}</h3><p>{chapter.description}</p></div><div className="trip-ref-chapter-items">{chapter.items.map(item=><div className="trip-ref-chapter-item" key={item.title}><Image src={image(`figma-trips-inclusion-${item.icon}.svg`)} alt="" width={24} height={24} /><h4>{item.title}</h4><p>{item.description}</p></div>)}</div></article>)}</div></div></section>
      <section className="ref-section trip-ref-exclusions" id="exclusions"><div className="shell"><Intro eyebrow="BEFORE YOU BOOK" title="Exclusions" copy="Every trip is planned around your dates and group. Ask us for a written quote confirming exactly what is and is not included." /></div></section>
      <CtaBanner title="Ready to experience Northern Serengeti?" text="Share your dates and travel style, then let’s shape a safari with the right pace, accommodation and time in the places that matter to you." image={image("figma-trips-cta.png")} />
      <Testimonials />
      <ImageCards eyebrow="Related Trips" title="You Might Also Like" cards={relatedTrips} variant="climbs" className="trip-ref-related" />
      <TripFaq /></main><Footer /></>;
}
