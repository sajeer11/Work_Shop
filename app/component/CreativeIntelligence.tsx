"use client";
import React, { useEffect, useRef } from "react";

interface CardProps {
  number: string;
  title: string;
  description: string;
}

interface CreativeIntelligenceProps {
  badge?: string;
  title: string;
  description: string;
  cards: CardProps[];
}

const CreativeIntelligence: React.FC<CreativeIntelligenceProps> = ({
  badge = "THE FRAMEWORK",
  title,
  description,
  cards,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDown.current && scrollRef.current) {
        const { scrollWidth, clientWidth, scrollLeft: sl } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        scrollRef.current.scrollLeft = sl < maxScroll ? sl + 1 : 0;
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  // Drag to scroll
  const onMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  };
  const onMouseLeave = () => { isDown.current = false; };
  const onMouseUp = () => { isDown.current = false; };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft.current - (x - startX.current);
  };

  return (
    <div className="w-full mx-auto bg-white ">
    <section className="max-w-7xl mx-auto bg-white px-6 py-20">
      {/* Badge */}
      <div className="flex justify-center mb-6">
        <span className="text-sm font-prompt tracking-[0.18em] uppercase text-[#0A0A0A]  h-[35px] border  border-[#7F77DD] rounded-full px-5 py-1.5">
          {badge}
        </span>
      </div>

      <h2
        data-aos="fade-up"
        className="text-4xl sm:text-5xl font-prompt text-center text-gray-900 leading-tight tracking-tight mb-4 whitespace-pre-line"
      >
        {title}
      </h2>

      <p
        data-aos="zoom-in-up"
        className="text-xs text-center text-gray-400 max-w-lg mx-auto mb-14"
      >
        {description}
      </p>
      {/* Cards — no visible scrollbar, drag to scroll */}
      <div className="overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-scroll cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[350px] h-[400px] sm:h-[450px] rounded-2xl border border-gray-100 bg-[#f7f7f9] p-6 flex flex-col justify-between"
            >
              <span className="text-xs font-prompt text-gray-300 tracking-widest">
                {card.number}
              </span>
              <div className="mt-auto pt-10">
                <h4 className="text-sm font-prompt text-gray-800 uppercase tracking-wide mb-1">
                  {card.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default CreativeIntelligence;
