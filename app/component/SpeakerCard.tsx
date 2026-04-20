import Image from "next/image";
import React from "react";

interface SpeakerCardProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  badge?: string;
  speakerType?: string;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({
  name,
  role,
  description,
  imageUrl,
  badge,
  speakerType,
}) => {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12 xl:gap-16">
      {/* Left: Image Card with purple gradient bg */}
      <div
        className="w-full max-w-[350px] sm:max-w-[430px] lg:w-[46%] lg:max-w-[520px] aspect-[1/1.02] rounded-3xl p-2 flex-shrink-0"
       
      >
        <div className="relative h-full w-full overflow-hidden rounded-[calc(1.5rem-2px)] bg-[#f5f5f8]">
          <div
            className="absolute inset-0"
         style={{
  background:
    "radial-gradient(circle at 32% 20%, rgba(10, 10, 18, 0.5) 0%, rgba(10, 10, 18, 0.22) 14%, rgba(10, 10, 18, 0) 34%), radial-gradient(circle at 52% 66%, rgba(105, 90, 195, 0.9) 0%, rgba(105, 90, 195, 0.5) 36%, rgba(105, 90, 195, 0) 70%)",
}}
          />
          <div className="absolute inset-x-[6%] bottom-[1%] top-[6%]">
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 640px) 350px, (max-width: 1024px) 430px, 520px"
              className=" object-bottom"
              style={{ filter: "grayscale(22%)" }}
            />
          </div>
        </div>
      </div>

      {/* Right: Speaker Info */}
      <div className="flex min-w-0 flex-1 flex-col gap-3 w-full max-w-xl lg:max-w-none text-center lg:text-left mt-6 lg:mt-14">
        {/* Speaker Type Badge */}
        <span
          data-aos="fade-right"
          className="self-center lg:self-start w-auto border border-[#7F77DD] text-lg font-prompt tracking-[0.18em] uppercase text-[#0A0A0A] rounded-full px-4 py-1.5 bg-white/60"
        >
          {badge ?? speakerType}
        </span>

        {/* Name */}
        <h2
          data-aos="zoom-in-right"
          className="text-3xl sm:text-4xl md:text-[2.8rem] xl:text-6xl font-prompt text-gray-900 mt-1 leading-tight break-words"
        >
          {name.split(" ")[0]} <br /> {name.split(" ").slice(1).join(" ")}
        </h2>

        {/* Role */}
        <p className="text-lg font-prompt text-[#7c6fcf]">{role}</p>

        {/* Description */}
        <p
          data-aos="fade-up-left"
          className="text-[#6C6C6C] text-lg font-prompt mt-6 sm:mt-8 lg:mt-10 leading-relaxed italic text-[0.95rem] lg:max-w-xl"
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default SpeakerCard;
