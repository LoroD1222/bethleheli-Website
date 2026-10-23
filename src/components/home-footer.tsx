"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

const image = (name: string) => `/images/${name}`;

export function HomeFooter() {
  const [message, setMessage] = useState("");
  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Newsletter sign-up is not connected yet.");
  }
  return <footer className="home-footer"><div className="shell">
    <div className="home-footer-top"><div><Link href="/" aria-label="Bathiel Expeditions home"><Image src={image("logo.png")} alt="Bathiel Expeditions" width={1672} height={940} /></Link><p>A proud Tanzanian-owned tour operator rooted in the ancient Maasai tribe. Guiding climbers to the roof of Africa and crafting raw, unforgettable safaris for over a decade.</p></div><form onSubmit={subscribe}><label htmlFor="home-news-email">Join the Adventure</label><div><input type="email" required id="home-news-email" placeholder="Enter your email address..." /><button type="submit" aria-label="Subscribe"><Image src={image("figma-newsletter-arrow.svg")} alt="" width={36} height={36} /></button></div><small aria-live="polite">{message}</small></form></div>
    <div className="home-footer-links">
      <div className="home-footer-nav-card"><b>CLIMBING ROUTES</b><nav aria-label="Footer climbing routes"><Link className="home-footer-featured" href="/kilimanjaro/lemosho-route"><Image src={image("figma-home-footer-active-dot.svg")} alt="" width={6} height={6} />Lemosho Route</Link><Link href="/kilimanjaro/machame-route">Machame Route</Link><Link href="/kilimanjaro/rongai-route">Rongai Route</Link><Link href="/kilimanjaro/northern-circuit">Northern Circuit</Link><Link href="/kilimanjaro">Compare all routes</Link></nav></div>
      <div className="home-footer-nav-card home-footer-menu-card"><b>EXPLORE BETHELI</b><nav aria-label="Footer navigation"><Link href="/">Home</Link><Link href="/kilimanjaro">Kilimanjaro</Link><Link href="/safari">Safari</Link><Link href="/zanzibar">Zanzibar</Link><Link href="/trips">Trips</Link><Link href="/groups">Group Climbs</Link><Link href="/contact">Contact</Link></nav></div>
      <aside><strong>Arusha Office</strong><div className="home-footer-contact"><span><Image src={image("figma-home-footer-map-pin.svg")} alt="" width={16} height={16} /><span>Usa River, Arusha<br />P.O. Box 15444, Tanzania, East Africa</span></span><a href="tel:+255692796412"><Image src={image("figma-home-footer-phone.svg")} alt="" width={16} height={16} />+255 692 796 412</a><a href="tel:+255738304984"><Image src={image("figma-home-footer-phone.svg")} alt="" width={16} height={16} />+255 738 304 984</a><a href="https://wa.me/255692796412" target="_blank" rel="noopener noreferrer"><Image src={image("figma-trips-quote-whatsapp.svg")} alt="" width={16} height={16} />WhatsApp: +255 692 796 412</a><a href="mailto:info@betheliexpeditions.com"><Image src={image("figma-home-footer-mail.svg")} alt="" width={16} height={16} />info@betheliexpeditions.com</a></div></aside>
    </div>
    <div className="home-footer-credentials">{[
      ["icon-shield-check.svg", "TATO Member", "Tanzania Association of Tour Operators"],
      ["icon-globe.svg", "ATTA Member", "Adventure Travel Trade Association"],
      ["icon-ambulance.svg", "AMREF Covered", "Emergency Flying Doctors Cover"],
      ["icon-badge-percent.svg", "5.0 Rated", "TripAdvisor Excellence Award"],
    ].map(([icon, title, detail]) => <div className="home-footer-credential" key={title}><span className="home-footer-credential-icon"><Image src={image(icon)} alt="" width={20} height={20} /></span><span><b>{title}</b><small>{detail}</small></span></div>)}</div>
    <div className="home-footer-bottom"><span>Copyright © 2026 Betheli Expeditions. All rights reserved. Registered licensed operator in Tanzania.</span><Link href="/terms-and-conditions">Terms &amp; Conditions</Link></div>
  </div></footer>;
}
