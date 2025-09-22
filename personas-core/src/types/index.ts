// Core persona types based on the canonical schema
export interface Persona {
  id: string;
  identite_profil: {
    age: number;
    statut: string;
    situation: string;
    segments?: string[];
  };
  valeurs: string[];
  besoins_freins_jtbd: {
    jobs: string[];
    freins: string[];
  };
  motivations: string[];
  pratiques_et_indicateurs?: {
    canaux: string[];
    pratiques: string[];
    frequence_intensite: string;
    device_dominant: string;
    indicateurs: Array<{
      intitulé: string;
      valeur: string;
      source: string;
    }>;
  };
  enjeux_communication?: {
    sujets: string[];
    leviers: string[];
    lien_lieu_physique: string;
  };
  services_offres?: string[];
  tonalite_et_eviter: {
    ton: string;
    a_eviter: string[];
  };
  accessibilite_inclusion: {
    langage: string;
    formats: string[];
  };
  parcours_triggers?: string[];
  posture_ia_personnalisation?: {
    usage: string;
    limites: string;
  };
  conclusion: string;
  image?: string;
  theme_sections?: Record<string, any>;
}

// Theme configuration types
export interface ThemeConfig {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  enabled: boolean;
  order: number;
  enabledSections: string[];
  taxonomies: {
    audienceTypes: string[];
    channels: string[];
  };
  locales: string[];
  exportTemplates: {
    pdf: string;
    deck: string;
    json: string;
  };
  guardrails: {
    biasChecklist: string[];
    inclusionNotes: string[];
  };
}

// Section registry for theme-specific modules
export interface ThemeSection {
  id: string;
  name: string;
  schema: any;
  uiRenderer: string;
  exportPartials: string[];
  enabled: boolean;
}

export interface SectionRegistry {
  register(section: ThemeSection): void;
  getSection(id: string): ThemeSection | undefined;
  getEnabledSections(): ThemeSection[];
}

// Generator types
export interface PersonaGeneratorInput {
  context: string;
  goals: string[];
  barriers: string[];
  evidence: Array<{
    source: string;
    date: string;
    reliability: number;
    content: string;
  }>;
}

export interface PersonaGeneratorOutput {
  persona: Persona;
  confidence: number;
  reasoning: string;
}

// Export types
export interface ExportOptions {
  format: 'pdf' | 'deck' | 'json';
  template: string;
  theme: string;
  includeEvidence: boolean;
}

export interface ExportResult {
  success: boolean;
  filePath?: string;
  error?: string;
}

// Simulator types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface SimulatorConfig {
  persona: Persona;
  theme: ThemeConfig;
  guardrails: {
    maxTokens: number;
    temperature: number;
    safeResponses: string[];
  };
}

