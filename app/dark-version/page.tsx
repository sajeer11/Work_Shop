import DarkAIToolStack from "../components/DarkAIToolStack";
import DarkCreativeIntelligence from "../components/DarkCreativeIntelligence";
import DarkCTAFooter from "../components/DarkCTAFooter";
import DarkHeroSection from "../components/DarkHeroSection";
import DarkSpeakerCard from "../components/DarkSpeakerCard";
import DarkWalkAwayWith from "../components/DarkWalkAwayWith";
import DarkWorkshopAgenda from "../components/DarkWorkshopAgenda";

export default function DarkVersionPage() {
  const creativeCards = [
    { number: "01", title: "IDEA", description: "AI-assisted concept generation" },
    { number: "02", title: "MESSAGE", description: "Craft the right narrative" },
    { number: "03", title: "VISUAL", description: "Design assets with AI tools" },
    { number: "04", title: "FORMAT", description: "Adapt for every platform" },
    { number: "05", title: "PRODUCT", description: "Video, media, and more" },
    { number: "06", title: "PRODUCTION", description: "Finalize and deliver optimized assets" },
  ];

  const agendaItems = [
    { number: "01", title: "SETTING THE STAGE", description: "AI-narrated welcome + live warm-up exercise with a generated creative brief" },
    { number: "02", title: "MODERN CREATIVE REALITY", description: "The creator economy shift - why design + video + AI is now one skill" },
    { number: "03", title: "THE CREATIVE INTELLIGENCE FRAMEWORK", description: "Build a full content plan from a single prompt using the 6-step system" },
    { number: "04", title: "CORE DESIGN PRINCIPLES", description: "Hierarchy, spacing, contrast - applied live with AI-generated examples" },
    { number: "05", title: "SOCIAL MEDIA CAMPAIGN DESIGN", description: "One brief to posts, stories, reels adapted per platform with AI tools" },
    { number: "06", title: "VIDEO PRODUCTION & MOTION", description: "Text-to-video with Higgsfield + live AI editing session" },
    { number: "07", title: "AI IN CREATIVE WORKFLOWS", description: "Full pipeline demo: concept to design to video to caption, live" },
    { number: "08", title: "LIVE BUILD", description: "Audience gives a prompt - Muneeb builds a finished piece on screen in real time" },
    { number: "09", title: "Q&A + AI CAREER PATHWAYS", description: "Leave with a personalized AI upskilling roadmap for your creative goals" },
  ];

  const tools = [
    { iconSrc: "/cloud.svg", iconAlt: "Claude", name: "CLAUDE / CHATGPT", description: "Ideation, briefs & planning" },
    { iconSrc: "/higgsfield.svg", iconAlt: "Higgsfield", name: "HIGGSFIELD", description: "Text-to-video generation" },
    { iconSrc: "/naino-banana.svg", iconAlt: "Nano Banana Pro", name: "NANO BANANA PRO", description: "Multi-format social assets" },
    { iconSrc: "/midjourney.svg", iconAlt: "Midjourney", name: "MIDJOURNEY", description: "Visual & mood board creation" },
    { iconSrc: "/canva.svg", iconAlt: "Canva AI", name: "CANVA AI", description: "Campaign templates & scaling" },
    { iconSrc: "/runway.svg", iconAlt: "Runway ML", name: "RUNWAY ML", description: "Video editing & motion" },
  ];

  const results = [
    { text: "A working AI-powered content workflow" },
    { text: "A short video created from a text prompt" },
    { text: "Practical knowledge of 6 AI tools" },
    { text: "A multi-format social campaign you built" },
    { text: "Your personalized AI upskilling roadmap" },
    { text: "Career positioning in the AI-creative space" },
  ];

  return (
    <main className="min-h-screen w-full bg-[#121212] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-[1450px] flex-col gap-10">
        <DarkHeroSection
          badge="WORKSHOP - LIVE & AI POWERED"
          headline={
            <span className="relative inline-flex flex-col items-center">
              <span
                className="relative z-0 block bg-clip-text text-[clamp(4.9rem,12vw,10.2rem)] font-black leading-[0.84] tracking-[-0.065em] text-transparent drop-shadow-[0_10px_30px_rgba(153,237,67,0.18)]"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #99ED43 50.21%, #000000 128.22%)",
                }}
              >
                Creative
              </span>
              <span className="relative z-10 -mt-7 block text-[clamp(3.3rem,8.2vw,6.5rem)] font-light italic leading-[0.78] tracking-[-0.065em] text-white sm:-mt-9">
                Intelligence Lab
              </span>
            </span>
          }
          description="How modern creators build smarter content: a fully AI-driven hands-on workshop by Brand Republic."
          ctaPrimary={{ label: "Register Now", href: "#register" }}
          ctaSecondary={{ label: "View Full Agenda", href: "#agenda" }}
          topRightButton={{ label: "Reserve Your Seat", href: "#reserve" }}
          infoBadges={["â€¢ Full-Day Workshop", "â€¢ Beginner To Intermediate", "â€¢ Live AI Demos"]}
        />

        <DarkSpeakerCard
          badge="SPEAKER"
          name="Syed Muneeb Ali"
          role="Manager Creatives"
          description="A creative strategist at the intersection of design, video, and AI. Muneeb leads creative production at Brand Republic - building workflows that merge visual craft with intelligent automation to help brands tell better stories, faster."
          imageUrl="/munneb.svg"
        />

        <DarkCreativeIntelligence
          badge="THE FRAMEWORK"
          title={
            <>
              <span className="text-[#9BEA34]">06 step</span> creative intelligence
              <br />
              process
            </>
          }
          description="A practical system you'll apply in every module from first idea to final optimized asset."
          cards={creativeCards}
        />

        <DarkWorkshopAgenda
          badge="WHAT YOU'LL COVER"
          title={
            <>
              Workshop <span className="text-[#9BEA34] italic">agenda</span>
            </>
          }
          subtitle="09 modules, fully AI-driven each builds directly on the last."
          items={agendaItems}
        />

        <DarkAIToolStack
          badge="THE AI TOOL STACK"
          title={
            <>
              <span className="text-[#9BEA34] italic">Tools you&apos;ll use</span> in the
              <br />
              room
            </>
          }
          subtitle="No prior experience needed everything is taught from scratch."
          tools={tools}
        />

        <DarkWalkAwayWith
          badge="RESULTS"
          title={
            <>
              What you&apos;ll <span className="text-[#9BEA34]">walk</span>
              <br />
              <span className="text-[#9BEA34]">away with</span>
            </>
          }
          results={results}
          imageUrl="rectangle.svg"
          imageAlt="Editing workflow on a laptop"
        />

        <DarkCTAFooter
          title={
            <>
              <span className="text-[#9BEA34]">Ready</span> to build smarter?
            </>
          }
          description="Join creators, designers, and strategists leveling up their workflow with AI. Limited seats available."
          emailPlaceholder="Enter Your Email Address"
          ctaLabel="Reserve Your Seat"
        />
      </div>
    </main>
  );
}
