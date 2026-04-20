"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AOSProvider() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
      mirror: false,
    });

    const refreshAOS = () => {
      AOS.refreshHard();
    };

    const timeoutId = window.setTimeout(refreshAOS, 300);

    window.addEventListener("load", refreshAOS);
    window.addEventListener("resize", refreshAOS);
    window.addEventListener("orientationchange", refreshAOS);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("load", refreshAOS);
      window.removeEventListener("resize", refreshAOS);
      window.removeEventListener("orientationchange", refreshAOS);
    };
  }, []);

  return null;
}
