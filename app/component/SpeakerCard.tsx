import React from "react";

interface SpeakerCardProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  badge: string;
  speakerType: string;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({
  name,
  role,
  description,
  imageUrl,
  speakerType,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 gap-6 flex items-center justify-center flex-col sm:flex-row">
  {/* Left: Image Card with purple gradient bg */}
  <div
    className="flex-shrink-0 w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[560px] rounded-3xl overflow-hidden"
    style={{
      // background: "linear-gradient(160deg, #dcd6f7 0%, #b8b0e8 40%, #8f87d4 100%)",
    }}
  >
    <img
      src={imageUrl}
      alt={name}
      className="w-full h-full object-cover object-top"
      style={{ mixBlendMode: "luminosity", filter: "grayscale(20%)" }}
    />
  </div>

  {/* Right: Speaker Info */}
  <div className="flex flex-col gap-3 max-w-sm sm:max-w-md lg:max-w-lg sm:ml-16 mt-6 sm:mt-0">
    {/* Speaker Type Badge */}
    <span className="self-start w-[110px] border border-[#7F77DD] text-sm font-prompt tracking-[0.18em] uppercase text-[#0A0A0A] rounded-full px-4 py-1.5 bg-white/60">
      {speakerType}
    </span>

    {/* Name */}
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-prompt text-gray-900 mt-1">
      {name.split(" ")[0]} <br /> {name.split(" ").slice(1).join(" ")}
    </h2>

    {/* Role */}
    <p className="text-sm font-prompt text-[#7c6fcf]">{role}</p>

    {/* Description */}
    <p className="text-[#6C6C6C] font-prompt mt-10 leading-relaxed italic text-[0.95rem]">
      {description}
    </p>
  </div>
</div>
  );
};

export default SpeakerCard;