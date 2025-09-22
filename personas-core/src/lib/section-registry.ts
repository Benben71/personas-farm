import { ThemeSection, SectionRegistry } from '../types';

export class DefaultSectionRegistry implements SectionRegistry {
  private sections: Map<string, ThemeSection> = new Map();

  register(section: ThemeSection): void {
    this.sections.set(section.id, section);
  }

  getSection(id: string): ThemeSection | undefined {
    return this.sections.get(id);
  }

  getEnabledSections(): ThemeSection[] {
    return Array.from(this.sections.values()).filter(section => section.enabled);
  }

  getAllSections(): ThemeSection[] {
    return Array.from(this.sections.values());
  }

  unregister(id: string): void {
    this.sections.delete(id);
  }

  clear(): void {
    this.sections.clear();
  }
}

// Predefined core sections that all themes can use
export const CORE_SECTIONS: ThemeSection[] = [
  {
    id: 'identite_profil',
    name: 'Identité et Profil',
    schema: {
      type: 'object',
      properties: {
        age: { type: 'number' },
        statut: { type: 'string' },
        situation: { type: 'string' },
        segments: { type: 'array', items: { type: 'string' } }
      }
    },
    uiRenderer: 'IdentiteProfilRenderer',
    exportPartials: ['identite-profil-pdf', 'identite-profil-deck'],
    enabled: true
  },
  {
    id: 'valeurs',
    name: 'Valeurs et Croyances',
    schema: {
      type: 'array',
      items: { type: 'string' }
    },
    uiRenderer: 'ValeursRenderer',
    exportPartials: ['valeurs-pdf', 'valeurs-deck'],
    enabled: true
  },
  {
    id: 'besoins_freins_jtbd',
    name: 'Besoins et Freins (JTBD)',
    schema: {
      type: 'object',
      properties: {
        jobs: { type: 'array', items: { type: 'string' } },
        freins: { type: 'array', items: { type: 'string' } }
      }
    },
    uiRenderer: 'JTBDRenderer',
    exportPartials: ['jtbd-pdf', 'jtbd-deck'],
    enabled: true
  },
  {
    id: 'motivations',
    name: 'Motivations',
    schema: {
      type: 'array',
      items: { type: 'string' }
    },
    uiRenderer: 'MotivationsRenderer',
    exportPartials: ['motivations-pdf', 'motivations-deck'],
    enabled: true
  },
  {
    id: 'tonalite_et_eviter',
    name: 'Tonalité et À Éviter',
    schema: {
      type: 'object',
      properties: {
        ton: { type: 'string' },
        a_eviter: { type: 'array', items: { type: 'string' } }
      }
    },
    uiRenderer: 'TonaliteRenderer',
    exportPartials: ['tonalite-pdf', 'tonalite-deck'],
    enabled: true
  },
  {
    id: 'accessibilite_inclusion',
    name: 'Accessibilité et Inclusion',
    schema: {
      type: 'object',
      properties: {
        langage: { type: 'string' },
        formats: { type: 'array', items: { type: 'string' } }
      }
    },
    uiRenderer: 'AccessibiliteRenderer',
    exportPartials: ['accessibilite-pdf', 'accessibilite-deck'],
    enabled: true
  }
];

// Theme-specific section factory
export class ThemeSectionFactory {
  static createMediaLiteracySections(): ThemeSection[] {
    return [
      {
        id: 'systeme_croyances',
        name: 'Système de Croyances',
        schema: {
          type: 'object',
          properties: {
            rapport_information: { type: 'string' },
            perception_medias: { type: 'string' },
            liberte_expression_désinfo: { type: 'string' }
          }
        },
        uiRenderer: 'SystemeCroyancesRenderer',
        exportPartials: ['systeme-croyances-pdf', 'systeme-croyances-deck'],
        enabled: true
      },
      {
        id: 'pratiques_et_indicateurs',
        name: 'Pratiques et Indicateurs',
        schema: {
          type: 'object',
          properties: {
            canaux: { type: 'array', items: { type: 'string' } },
            pratiques: { type: 'array', items: { type: 'string' } },
            frequence_intensite: { type: 'string' },
            device_dominant: { type: 'string' },
            indicateurs: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  intitulé: { type: 'string' },
                  valeur: { type: 'string' },
                  source: { type: 'string' }
                }
              }
            }
          }
        },
        uiRenderer: 'PratiquesIndicateursRenderer',
        exportPartials: ['pratiques-pdf', 'pratiques-deck'],
        enabled: true
      }
    ];
  }

  static createDarwinSections(): ThemeSection[] {
    return [
      {
        id: 'rapport_science',
        name: 'Rapport à la Science',
        schema: {
          type: 'object',
          properties: {
            litteratie_scientifique: { type: 'string' },
            perception_evolution: { type: 'string' },
            confiance_institutions: { type: 'string' }
          }
        },
        uiRenderer: 'RapportScienceRenderer',
        exportPartials: ['rapport-science-pdf', 'rapport-science-deck'],
        enabled: true
      },
      {
        id: 'connaissances_biologie',
        name: 'Connaissances en Biologie',
        schema: {
          type: 'object',
          properties: {
            niveau_base: { type: 'string' },
            concepts_cles: { type: 'array', items: { type: 'string' } },
            misconceptions: { type: 'array', items: { type: 'string' } }
          }
        },
        uiRenderer: 'ConnaissancesBiologieRenderer',
        exportPartials: ['connaissances-bio-pdf', 'connaissances-bio-deck'],
        enabled: true
      }
    ];
  }
}

