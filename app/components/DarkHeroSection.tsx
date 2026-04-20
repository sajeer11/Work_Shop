import React from "react";

interface DarkHeroSectionProps {
  badge: string;
  headline: React.ReactNode;
  description: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  topRightButton: { label: string; href: string };
  infoBadges: string[];
}

export default function DarkHeroSection({
  badge,
  headline,
  description,
  ctaPrimary,
  ctaSecondary,
  topRightButton,
  infoBadges,
}: DarkHeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden rounded-[32px] border border-white/5 bg-[#161616] px-4 sm:px-6 lg:px-10 pt-8 pb-18 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(155,234,52,0.08),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(104,90,205,0.12),transparent_30%)]" />

      {/* Bottom center small line */}
      <div className="pointer-events-none absolute left-1/2 bottom-0 h-20 w-px -translate-x-1/2 bg-white/7" />

      {/* NAV */}
      <nav className="relative z-10 flex items-center gap-4">
        <div className="text-[2rem] font-black italic leading-none text-white">
          B
        </div>

        <a
          href={topRightButton.href}
          className="ml-auto rounded-full bg-[#9BEA34] px-6 py-2 lg:text-lg md:text-lg text-sm font-medium text-[#131313] transition hover:brightness-105"
        >
          {topRightButton.label}
        </a>
      </nav>

      {/* HERO CONTENT */}
      <div className="relative z-10 mx-auto mt-16 max-w-6xl text-center">
       <span className="inline-flex items-center rounded-full border  border-[#9BEA34]/30 bg-[#272b22] px-6 py-2 text-xs lg:text-lg md:text-lg uppercase tracking-[0.18em] text-[#a7e64b]">
  {badge}
</span>

        {/* Connected heading frame */}
        <div className="relative mt-8 flex items-center justify-center">

          {/* Left connector */}
          <div className="pointer-events-none absolute left-[8%] top-12 hidden h-44 w-32 rounded-tl-[56px] border-l border-t border-[#9BEA34]/35 lg:block" />

          {/* Right connector */}
          <div className="pointer-events-none absolute right-[8%] top-12 hidden h-44 w-32 rounded-tr-[56px] border-r border-t border-[#9BEA34]/35 lg:block" />

          {/* Heading box area */}
          <div className="relative px-2 pt-8 sm:px-6 lg:px-12">
            <h1 className="text-center font-prompt leading-none tracking-tight">
              {headline}
            </h1>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-xs font-prompt leading-relaxed text-[#EEEEEE]">
          {description}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={ctaPrimary.href}
            className="rounded-full bg-[#99ED43] px-6 py-3 text-sm font-medium text-[#1A1A1A] transition hover:brightness-105"
          >
            {ctaPrimary.label}
          </a>

          <a
            href={ctaSecondary.href}
            className="rounded-full border border-[#9BEA34]/35 bg-transparent px-6 py-3 text-sm font-medium text-white/80 transition hover:border-[#9BEA34]/55 hover:text-white"
          >
            {ctaSecondary.label}
          </a>
        </div>
      </div>

      {/* Info badges */}
      <div className="relative z-10 mt-14 flex flex-wrap items-center justify-center gap-5 text-xs text-[#6C6C6C]">
        {infoBadges.map((info) => (
          <span key={info}>{info}</span>
        ))}
      </div>
    </section>
  );
}
