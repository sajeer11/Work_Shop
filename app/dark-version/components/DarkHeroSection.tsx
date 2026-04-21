import Image from "next/image";
import React from "react";

interface DarkHeroSectionProps {
  logoSrc: string;
  badge: string;
  headline: React.ReactNode;
  description: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  topRightButton: { label: string; href: string };
  infoBadges: string[];
}

export default function DarkHeroSection({
  logoSrc,
  badge,
  headline,
  description,
  ctaPrimary,
  ctaSecondary,
  topRightButton,
  infoBadges,
}: DarkHeroSectionProps) {
  const primaryHeroButtonClassName =
    "inline-flex items-center justify-center rounded-full bg-[#99ED43] px-6 py-3 text-sm font-medium text-[#1A1A1A] shadow-[0_10px_30px_rgba(153,237,67,0.18)] transition hover:brightness-105 md:text-base";
  const secondaryHeroButtonClassName =
    "inline-flex items-center justify-center rounded-full border border-[#99ED43] bg-transparent px-6 py-3 text-sm font-medium text-[#EEEEEE] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:bg-[#99ED43]/10 hover:border-[#99ED43] md:text-base";

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#161616] px-4 pb-8 pt-8 sm:px-6 lg:px-10">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(155,234,52,0.08),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(104,90,205,0.12),transparent_30%)]" />

      {/* Bottom center small line */}
      <div className="pointer-events-none absolute left-1/2 bottom-0 h-20 w-px -translate-x-1/2 bg-white/10" />

      {/* Main layout */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col">
        {/* NAV */}
        <nav className="flex items-center gap-4">
          <div className="relative h-12 w-12 md:h-14 md:w-14">
            <Image
              src={logoSrc}
              alt="Brand Republic logo"
              fill
              sizes="56px"
              className="object-contain"
            />
          </div>

          <a
            href={topRightButton.href}
            className={`ml-auto ${primaryHeroButtonClassName}`}
          >
            {topRightButton.label}
          </a>
        </nav>

        {/* HERO CONTENT */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mx-auto max-w-6xl">
            <span className="inline-flex items-center rounded-full border border-[#9BEA34]/30 bg-[#272b22] px-6 py-2 text-xs uppercase tracking-[0.18em] text-[#a7e64b] md:text-lg lg:text-lg">
              {badge}
            </span>

            {/* Connected heading frame */}
            <div className="relative mt-8 flex items-center justify-center">
              {/* Left connector */}
              <div className="pointer-events-none absolute left-[-5%] top-12 hidden h-44 w-32 rounded-tl-[56px] border-l border-t border-[#9BEA34]/35 lg:block" />

              {/* Right connector */}
              <div className="pointer-events-none absolute right-[-5%] top-12 hidden h-44 w-32 rounded-tr-[56px] border-r border-t border-[#9BEA34]/35 lg:block" />

              {/* Heading box area */}
              <div className="relative px-2 pt-8 sm:px-6 lg:px-12">
                <h1 className="text-center font-prompt leading-none tracking-tight">
                  {headline}
                </h1>
              </div>
            </div>

            <p className="mx-auto mt-8 max-w-xl text-xs font-prompt leading-relaxed text-[#EEEEEE] sm:text-sm md:text-base">
              {description}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={ctaPrimary.href}
                className={primaryHeroButtonClassName}
              >
                {ctaPrimary.label}
              </a>

              <a
                href={ctaSecondary.href}
                className={secondaryHeroButtonClassName}
              >
                {ctaSecondary.label}
              </a>
            </div>
          </div>
        </div>

        {/* Info badges */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-[#6C6C6C]">
          {infoBadges.map((info) => (
            <span key={info}>{info}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
