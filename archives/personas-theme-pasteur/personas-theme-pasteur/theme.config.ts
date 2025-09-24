import { ThemeConfig } from '@org/personas-core';

export const themeConfig: ThemeConfig = {
  id: 'pasteur-exhibition',
  name: 'Exposition Pasteur',
  slug: 'pasteur-exhibition',
  description: 'Engagement citoyen autour de l\'évolution et de la science',
  color: '#10B981',
  icon: '🌱',
  enabled: true,
  order: 2,
  enabledSections: [
    'identite_profil',
    'rapport_science',
    'connaissances_biologie',
    'valeurs',
    'besoins_freins_jtbd',
    'motivations',
    'pratiques_et_indicateurs',
    'enjeux_communication',
    'services_offres',
    'tonalite_et_eviter',
    'accessibilite_inclusion',
    'parcours_triggers',
    'posture_ia_personnalisation'
  ],
  taxonomies: {
    audienceTypes: [
      'Élève primaire',
      'Collégien(ne)',
      'Lycéen(ne)',
      'Étudiant(e) sciences',
      'Enseignant(e) SVT',
      'Chercheur(se)',
      'Citoyen(ne) curieux',
      'Parent',
      'Senior'
    ],
    channels: [
      'Musée physique',
      'Site web musée',
      'Applications mobiles',
      'YouTube éducatif',
      'Podcasts scientifiques',
      'Livres et magazines',
      'Conférences',
      'Ateliers pratiques',
      'Réseaux sociaux éducatifs',
      'Documentaires',
      'Jeux éducatifs'
    ]
  },
  locales: ['fr-FR'],
  exportTemplates: {
    pdf: 'pasteur-pdf-template',
    deck: 'pasteur-deck-template',
    json: 'pasteur-json-template'
  },
  guardrails: {
    biasChecklist: [
      'Respecter les différentes croyances religieuses',
      'Éviter le créationnisme vs évolutionnisme',
      'Présenter la science de manière objective',
      'Reconnaître les limites de la connaissance scientifique'
    ],
    inclusionNotes: [
      'Adapter le langage au niveau scientifique',
      'Considérer les différences culturelles face à la science',
      'Inclure les personnes avec des handicaps cognitifs',
      'Respecter les sensibilités religieuses'
    ]
  }
};

export default themeConfig;

