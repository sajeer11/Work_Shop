"use client";
import React, { useRef } from "react";

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
      <div className="relative z-10 flex flex-col flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
        {/* Main CTA */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl pt-10 sm:pt-0">
          {/* Title */}
          <h2
            data-aos="zoom-in-up"
            className="font-prompt text-black leading-none tracking-tight mb-5 sm:mb-6 whitespace-pre-line"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
          >
            {title}
          </h2>

          {/* Description */}
          <p
            data-aos="fade-up"
            className="text-sm text-[#FFFFFF] leading-relaxed mb-8 sm:mb-10 max-w-md"
          >
            {description}
          </p>

          {/* Email input + CTA */}
          <div className="flex w-full max-w-lg flex-col sm:flex-row sm:items-center rounded-[28px] sm:rounded-full border border-white/20 bg-white/10 backdrop-blur-md p-1.5">
            <input
              type="email"
              placeholder={emailPlaceholder}
              className="min-w-0 flex-1 bg-transparent text-white placeholder-white/40 text-sm px-5 sm:px-6 py-4 rounded-full outline-none focus:bg-white/15 transition-all"
            />
            <button
              className="w-full sm:w-auto flex-shrink-0 font-prompt text-sm text-white px-6 sm:px-7 py-4 rounded-full transition-all hover:opacity-90"
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
      <div className="relative z-10 w-full max-w-7xl mx-auto border-t border-[#FFFFFF] px-4 sm:px-6 lg:px-10 py-6">
        {/* Logo */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/70 text-xs font-prompt leading-tight tracking-widest uppercase whitespace-pre-line text-center sm:text-left">
            {logo}
          </p>

          {/* CTA button */}
          <button
            className="w-full sm:w-auto font-prompt text-sm text-white px-7 py-3 rounded-full transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #9b8fe8 0%, #7c6fcf 100%)",
            }}
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTAFooter;
