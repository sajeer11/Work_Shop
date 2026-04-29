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
        headline={hero.headline}
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
          title={creativeIntelligence.title}
          description={creativeIntelligence.description}
          cards={creativeIntelligence.cards}
        />
<div  id="workshop-agenda">
        <DarkWorkshopAgenda 
          badge={workshopAgenda.badge}
          title={workshopAgenda.title}
          subtitle={workshopAgenda.subtitle}
          items={workshopAgenda.items}
        />
</div>

<div className="mt-12">
        <DarkAIToolStack
          badge={aiToolStack.badge}
          title={aiToolStack.title}
          subtitle={aiToolStack.subtitle}
          tools={aiToolStack.tools}
        />
</div>
        <DarkWalkAwayWith
          badge={walkAwayWith.badge}
          title={walkAwayWith.title}
          results={walkAwayWith.results}
          imageUrl={walkAwayWith.imageUrl}
          imageAlt={walkAwayWith.imageAlt}
        />
      </div>

      <DarkCTAFooter
        logoSrc={ctaFooter.logoSrc}
        title={ctaFooter.title}
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
