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
    <div className="home-footer-links"><div><b>CLIMBS</b><Link className="home-footer-featured" href="/kilimanjaro"><Image src={image("figma-home-footer-active-dot.svg")} alt="" width={6} height={6} />Lemosho Route</Link><Link href="/kilimanjaro/machame-route">Machame Route</Link><Link href="/kilimanjaro">Rongai Route</Link><Link href="/kilimanjaro">Northern Circuit</Link><Link href="/kilimanjaro">Route Guide</Link></div><div><b>SAFARIS</b><Link href="/safari">Serengeti National Park</Link><Link href="/safari">Ngorongoro Crater</Link><Link href="/safari">Tarangire Safaris</Link><Link href="/safari">Lake Manyara</Link><Link href="/plan-your-trip">Custom Itineraries</Link></div><div><b>EXPLORE</b><Link href="/zanzibar">Zanzibar Beach</Link><Link href="/#team">Meet the Team</Link><Link href="/#reviews">Traveler Reviews</Link><Link href="/safari">When to Go</Link><Link href="/kilimanjaro#safety">Safety Policy</Link></div><aside><strong>Arusha Office</strong><div className="home-footer-contact"><span><Image src={image("figma-home-footer-map-pin.svg")} alt="" width={16} height={16} />Saba Saba, Arusha, Tanzania</span><a href="tel:+255754411965"><Image src={image("figma-home-footer-phone.svg")} alt="" width={16} height={16} />+255 754 411 965</a><a href="mailto:info@betheliexpeditions.com"><Image src={image("figma-home-footer-mail.svg")} alt="" width={16} height={16} />info@betheliexpeditions.com</a></div></aside></div>
    <div className="home-footer-credentials">{[
      ["icon-shield-check.svg", "TATO Member", "Tanzania Association of Tour Operators"],
      ["icon-globe.svg", "ATTA Member", "Adventure Travel Trade Association"],
      ["icon-ambulance.svg", "AMREF Covered", "Emergency Flying Doctors Cover"],
      ["icon-badge-percent.svg", "5.0 Rated", "TripAdvisor Excellence Award"],
    ].map(([icon, title, detail]) => <div className="home-footer-credential" key={title}><span className="home-footer-credential-icon"><Image src={image(icon)} alt="" width={20} height={20} /></span><span><b>{title}</b><small>{detail}</small></span></div>)}</div>
    <div className="home-footer-bottom"><span>Copyright © 2026 Betheli Expeditions. All rights reserved. Registered licensed operator in Tanzania.</span><span>Privacy Policy &nbsp; Terms of Use &nbsp; Booking Conditions</span></div>
  </div></footer>;
}
