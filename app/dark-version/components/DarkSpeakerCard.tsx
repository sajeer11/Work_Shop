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
  const pillClassName =
    "inline-flex font-prompt font-Regular text-[15px] rounded-full border border-white/12 bg-[linear-gradient(180deg,rgba(48,48,48,0.96),rgba(28,28,28,0.96))] px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-[#9BEA34] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl";

  return (
    <section className="relative w-full overflow-hidden px-6 py-12 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-x-[42%] bottom-0 h-48 bg-[radial-gradient(circle,rgba(104,90,205,0.2),transparent_70%)]" />
      <div className="relative z-10 flex flex-col items-center gap-10 lg:flex-row lg:items-start">
        <div className="relative w-full max-w-[360px] overflow-hidden rounded-[26px] bg-[#232323] shadow-[0_0_0_1px_rgba(255,255,255,0.04)] sm:max-w-[420px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(155,234,52,0.03),transparent_26%),radial-gradient(circle_at_78%_88%,rgba(104,90,205,0.22),transparent_30%)]" />
          <div className="relative aspect-[0.84]">
            <Image src={imageUrl} alt={name} fill className="object-cover object-bottom grayscale" sizes="(max-width: 768px) 100vw, 420px" />
          </div>
        </div>

        <div className="max-w-xl pt-2 text-center lg:pt-8 lg:text-left">
          <span className={pillClassName}>
            {badge}
          </span>
          <h2 className="mt-5 font-plus text-[54px] font-medium leading-[1.2] tracking-normal text-white">
            {first}
            <br />
            <span className="font-bold italic text-[#9BEA34]">{second}</span> {third}
          </h2>
          <p className="mt-3 text-[15px] font-prompt text-[#9BEA34]">{role}</p>
          <p className="mt-9 max-w-lg font-prompt text-[24px] font-normal italic leading-[1.3] tracking-normal text-[#DDDDDD]">{description}</p>
        </div>
      </div>
    </section>
  );
}
