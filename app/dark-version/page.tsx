import DarkAIToolStack from "./components/DarkAIToolStack";
import DarkCreativeIntelligence from "./components/DarkCreativeIntelligence";
import DarkCTAFooter from "./components/DarkCTAFooter";
import DarkHeroSection from "./components/DarkHeroSection";
import DarkSpeakerCard from "./components/DarkSpeakerCard";
import DarkWalkAwayWith from "./components/DarkWalkAwayWith";
import DarkWorkshopAgenda from "./components/DarkWorkshopAgenda";
import darkPageJson from "../_data/dark-page.json";
import type { DarkPageContent } from "../_data/page-content.types";

const darkPageData = darkPageJson as DarkPageContent;

export default function DarkVersionPage() {
  const { hero, speaker, creativeIntelligence, workshopAgenda, aiToolStack, walkAwayWith, ctaFooter } =
    darkPageData;

  return (
    <main className="min-h-screen w-full bg-[#121212] py-6">
      <DarkHeroSection
        logoSrc={hero.logoSrc}
        badge={hero.badge}
        headline={
          <span className="relative inline-flex flex-col items-center">
            <span
              className="relative z-0 block bg-clip-text text-[clamp(4.9rem,12vw,10.2rem)] font-black leading-[0.84] tracking-[-0.065em] text-transparent drop-shadow-[0_10px_30px_rgba(153,237,67,0.18)]"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #99ED43 50.21%, #000000 128.22%)",
              }}
            >
              {hero.headline.top}
            </span>
            <span className="relative z-10 -mt-7 block text-[clamp(3.3rem,8.2vw,6.5rem)] font-light italic leading-[0.78] tracking-[-0.065em] text-white sm:-mt-9">
              {hero.headline.bottom}
            </span>
          </span>
        }
        description={hero.description}
        ctaPrimary={hero.ctaPrimary}
        ctaSecondary={hero.ctaSecondary}
        topRightButton={hero.topRightButton}
        infoBadges={hero.infoBadges}
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pt-10 sm:px-6 lg:px-10">
        <DarkSpeakerCard {...speaker} />

        <DarkCreativeIntelligence
          badge={creativeIntelligence.badge}
          title={
            <>
              <span className="text-[#9BEA34]">{creativeIntelligence.title.accent}</span>{" "}
              {creativeIntelligence.title.text}
              <br />
              {creativeIntelligence.title.secondLine}
            </>
          }
          description={creativeIntelligence.description}
          cards={creativeIntelligence.cards}
        />
<div  id="workshop-agenda">
        <DarkWorkshopAgenda 
          badge={workshopAgenda.badge}
          title={
            <>
              {workshopAgenda.title.text}{" "}
              <span className="text-[#9BEA34] italic">{workshopAgenda.title.accent}</span>
            </>
          }
          subtitle={workshopAgenda.subtitle}
          items={workshopAgenda.items}
        />
</div>
        <DarkAIToolStack
          badge={aiToolStack.badge}
          title={
            <>
              <span className="text-[#9BEA34] italic">{aiToolStack.title.accent}</span>{" "}
              {aiToolStack.title.text}
              <br />
              {aiToolStack.title.secondLine}
            </>
          }
          subtitle={aiToolStack.subtitle}
          tools={aiToolStack.tools}
        />

        <DarkWalkAwayWith
          badge={walkAwayWith.badge}
          title={
            <>
              {walkAwayWith.title.prefix}{" "}
              <span className="text-[#9BEA34]">{walkAwayWith.title.accentLineOne}</span>
              <br />
              <span className="text-[#9BEA34]">{walkAwayWith.title.accentLineTwo}</span>
            </>
          }
          results={walkAwayWith.results}
          imageUrl={walkAwayWith.imageUrl}
          imageAlt={walkAwayWith.imageAlt}
        />
      </div>

      <DarkCTAFooter
        logoSrc={ctaFooter.logoSrc}
        title={
          <>
            <span className="text-[#9BEA34]">{ctaFooter.title.accent}</span>{" "}
            {ctaFooter.title.text}
          </>
        }
        description={ctaFooter.description}
        emailPlaceholder={ctaFooter.emailPlaceholder}
        ctaLabel={ctaFooter.ctaLabel}
        ctaHref={ctaFooter.ctaHref}
        footerLinks={ctaFooter.footerLinks}
        copyrightText={ctaFooter.copyrightText}
      />
    </main>
  );
}
