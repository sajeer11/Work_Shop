"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function trackPageView(url: string) {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

function trackRegisterClick(target: Element) {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== "function") {
    return;
  }

  const link = target.closest("a");
  const button = target.closest("button, input[type='submit']");
  const formAction =
    button instanceof HTMLButtonElement || button instanceof HTMLInputElement
      ? button.form?.getAttribute("action")
      : null;
  const href = link?.getAttribute("href");
  const label =
    link?.textContent?.trim() ||
    button?.textContent?.trim() ||
    button?.getAttribute("value") ||
    target.textContent?.trim() ||
    "Register";

  const isRegisterIntent =
    href === "/register" ||
    href?.startsWith("/register?") ||
    formAction === "/register" ||
    /register|reserve your seat/i.test(label);

  if (!isRegisterIntent) {
    return;
  }

  window.gtag("event", "register_click", {
    event_category: "engagement",
    event_label: label,
    destination: href || formAction || window.location.pathname,
    page_location: window.location.href,
  });
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    trackPageView(url);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      trackRegisterClick(target);
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return null;
}
