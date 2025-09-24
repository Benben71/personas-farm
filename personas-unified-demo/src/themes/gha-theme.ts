export const ghaTheme = {
  id: 'gha',
  name: 'Global Health Awareness',
  description: 'Comprendre les enjeux de santé publique mondiale et les défis sanitaires contemporains',
  color: '#EF4444',
  icon: '🏥',
  personasFile: 'gha-personas.json',
  imagesPath: '/gha-personas',
  enabledSections: [
    'identite_profil',
    'rapport_sante',
    'connaissances_medicales',
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
      'Étudiant(e) santé',
      'Professionnel(le) médical',
      'Patient(e) chronique',
      'Aidant(e) familial',
      'Citoyen(ne) concerné(e)',
      'Décideur(euse) politique',
      'Journaliste santé',
      'Chercheur(se) médical',
      'Parent',
      'Senior'
    ],
    channels: [
      'Sites médicaux officiels',
      'Applications santé',
      'Réseaux sociaux santé',
      'Podcasts médicaux',
      'Revues scientifiques',
      'Conférences médicales',
      'Communautés patients',
      'Forums santé',
      'Newsletters spécialisées',
      'Webinaires santé',
      'Documentaires santé',
      'Presse spécialisée'
    ]
  }
};
