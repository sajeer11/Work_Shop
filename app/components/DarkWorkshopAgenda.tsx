import React from "react";

interface AgendaItem {
  number: string;
  title: string;
  description: string;
}

interface DarkWorkshopAgendaProps {
  badge: string;
  title: React.ReactNode;
  subtitle: string;
  items: AgendaItem[];
}

export default function DarkWorkshopAgenda({
  badge,
  title,
  subtitle,
  items,
}: DarkWorkshopAgendaProps) {
  return (
    <section className="relative w-full rounded-[32px] bg-[#171717] px-6 py-12 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 bg-[radial-gradient(circle,rgba(155,234,52,0.12),transparent_72%)]" />
      <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-start">
        <div className="w-full md:sticky md:top-24 md:w-[34%]">
          <span className="inline-flex rounded-full border border-white/8 bg-white/4 px-4 py-1 text-[11px] uppercase tracking-[0.18em] text-[#9BEA34]">
            {badge}
          </span>
          <h2 className="mt-5 text-[clamp(2.4rem,5vw,4rem)] font-prompt leading-[0.98] tracking-tight text-white">
            {title}
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/45">{subtitle}</p>
        </div>

        <div className="w-full divide-y divide-white/8 md:w-[66%]">
          {items.map((item) => (
            <div
              key={item.number}
              className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-4 gap-y-3 py-6 sm:gap-x-5 md:grid-cols-[40px_minmax(0,1.1fr)_minmax(0,1fr)] md:gap-y-0"
            >
              <span className="pt-1 text-xs tracking-[0.16em] text-white/18">{item.number}</span>
              <div className="min-w-0 md:contents">
                <h3 className="max-w-[16rem] text-base sm:text-lg font-medium uppercase leading-tight text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/48 md:mt-0">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
