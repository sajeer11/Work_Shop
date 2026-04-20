import Herosection from "../component/HeroSrection";
import AIToolStack from "../component/AIToolStack";
import SpeakerCard from "../component/SpeakerCard";
import CreativeIntelligence from "../component/CreativeIntelligence";
import WorkshopAgenda from "../component/WorkshopAgenda";
import WalkAwayWith from "../component/WalkAwayWith";
import CTAFooter from "../component/CTAFooter";
export default function Home() {
  const creativeCards = [
    {
      number: "01",
      title: "IDEA",
      description: "AI-assisted concept generation",
    },
    {
      number: "02",
      title: "MESSAGE",
      description: "Craft the right narrative",
    },
    {
      number: "03",
      title: "VISUAL",
      description: "Design assets with AI tools",
    },
    {
      number: "04",
      title: "FORMAT",
      description: "Adapt for every platform",
    },
    {
      number: "05",
      title: "PRODUCT",
      description: "Video, media, and more",
    },
    {
      number: "06",
      title: "PRODUCTION",
      description: "Finalize and deliver optimized assets",
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-white to-indigo-50 dark:from-[#181825] dark:to-[#23243a]">
      {/* Hero Section */}
      <Herosection
        headline="HOW MODERN CREATORS COMBINE DESIGN, VIDEO & AI"
        subtitle="Workshop • Live & AI Powered"
        description="How modern creators build smarter content: a fully AI-driven hands-on workshop by Brand Republic."
        videoUrl="/video/shadergradient.mp4"
        ctaPrimary={{ label: "Register Now", href: "#register" }}
        ctaSecondary={{ label: "View Full Agenda", href: "#agenda" }}
        badge="Workshop - Live & AI Powered"
        topRightButton={{ label: "Reserve Your Seat", href: "#reserve" }}
        infoBadges={[
          "• Full-Day Workshop",
          "• Beginner To Intermediate",
          "• Live AI Demos",
        ]}
      />

      {/* Add space between HeroSection and SpeakerCard */}
      <div className="mt-16 sm:mt-24 lg:mt-32"></div>

      {/* Speaker Card */}
      <SpeakerCard
        name="SYED MUNEEB ALI"
        role="Manager Creatives"
        description="A creative strategist at the intersection of design, video, and AI. Muneeb leads creative production at Brand Republic — building workflows that merge visual craft with intelligent automation to help brands tell better stories, faster."
        imageUrl="munneb.svg"  // Replace with the actual image path
        badge="SPEAKER"
        speakerType="Speaker"
      />

      {/* Add space between SpeakerCard and CreativeIntelligence */}
      <div className="mt-16 sm:mt-24 lg:mt-32"></div>

      {/* Creative Intelligence Section */}
      <CreativeIntelligence
        title={"06 STEP CREATIVE\nINTELLIGENCE PROCESS"}
        description="A practical system you'll apply in every module from first idea to final optimized asset."
        cards={creativeCards}
      />
      <WorkshopAgenda
  badge="WHAT YOU'LL COVER"
  title={"WORKSHOP\n AGENDA"}
  subtitle="09 modules, fully AI-driven each builds directly on the last."
  items={[
    { number: "01", title: "SETTING THE STAGE",             description: "AI-narrated welcome • live warm-up exercise with a generated creative brief" },
    { number: "02", title: "MODERN CREATIVE REALITY",       description: "The creator economy shift — why design + video + AI is now one skill" },
    { number: "03", title: "THE CREATIVE INTELLIGENCE FRAMEWORK", description: "Build a full content plan from a single prompt using the 6-step system" },
    { number: "04", title: "CORE DESIGN PRINCIPLES",        description: "Hierarchy, spacing, contrast — applied live with AI-generated examples" },
    { number: "05", title: "SOCIAL MEDIA CAMPAIGN DESIGN",  description: "One brief → posts, stories, reels → adapted per platform with AI tools" },
    { number: "06", title: "VIDEO PRODUCTION & MOTION",     description: "Text-to-video with Higgsfield • live AI editing session" },
    { number: "07", title: "AI IN CREATIVE WORKFLOWS",      description: "Full pipeline demo: concept → design → video → caption, live" },
    { number: "08", title: "LIVE BUILD",                    description: "Audience gives a prompt — Muneeb builds a finished piece on screen in real time" },
   { number: "09", title: "Q&A + AI career pathways",       description: "Leave with a personalized AI upskilling roadmap for your creative goals" },
  ]}
/>
<AIToolStack
  badge="THE AI TOOL STACK"
  title={"TOOLS YOU'LL USE IN\nTHE ROOM"}
  subtitle="No prior experience needed everything is taught from scratch."
  tools={[
    {
      iconSrc: "cloud.svg",
      iconAlt: "Claude",
      name: "CLAUDE / CHATGPT",
      description: "Ideation, briefs & planning",
    },
    {
      iconSrc: "higgsfield.svg",
      iconAlt: "Higgsfield",
      name: "HIGGSFIELD",
      description: "Text-to-video generation",
    },
    {
      iconSrc: "naino-banana.svg",
      iconAlt: "Nano Banana Pro",
      name: "NANO BANANA PRO",
      description: "Multi-format social assets",
    },
    {
      iconSrc: "midjourney.svg",
      iconAlt: "Midjourney",
      name: "MIDJOURNEY",
      description: "Visual & mood board creation",
    },
    {
      iconSrc: "canva.svg",
      iconAlt: "Canva AI",
      name: "CANVA AI",
      description: "Campaign templates & scaling",
    },
    {
      iconSrc: "runway.svg",
      iconAlt: "Runway ML",
      name: "RUNWAY ML",
      description: "Video editing & motion",
    },
  ]}
/>
<WalkAwayWith
  badge="RESULTS"
  title={"WHAT YOU'LL\nWALK AWAY WITH"}
  imageUrl="rectangle.svg"
  imageAlt="Person working on creative AI tools"
  results={[
    { text: "A working AI-powered content workflow" },
    { text: "A short video created from a text prompt" },
    { text: "Practical knowledge of 6 AI tools" },
    { text: "A multi-format social campaign you built" },
    { text: "Your personalized AI upskilling roadmap" },
    { text: "Career positioning in the AI-creative space" },
  ]}
/>
<CTAFooter
  videoUrl="/video/shadergradient.mp4"
  title={"READY TO BUILD\nSMARTER?"}
  description="Join creators, designers, and strategists leveling up their workflow with AI Limited seats available."
  emailPlaceholder="Enter Your Email Address"
  ctaLabel="Reserve Your Seat"
  logo={"CREATIVE\nINTELLIGENCE\nLAB"}
/>
    </main>
  );
}
