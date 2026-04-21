import Image from "next/image";
import React from "react";

interface DarkCTAFooterProps {
  logoSrc: string;
  title: React.ReactNode;
  description: string;
  ctaLabel: string;
  emailPlaceholder: string;
  footerLinks: string[];
  copyrightText: string;
}

export default function DarkCTAFooter({
  logoSrc,
  title,
  description,
  ctaLabel,
  emailPlaceholder,
  footerLinks,
  copyrightText,
}: DarkCTAFooterProps) {
  const footerButtonClassName =
    "inline-flex items-center justify-center rounded-full bg-[#99ED43] px-8 py-3 text-sm font-medium text-[#1A1A1A] shadow-[0_10px_30px_rgba(153,237,67,0.18)] transition hover:brightness-105";

  return (
    <section className="relative w-full overflow-hidden bg-[#171717]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(155,234,52,0.05),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(104,90,205,0.16),transparent_60%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-10">
        <svg
          className="pointer-events-none absolute inset-x-0 top-0 h-[280px] w-full"
          viewBox="0 0 1440 280"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="
              M180 0
              V135
              A88 88 0 0 0 268 223
              H430
            "
            stroke="rgba(155,234,52,0.35)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />

          <path
            d="
              M1260 0
              V135
              A88 88 0 0 1 1172 223
              H1010
            "
            stroke="rgba(155,234,52,0.35)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        <div className="mx-auto max-w-[760px] pt-20 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative h-10 w-10 md:h-12 md:w-12">
              <Image
                src={logoSrc}
                alt="Brand Republic logo"
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
          </div>

          <h2 className="text-[clamp(2.3rem,5vw,4.3rem)] font-prompt leading-tight tracking-tight text-white">
            {title}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#FFFFFF]">
            {description}
          </p>

          <div className="mx-auto mt-8 flex w-full max-w-xl flex-col rounded-2xl bg-[#FFFFFF1A] p-1.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] sm:flex-row lg:rounded-full">
            <input
              type="email"
              placeholder={emailPlaceholder}
              className="min-w-0 flex-1 rounded-full bg-[#FFFFFF1A] px-5 py-3 text-sm text-white placeholder:text-white/28 outline-none"
            />

            <button className={footerButtonClassName}>
              {ctaLabel}
            </button>
          </div>
        </div>

        <div className="mt-16 pt-6 text-xs text-white/40">
          <div className="absolute left-1/2 top-0 h-12 w-px -translate-x-1/2 bg-white/10" />

          <div className="flex flex-col gap-4 border-t border-white/7 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-6">
              {footerLinks.map((link) => (
                <span key={link}>{link}</span>
              ))}
            </div>

            <p>{copyrightText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
