export interface LinkAction {
  label: string;
  href: string;
}

export interface CreativeCardContent {
  title: string;
  description: string;
  number?: string;
  img?: string;
}

export interface AgendaItemContent {
  number: string;
  title: string;
  description: string;
}

export interface ToolContent {
  iconSrc: string;
  iconAlt: string;
  name: string;
  description: string;
}

export interface ResultContent {
  text: string;
}

export interface DarkPageContent {
  hero: {
    logoSrc: string;
    badge: string;
    headline: {
      top: string;
      bottom: string;
    };
    description: string;
    ctaPrimary: LinkAction;
    ctaSecondary: LinkAction;
    topRightButton: LinkAction;
    infoBadges: string[];
  };
  speaker: {
    badge: string;
    name: string;
    role: string;
    description: string;
    imageUrl: string;
  };
  creativeIntelligence: {
    badge: string;
    title: {
      accent: string;
      text: string;
      secondLine: string;
    };
    description: string;
    cards: CreativeCardContent[];
  };
  workshopAgenda: {
    badge: string;
    title: {
      text: string;
      accent: string;
    };
    subtitle: string;
    items: AgendaItemContent[];
  };
  aiToolStack: {
    badge: string;
    title: {
      accent: string;
      text: string;
      secondLine: string;
    };
    subtitle: string;
    tools: ToolContent[];
  };
  walkAwayWith: {
    badge: string;
    title: {
      prefix: string;
      accentLineOne: string;
      accentLineTwo: string;
    };
    imageUrl: string;
    imageAlt: string;
    results: ResultContent[];
  };
  ctaFooter: {
    logoSrc: string;
    title: {
      accent: string;
      text: string;
    };
    description: string;
    emailPlaceholder: string;
    ctaLabel: string;
    ctaHref: string;
    footerLinks: string[];
    copyrightText: string;
  };
}

export interface LightPageContent {
  hero: {
    headline: string;
    subtitle: string;
    description: string;
    videoUrl: string;
    ctaPrimary: LinkAction;
    ctaSecondary: LinkAction;
    badge: string;
    logo: string;
    topRightButton: LinkAction;
    infoBadges: string[];
  };
  speaker: {
    name: string;
    role: string;
    description: string;
    imageUrl: string;
    badge: string;
    speakerType: string;
  };
  creativeIntelligence: {
    badge: string;
    title: string;
    description: string;
    cards: CreativeCardContent[];
  };
  workshopAgenda: {
    badge: string;
    title: string;
    subtitle: string;
    items: AgendaItemContent[];
  };
  aiToolStack: {
    badge: string;
    title: string;
    subtitle: string;
    tools: ToolContent[];
  };
  walkAwayWith: {
    badge: string;
    title: string;
    imageUrl: string;
    imageAlt: string;
    results: ResultContent[];
  };
  ctaFooter: {
    videoUrl: string;
    title: string;
    description: string;
    emailPlaceholder: string;
    ctaLabel: string;
    logo: string;
  };
}

export interface AuthPageContent {
  badge: string;
  title: string;
  description: string;
  submitLabel: string;
  formAction: string;
  alternatePrompt?: string;
  alternateLabel?: string;
  alternateHref?: string;
  cancelLabel?: string;
  reserveLabel?: string;
  fields: Array<{
    name: string;
    label: string;
    type: "text" | "email" | "password" | "tel" | "select" | "number";
    placeholder: string;
    options?: Array<{
      label: string;
      value: string;
    }>;
  }>;
  questionnaire: {
    title: string;
    description: string;
    quickUnderstandingLabel: string;
    quickUnderstandingOtherPlaceholder: string;
    quickUnderstandingOptions: Array<{
      label: string;
      value: string;
    }>;
    exploredLabel: string;
    exploredOptions: Array<{
      label: string;
      value: "yes" | "no";
    }>;
    experienceLabel: string;
    experienceOptionalLabel: string;
    experiencePlaceholder: string;
    nextLabel: string;
    backLabel: string;
  };
  payment: {
    title: string;
    description: string;
    heading: string;
    subheading: string;
    seatPriceLabel: string;
    seatPriceCurrency: string;
    seatPriceAmount: string;
    noteLabel: string;
    noteText: string;
    methodsLabel: string;
    methods: Array<{
      id: string;
      name: string;
      account: string;
      accent: string;
    }>;
    uploadTitle: string;
    uploadDescription: string;
    backLabel: string;
    confirmLabel: string;
  };
  complete: {
    title: string;
    description: string;
  };
}

export interface AuthPagesContent {
  register: AuthPageContent;
}
