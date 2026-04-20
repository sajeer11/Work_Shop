"use client";
import React from "react";

interface AgendaItem {
  number: string;
  title: string;
  description: string;
}

interface WorkshopAgendaProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  items: AgendaItem[];
}

const WorkshopAgenda: React.FC<WorkshopAgendaProps> = ({
  badge = "WHAT YOU'LL COVER",
  title = "WORKSHOP\nAGENDA",
  subtitle = "09 modules, fully AI-driven each builds directly on the last.",
  items,
}) => {
  return (
    <div className="w-full bg-white">
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row  rounded-2xl overflow-hidden">

        {/* Left Panel */}
        <div className="w-full md:w-[38%]  p-10 flex flex-col justify-between ]">
          {/* Badge */}
          <div>
            <span className="inline-block text-xs h-auto font-semibold tracking-[0.18em] uppercase text-gray-700 border border-[#7F77DD] rounded-full px-4 py-1.5 mb-8">
              {badge}
            </span>

            {/* Title */}
            <h2
              data-aos="fade-left"
              className="text-4xl sm:text-6xl font-prompt text-gray-900 leading-none tracking-tight mb-6 whitespace-pre-line"
            >
              {title}
            </h2>

            {/* Subtitle */}
            <p
              data-aos="fade-up-left"
              className="text-xs text-gray-400 leading-relaxed max-w-xs"
            >
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right Panel — agenda list */}
        <div className="w-full md:w-[62%] divide-y divide-gray-100">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-6 px-8 py-7 hover:bg-gray-50 transition-colors duration-150"
            >
              {/* Step number */}
              <span className="text-xs font-prompt text-gray-300 tracking-widest pt-1 w-6 ">
                {item.number}
              </span>

             

              {/* Title */}
              <h4 className="text-sm font-prompt text-[#0A0A0A] uppercase tracking-wide leading-snug w-[45%] flex-shrink-0">
                {item.title}
              </h4>

              {/* Description */}
              <p className="text-xs text-[#6C6C6C] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default WorkshopAgenda;

