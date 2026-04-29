"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent, trackPageView } from "../../lib/analytics";
import { EVENT_KEYS } from "@/app/lib/events";

function trackCtaClick(target: Element) {
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
    "CTA";
  const normalizedLabel = label.toLowerCase();

  const isRegisterIntent =
    href === "/register" || href?.startsWith("/register?");
  const isReserveIntent =
    formAction === "/register" ||
    normalizedLabel.includes("reserve your seat") ||
    href === "#footer-form";

  if (!isRegisterIntent && !isReserveIntent) {
    return;
  }

  trackEvent(isReserveIntent ? "reserve_seat_click" : "register_click", {
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
    trackEvent(EVENT_KEYS.ON_LANDING_PAGE_VISIT, {
      page_path: window.location.pathname,
    });

    const scrollMilestones = new Set<number>();
    const pageStartTime = Date.now();
    let hasSentTimeSpent = false;

    const sendTimeSpent = () => {
      if (hasSentTimeSpent) {
        return;
      }

      hasSentTimeSpent = true;
      const elapsedSeconds = Math.max(
        1,
        Math.round((Date.now() - pageStartTime) / 1000),
      );
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) {
        return;
      }

      const scrollPercent = Math.round((scrollTop / documentHeight) * 100);

      [25, 50, 75, 100].forEach((milestone) => {
        if (scrollPercent >= milestone && !scrollMilestones.has(milestone)) {
          scrollMilestones.add(milestone);
          trackEvent(EVENT_KEYS.ON_SCROLL, {
            page_path: window.location.pathname,
            scroll_percent: milestone,
          });
        }
      });
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      trackCtaClick(target);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendTimeSpent();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("click", handleClick, true);

    return () => {
      sendTimeSpent();
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("click", handleClick, true);
    };
  }, [pathname]);

  return null;
}
