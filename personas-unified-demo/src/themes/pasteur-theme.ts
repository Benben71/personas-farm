export const pasteurTheme = {
  id: 'pasteur',
  name: 'Exposition Pasteur',
  description: 'Engagement citoyen autour de l\'évolution et de la science',
  color: '#10B981',
  icon: '🌱',
  personasFile: 'pasteur-personas.json',
  imagesPath: '/pasteur-personas',
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
  }
};
