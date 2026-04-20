import Image from "next/image";
import React from "react";

interface DarkSpeakerCardProps {
  badge: string;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

export default function DarkSpeakerCard({
  badge,
  name,
  role,
  description,
  imageUrl,
}: DarkSpeakerCardProps) {
  const [first, second, third] = name.split(" ");

  return (
    <section className="relative w-full overflow-hidden rounded-[32px] bg-[#171717] px-6 py-12 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-x-[42%] bottom-0 h-48 bg-[radial-gradient(circle,rgba(104,90,205,0.2),transparent_70%)]" />
      <div className="relative z-10 flex flex-col items-center gap-10 lg:flex-row lg:items-start">
        <div className="relative w-full max-w-[360px] overflow-hidden rounded-[26px] bg-[#232323] shadow-[0_0_0_1px_rgba(255,255,255,0.04)] sm:max-w-[420px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(155,234,52,0.03),transparent_26%),radial-gradient(circle_at_78%_88%,rgba(104,90,205,0.22),transparent_30%)]" />
          <div className="relative aspect-[0.84]">
            <Image src={imageUrl} alt={name} fill className="object-cover object-bottom grayscale" sizes="(max-width: 768px) 100vw, 420px" />
          </div>
        </div>

        <div className="max-w-xl pt-2 text-center lg:pt-8 lg:text-left">
          <span className="inline-flex rounded-full border border-white/8 bg-white/4 px-4 py-1 text-[11px] uppercase tracking-[0.18em] text-[#9BEA34]">
            {badge}
          </span>
          <h2 className="mt-5 text-[clamp(2.5rem,5vw,4.25rem)] font-prompt leading-[0.95] tracking-tight text-white">
            {first}
            <br />
            <span className="text-[#9BEA34]">{second}</span> {third}
          </h2>
          <p className="mt-3 text-sm text-[#9BEA34]">{role}</p>
          <p className="mt-9 max-w-lg text-[1.05rem] leading-relaxed text-white/78 italic">{description}</p>
        </div>
      </div>
    </section>
  );
}
