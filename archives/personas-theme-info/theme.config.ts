import { ThemeConfig } from '@org/personas-core';

export const themeConfig: ThemeConfig = {
  id: 'media-literacy',
  name: 'Éducation aux Médias',
  slug: 'media-literacy',
  description: 'Comprendre et naviguer dans l\'écosystème de l\'information',
  color: '#3B82F6',
  icon: '📰',
  enabled: true,
  order: 1,
  enabledSections: [
    'identite_profil',
    'systeme_croyances',
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
      'Collégien(ne)',
      'Lycéen(ne)',
      'Étudiant(e)',
      'Professionnel(le)',
      'Enseignant(e)',
      'Parent',
      'Senior'
    ],
    channels: [
      'TikTok',
      'Instagram',
      'YouTube',
      'WhatsApp',
      'Discord',
      'LinkedIn',
      'X/Twitter',
      'Facebook',
      'Télévision',
      'Radio',
      'Presse écrite',
      'Podcasts'
    ]
  },
  locales: ['fr-FR'],
  exportTemplates: {
    pdf: 'media-literacy-pdf-template',
    deck: 'media-literacy-deck-template',
    json: 'media-literacy-json-template'
  },
  guardrails: {
    biasChecklist: [
      'Éviter les stéréotypes générationnels',
      'Respecter la diversité des pratiques médiatiques',
      'Ne pas généraliser les comportements',
      'Inclure différentes perspectives culturelles'
    ],
    inclusionNotes: [
      'Considérer l\'accès numérique différencié',
      'Tenir compte des niveaux de littératie médiatique',
      'Respecter les différences socio-économiques',
      'Inclure les personnes en situation de handicap'
    ]
  }
};

export default themeConfig;

