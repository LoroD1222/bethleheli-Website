"use client";

import { useEffect } from "react";

export function AdTrackingCapture() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("utm")) return;

      const captured = Object.fromEntries(
        Array.from(new URLSearchParams(window.location.search).entries()).filter(
          ([key]) => key.startsWith("utm_") || key === "fbclid",
        ),
      );

      if (Object.keys(captured).length > 0) {
        sessionStorage.setItem("utm", JSON.stringify(captured));
      }
    } catch {
      // Tracking must never interfere with browsing or form submission.
    }
  }, []);

  return null;
}
