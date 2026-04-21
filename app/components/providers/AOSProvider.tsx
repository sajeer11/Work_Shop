"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";

export default function AOSProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const hasAnimatedElements = Boolean(document.querySelector("[data-aos]"));

    if (!hasAnimatedElements) {
      return;
    }

    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
      mirror: false,
    });

    const refreshAOS = () => {
      window.requestAnimationFrame(() => {
        try {
          AOS.refreshHard();
        } catch {
          // Avoid route-transition crashes when the DOM is still settling.
        }
      });
    };

    const timeoutId = window.setTimeout(refreshAOS, 300);

    window.addEventListener("load", refreshAOS);
    window.addEventListener("resize", refreshAOS);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("load", refreshAOS);
      window.removeEventListener("resize", refreshAOS);
    };
  }, [pathname]);

  return null;
}
