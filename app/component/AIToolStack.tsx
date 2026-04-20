"use client";
import Image from "next/image";
import React from "react";

interface Tool {
  iconSrc: string;
  iconAlt: string;
  name: string;
  description: string;
}

interface AIToolStackProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  tools: Tool[];
}

const AIToolStack: React.FC<AIToolStackProps> = ({
  badge = "THE AI TOOL STACK",
  title = "TOOLS YOU'LL USE IN\nTHE ROOM",
  subtitle = "No prior experience needed everything is taught from scratch.",
  tools,
}) => {
  return (
    <section className="w-full bg-[#f2f2f2] px-4 sm:px-6 md:px-10 lg:px-16 py-16 sm:py-20">
      <div className="w-full max-w-7xl mx-auto">
        {/* Badge */}
        <span className="inline-block text-xs font-prompt tracking-[0.18em] uppercase text-[#0A0A0A] border border-[#7F77DD] rounded-full px-5 py-1.5 mb-8">
          {badge}
        </span>

        {/* Title */}
        <h2
          className="text-3xl sm:text-5xl lg:text-6xl font-prompt text-gray-900 leading-none tracking-tight mb-4 whitespace-pre-line"
        >
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-500 mb-10 sm:mb-16 max-w-md">
          {subtitle}
        </p>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 ">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="w-full bg-[#F6F6F6] px-6 sm:px-8 lg:px-10 py-10 sm:py-12 flex flex-col hover:bg-white transition-colors duration-200 rounded-2xl"
            >
              {/* Icon */}
              <div className="relative w-12 h-12">
                <Image
                  src={tool.iconSrc}
                  alt={tool.iconAlt}
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>

              {/* Name + description */}
              <div>
                <h4 className="text-lg font-prompt uppercase tracking-widest text-[#0A0A0A] mb-1">
                  {tool.name}
                </h4>
                <p className="text-xs text-[#6C6C6C] leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIToolStack;

