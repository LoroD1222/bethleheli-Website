"use client";

import { useEffect, useRef, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const previousScrollY = useRef(0);

  useEffect(() => {
    previousScrollY.current = window.scrollY;

    const updateVisibility = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < previousScrollY.current;
      setVisible(currentScrollY > 480 && scrollingUp);
      previousScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const returnToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    setVisible(false);
  };

  return (
    <button
      type="button"
      className={`back-to-top${visible ? " is-visible" : ""}`}
      onClick={returnToTop}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}
