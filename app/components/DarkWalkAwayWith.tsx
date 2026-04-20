import Image from "next/image";
import React from "react";

interface ResultItem {
  text: string;
}

interface DarkWalkAwayWithProps {
  badge: string;
  title: React.ReactNode;
  results: ResultItem[];
  imageUrl: string;
  imageAlt: string;
}

export default function DarkWalkAwayWith({
  badge,
  title,
  results,
  imageUrl,
  imageAlt,
}: DarkWalkAwayWithProps) {
  return (
    <section className="relative w-full overflow-hidden rounded-[32px] bg-[#1a1a1a] px-6 py-10 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-x-[38%] bottom-0 h-56 bg-[radial-gradient(circle,rgba(104,90,205,0.16),transparent_72%)]" />
      <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.2fr]">
        <div className="rounded-[22px] border border-white/7 bg-[#1c1c1c]">
          <div className="border-b border-white/7 px-5 py-4">
            <span className="inline-flex rounded-full border border-white/8 bg-white/4 px-4 py-1 text-[11px] uppercase tracking-[0.18em] text-[#9BEA34]">
              {badge}
            </span>
            <h2 className="mt-4 text-[clamp(2.1rem,4vw,3.4rem)] font-prompt leading-tight tracking-tight text-white">
              {title}
            </h2>
          </div>
          <ul className="space-y-2 p-3">
            {results.map((item) => (
              <li
                key={item.text}
                className="flex items-center gap-3 rounded-xl border border-white/7 bg-white/[0.02] px-4 py-3 text-sm text-white/72"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#9BEA34]/45 text-[10px] text-[#9BEA34]">
                  •
                </span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-[340px] overflow-hidden rounded-[22px] border border-white/6 bg-[#222]">
          <Image src={imageUrl} alt={imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 700px" />
        </div>
      </div>
    </section>
  );
}
