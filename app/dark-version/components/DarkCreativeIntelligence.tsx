"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";

interface CardProps {
  title: string;
  description: string;
  img?: string;
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
  const pillClassName =
    "inline-flex rounded-full border border-white/12 bg-[linear-gradient(180deg,rgba(48,48,48,0.96),rgba(28,28,28,0.96))] px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-[#9BEA34] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl";

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
        <span className={pillClassName}>
          {badge}
        </span>
        <h2 className="mt-5 text-[clamp(2.3rem,5vw,4rem)] font-prompt leading-tight tracking-tight text-white">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#DDDDDD]">{description}</p>
      </div>

      <div ref={scrollRef} className="mt-10 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none]">
        {cards.map((card) => (
          <article
            key={card.title}
            className="flex h-[250px] min-w-[180px] flex-shrink-0 flex-col justify-between rounded-[18px] border border-white/7 bg-[#1f1f1f] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:min-w-[220px] lg:min-w-[250px]"
          >
            <div className="flex h-16 items-start">
              {card.img ? (
                <div className="relative h-16 w-[132px]">
                  <Image
                    src={card.img}
                    alt={`${card.title} icon`}
                    fill
                    sizes="132px"
                    className="object-contain"
                  />
                </div>
              ) : null}
            </div>
            <div>
              <h3 className="text-lg font-medium uppercase text-[#DDDDDD]">{card.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-[#DDDDDD]">{card.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
