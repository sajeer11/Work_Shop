import React from "react";

interface AgendaItem {
  number: string;
  title: string;
  description: string;
}

interface DarkWorkshopAgendaProps {
  badge: string;
  title: {
    text: string;
    accent: string;
  };
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
    "inline-flex font-prompt font-normal rounded-full border border-white/12 bg-[linear-gradient(180deg,rgba(48,48,48,0.96),rgba(28,28,28,0.96))] px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-[#9BEA34] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl";

  return (
    <section className="relative w-full px-6 py-12 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute -bottom-28 -left-28 h-[560px] w-[560px] bg-[radial-gradient(circle_at_28%_70%,rgba(155,234,52,0.2)_0%,rgba(155,234,52,0.09)_34%,transparent_68%)]" />
      <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-start">
        <div className="w-full md:sticky md:top-24 md:w-[34%]">
          <span className={pillClassName}>
            {badge}
          </span>
          <h2 className="mt-5 whitespace-nowrap font-plus lg:text-[45px] text-[35px] font-medium leading-[1.2] tracking-normal text-white">
            <span>{title.text}</span>{" "}
            <span className="font-bold italic text-[#9BEA34] lg:text-[45px] md:text-[22px]">{title.accent}</span>
          </h2>
          <p className="mt-4 max-w-sm font-prompt font-normal text-[15px] leading-relaxed text-[#DDDDDD]">{subtitle}</p>
        </div>

        <div className="w-full divide-y divide-white/8 md:w-[66%]">
          {items.map((item) => (
            <div
              key={item.number}
              className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-4 gap-y-3 py-6 sm:gap-x-5 md:grid-cols-[40px_minmax(0,1.1fr)_minmax(0,1fr)] md:gap-y-0"
            >
              <span className="pt-1 text-[18px] font-prompt font-normal tracking-[0.16em] text-white/18">{item.number}</span>
              <div className="min-w-0 md:contents">
                <h3 className="text-[24px] font-prompt font-normal  sm:text-lg  uppercase leading-tight text-[#FFFFFF]">
                  {item.title}
                </h3>
                <p className="text-[15px]  font-prompt font-normal leading-relaxed text-[#DDDDDD] md:mt-0">
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
