"use client";
import Image from "next/image";
import React from "react";

interface ResultItem {
  text: string;
}

interface WalkAwayWithProps {
  badge?: string;
  title?: string;
  results: ResultItem[];
  imageUrl: string;
  imageAlt?: string;
}

const WalkAwayWith: React.FC<WalkAwayWithProps> = ({
  badge = "RESULTS",
  title = "WHAT YOU'LL\nWALK AWAY WITH",
  results,
  imageUrl,
  imageAlt = "Workshop result",
}) => {
  return (
    <div className="w-full bg-white">
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row  rounded-2xl overflow-hidden min-h-[400px]">

        {/* Left Panel */}
        <div className="  w-full md:w-1/2 bg-white px-10 py-10 flex flex-col justify-between border-b md:border-b-0 md:border-r">
          {/* Top: badge + title */}
          <div>
            {/* Badge */}
            <span className="inline-block text-xs font-prompt tracking-[0.18em] uppercase text-gray-700 border  border-[#7F77DD] rounded-full px-4 py-1.5 mb-8">
              {badge}
            </span>

            {/* Title */}
            <h2
              className="text-4xl sm:text-5xl font-promt text-gray-900 leading-none tracking-tight mb-10 whitespace-pre-line"
            >
              {title}
            </h2>
          </div>

          {/* Results list */}
          <ul className="flex flex-col gap-5">
            {results.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                {/* Circle check icon */}
                <span className="flex-shrink-0 mt-0.5">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="10" cy="10" r="9" stroke="#d1d5db" strokeWidth="1.5" />
                    <path
                      d="M6.5 10.5l2.5 2.5 4.5-5"
                      stroke="#9ca3af"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm text-gray-600 leading-relaxed">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Panel — image */}
        <div className="w-full md:w-1/2 relative min-h-[320px]">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
    </div>
  );
};

export default WalkAwayWith;
