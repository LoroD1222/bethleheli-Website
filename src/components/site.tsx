"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { PageKey } from "@/lib/routes";
import { sendEnquiry } from "@/lib/enquiry";
import { whatsappHref, whatsappNumber } from "@/lib/whatsapp";
import { HomeFooter } from "@/components/home-footer";

const navItems = [
  ["Home", "/"], ["Kilimanjaro", "/kilimanjaro"], ["Safari", "/safari"], ["Zanzibar", "/zanzibar"],
  ["Group Climbs", "/groups"], ["About", "/#team"], ["Contact", "/contact"],
] as const;
const navSubmenus: Record<string, readonly (readonly [string, string])[]> = {
  Kilimanjaro: [["Kilimanjaro overview", "/kilimanjaro"], ["Machame Route", "/kilimanjaro/machame-route"], ["Lemosho Route", "/kilimanjaro/lemosho-route"], ["Marangu Route", "/kilimanjaro/marangu-route"], ["Rongai Route", "/kilimanjaro/rongai-route"], ["Northern Circuit", "/kilimanjaro/northern-circuit"], ["Umbwe Route", "/kilimanjaro/umbwe-route"], ["Group climbs", "/groups"]],
};
const mobileNavItems = [
  ["Home", "/"], ["Kilimanjaro", "/kilimanjaro"], ["Safari", "/safari"], ["Zanzibar", "/zanzibar"],
  ["Group Climbs", "/groups"], ["About", "/#team"], ["Contact", "/contact"],
] as const;

const photos = {
  summit: "/images/figma-home-hero.png",
  climbers: "/images/figma-kili-intro-climbers-above-the-clouds.png",
  trail: "/images/figma-faq-hero.png",
  team: "/images/home-06.png",
  guide: "/images/home-07.png",
  silhouette: "/images/home-14.jpg",
  cheetah: "/images/home-15.jpg",
  safari: "/images/figma-safari-hero.png",
  safari2: "/images/safari-03.jpg",
  safari3: "/images/safari-04.jpg",
  safari4: "/images/safari-06.jpg",
  zanzibar: "/images/figma-zanzibar-hero.png",
  beach: "/images/zanzibar-03.jpg",
  coast: "/images/zanzibar-04.jpg",
  stoneTown: "/images/zanzibar-05.jpg",
  ocean: "/images/zanzibar-06.jpg",
  plan: "/images/figma-plan-hero.png",
};

export function Photo({ src, alt, className = "", priority = false, sizes }: { src: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  return <Image className={className} src={src} alt={alt} width={1200} height={800} sizes={sizes || (className.includes("hero") ? "100vw" : "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw")} loading={priority ? "eager" : "lazy"} />;
}

export function ArrowIcon() { return <svg className="arrow-icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M5 15 15 5M6 5h9v9" /></svg>; }
function Arrow() { return <span className="arrow" aria-hidden="true"><ArrowIcon /></span>; }
export function RatingStars({ size = 16 }: { size?: number }) {
  return <span className="rating-stars" role="img" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <svg key={index} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="m10 1.8 2.48 5.03 5.55.81-4.02 3.91.95 5.53L10 14.47l-4.96 2.61.95-5.53-4.02-3.91 5.55-.81L10 1.8Z" /></svg>)}</span>;
}
function Stars({ summary = false }: { summary?: boolean }) { return <Image className="figma-review-stars" src={summary ? "/images/figma-testimonial-rating-summary.svg" : "/images/figma-testimonial-stars.svg"} alt="5 out of 5 stars" width={summary ? 114 : 96} height={summary ? 18 : 16} />; }

export function PrimaryLink({ href = "/plan-your-trip", children = "Start planning", dark = false, onClick }: { href?: string; children?: React.ReactNode; dark?: boolean; onClick?: () => void }) {
  return <Link href={href} className={`button ${dark ? "button-dark" : ""}`} onClick={onClick}>{children}<Arrow /></Link>;
}

function Logo({ onClick }: { onClick?: () => void } = {}) {
  return <Link href="/" className="logo" aria-label="Betheli Expeditions home" onClick={onClick}><Image src="/images/logo.png" alt="Betheli Expeditions" width={1672} height={940} loading="eager" /></Link>;
}

export function TripadvisorLogo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return <Image className={`tripadvisor-logo${light ? " tripadvisor-logo-light" : ""}${compact ? " tripadvisor-logo-compact" : ""}`} src="/images/tripadvisor-logo.svg" alt="Tripadvisor" width={211} height={34} />;
}

function navigationItemIsCurrent(pathname: string, href: string) {
  if (href.includes("#")) return false;
  if (href === "/kilimanjaro") return pathname === href || pathname.startsWith("/kilimanjaro/");
  return pathname === href;
}

export function Header({ overlay = true }: { overlay?: boolean; active?: string; variant?: "destinations" | "classic" }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // All pages use the same route map. The previous classic/destinations split
  // made the menu appear to change from page to page and could mark the wrong
  // item as active after a client-side transition.
  const items = navItems;

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const closeMenu = () => {
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      } else if (event.key === "Tab" && drawerRef.current) {
        const focusable = Array.from(drawerRef.current.querySelectorAll<HTMLElement>("button, a[href]"));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!drawerRef.current.contains(document.activeElement)) {
          event.preventDefault();
          first?.focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    window.addEventListener("popstate", closeMenu);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("popstate", closeMenu);
    };
  }, [open]);

  return <><header className={`site-header ${overlay ? "site-header-overlay" : "site-header-solid"}`}>
    <div className="shell header-inner">
      <Logo />
      <button ref={toggleRef} type="button" className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(value => !value)}><span /><span /><span /></button>
      <nav id="main-nav" className="main-nav" aria-label="Main navigation">
        {items.map(([label, href]) => {
          const current = navigationItemIsCurrent(pathname, href);
          return <Link key={href} href={href} aria-current={current ? "page" : undefined} className={current ? "active" : undefined}>{label}</Link>;
        })}
      </nav>
      <PrimaryLink href="/plan-your-trip">Plan Your Trip</PrimaryLink>
    </div>
  </header>{open && createPortal(<div className="mobile-menu">
    <button type="button" className="mobile-menu-backdrop" aria-label="Close navigation" tabIndex={-1} onClick={() => { setOpen(false); toggleRef.current?.focus(); }} />
    <div className="mobile-menu-drawer" ref={drawerRef} id="mobile-nav" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <div className="mobile-menu-head"><Logo onClick={() => setOpen(false)} /><button ref={closeRef} type="button" className="mobile-menu-close" aria-label="Close navigation" onClick={() => { setOpen(false); toggleRef.current?.focus(); }}><span /><span /></button></div>
      <p className="mobile-menu-eyebrow">Explore Betheli</p>
      <nav className="mobile-menu-links" aria-label="Mobile navigation links">
        {mobileNavItems.map(([label, href], index) => {
          const current = navigationItemIsCurrent(pathname, href);
          return <Link key={href} href={href} aria-current={current ? "page" : undefined} className={current ? "active" : undefined} onClick={() => setOpen(false)}><span className="mobile-menu-number">{String(index + 1).padStart(2, "0")}</span><span>{label}</span><ArrowIcon /></Link>;
        })}
      </nav>
      <details className="mobile-route-menu">
        <summary>Kilimanjaro routes <span aria-hidden="true">⌄</span></summary>
        <div>{navSubmenus.Kilimanjaro.slice(1, -1).map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>{label}<ArrowIcon /></Link>)}</div>
      </details>
      <div className="mobile-menu-footer"><PrimaryLink href="/plan-your-trip" onClick={() => setOpen(false)}>Plan Your Trip</PrimaryLink><p>Your journey, your pace. Planned with a local team.</p></div>
    </div>
  </div>, document.body)}</>;
}

/** Adds a restrained entrance treatment after an element enters the viewport.
 * Keeping the class client-only means the page remains fully readable without
 * JavaScript or for visitors who prefer reduced motion. */
export function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const selectors = [
      ".ref-section .ref-intro", ".ref-section .ref-intro-split", ".ref-section .ref-image-card",
      ".home-ref-styles article", ".home-ref-select-card", ".home-ref-story > .shell",
      ".testimonial-section .testimonials-heading", ".testimonial-section .review-card", ".cta-banner",
      ".contact-layout", ".plan-layout",
    ].join(",");
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selectors));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px" });

    nodes.forEach((node, index) => {
      node.classList.remove("is-revealed");
      node.classList.add("scroll-reveal");
      node.style.setProperty("--reveal-delay", `${Math.min(index % 5, 3) * 55}ms`);
      observer.observe(node);
    });
    return () => {
      observer.disconnect();
      nodes.forEach((node) => {
        node.classList.remove("scroll-reveal", "is-revealed");
        node.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}

export function Footer() {
  return <HomeFooter />;
}

export function Hero({ eyebrow, title, text, image, children, short = false }: { eyebrow?: string; title: string; text: string; image: string; children?: React.ReactNode; short?: boolean }) {
  return <section className={`hero ${short ? "hero-short" : ""}`}>
    <Photo src={image} alt="" priority className="hero-image" sizes="100vw" />
    <div className="hero-scrim" />
    <Header overlay />
    <div className="shell hero-content">
      {eyebrow && <p className="eyebrow light">{eyebrow}</p>}
      <h1>{title}</h1><p>{text}</p>
      <div className="hero-actions">{children || <><PrimaryLink /><Link className="ghost-button" href="/groups">Explore the mountain <Arrow /></Link></>}</div>
    </div>
  </section>;
}

function TrustRow() { return <div className="trust-row"><span>✦ TripAdvisor</span><Stars /><i /> <span>Trusted local team</span><i /><span>Flexible planning</span><i /><span>24/7 support</span></div>; }

export function SectionIntro({ eyebrow, title, text, align = "center" }: { eyebrow?: string; title: string; text?: string; align?: "center" | "left" }) {
  return <div className={`section-intro ${align}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

const styles = [
  { title: "SOLE ESCAPE", text: "A personalised safari designed around your pace, interests, and comfort.", image: "/images/figma-home-style1.png", href: "/plan-your-trip" },
  { title: "PRIVATE GROUP", text: "A private climb and itinerary for your friends, family, or team.", image: "/images/figma-home-style2.png", href: "/plan-your-trip" },
  { title: "JOIN A GROUP", text: "Join a small group and share the safari adventure with fellow travellers.", image: "/images/figma-home-style3.png", href: "/groups" },
];

export function StyleCards() { return <div className="style-grid">{styles.map((item) => <article className="style-card" key={item.title}><Photo src={item.image} alt="" /><div /><h3>{item.title}</h3><p>{item.text}</p><Link href={item.href}>Start planning <Arrow /></Link></article>)}</div>; }

function StatRow() { return <div className="stat-row"><div><strong>5,895 m</strong><span>Uhuru Peak, the Roof of Africa</span></div><div><strong>94 %</strong><span>of our travellers reach the summit</span></div><div><strong>7 - 9 day</strong><span>climbs for better acclimatisation</span></div><div><strong>$2,399</strong><span>guide price for a climb</span></div></div>; }

const destinations = [
  { title: "Lemosho Route", subtitle: "A wild beginning / 8 days", image: photos.trail, href: "/kilimanjaro/lemosho-route" },
  { title: "Machame Route", subtitle: "The whisky route / 7 days", image: photos.summit, href: "/kilimanjaro/machame-route" },
  { title: "Serengeti", subtitle: "Wildlife in its element", image: photos.safari, href: "/safari" },
  { title: "Zanzibar Island", subtitle: "A slower, brighter finish", image: photos.zanzibar, href: "/zanzibar" },
];

function DestinationCards({ items = destinations }: { items?: { title: string; subtitle: string; image: string; href: string }[] }) {
  return <div className="destination-grid">{items.map((item) => <Link className="destination-card" href={item.href} key={item.title}><Photo src={item.image} alt={item.title} /><div /><span>{item.subtitle}</span><h3>{item.title}</h3><b>View journey <Arrow /></b></Link>)}</div>;
}

const reviews = [
  { name:"Sarah B.", date:"September 2026 • Solo traveler", category:"Lemosho Route", quote:"The Lemosho route felt like the perfect balance of scenery and acclimatization.", copy:"My guide, Ola, was professional, patient, and incredibly knowledgeable. The itinerary was well paced, the camp support was excellent, and the summit sunrise was unforgettable. I felt supported every step of the way.", tags:["7 days","Solo traveler","Summit reached"], image:"/images/safari-06.jpg", avatar:"/images/home-03.png" },
  { name:"Daniel K.", date:"October 2026 • Family of four", category:"Family Safari", quote:"Our family safari was perfectly paced for kids and adults alike.", copy:"The vehicle was comfortable, the guide was excellent with our children, and the itinerary felt flexible when we needed extra time. We saw incredible wildlife, enjoyed beautiful camps, and left with memories we’ll share for years.", tags:["8 days","Family safari","Serengeti & Ngorongoro"], image:"/images/zanzibar-03.jpg", avatar:"/images/home-04.jpg" },
  { name:"Maya R.", date:"November 2026 • Couple", category:"Zanzibar Extension", quote:"The Zanzibar extension was the perfect way to unwind after the climb.", copy:"The beach lodge was beautiful, the transfers were seamless, and the local recommendations were spot on. We loved the mix of relaxation, Stone Town exploration, and sunset sailing. It felt like a second vacation built right into the trip.", tags:["4 days","Couple","Zanzibar extension"], image:"/images/safari-07.jpg", avatar:"/images/home-15.jpg" },
  { name:"James O.", date:"December 2026 • Private group", category:"Machame Route", quote:"The team handled every detail so we could focus on the climb.", copy:"Communication was clear from planning to departure, the crew was friendly and experienced, and the logistics were flawless. We appreciated the flexibility when weather changed and the reassurance when the group needed extra support.", tags:["6 days","Private group","Machame Route"], image:"/images/figma-home-gallery1.png", avatar:"/images/home-07.png" },
];

export function Testimonials() {
  const scroller = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(false);
  const activeReviewRef = useRef(0);
  const updatePosition = () => {
    const viewport = scroller.current;
    if (!viewport) return;
    const maxScroll = Math.max(1, viewport.scrollWidth - viewport.clientWidth);
    const nextPosition = viewport.scrollLeft / maxScroll;
    const nextReview = Math.round(nextPosition * (reviews.length - 1));
    setPosition(nextPosition);
    activeReviewRef.current = nextReview;
    setActiveReview(nextReview);
  };
  useEffect(() => {
    const viewport = scroller.current;
    if (!viewport) return;
    const updateOverflow = () => {
      const scrollable = viewport.scrollWidth - viewport.clientWidth > 4;
      setHasOverflow(scrollable);
      if (!scrollable) {
        setPosition(0);
        setActiveReview(0);
        activeReviewRef.current = 0;
      }
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
  const seek = (percent: number) => {
    const viewport = scroller.current;
    if (!viewport) return;
    const next = Math.max(0, Math.min(100, percent)) / 100;
    setPosition(next);
    activeReviewRef.current = Math.round(next * (reviews.length - 1));
    setActiveReview(activeReviewRef.current);
    viewport.scrollTo({ left: next * Math.max(0, viewport.scrollWidth - viewport.clientWidth), behavior: "smooth" });
  };
  const progress = 25 + position * 75;
  return <section className="testimonial-section"><div className="shell"><div className="testimonials-heading"><SectionIntro eyebrow="" title="What our customers say" text="Real stories from travelers who climbed, explored, and relaxed with Betheli Expeditions." align="left" /><div className="testimonial-rating-summary"><div className="testimonial-rating-copy"><strong>5.0 Reviews</strong><small>23 verified reviews</small></div><Stars summary /></div></div><div className="review-grid" ref={scroller} onScroll={updatePosition}>{reviews.map(review => <article className="review-card" key={review.name}><div className="review-visual"><Photo src={review.image} alt="" /><span>{review.category}</span></div><div className="review-copy"><div className="review-person"><Photo src={review.avatar} alt="" /><div><div className="review-stars"><Stars /> <b>5.0</b></div><strong>{review.name}</strong><small>{review.date}</small></div></div><h3>“{review.quote}”</h3><p>{review.copy}</p><div className="review-tags">{review.tags.map(tag => <span key={tag}>{tag}</span>)}</div><footer><Photo src="/images/home-12.png" alt="" /><span>Read full review on Trip Advisor</span></footer></div></article>)}</div>{hasOverflow && <div className="review-controls" aria-label="Review carousel controls"><input type="range" min="0" max="100" value={Math.round(position * 100)} aria-label="Review slider position" aria-valuetext={`${activeReview + 1} of ${reviews.length} reviews`} onChange={event => seek(Number(event.target.value))} style={{ background: `linear-gradient(90deg,#fff 0 ${progress}%,rgba(255,255,255,.3) ${progress}% 100%)` }} /><span className="review-count">{activeReview + 1} of {reviews.length} reviews</span></div>}</div></section>;
}

const commonFaqs = [
  ["What is included in the package price?", "Every trip is planned around your dates, interests and group. The final inclusions are confirmed in a written proposal before booking."],
  ["Is airfare included in the package price?", "Airfare is confirmed separately as part of your final itinerary."],
  ["Is there flexibility in the package price?", "Yes. The route, trip length and accommodation choices can be discussed with the local team."],
  ["Can I combine Kilimanjaro, safari and Zanzibar?", "You can discuss all three in one journey. Total duration, recovery time, transport connections and arrangements are confirmed with the team."],
  ["What should I pack and wear?", "Your team will share the appropriate guidance for the journey you are planning."],
  ["Can beginners climb or dive?", "Ask the local team about the pace, preparation and experience level that suits your journey."],
];

export function Accordion({ items = commonFaqs, openCount = 1 }: { items?: string[][]; openCount?: number }) {
  const container = useRef<HTMLDivElement>(null);
  // Browsers can restore native <details> state before React hydrates a page.
  // Reapply the intended initial state once mounted, including after a FAQ tab changes.
  useEffect(() => {
    container.current?.querySelectorAll("details").forEach((details, index) => {
      details.open = index < openCount;
    });
  }, [items, openCount]);
  return <div className="accordion" ref={container}>{items.map(([question, answer], index) => <details key={`${question}-${index}`} suppressHydrationWarning open={index < openCount}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>;
}

export function CtaBanner({ title = "Ready to Climb Kilimanjaro?", text = "Experience breathtaking sunrises, explore volcanic landscapes, and create memories at one of Africa’s most iconic destinations.", image = "/images/figma-kili-group-trip-landscape3.png", centerImage }: { title?: string; text?: string; image?: string; centerImage?: string }) {
  return <section className="shell cta-wrap"><div className="cta-banner"><Photo src={image} alt="" sizes="(max-width: 700px) 100vw, 1200px" /><div /><section><h2>{title}</h2><p>{text}</p><PrimaryLink /></section><aside><Photo src={centerImage || image} alt="Tanzania expedition landscape" /><span>Betheli Expeditions is a proud Tanzanian owned tour operator company.</span></aside><Photo className="cta-brand" src="/images/logo.png" alt="" /></div></section>;
}

function HomePage() { return <><Hero title="Climbing Kilimanjaro is an experience of a lifetime" text="Three routes, chosen because they give you the acclimatisation days the mountain actually demands. Guides who have walked them since they were teenagers. And when your legs are done, the Serengeti and Zanzibar are a short flight away." image={photos.summit}><PrimaryLink /><Link className="ghost-button" href="/groups">See group climbs <Arrow /></Link></Hero><TrustRow />
  <main><section className="shell space"><SectionIntro eyebrow="TRAVEL YOUR WAY" title="Choose your travel style" text="Whether you want to travel your own way or with a group, explore Tanzania independently, choose the setup that fits your journey." align="left" /><StyleCards /><StatRow /></section>
  <section className="gallery-section"><SectionIntro eyebrow="DISCOVER TANZANIA" title="Unforgettable Moments in the Heart of Mount Kilimanjaro" text="Experience breathtaking sunrises, explore volcanic landscapes, and create memories at one of Africa’s most iconic destinations." /><div className="scattered-gallery"><Photo src={photos.summit} alt="Snowy Kilimanjaro" /><Photo src={photos.trail} alt="Hikers on a mountain trail" /><Photo src={photos.team} alt="Kilimanjaro group" /><Photo src={photos.safari} alt="Tanzania wildlife" /><Photo src={photos.zanzibar} alt="Zanzibar coast" /></div></section>
  <section className="dark-section route-section"><div className="shell route-layout"><div className="map-card"><div className="map-line">⌁<span>Uhuru Peak</span><span>Karanga Camp</span><span>Barafu Camp</span><span>Millennium Camp</span></div></div><div><p className="eyebrow light">KILIMANJARO CLIMBS</p><h2>Routes that we offer</h2><ol><li>Rongai Route</li><li>Lemosho Route <p>The Lemosho Route begins on the quiet western side of Kilimanjaro. It is known for its spectacular scenery and excellent acclimatisation.</p></li><li>Machame Route</li><li>Northern Circuit Route</li><li>Marangu Route</li></ol><PrimaryLink href="/kilimanjaro" /></div></div></section>
  <section className="shell space adventures"><SectionIntro eyebrow="FIND YOUR ADVENTURE" title="Kilimanjaro, Safari and Zanzibar" text="Choose the route, the wildlife and the coast that will make your journey yours." align="left" /><DestinationCards /></section>
  <section className="story-section"><div className="shell story-grid"><div className="story-images"><Photo src={photos.guide} alt="Betheli guide" /><Photo src={photos.safari} alt="Tanzania safari" /><blockquote>Betheli Expeditions is a proud Tanzanian owned tour operator company.</blockquote></div><div><p className="eyebrow">OUR STORY</p><h2>Your Trusted Guide to the Heart of Africa</h2><p>Betheli Expeditions is a proud Tanzanian-owned tour operator company, rooted in the ancient and revered Maasai tribe, known for our unwavering passion and deep reverence for wildlife.</p><p>With over a decade of invaluable experience in the East African tourism industry, we have embarked on a thrilling and challenging journey as the proprietors of Betheli Expeditions.</p><div className="story-stat"><strong>94%</strong><span>of our travellers<br />reach the summit</span></div></div></div></section>
  <Team /><Testimonials /><CtaBanner /><section className="shell faq-preview"><SectionIntro eyebrow="TRAVEL WITH CONFIDENCE" title="Frequently Asked Questions" text="We’ve answered the questions our travellers ask before setting off." align="left" /><Accordion /><Link className="text-link" href="/faq">View all questions <Arrow /></Link></section></main><Footer /></>; }

function Team() { const people = [["Jacqueline Laizer", photos.guide, "Co-Founder of Betheli Expeditions"], ["Jacqueline Laizer", photos.silhouette, "Co-Founder of Betheli Expeditions"], ["Jacqueline Laizer", photos.team, "Co-Founder of Betheli Expeditions"]]; return <section className="shell team-section"><SectionIntro eyebrow="THE PEOPLE BEHIND THE JOURNEY" title="Meet the team" text="The people behind every well-paced journey, from your first question to your return." align="left" /><div className="team-grid">{people.map(([name, image, role], index) => <article key={`${name}-${index}`}><Photo src={image} alt={name} /><h3>{name}</h3><p>{role}</p></article>)}</div></section>; }

type DestinationContent = { page: "kilimanjaro" | "safari" | "zanzibar"; heroTitle: string; heroText: string; eyebrow: string; heroImage: string; intro: string; placesTitle: string; places: { title: string; subtitle: string; image: string; href: string }[]; darkTitle: string; darkText: string; darkImage: string; careTitle: string; careItems: [string, string][]; faqTitle: string; ctaTitle: string };

const destinationContent: Record<"kilimanjaro" | "safari" | "zanzibar", DestinationContent> = {
  kilimanjaro: { page: "kilimanjaro", eyebrow: "KILIMANJARO CLIMBS", heroTitle: "Climb Mount Kilimanjaro", heroText: "Mount Kilimanjaro is more than a mountain. It’s a journey through distinct worlds, guided by a local team that knows every path.", heroImage: photos.silhouette, intro: "Every route, every day and every detail is designed to give you the time, space and support to climb well.", placesTitle: "Which Kilimanjaro Route Is Right for You?", places: [{ title: "Machame Route", subtitle: "The whisky route / 7 days", image: photos.summit, href: "/kilimanjaro/machame-route" }, { title: "Lemosho Route", subtitle: "A longer, quieter approach", image: photos.trail, href: "/kilimanjaro/machame-route" }, { title: "Marangu Route", subtitle: "A classic route with huts", image: photos.climbers, href: "/groups" }, { title: "Rongai Route", subtitle: "A drier northern approach", image: photos.silhouette, href: "/groups" }, { title: "Northern Circuit", subtitle: "The longest route", image: photos.safari, href: "/groups" }, { title: "Umbwe Route", subtitle: "For experienced climbers", image: photos.summit, href: "/groups" }], darkTitle: "Why Climb Kilimanjaro With Us?", darkText: "Climbing is a personal challenge. Our local crew makes room for that experience while looking after the logistics, your pace and every detail that matters on the mountain.", darkImage: photos.team, careTitle: "Your Safety Comes First", careItems: [["Experienced mountain guides", "A local crew that knows the routes, weather and pace of the mountain."], ["Thoughtful acclimatisation", "Routes and days are chosen to give your body time to adapt."], ["Medical support", "Support plans and safety checks are built into each climb."], ["A supportive team", "From your first enquiry through to the final descent." ]], faqTitle: "Kilimanjaro Frequently Asked Questions", ctaTitle: "Ready to Climb Kilimanjaro?" },
  safari: { page: "safari", eyebrow: "TANZANIA SAFARI", heroTitle: "Experience the Wild Side of Tanzania", heroText: "From Serengeti migrations to Tarangire’s baobabs, your safari is shaped around the people, places and pace you want to discover.", heroImage: photos.safari, intro: "We plan around your interests, not around a fixed route. Every Tanzania safari begins with a conversation.", placesTitle: "Where Will Your Safari Take You?", places: [{ title: "Serengeti", subtitle: "Endless plains and wildlife", image: photos.safari, href: "/trips" }, { title: "Ngorongoro Crater", subtitle: "A world within a world", image: photos.safari2, href: "/safari" }, { title: "Tarangire", subtitle: "Baobabs and elephants", image: photos.safari3, href: "/safari" }, { title: "Lake Manyara", subtitle: "A lakeside wild escape", image: photos.safari4, href: "/safari" }, { title: "Arusha National Park", subtitle: "Mountain views nearby", image: photos.trail, href: "/safari" }, { title: "Ruaha", subtitle: "A wilder, quieter south", image: photos.cheetah, href: "/safari" }], darkTitle: "What Makes a Tanzania Safari Special?", darkText: "A safari is not a checklist. It is the light changing across the plains, the quiet in the vehicle and the feeling of sharing a place where wild things still set the rhythm.", darkImage: photos.guide, careTitle: "Comfortable Rides for the Wild", careItems: [["Open-top safari vehicle", "Designed for game viewing and the long, beautiful drives between places."], ["Closed vehicle with pop-up roof", "A comfortable option when the weather or itinerary calls for it."], ["Comfort and practicalities", "The details that help you enjoy the time you are spending outdoors."], ["Flexible pacing", "Your guide can slow down, move on or make time when a moment asks for it."]], faqTitle: "Tanzania Safari Questions", ctaTitle: "Ready for the Machame Route?" },
  zanzibar: { page: "zanzibar", eyebrow: "ZANZIBAR ISLAND", heroTitle: "Discover Zanzibar", heroText: "White-sand beaches, turquoise waters, historic Stone Town and a slower rhythm make an island extension the perfect end to a Tanzania journey.", heroImage: photos.zanzibar, intro: "Zanzibar brings beaches, historic streets and small, personal moments together in an island experience shaped to your pace.", placesTitle: "Where Will Your Zanzibar Journey Take You?", places: [{ title: "Stone Town", subtitle: "History, colour and culture", image: photos.stoneTown, href: "/zanzibar" }, { title: "Nungwi", subtitle: "Northern beach life", image: photos.beach, href: "/zanzibar" }, { title: "Paje", subtitle: "Palm-lined coastline", image: photos.coast, href: "/zanzibar" }, { title: "Kendwa", subtitle: "Bright water and softer days", image: photos.ocean, href: "/zanzibar" }, { title: "Matemwe", subtitle: "A village by the sea", image: photos.zanzibar, href: "/zanzibar" }, { title: "Prison Island", subtitle: "A short boat ride away", image: photos.safari2, href: "/zanzibar" }], darkTitle: "Explore Stone Town, spice farms and the ocean.", darkText: "Discover classic island experiences. Stone Town walks, spice farm stops and dhow sailing can be the small details that make a Zanzibar extension feel truly yours.", darkImage: photos.ocean, careTitle: "What kind of accommodation is right for you?", careItems: [["Boutique hotel", "Personal touches, quiet courtyards and intimate island stays."], ["Beachfront villa", "A different kind of connection with the coast."], ["Private suite", "A quieter space to settle in and recharge."], ["Family-friendly resort", "Practical for family groups and shared time by the sea."]], faqTitle: "Zanzibar frequently asked.", ctaTitle: "Ready to explore Zanzibar?" },
};

function DestinationPage({ content }: { content: DestinationContent }) { return <><Hero eyebrow={content.eyebrow} title={content.heroTitle} text={content.heroText} image={content.heroImage}><PrimaryLink>{content.page === "zanzibar" ? "Plan my Zanzibar trip" : "Start planning"}</PrimaryLink><Link className="ghost-button" href="/groups">Explore the mountain <Arrow /></Link></Hero><TrustRow /><main><section className="shell destination-intro"><SectionIntro eyebrow="PLANNED AROUND YOU" title={content.intro} align="left" /><div className="intro-visual"><Photo src={content.page === "zanzibar" ? photos.beach : content.page === "safari" ? photos.safari2 : photos.climbers} alt="" /></div></section><section className="shell space"><SectionIntro eyebrow="CHOOSE YOUR JOURNEY" title={content.placesTitle} text="Start with the place that draws you in, then shape the route, pace and details with our local team." align="left" /><DestinationCards items={content.places} /></section><section className="dark-section feature-split"><div className="shell"><div className="feature-copy"><p className="eyebrow light">DESIGNED FOR THE EXPERIENCE</p><h2>{content.darkTitle}</h2><p>{content.darkText}</p><PrimaryLink /></div><div className="feature-photo"><Photo src={content.darkImage} alt="" /></div></div></section><section className="shell care-section"><SectionIntro eyebrow="TRAVEL WELL" title={content.careTitle} text="The experience is shaped by the practical choices that let you settle into the journey." align="left" /><div className="care-grid">{content.careItems.map(([title, text], i) => <article key={title}><span>{["✦", "◌", "⌁", "◐"][i]}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section><Testimonials /><CtaBanner title={content.ctaTitle} image={content.darkImage} /><section className="shell faq-preview"><SectionIntro eyebrow="PRACTICAL QUESTIONS" title={content.faqTitle} text="Useful answers for the first conversation and the planning that follows." align="left" /><Accordion /><Link className="text-link" href="/faq">View all questions <Arrow /></Link></section></main><Footer /></>; }

function MachamePage() { const itinerary = ["Arrival in Arusha", "Machame Gate to Machame Camp", "Machame Camp to Shira Camp", "Shira Camp to Barranco Camp", "Barranco Camp to Karanga Camp", "Karanga Camp to Barafu Camp", "Summit attempt & descent", "Mweka Camp to Mweka Gate"]; return <><Hero eyebrow="KILIMANJARO ROUTE" title="Machame Route" text="The iconic route to the Roof of Africa. A spectacular route that helps you acclimatise as the scenery changes around you." image={photos.summit} short><PrimaryLink /><Link className="ghost-button" href="/groups">Join a group <Arrow /></Link></Hero><TrustRow /><main><section className="shell route-overview"><div className="route-overview-img"><Photo src={photos.climbers} alt="Kilimanjaro climbers" /></div><div><p className="eyebrow">OVERVIEW</p><h2>Machame Route Overview</h2><p>The Machame Route is one of Kilimanjaro’s most recognised approaches. Its varied terrain, carefully paced days and changing landscapes make it a popular choice for climbers who want a longer, more immersive journey.</p><dl><div><dt>Route type</dt><dd>Camping route</dd></div><div><dt>Duration</dt><dd>7 days on the mountain</dd></div><div><dt>Difficulty</dt><dd>Challenging</dd></div><div><dt>Style</dt><dd>Scenic and varied</dd></div></dl></div></section><section className="dark-section route-map"><div className="shell route-layout"><div className="map-card"><div className="map-line route-red">⌁<span>Machame Gate</span><span>Shira Camp</span><span>Barranco</span><span>Barafu</span><span>Uhuru Peak</span></div></div><div><p className="eyebrow light">THE JOURNEY, DAY BY DAY</p><h2>Your Route to the Roof of Africa</h2><p>Each day is paced to support acclimatisation while the route opens into a different side of the mountain.</p><div className="route-facts"><span>7 days</span><span>5,895 m summit</span><span>Camping</span></div></div></div></section><section className="shell itinerary"><SectionIntro eyebrow="ROUTE ITINERARY" title="Machame Route Itinerary" text="A day-by-day outline for your planning conversation." align="left" /><div className="itinerary-list">{itinerary.map((item, index) => <details key={item} open={index === 0}><summary><b>Day {index + 1}</b>{item}<span>⌄</span></summary><p>Today’s route and accommodation details are confirmed in your final itinerary with the local team.</p></details>)}</div></section><section className="dark-section environment"><div className="shell environment-grid"><Photo src={photos.silhouette} alt="Mount Kilimanjaro scenery" /><div><p className="eyebrow light">THE ALTITUDE STORY</p><h2>Environments of Kilimanjaro</h2>{["Cultivation Zone — 1,000–1,800m", "Montane Forest — 1,800–2,800m", "Heath & Moorland — 2,800–4,000m", "Alpine Desert — 4,000–5,000m", "Arctic Summit Zone — 5,000–5,895m"].map((x) => <p className="zone" key={x}>{x}</p>)}</div></div></section><section className="shell care-section"><SectionIntro eyebrow="WHAT IS INCLUDED" title="What’s Included in Your Climb" text="The planning details are confirmed with you before booking." align="left" /><div className="inclusions"><article><b>Before the climb</b><span>Support with your route and planning conversation.</span></article><article><b>On the mountain</b><span>A local team and carefully paced itinerary.</span></article><article><b>Support & safety</b><span>Support plans shaped around the mountain journey.</span></article></div></section><CtaBanner title="Ready to climb Machame?" image={photos.summit} /><Testimonials /><section className="shell faq-preview"><SectionIntro eyebrow="MACHAME ROUTE FAQ" title="Machame Route Frequently Asked Questions" align="left" /><Accordion /><Link className="text-link" href="/faq">View all questions <Arrow /></Link></section></main><Footer /></>; }

function TripPage() { const days = ["Arrival at Kilimanjaro International Airport", "Tarangire National Park", "Ngorongoro Crater", "Central Serengeti", "Northern Serengeti", "Northern Serengeti to Arusha"]; return <><Hero eyebrow="FROM $1,732" title="6-Day Northern Serengeti River Crossing Safari" text="A roaming, focused safari through Tarangire, Central Serengeti, Northern Serengeti and Ngorongoro, with a stay at the Mara River." image={photos.safari2} short><PrimaryLink>Start planning</PrimaryLink></Hero><nav className="trip-subnav"><div className="shell"><a href="#overview">Overview</a><a href="#itinerary">Itinerary</a><a href="#included">Included</a><a href="#reviews">Reviews</a><PrimaryLink /></div></nav><main><section id="overview" className="dark-section trip-overview"><div className="shell"><div><p className="eyebrow light">NORTHERN SERENGETI</p><h2>6-Day Northern Serengeti River Crossing Safari</h2><p>Beginning in Tarangire and moving north through the Serengeti, this route is designed to follow the rhythm of the journey and make space for time in the places that hold your attention.</p><div className="trip-pills"><span>6 days</span><span>Private safari</span><span>River crossing season</span></div></div><Photo src={photos.climbers} alt="Tanzania journey" /></div></section><section id="itinerary" className="shell trip-itinerary"><aside><div className="mini-map">⌁<b>Mt Kilimanjaro</b><span>Arusha</span><span>Tarangire</span><span>Serengeti</span></div><h3>Destinations included</h3><ul><li>Arusha</li><li>Tarangire National Park</li><li>Serengeti National Park</li><li>Ngorongoro Crater</li></ul></aside><div><SectionIntro eyebrow="YOUR ITINERARY" title="A journey through Tanzania" text="Each day is an outline. Final details are confirmed as part of your tailored itinerary." align="left" />{days.map((day, i) => <details key={day} open={i === 0}><summary><b>Day {i + 1}</b>{day}<span>⌄</span></summary><p>Arrive, settle in and spend time with your guide discussing the journey ahead. Accommodation, timings and exact activities are confirmed with the local team.</p>{i === 2 && <Photo src={photos.cheetah} alt="Wildlife on safari" />}</details>)}</div></section><section className="dark-section environment"><div className="shell environment-grid"><Photo src={photos.silhouette} alt="Tanzania landscape" /><div><p className="eyebrow light">A PLACE OF MANY WORLDS</p><h2>Environments of Tanzania</h2><p className="zone">Open plains and long horizons</p><p className="zone">Forest, crater and woodland</p><p className="zone">River country and seasonal wildlife</p></div></div></section><section id="included" className="shell care-section"><SectionIntro eyebrow="PLANNING DETAILS" title="What’s included in your safari" text="Final inclusions are confirmed in the itinerary you receive before booking." align="left" /><div className="inclusions"><article><b>Before the journey</b><span>Support with route and travel planning.</span></article><article><b>On safari</b><span>Your planned days, transport and local guiding.</span></article><article><b>Support & safety</b><span>Practical support from a local team.</span></article></div></section><CtaBanner title="Unforgettable Moments in the Heart of Mount Kilimanjaro" image={photos.safari} /><div id="reviews"><Testimonials /></div><section className="shell faq-preview"><SectionIntro eyebrow="MORE TO EXPLORE" title="Frequently Asked Questions" align="left" /><Accordion /></section></main><Footer /></>; }

function ChipSet({ options, selected, onSelect, figmaCheck = false, label }: { options: string[]; selected: string; onSelect: (x: string) => void; figmaCheck?: boolean; label?: string }) {
  return <div className="chips" role="group" aria-label={label}>{options.map((item) => <button type="button" onClick={() => onSelect(item)} aria-pressed={selected === item} className={selected === item ? "selected" : ""} key={item}>{item}{selected === item && (figmaCheck ? <Image className="plan-chip-check" src="/images/figma-plan-check.svg" alt="" width={15} height={15} /> : <span aria-hidden="true">✓</span>)}</button>)}</div>;
}

function FormNotice({ text }: { text: string }) { return <p className="form-notice" aria-live="polite">{text}</p>; }

function PlanPage() {
  const [interest, setInterest] = useState("Combination");
  const [dateStyle, setDateStyle] = useState("My dates are flexible");
  const [travelStyle, setTravelStyle] = useState("Flexible");
  const [arrival, setArrival] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");
  const labels = ["Interests", "Dates", "Travellers", "Duration", "Style", "About you"];

  useEffect(() => {
    const updateStep = () => {
      const line = window.innerHeight * .34;
      let current = 0;
      for (let index = 0; index < 6; index++) {
        const step = document.getElementById(`plan-step-${index + 1}`);
        if (step && step.getBoundingClientRect().top <= line) current = index;
      }
      setActiveStep(current);
    };
    updateStep();
    window.addEventListener("scroll", updateStep, { passive: true });
    window.addEventListener("resize", updateStep);
    return () => { window.removeEventListener("scroll", updateStep); window.removeEventListener("resize", updateStep); };
  }, []);

  const jumpTo = (index: number) => {
    setActiveStep(index);
    document.getElementById(`plan-step-${index + 1}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fields = new FormData(e.currentTarget);
    const submittedArrival = String(fields.get("arrival") || "");
    const submittedDeparture = String(fields.get("departure") || "");
    if (submittedArrival && submittedDeparture && submittedDeparture < submittedArrival) {
      setNotice("Your departure date should be after your arrival date.");
      jumpTo(1);
      return;
    }
    if (!e.currentTarget.reportValidity()) {
      setNotice("Please complete your name and a valid email address.");
      jumpTo(5);
      return;
    }
    setSending(true);
    setNotice("Sending your trip request…");
    const result = await sendEnquiry("trip", e.currentTarget, { interest, dateStyle, travelStyle });
    setNotice(result.message);
    setSending(false);
  }

  const stage = (index: number) => ({ id: `plan-step-${index + 1}`, onFocusCapture: () => setActiveStep(index) });
  const reassurance = [
    ["figma-plan-local-team.svg", "Local team", "Start with people based in Tanzania, and share the places you want to discover."],
    ["figma-plan-personal-support.svg", "Personal support", "Ask your questions in your own words. The planning conversation should feel human."],
    ["figma-plan-custom-itineraries.svg", "Custom itineraries", "Discuss an outline around your interests and available time. Final arrangements are to confirm."],
    ["figma-plan-no-obligation.svg", "No obligation", "This is an enquiry, not a booking or payment. Review the proposed details before deciding."],
  ];

  return <><Hero eyebrow="A PERSONAL JOURNEY BEGINS HERE" title="Let’s Plan Your Tanzania Adventure" text="Tell us what you want to experience and our team will help you build the right trip." image={photos.plan} short><></></Hero><main className="plan-main"><div className="shell">
    <SectionIntro eyebrow="YOUR TRIP REQUEST" title="A Few Details. A World of Possibilities." text="You don’t need every answer yet. Share what you know, and leave the rest for a conversation." align="left" />
    <div className="plan-layout"><form className="enquiry-form" onSubmit={submit} noValidate>
      <nav className="progress" aria-label="Trip request steps">{labels.map((label, index) => <button type="button" className={activeStep === index ? "active" : ""} aria-current={activeStep === index ? "step" : undefined} aria-controls={`plan-step-${index + 1}`} onClick={() => jumpTo(index)} key={label}><b>{index + 1}</b><span>{label}</span></button>)}<p>Six simple questions. We’ll help you figure out the rest.</p></nav>
      <fieldset {...stage(0)}><legend><small>STEP 1 OF 6</small>What Would You Love to Experience?</legend><ChipSet options={["Kilimanjaro", "Safari", "Zanzibar", "Combination"]} selected={interest} onSelect={setInterest} figmaCheck label="What would you love to experience?" /></fieldset>
      <fieldset {...stage(1)}><legend><small>STEP 2 OF 6</small>When Are You Thinking of Traveling?</legend><ChipSet options={["I have dates", "My dates are flexible"]} selected={dateStyle} onSelect={setDateStyle} figmaCheck label="Travel date flexibility" /><div className={`input-row plan-date-row ${dateStyle === "I have dates" ? "is-current" : ""}`}><label>Preferred arrival<input type="date" name="arrival" onInput={event => setArrival(event.currentTarget.value)} onChange={event => setArrival(event.currentTarget.value)} aria-label="Preferred arrival date" /></label><label>Preferred departure<input type="date" name="departure" min={arrival || undefined} aria-label="Preferred departure date" /></label></div><label className={`plan-flexible-field ${dateStyle === "My dates are flexible" ? "is-current" : ""}`}>Flexible timing<input type="text" name="timing" placeholder="A month, season or possible travel window" /></label></fieldset>
      <fieldset {...stage(2)}><legend><small>STEP 3 OF 6</small>Who’s Coming Along?</legend><div className="input-row"><label>Number of adults<input type="number" min="1" name="adults" placeholder="Enter number" /></label><label>Number of children<input type="number" min="0" name="children" placeholder="Enter number or 0" /></label></div></fieldset>
      <fieldset {...stage(3)}><legend><small>STEP 4 OF 6</small>How Much Time Do You Have?</legend><label>Number of days<input type="text" inputMode="numeric" name="days" placeholder="Your available days, or ‘not sure yet’" /></label></fieldset>
      <fieldset {...stage(4)}><legend><small>STEP 5 OF 6</small>What’s Your Travel Style?</legend><ChipSet options={["Private", "Small Group", "Solo", "Flexible"]} selected={travelStyle} onSelect={setTravelStyle} figmaCheck label="Travel style" /></fieldset>
      <fieldset {...stage(5)}><legend><small>STEP 6 OF 6</small>Anything Else We Should Know?</legend><label>Your ideas, questions or needs<textarea name="notes" placeholder="Interests, comfort preferences, children’s ages, access needs or anything that matters to you…" /></label><div className="input-row"><label>Name *<input name="name" required autoComplete="name" placeholder="Your full name" /></label><label>Email *<input name="email" required type="email" autoComplete="email" placeholder="Your email address" /></label></div><div className="input-row"><label>WhatsApp (optional)<input name="whatsapp" type="tel" autoComplete="tel" placeholder="Include country code" /></label><label>Country<input name="country" autoComplete="country-name" placeholder="Your country of residence" /></label></div><small>We’ll use these details to respond to your trip enquiry. Please don’t include passport numbers or sensitive medical information.</small><button className="submit-button" disabled={sending}>{sending ? "Sending…" : "Send My Trip Request"} <Arrow /></button><p className="plan-payment-note">No payment is requested here.</p><FormNotice text={notice} /></fieldset>
    </form><aside className="planning-aside"><Photo src={photos.climbers} alt="Kilimanjaro climbing group" /><p className="eyebrow">YOUR FIRST CONVERSATION</p><h2>Let’s Shape It Together</h2>{reassurance.map(([icon, title, copy]) => <div key={title}><div className="planning-aside-heading"><Image src={`/images/${icon}`} alt="" width={24} height={24} /><b>{title}</b></div><p>{copy}</p></div>)}<a className="whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer">Prefer WhatsApp? <Arrow /></a><small>Chat with our team on WhatsApp at +{whatsappNumber}. Response timing will be confirmed by the team.</small></aside></div>
  </div></main><Footer /></>;
}

function ContactPage() { const [topic, setTopic] = useState("Custom trip"); const [notice, setNotice] = useState(""); const [sending, setSending] = useState(false); async function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); if (!e.currentTarget.reportValidity()) return setNotice("Please complete the required fields with a valid email address."); setSending(true); setNotice("Sending your message…"); const result = await sendEnquiry("contact", e.currentTarget, { topic }); setNotice(result.message); setSending(false); }
  return <><Hero eyebrow="CONTACT BATHIEL EXPEDITIONS" title="Let’s Start Planning" text="A question, a rough idea or a whole adventure in mind? Start a conversation with the Bathiel team." image={photos.summit} short><></></Hero><main className="contact-main shell"><div className="contact-layout"><form onSubmit={submit} noValidate><p className="eyebrow">Let’s talk about your trip.</p><div className="input-row"><label>Name *<input name="name" required autoComplete="name" placeholder="Your full name" /></label><label>Email *<input type="email" name="email" required autoComplete="email" placeholder="Your email address" /></label></div><label>What can we help you with?</label><ChipSet options={["Kilimanjaro", "Safari", "Zanzibar", "Custom trip", "Other"]} selected={topic} onSelect={setTopic} figmaCheck label="What can we help you with?" /><label>Your message *<textarea name="message" required placeholder="Tell us a little about your plans, or ask your question..." /></label><p className="privacy">We’ll use these details to respond to your enquiry. Please don’t include passport numbers or sensitive personal information.</p><button className="submit-button small-submit" disabled={sending}>{sending ? "Sending…" : "Send My Message"} <Arrow /></button><FormNotice text={notice} /></form><aside className="contact-aside"><section><h2>Prefer a Conversation?</h2><p>WhatsApp is another way to share your ideas and questions with our team.</p><a className="whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp Us <Arrow /></a><small>WhatsApp: +{whatsappNumber}</small></section>{[["Email", "info@betheliexpeditions.com", "Send your questions or trip ideas in your own time."], ["Phone", "+255 754 411 965", "Call our Tanzanian team to discuss your plans."], ["Office location", "Saba Saba, Arusha, Tanzania", "Please contact us before visiting the office."]].map(([t, a, c]) => <div key={t}><h3>{t}</h3><b>{a}</b><p>{c}</p></div>)}<p>Have a fuller trip brief? Use Plan Your Trip to share dates, interests and traveller numbers.</p></aside></div></main><Footer /></>; }

export const faqCategories = [
  ["KILIMANJARO", "Climbing the mountain", ["How difficult is Kilimanjaro?", "Which route should I choose?", "What equipment do I need?", "What altitude support is provided?", "When is the best time to climb?"]],
  ["SAFARI", "Parks, wildlife & itineraries", ["Will I see the Big Five or the Migration?", "How many days should I spend on safari?", "Can children travel on safari?", "What vehicles and accommodation are used?", "Which parks should I visit?"]],
  ["ZANZIBAR", "Beaches, culture & the island", ["Which coast should I choose?", "Can I snorkel or dive year-round?", "What to wear in Stone Town and villages?", "How many days should I spend?"]],
  ["BOOKING", "Before you commit", ["Is airfare included in the package price?", "How do I start planning a trip?", "What should my written quote include?", "Can I change or cancel my trip?", "How early should I book?"]],
  ["PAYMENTS", "Clear terms, no surprises", ["Is a deposit required?", "Which payment methods are accepted?", "Are tips and fees included?"]],
  ["TRAVEL", "Getting ready to go", ["Do I need a visa for Tanzania?", "What health preparations should I make?", "Should I arrange travel insurance?", "Are airport pickups and domestic flights arranged?"]],
  ["GENERAL", "The first conversation is simple", ["Can I combine Kilimanjaro, safari and Zanzibar?", "Do I need a full itinerary before contacting you?", "How can I contact Batheli Expeditions?", "Are you a licensed operator in Tanzania?"]],
] as const;

export const faqAnswers: Record<string, string> = {
  "Is airfare included in the package price?": "Airfare and its inclusion are confirmed in your written trip proposal.",
  "How difficult is Kilimanjaro?": "A demanding high-altitude trek. Fitness helps, but altitude response varies. Prepare for cold, sustained days and a long summit attempt. Reaching the top is never guaranteed.",
  "Will I see the Big Five or the Migration?": "Wildlife sightings are never guaranteed. Animals move naturally and migration patterns follow rainfall. Choose dates for your interests without relying on a promised sighting.",
  "Which coast should I choose?": "The north has a popular beach scene; the east has a distinctive tidal rhythm; Stone Town suits cultural exploring. Check your exact beach setting, not just the area name.",
  "How do I start planning a trip?": "Use Plan Your Trip to share your interests, timing and traveler numbers. The team can discuss a proposed outline. Availability and all arrangements must be confirmed before booking.",
  "Is a deposit required?": "Deposit amount, due dates and payment terms are to be confirmed by Bathiel Expeditions. No payment is taken through this website.",
  "Do I need a visa for Tanzania?": "Requirements depend on nationality and can change. Check official Tanzanian immigration guidance before travel. This is general information, not legal advice.",
  "Can I combine Kilimanjaro, safari and Zanzibar?": "You can discuss all three in one journey. Total duration, recovery time, transport connections and arrangements are to be confirmed with the team.",
};

function FaqPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const filterItems = ["All", "Kilimanjaro", "Safari", "Zanzibar", "Booking", "Payments", "Travel", "General"];
  const current = useMemo(() => faqCategories
    .filter(([category]) => filter === "All" || category.toLowerCase() === filter.toLowerCase())
    .map(([category, title, questions]) => [category, title, questions.filter(q => q.toLowerCase().includes(search.toLowerCase()))] as const)
    .filter(([, , questions]) => questions.length > 0), [filter, search]);
  return <><Hero eyebrow="FREQUENTLY ASKED QUESTIONS" title="Good Questions. Honest Answers." text="Practical guidance for your Tanzania adventure. Most questions can be answered in a conversation — use Plan Your Trip to start." image={photos.trail} short><PrimaryLink>Plan Your Trip</PrimaryLink><a className="ghost-button" href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp Us <Arrow /></a></Hero><main className="faq-page"><section className="faq-filters shell"><label className="search"><span>⌕</span><input aria-label="Search your question" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search your question..." /></label><div className="filter-buttons">{filterItems.map((item) => <button type="button" aria-pressed={filter === item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div></section><section className="shell category-grid">{current.map(([eyebrow, title, questions]) => <div className="faq-category" key={eyebrow}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><Accordion items={questions.map(q => [q, faqAnswers[q] || "Please ask the Bathiel team to confirm this detail for your proposed trip."])} /></div>)}{current.length===0 && <p>No questions match your search. Try another term or contact the team.</p>}</section><CtaBanner title="Still Have Questions?" text="Tell us what you have in mind. We’ll help you explore the options and shape a journey around you." image={photos.safari3} /></main><Footer /></>;
}

function GroupsPage() {
  const [year, setYear] = useState("2026");
  const [month, setMonth] = useState("Oct");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const trips = [
    ["06", "Kilimanjaro via Lemosho route - 7 days", "From 06 October - 14 October", ["🌙 Starry sky", "🚙 High-Altitude Drop-Off", "⛺ Extra Summit"], "$3170"],
    ["09", "Kilimanjaro via Machame route - 7 days", "From 09 October - 17 October", ["🌳 Starts in a Tropical Forest", "🦜 Forest Birds"], "$3072"],
    ["10", "Kilimanjaro via Rongai route - 6 days", "From 10 October - 17 October", ["🧍 Fewer hikers", "🌤 Less Rainfall", "🌲 Starts in a Coniferous Forest", "🚶 For experienced hikers"], "$2767"],
    ["30", "Kilimanjaro via Marangu route - 6 days", "From 30 October - 06 November", ["🌳 Starts in a Tropical Forest", "🦜 Forest Birds", "🏠 Overnight Stay in Huts"], "$2638"],
    ["31", "Kilimanjaro via Machame route - 7 days", "From 31 October - 08 November", ["🌳 Starts in a Tropical Forest", "🦜 Forest Birds"], "$2765"],
  ] as const;
  const showOctoberDepartures = year === "2026" && month === "Oct";

  return <main className="groups-page shell"><header>
    <h1>This is the best time to join Kilimanjaro climbing group!</h1>
    <div className="year-tabs" role="group" aria-label="Departure year">{["2026", "2027"].map(value => <button type="button" aria-pressed={year === value} onClick={() => setYear(value)} className={year === value ? "active" : ""} key={value}>{value}</button>)}</div>
    <div className="months" role="group" aria-label="Departure month">{months.map(value => <button type="button" aria-pressed={month === value} onClick={() => setMonth(value)} className={month === value ? "active" : ""} key={value}>{value === "Nov" ? "Nov ☔" : value}</button>)}</div>
  </header>
  <section className="group-list" aria-live="polite" aria-label={`Departures for ${month} ${year}`}>
    {showOctoberDepartures ? trips.map(([date, title, range, highlights, price], index) => <article key={date}><time dateTime={`${year}-10-${date}`}><b>{date}</b><span>Oct</span></time><div className="group-title"><h2>{title}</h2><p>{range}</p>{index === 4 && <small>☔ Rain Season</small>}</div><ul>{highlights.map(x => <li key={x}>{x}</li>)}</ul><strong>{index === 4 && <del>$3072</del>}{price}{index === 4 && <em>10%</em>}</strong><div><Link className={index === 4 ? "join secondary" : "join"} href="/plan-your-trip">JOIN GROUP</Link><span>Deposit $100</span></div></article>) :
      <div className="group-empty"><h2>No published departures for {month} {year} yet.</h2><p>Ask our team about group dates or a private Kilimanjaro climb that fits your calendar.</p><Link className="join" href="/plan-your-trip">Ask about dates <Arrow /></Link></div>}
  </section><AdvisorCard /></main>;
}

function AdvisorCard() { return <section className="advisor-card"><Photo src={photos.guide} alt="Victoria, local trip advisor" /><div><header><h2>Victoria</h2><span>Online</span></header><p className="eyebrow">🇹🇿 BASED IN TANZANIA</p><h3>Want to plan a memorable Tanzanian adventure?</h3><p>Contact us. We are always here to help</p><div><a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="button">◉ WhatsApp</a><Link href="/contact" className="button">✉ Send an enquiry</Link></div></div></section>; }

export function SitePage({ page }: { page: PageKey }) {
  switch (page) {
    case "home": return <HomePage />;
    case "kilimanjaro": return <DestinationPage content={destinationContent.kilimanjaro} />;
    case "machame": return <MachamePage />;
    case "safari": return <DestinationPage content={destinationContent.safari} />;
    case "zanzibar": return <DestinationPage content={destinationContent.zanzibar} />;
    case "plan": return <PlanPage />;
    case "contact": return <ContactPage />;
    case "faq": return <FaqPage />;
    case "trips": return <TripPage />;
    case "groups": return <GroupsPage />;
  }
}
