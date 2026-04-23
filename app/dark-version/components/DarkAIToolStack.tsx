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
  title: {
    accent: string;
    text: string;
    secondLine?: string;
  };
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
    "inline-flex rounded-full font-prompt font-normal text-[15px] border border-white/12 bg-[linear-gradient(180deg,rgba(48,48,48,0.96),rgba(28,28,28,0.96))] px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-[#9BEA34] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl";

  return (
    <section className="w-full px-6 py-12 sm:px-8 lg:px-12">
      <div className="max-w-md">
        <span className={pillClassName}>
          {badge}
        </span>
        <h2 className="mt-5 font-plus text-[54px] font-medium leading-[1.2] tracking-normal text-white">
          <span className="font-bold italic text-[#9BEA34]">{title.accent}</span>{" "}
          {title.text}
          {title.secondLine ? (
            <>
              <br />
              {title.secondLine}
            </>
          ) : null}
        </h2>
        <p className="mt-3 text-[15px] font-prompt font-normal leading-relaxed text-[#DDDDDD]">{subtitle}</p>
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
            <h3 className="mt-8 text-xl font-prompt font-normal text-[15px] uppercase tracking-wide text-white">{tool.name}</h3>
            <p className="mt-1 text-[15px] font-prompt font-normal leading-relaxed text-[#DDDDDD]">{tool.description} </p>
          </article>
        ))}
      </div>
    </section>
  );
}
