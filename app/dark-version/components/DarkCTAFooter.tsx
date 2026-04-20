import React from "react";

interface DarkCTAFooterProps {
  title: React.ReactNode;
  description: string;
  ctaLabel: string;
  emailPlaceholder: string;
}

export default function DarkCTAFooter({
  title,
  description,
  ctaLabel,
  emailPlaceholder,
}: DarkCTAFooterProps) {
  return (
    <section className="relative w-full overflow-hidden rounded-[32px] bg-[#171717] px-6 py-14 sm:px-8 lg:px-12">

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(155,234,52,0.05),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(104,90,205,0.16),transparent_60%)]" />

      {/* TOP FRAME (correct shape) */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-0 h-[280px] w-full"
        viewBox="0 0 1440 280"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* LEFT PATH */}
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

        {/* RIGHT PATH */}
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

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-[760px] pt-20 text-center">

        <div className="mb-6 text-[1.8rem] font-black italic text-white">m</div>

        <h2 className="text-[clamp(2.3rem,5vw,4.3rem)] font-prompt leading-tight tracking-tight  text-white">
          {title}
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#FFFFFF]">
          {description}
        </p>

        {/* INPUT */}
        <div className="mx-auto mt-8 flex w-full max-w-xl flex-col rounded-full bg-white/8 p-1.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] sm:flex-row">
          <input
            type="email"
            placeholder={emailPlaceholder}
            className="min-w-0 flex-1 rounded-full bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/28 outline-none"
          />

          <button className="rounded-full bg-[#9BEA34] px-8 py-3 text-sm font-medium text-[#151515] transition hover:brightness-105">
            {ctaLabel}
          </button>
        </div>
      </div>

      {/* FOOTER LINE (fixed) */}
      <div className="relative z-10 mt-16 pt-6 text-xs text-white/40">

        {/* subtle center line like screenshot */}
        <div className="absolute left-1/2 top-0 h-12 w-px -translate-x-1/2 bg-white/10" />

        <div className="flex flex-col gap-4 border-t border-white/7 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-6">
            <span>Policies</span>
            <span>Eligibility</span>
            <span>Registration</span>
          </div>

          <p>Copyright 2026 Brand Republic - All Rights Reserved</p>
        </div>
      </div>
    </section>
  );
}
