export type Locale = 'en' | 'el';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    services: string;
    portfolio: string;
    testimonials: string;
    process: string;
    about: string;
    contact: string;
  };

  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    subheadline: string;
    cta: string;
    learnMore: string;
    badge: string;
    reimagined: string;
    startProject: string;
    viewWork: string;
    latestProject: string;
    ecommercePlatform: string;
    ecommerceDesc: string;
    scroll: string;
    socialProof: string;
    proofBar: {
      seniorEngineering: string;
      founderLed: string;
      builtForScale: string;
      modernStack: string;
    };
    availability: string;
  };

  // Services Section
  services: {
    title: string;
    subtitle: string;
    badge: string;
    fullStack: {
      title: string;
      description: string;
      simpleDescription: string;
      features: string[];
      technicalDetails: {
        title: string;
        disclaimer?: string;
        items: string[];
      };
    };
    api: {
      title: string;
      description: string;
      simpleDescription: string;
      features: string[];
      technicalDetails: {
        title: string;
        disclaimer?: string;
        items: string[];
      };
    };
    learnMore: string;
    viewDetails: string;
    hideDetails: string;
    customSolutions: string;
    contactCTA: string;
    specialized: string;
  };

  // Portfolio Section
  portfolio: {
    badge: string;
    title: string;
    subtitle: string;
    viewAll: string;
    allProjects: string;
    viewCaseStudy: string;
    projectCTA: string;
    projectCTADesc: string;
    startProject: string;
  };

  // About Section
  about: {
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    features: string[];
    testimonialQuote: string;
    testimonialAuthor: string;
    whyFounderLed: string;
    founderAdvantage: string;
    engineeringPrinciples: string;
    engineeringPrinciplesDesc: string;
    engineeringPrinciplesSubtext: string;
    idealProjects: string;
    idealProjectsList: string[];
    bestSuitedFor: string;
    technicalApproach: string;
    technicalApproachList: string[];
    philosophy: string;
    engagementModel: string;
    engagementModelList: string[];
  };

  // Stats Section
  stats: {
    projects: string;
    clients: string;
    experience: string;
    satisfaction: string;
  };

  // Contact Section
  contact: {
    title: string;
    subtitle: string;
    badge: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
    sending: string;
    success: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    email: string;
    phone: string;
    location: string;
    availability: string;
    availabilityTitle: string;
    availabilityDesc: string;
    availableNow: string;
    helpfulTips: string;
    tips: string[];
  };

  // Testimonials Section
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    metrics: {
      satisfaction: string;
      projects: string;
      clients: string;
      experience: string;
    };
  };

  // Skills Section
  skills: {
    badge: string;
    title: string;
    subtitle: string;
    frontend: string;
    backend: string;
    database: string;
    tools: string;
  };

  // Process Section
  process: {
    title: string;
    subtitle: string;
    disclaimer: string;
    steps: {
      discovery: {
        title: string;
        description: string;
        duration: string;
      };
      design: {
        title: string;
        description: string;
        duration: string;
      };
      development: {
        title: string;
        description: string;
        duration: string;
      };
      deployment: {
        title: string;
        description: string;
        duration: string;
      };
    };
  };

  // Footer
  footer: {
    tagline: string;
    rights: string;
  };

  // Closing CTA
  closingCTA: {
    title: string;
    subtitle: string;
    button: string;
  };
}
