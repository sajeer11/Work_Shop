import Image from "next/image";
import React from "react";

interface Tool {
  iconSrc: string;
  iconAlt: string;
  name: string;
  description: string;
}

interface DarkAIToolStackProps {
  badge: string;
  title: React.ReactNode;
  subtitle: string;
  tools: Tool[];
}

export default function DarkAIToolStack({
  badge,
  title,
  subtitle,
  tools,
}: DarkAIToolStackProps) {
  const pillClassName =
    "inline-flex rounded-full border border-white/12 bg-[linear-gradient(180deg,rgba(48,48,48,0.96),rgba(28,28,28,0.96))] px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-[#9BEA34] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl";

  return (
    <section className="w-full rounded-[32px] bg-[#171717] px-6 py-12 sm:px-8 lg:px-12">
      <div className="max-w-md">
        <span className={pillClassName}>
          {badge}
        </span>
        <h2 className="mt-5 text-[clamp(2.3rem,5vw,4rem)] font-prompt leading-tight tracking-tight text-white">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#DDDDDD]">{subtitle}</p>
      </div>

      <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <article
            key={tool.name}
            className="rounded-[18px] border border-white/8 bg-[#1f1f1f] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
          >
            <div className="relative h-10 w-10">
              <Image src={tool.iconSrc} alt={tool.iconAlt} fill sizes="40px" className="object-contain" />
            </div>
            <h3 className="mt-8 text-xl font-medium uppercase tracking-wide text-white">{tool.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#DDDDDD]">{tool.description} </p>
          </article>
        ))}
      </div>
    </section>
  );
}
