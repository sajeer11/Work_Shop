"use client";

import React, { useEffect, useRef } from "react";

interface CardProps {
  number: string;
  title: string;
  description: string;
}

interface DarkCreativeIntelligenceProps {
  badge: string;
  title: React.ReactNode;
  description: string;
  cards: CardProps[];
}

export default function DarkCreativeIntelligence({
  badge,
  title,
  description,
  cards,
}: DarkCreativeIntelligenceProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    const interval = window.setInterval(() => {
      const maxScroll = node.scrollWidth - node.clientWidth;
      node.scrollLeft = node.scrollLeft >= maxScroll ? 0 : node.scrollLeft + 1;
    }, 22);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="w-full rounded-[32px] bg-[#171717] px-6 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <span className="inline-flex rounded-full border border-white/8 bg-white/4 px-4 py-1 text-[11px] uppercase tracking-[0.18em] text-[#9BEA34]">
          {badge}
        </span>
        <h2 className="mt-5 text-[clamp(2.3rem,5vw,4rem)] font-prompt leading-tight tracking-tight text-white">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/45">{description}</p>
      </div>

      <div ref={scrollRef} className="mt-10 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none]">
        {cards.map((card) => (
          <article
            key={card.number}
            className="flex h-[350px] min-w-[180px] flex-shrink-0 flex-col justify-between rounded-[18px] border border-white/7 bg-[#1f1f1f] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:min-w-[220px] lg:min-w-[250px]"
          >
            <span className="text-xs tracking-[0.18em] text-white/18">{card.number}</span>
            <div>
              <h3 className="text-lg font-medium uppercase text-white">{card.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-white/45">{card.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
