import React from "react";

interface LighterHeroSectionProps {
  headline: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  badge: string;
  logo: string;
  topRightButton: { label: string; href: string };
  infoBadges: string[];
}

const LighterHeroSection: React.FC<LighterHeroSectionProps> = ({
  headline,
  subtitle,
  description,
  videoUrl,
  ctaPrimary,
  ctaSecondary,
  badge,
  logo,
  topRightButton,
  infoBadges,
}) => {
  return (
    <section
      className="relative flex flex-col min-h-screen w-full overflow-hidden"
      
    >
      {/* Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover "
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Base dark overlay (for contrast) */}
      <div className="absolute inset-0 bg-linear-to-t from-[#F6F6F6] to-[#F6F6F600] z-10"></div>

      {/* Center light glow (for focus) */}
      {/* <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 25%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0) 60%)",
        }}
      /> */}

      {/* NAV */}
      <nav className="relative z-20 flex items-center w-full px-4 sm:px-6 md:px-10 pt-8 pb-2 gap-4">
        <div className="text-white text-lg md:text-sm font-prompt leading-tight tracking-widest uppercase whitespace-pre-line opacity-90 shrink-0">
          {logo}
        </div>

        <a
          href={topRightButton.href}
          className="ml-auto text-lg font-prompt px-6 py-2 rounded-full text-white border border-white/20 bg-[#7F77DD] backdrop-blur-md hover:bg-white/20 transition-all duration-200 shadow whitespace-nowrap shrink-0"
        >
          {topRightButton.label}
        </a>
      </nav>

      {/* MAIN CONTENT */}
      <div className="relative z-20 flex flex-col items-center justify-center flex-1 px-4 pb-16 pt-8 text-center">
        {/* Badge */}
        <div className="mb-8">
          <span
            className="inline-block px-5 py-1.5 rounded-full text-lg font-semibold tracking-wide text-white/90 border border-white/20 backdrop-blur-md"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            {badge}
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-prompt text-white mb-6 leading-none tracking-tight max-w-7xl "
          style={{
            fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
            textShadow: "0 2px 32px rgba(80,60,180,0.25)",
          }}
        >
          {headline}
        </h1>

        {/* Description */}
        <p
          className="text-[#EEEEEE] text-sm leading-relaxed mb-10"
          style={{ maxWidth: "420px" }}
        >
          {description || subtitle}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-4 mb-14">
          <a
            href={ctaPrimary.href}
            className="px-7 py-2.5 rounded-full font-prompt bg-[#7F77DD] text-lg text-white shadow-lg transition-all duration-200 hover:opacity-90 hover:scale-105"
            style={{
              boxShadow: "0 4px 24px rgba(100,80,220,0.35)",
            }}
          >
            {ctaPrimary.label}
          </a>

          <a
            href={ctaSecondary.href}
            className="px-7 py-2.5 rounded-full font-prompt text-lg text-white/85 border border-[#7F77DD] bg-white/8 backdrop-blur-md hover:bg-white/15 transition-all duration-200"
          >
            {ctaSecondary.label}
          </a>
        </div>

        {/* Info badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-lg text-black">
          {infoBadges.map((info, idx) => (
            <span className="text-lg" key={idx}>{info}</span>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(20,18,40,0.4))",
        }}
      />
    </section>
  );
};

export default LighterHeroSection;
