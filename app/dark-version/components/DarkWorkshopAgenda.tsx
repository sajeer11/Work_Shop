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
  const pillClassName =
    "inline-flex rounded-full border border-white/12 bg-[linear-gradient(180deg,rgba(48,48,48,0.96),rgba(28,28,28,0.96))] px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-[#9BEA34] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl";

  return (
    <section className="relative w-full rounded-[32px] bg-[#171717] px-6 py-12 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 bg-[radial-gradient(circle,rgba(155,234,52,0.12),transparent_72%)]" />
      <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-start">
        <div className="w-full md:sticky md:top-24 md:w-[34%]">
          <span className={pillClassName}>
            {badge}
          </span>
          <h2 className="mt-5 text-[clamp(2.4rem,5vw,4rem)] font-prompt leading-[0.98] tracking-tight text-white">
            {title}
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#DDDDDD]">{subtitle}</p>
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
                <p className="text-sm leading-relaxed text-[#DDDDDD] md:mt-0">
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
