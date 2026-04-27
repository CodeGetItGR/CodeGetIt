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
    toggleMenu: string;
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
    bannerFallback: string;
    hiddenGem: string;
    visual: {
      fileName: string;
      engineeringFocus: string;
      typeSafe: string;
      scalableBackend: string;
      relationalData: string;
      productionReady: string;
      principles: string;
      performance: string;
      maintainable: string;
      scalable: string;
      builtToLast: string;
      reliable: string;
    };
    delivery: {
      frameworkTitle: string;
      frameworkSubtitle: string;
      steps: string[];
      stats: {
        typicalLaunch: string;
        response: string;
        uptimeTarget: string;
        codeQuality: string;
      };
      timelineNote: string;
    };
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
    serviceLabel: string;
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
    livePreview: string;
    hiddenProjectNote: string;
    hiddenProjectNoteAria: string;
    highImpactLabel: string;
    items: Array<{
      title: string;
      category: string;
      description: string;
    }>;
    projectCTA: string;
    projectCTADesc: string;
    startProject: string;
  };

  valueProposition: {
    kicker: string;
    title: string;
    subtitle: string;
    table: {
      comparison: string;
      staticProject: string;
      fullStackProject: string;
      rows: Array<{
        feature: string;
        staticProject: string;
        fullStackProject: string;
      }>;
    };
    cards: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
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
    performance: {
      badge: string;
      title: string;
      metrics: Array<{
        metric: string;
        label: string;
        desc: string;
      }>;
    };
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
    responseTimeLabel: string;
    responseTimeValue: string;
    locationValue: string;
    trustNote: string;
    errorFixFields: string;
    errorGeneric: string;
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
    controls: {
      previousSlide: string;
      nextSlide: string;
    };
    items: Array<{
      role: string;
      company: string;
      content: string;
    }>;
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
    kicker: string;
    phaseLabel: string;
    disclaimer: string;
    steps: {
      discovery: {
        title: string;
        description: string;
        duration: string;
        benefits: string[];
      };
      design: {
        title: string;
        description: string;
        duration: string;
        benefits: string[];
      };
      development: {
        title: string;
        description: string;
        duration: string;
        benefits: string[];
      };
      deployment: {
        title: string;
        description: string;
        duration: string;
        benefits: string[];
      };
    };
  };

  // Footer
  footer: {
    tagline: string;
    rights: string;
    basedIn: string;
    emailAria: string;
  };

  // Closing CTA
  closingCTA: {
    title: string;
    subtitle: string;
    button: string;
    buttonAria: string;
  };

  // Admin
  admin: {
    detailTabs: {
      notes: string;
      history: string;
    };
    entityAux: {
      notes: string;
      auditHistory: string;
    };
    projectDetail: {
      loading: string;
      notFound: string;
      title: string;
      back: string;
      noTransitions: string;
      save: string;
      saving: string;
      details: string;
      name: string;
      description: string;
      linkedRequest: string;
      linkedOffer: string;
      noRequest: string;
      noOffer: string;
      viewRequest: string;
      viewOffer: string;
      statusActions: string;
      status: string;
      navActions: string;
      navLinked: string;
      navDetails: string;
      cancelTitle: string;
      cancelBody: string;
      keep: string;
      confirmCancel: string;
      cancelling: string;
      moveTo: string;
      deadline: string;
      noDeadline: string;
      overdue: string;
      daysLeft: string;
      links: string;
      noLinks: string;
      addLink: string;
      linkTitle: string;
      linkUrl: string;
      createLink: string;
      creatingLink: string;
      remove: string;
      open: string;
      payments: string;
      totalPaid: string;
      noPayments: string;
      amount: string;
      paidAt: string;
      notes: string;
      notesOptional: string;
      registerPayment: string;
      registeringPayment: string;
      noNotes: string;
      statusLabels: {
        IN_PROGRESS: string;
        COMPLETED: string;
        ON_HOLD: string;
        CANCELLED: string;
        PLANNING: string;
      };
    };
    projectGithub: {
      card: {
        title: string;
        addRepo: string;
        createRepo: string;
        linkRepo: string;
        linkedRepos: string;
        provider: string;
        primaryRepo: string;
        noRepo: string;
        noProvider: string;
        open: string;
        lastError: string;
      };
      sheets: {
        createTitle: string;
        createDesc: string;
        repoNameOptional: string;
        repoNamePlaceholder: string;
        privateRepo: string;
        creating: string;
        createRepo: string;
        cancel: string;
        linkTitle: string;
        linkDesc: string;
        repoUrl: string;
        repoUrlPlaceholder: string;
        repoNameOverride: string;
        repoNameOverridePlaceholder: string;
        linking: string;
        linkRepo: string;
      };
      actions: {
        success: string;
        invalidGithubUrl: string;
      };
    };
    aiChat: {
      title: string;
      newConversation: string;
      sendMessage: string;
      placeholder: string;
      loading: string;
      error: string;
      disabled: string;
      analyzeOffer: string;
      analyzing: string;
      analysisComplete: string;
      risks: string;
      timeline: string;
      requirements: string;
      recommendations: string;
      complexity: string;
      effort: string;
      summary: string;
      tokensUsed: string;
      estimatedCost: string;
      usage: string;
      messages: string;
      archived: string;
      archive: string;
      retry: string;
      rateLimited: string;
      tryAgain: string;
    };
    createRequestSheet: {
      title: string;
      description: string;
      submitButton: string;
      submitting: string;
      cancel: string;
      enterpriseHint: string;
      enterpriseEnabled: string;
      labels: {
        title: string;
        requesterName: string;
        requesterEmail: string;
        requesterPhone: string;
        description: string;
        projectType: string;
        businessGoal: string;
        organizationName: string;
        industry: string;
        targetAudience: string;
        desiredStartWindow: string;
        targetLaunchWindow: string;
        budgetRange: string;
        budgetFlexibility: string;
        communicationPreference: string;
        dataSensitivity: string;
        legalOrBrandConstraints: string;
        priority: string;
      };
      placeholders: {
        title: string;
        description: string;
        businessGoal: string;
        targetLaunchWindow: string;
        legalOrBrandConstraints: string;
      };
    };
    requestAnalysis: {
      title: string;
      description: string;
      queueAnalysis: string;
      refreshAnalysis: string;
      preparingAnalysis: string;
      queued: string;
      ready: string;
      notGenerated: string;
      loading: string;
      queuedNotice: string;
      emptyStateTitle: string;
      emptyStateBody: string;
      summaryLabel: string;
      tokensUsed: string;
      estimatedCost: string;
      estimatedEffort: string;
      hoursLabel: string;
      complexity: string;
      analysisMetadata: string;
      analysisId: string;
      requestId: string;
      jobId: string;
      jobType: string;
      targetType: string;
      retryCount: string;
      createdAt: string;
      updatedAt: string;
      nextAttemptAt: string;
      status: string;
      latestSnapshot: string;
      whatThisReportCovers: string;
      risksAndBlockers: string;
      timelineSignals: string;
      requirements: string;
      recommendations: string;
      noRisks: string;
      noTimeline: string;
      noRequirements: string;
      noRecommendations: string;
      missingStructuredBlock: string;
      statusLabels: {
        PENDING: string;
        IN_PROGRESS: string;
        DONE: string;
        FAILED: string;
        CANCELLED: string;
      };
      jobTypeLabels: {
        ANALYZE_REQUEST: string;
      };
      targetTypeLabels: {
        REQUEST: string;
      };
      complexityLabels: {
        LOW: string;
        MEDIUM: string;
        HIGH: string;
        CRITICAL: string;
      };
    };
  };
}
