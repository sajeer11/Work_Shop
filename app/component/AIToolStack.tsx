"use client";
import React from "react";

interface Tool {
  icon: React.ReactNode;
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
    <section className="w-full bg-[#f2f2f2] px-16 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Badge */}
        <span className="inline-block text-xs font-prompt tracking-[0.18em] uppercase text-[#0A0A0A] border border-[#7F77DD] rounded-full px-5 py-1.5 mb-8">
          {badge}
        </span>

        {/* Title */}
        <h2
          className="text-5xl sm:text-6xl font-prompt text-gray-900 leading-none tracking-tight mb-4 whitespace-pre-line"
        >
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-500 mb-16 max-w-md">
          {subtitle}
        </p>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 ">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-[#F6F6F6] px-10 py-12 flex flex-col gap-10 h-50 hover:bg-white transition-colors duration-200 rounded-2xl"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center">
                {tool.icon}
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

