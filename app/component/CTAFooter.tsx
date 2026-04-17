"use client";
import React, { useRef, useState } from "react";

interface CTAFooterProps {
  title?: string;
  description?: string;
  emailPlaceholder?: string;
  ctaLabel?: string;
  logo?: string;
  videoUrl: string; 
}

const CTAFooter: React.FC<CTAFooterProps> = ({
  title = "READY TO BUILD\nSMARTER?",
  description = "Join creators, designers, and strategists leveling up their workflow with AI Limited seats available.",
  emailPlaceholder = "Enter Your Email Address",
  ctaLabel = "Reserve Your Seat",
  logo = "CREATIVE\nINTELLIGENCE\nLAB",
  videoUrl, 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPaused(false);
    } else {
      videoRef.current.pause();
      setPaused(true);
    }
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col">
      {/* Background video */}
      <video
        ref={videoRef}
        src={videoUrl} 
        autoPlay
        muted
        loop
        playsInline
        className="opacity-40 brightness-50 absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark gradient overlay */}
      {/* <div
        className="absolute inset-0"
        style={{
          background:
           "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(30, 24, 60, 0.2) 50%, rgba(255, 255, 255, 0.1) 100%)"
        }}
      /> */}

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 max-w-7xl mx-auto w-full px-10 py-20">
        {/* Main CTA */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          {/* Title */}
          <h2
            className="font-prompt text-[#0A0A0A] leading-none tracking-tight mb-6 whitespace-pre-line"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
          >
            {title}
          </h2>

          {/* Description */}
          <p className="text-sm text-[#FFFFFF] leading-relaxed mb-10 max-w-md">
            {description}
          </p>

          {/* Email input + CTA */}
       <div className="flex items-center gap-0 max-w-lg rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
  <input
    type="email"
    placeholder={emailPlaceholder}
    className="flex-1 bg-transparent text-white placeholder-white/40 text-sm px-6 py-4 rounded-l-full outline-none focus:bg-white/15 focus:border-white/30 transition-all"
  />
  <button
    className="flex-shrink-0 font-prompt text-sm text-white px-7 py-4 rounded-r-full transition-all hover:opacity-90"
    style={{
      background: "linear-gradient(135deg, #7c6fcf 0%, #5b4fcf 100%)",
    }}
  >
    {ctaLabel}
  </button>
</div>
        </div>

       
     
      </div>

      {/* Bottom bar */}
      <div className="relative w-[1400px] mx-auto  z-10 border-t border-[#FFFFFF] px-10 py-6 flex items-center justify-between">
        {/* Logo */}
        <p className="text-white/70 text-xs font-prompt leading-tight tracking-widest uppercase whitespace-pre-line">
          {logo}
        </p>

        {/* CTA button */}
        <button
          className="font-prompt text-sm text-white px-7 py-3 rounded-full transition-all hover:opacity-90"
          style={{
            background: "linear-gradient(135deg, #9b8fe8 0%, #7c6fcf 100%)",
          }}
        >
          {ctaLabel}
        </button>
      </div>
    </section>
  );
};

export default CTAFooter;