import Image from "next/image";
import React from "react";

interface DarkHeroSectionProps {
  logoSrc: string;
  badge: string;
  headline: {
    top: string;
    bottom: string;
  };
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
}: DarkHeroSectionProps) {
  const primaryHeroButtonClassName =
    "inline-flex h-12 w-auto items-center justify-center rounded-full bg-[#99ED43] px-8 text-[15px] font-prompt font-medium text-[#0A0A0A] shadow-[0_10px_30px_rgba(153,237,67,0.18)] transition hover:brightness-105";
  const secondaryHeroButtonClassName =
    "inline-flex h-12 w-auto items-center justify-center rounded-full border border-[#99ED43] bg-transparent px-8 text-[15px] font-prompt font-medium text-[#EEEEEE] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:bg-[#99ED43]/10";

  return (
    <section className="relative min-h-screen w-full overflow-hidden px-4 pb-8 pt-8 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(155,234,52,0.08),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(104,90,205,0.12),transparent_30%)]" />

      <div className="pointer-events-none absolute left-1/2 bottom-0 h-20 w-px -translate-x-1/2 bg-white/10" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col">
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

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mx-auto max-w-6xl">
            <span className="inline-flex lg:h-12 md:h-12 h-12 w-auto mt-10 text-[15px] lg:w-auto md:w-auto items-center justify-center rounded-full border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.06)_100%)] px-10 font-prompt  font-normal uppercase leading-none tracking-[0.24em] text-[#99ED43] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_18px_55px_rgba(0,0,0,0.22)] backdrop-blur-md">
              {badge}
            </span>

            <div className="relative mt-8 flex items-center justify-center">
              <div className="pointer-events-none absolute left-[-13%] top-28 hidden h-44 w-32 rounded-tl-[56px] border-l border-t border-[#9BEA34]/35 lg:block" />

              <div className="pointer-events-none absolute right-[-13%] top-28 hidden h-44 w-32 rounded-tr-[56px] border-r border-t border-[#9BEA34]/35 lg:block" />

              <div className="relative px-2 pt-8 sm:px-6 lg:px-12">
                <h1 className="text-center font-prompt">
                  <span
                    className="relative z-0 block bg-clip-text text-[clamp(5rem,12.7vw,182.41px)] font-bold leading-[1] tracking-[-0.02em] text-transparent drop-shadow-[0_10px_30px_rgba(153,237,67,0.18)]"
                    style={{
                      backgroundImage:
                        "linear-gradient(180deg, #99ED43 50.21%, #000000 128.22%)",
                    }}
                  >
                    {headline.top}
                  </span>
                  <span className="relative z-10 -mt-8 block text-[clamp(3rem,5.62vw,80.79px)] font-normal italic leading-[1] tracking-[-0.07em] text-white">
                    {headline.bottom}
                  </span>
                </h1>
              </div>
            </div>

            <p className="mx-auto mt-8 max-w-xl text-[15px] font-prompt font-normal leading-relaxed text-[#EEEEEE] sm:text-sm md:text-base">
              {description}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href={ctaPrimary.href}
                className={primaryHeroButtonClassName}
              >
                {ctaPrimary.label}
              </a>

              <a
                href="#workshop-agenda"
                className={secondaryHeroButtonClassName}
              >
                {ctaSecondary.label}
              </a>
            </div>

            <div className="mt-24 flex items-center justify-center gap-3 text-[15px] text-white/36">
              <span className="font-prompt text-[15px]">Powered By</span>
              <div className="relative h-8 w-[109px]">
                <Image
                  src="/Q-A.svg"
                  alt="Quantum Academy logo"
                  fill
                  sizes="109px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
