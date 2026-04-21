import lightPageJson from "../_data/light-page.json";
import type { LightPageContent } from "../_data/page-content.types";
import LighterAIToolStack from "./components/LighterAIToolStack";
import LighterCTAFooter from "./components/LighterCTAFooter";
import LighterCreativeIntelligence from "./components/LighterCreativeIntelligence";
import LighterHeroSection from "./components/LighterHeroSection";
import LighterSpeakerCard from "./components/LighterSpeakerCard";
import LighterWalkAwayWith from "./components/LighterWalkAwayWith";
import LighterWorkshopAgenda from "./components/LighterWorkshopAgenda";

const lightPageData = lightPageJson as LightPageContent;

export default function LighterVersionPage() {
  const { hero, speaker, creativeIntelligence, workshopAgenda, aiToolStack, walkAwayWith, ctaFooter } =
    lightPageData;

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-white to-indigo-50">
      <LighterHeroSection {...hero} />

      <div className="mt-16 sm:mt-24 lg:mt-32" />

      <LighterSpeakerCard {...speaker} />

      <div className="mt-16 sm:mt-24 lg:mt-32" />

      <LighterCreativeIntelligence
        badge={creativeIntelligence.badge}
        title={creativeIntelligence.title}
        description={creativeIntelligence.description}
        cards={creativeIntelligence.cards.map((card) => ({
          number: card.number ?? "",
          title: card.title,
          description: card.description,
        }))}
      />

      <LighterWorkshopAgenda
        badge={workshopAgenda.badge}
        title={workshopAgenda.title}
        subtitle={workshopAgenda.subtitle}
        items={workshopAgenda.items}
      />

      <LighterAIToolStack
        badge={aiToolStack.badge}
        title={aiToolStack.title}
        subtitle={aiToolStack.subtitle}
        tools={aiToolStack.tools}
      />

      <LighterWalkAwayWith
        badge={walkAwayWith.badge}
        title={walkAwayWith.title}
        imageUrl={walkAwayWith.imageUrl}
        imageAlt={walkAwayWith.imageAlt}
        results={walkAwayWith.results}
      />

      <LighterCTAFooter
        videoUrl={ctaFooter.videoUrl}
        title={ctaFooter.title}
        description={ctaFooter.description}
        emailPlaceholder={ctaFooter.emailPlaceholder}
        ctaLabel={ctaFooter.ctaLabel}
        logo={ctaFooter.logo}
      />
    </main>
  );
}
