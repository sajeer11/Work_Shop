import React from "react";

interface HeroSectionProps {
  headline: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  badge: string;
  logo?: string;
  topRightButton: { label: string; href: string };
  infoBadges: string[];
}

const Herosection: React.FC<HeroSectionProps> = ({
  headline,
  subtitle,
  description,
  videoUrl,
  ctaPrimary,
  ctaSecondary,
  badge,
  logo = "CREATIVE\nINTELLIGENCE\nLAB",
  topRightButton,
  infoBadges,
}) => {
  return (
    <section
      className="relative flex flex-col min-h-screen w-full overflow-hidden "
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 60% 40%, #7c6fcf 0%, #6b5fa8 10%, #4a4580 45%, #2a2550 70%, #1a1830 100%)",
      }}
    >
   
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to darken video for better text visibility */}
      <div className="absolute inset-0 bg-white/20 z-10"></div>

      <nav className="relative z-10 flex items-center w-full px-4 sm:px-6 md:px-10 pt-8 pb-2 gap-4">
  
  {/* Logo */}
  <div className="text-white text-xs lg:text-sm md:text-sm font-prompt leading-tight tracking-widest uppercase whitespace-pre-line opacity-90 shrink-0">
    {logo}
  </div>

  {/* Button */}
  <a
    href={topRightButton.href}
    className="ml-auto text-sm font-prompt px-6 py-2 rounded-full text-white border border-white/20 bg-[#7F77DD] backdrop-blur-md hover:bg-white/20 transition-all duration-200 shadow whitespace-nowrap shrink-0"
  >
    {topRightButton.label}
  </a>

</nav>

      {/* Main content — centered vertically in remaining space */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 pb-16 pt-8 text-center">
        {/* Badge pill */}
        <div className="mb-8">
          <span
            className="inline-block px-5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-white/90 border border-white/20 backdrop-blur-md"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            {badge}
          </span>
        </div>

        {/* Headline */}
        <h1
          data-aos="fade-down"
          className="font-prompt text-white text-center mb-6 leading-none tracking-tight max-w-7xl"
          style={{
            fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
            textShadow: "0 2px 32px rgba(80,60,180,0.25)",
        
          }}
        >
          {headline}
        </h1>

        {/* Description */}
        <p
          data-aos="fade-up"
          className="text-[#EEEEEE] text-sm leading-relaxed mb-10 "
          style={{ maxWidth: "420px" }}
        >
          {description || subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4 mb-14">
          <a
            href={ctaPrimary.href}
            className="px-7 py-2.5 rounded-full font-prompt bg-[#7F77DD] text-sm text-white shadow-lg transition-all duration-200 hover:opacity-90 hover:scale-105"
            style={{
             
              boxShadow: "0 4px 24px rgba(100,80,220,0.35)",
            }}
          >
            {ctaPrimary.label}
          </a>
          <a
            href={ctaSecondary.href}
            className="px-7 py-2.5 rounded-full font-prompt text-sm text-white/85 border border-white/20 bg-white/8 backdrop-blur-md hover:bg-white/15 transition-all duration-200"
          >
            {ctaSecondary.label}
          </a>
        </div>

        {/* Info badges row */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/60">
          {infoBadges.map((info, idx) => (
            <span key={idx} className="flex items-center gap-1.5">
             
              {info}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom fade for blending */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(20,18,40,0.3))",
        }}
      />
    </section>
  );
};

export default Herosection;

