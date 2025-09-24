import { readFileSync } from 'fs';
import { join } from 'path';

export interface PersonaData {
  id: string;
  identite_profil: {
    age: number;
    statut: string;
    situation: string;
    segments: string[];
  };
  // Info theme fields
  systeme_croyances?: {
    rapport_information: string;
    perception_medias: string;
    liberte_expression_désinfo: string;
  };
  // GHA theme fields
  rapport_sante?: {
    litteratie_sante: string;
    perception_medecine: string;
    confiance_institutions_sante: string;
  };
  connaissances_medicales?: {
    niveau_base: string;
    concepts_cles: string[];
    misconceptions: string[];
  };
  pratiques_et_indicateurs: {
    canaux: string[];
    pratiques: string[];
    frequence_intensite: string;
    devices: string[];
  };
  valeurs: string[];
  besoins_freins_jtbd: {
    jobs: string[];
    freins: string[];
  };
  motivations: string[];
  enjeux_communication: {
    sujets: string[];
    leviers: string[];
    lien_lieu_physique: string;
  };
  services_offres: string[];
  tonalite_et_eviter: {
    ton: string;
    a_eviter: string[];
  };
  accessibilite_inclusion: {
    langage: string;
    formats: string[];
  };
  parcours_triggers: string[];
  posture_ia_personnalisation: {
    usage: string;
    limites: string;
  };
  role_democratique_percu?: string;
  role_sante_societe?: string;
  indice_confiance_info?: {
    valeur: string;
    source: string;
  };
  indice_confiance_sante?: {
    valeur: string;
    source: string;
  };
  indice_fatigue_ou_evitement: {
    valeur: string;
    source: string;
  };
  vigilance_desinformation?: {
    niveau: string;
    illustration: string;
  };
  vigilance_desinformation_sante?: {
    niveau: string;
    illustration: string;
  };
  attentes_transparence_medias?: string[];
  attentes_transparence_sante?: string[];
  attitude_ia_medias?: {
    favorable: string;
    risques_top: string[];
  };
  attitude_ia_sante?: {
    favorable: string;
    risques_top: string[];
  };
  parts_temps_par_canal: {
    reseaux_sociaux: string;
    sites_actu: string;
    tv_radio: string;
    messageries: string;
  };
  confiance_par_canal: Array<{
    canal: string;
    niveau: string;
  }>;
  mode_socialisation_info?: string;
  mode_socialisation_sante?: string;
  fenetre_attention: string;
  contraintes_pratiques: string[];
  objections_cles: string[];
  learner_profile: {
    label: string;
    tagline: string;
  };
  astuce_activation: string;
  note_neutralite: string;
  global_vs_local_identity: string;
  language_preferences: string[];
  preferred_contact_points: string[];
  possible_barriers_to_engagement: string;
  attitudes_envers_journalistes?: string;
  attitudes_envers_institutions?: string;
  attitudes_envers_fact_checkers?: string;
  attitudes_envers_medecins?: string;
  indicateurs_sources_normes: Array<{
    intitule: string;
    valeur: string;
    source: string;
  }>;
  date_derniere_mise_a_jour: string;
  niveau_preuve: string;
  conclusion: string;
  motto: string;
}

export function loadPersonaData(site: string): PersonaData[] {
  try {
    const dataPath = join(process.cwd(), 'src', 'data', `${site}-personas.json`);
    const data = readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error loading persona data for site ${site}:`, error);
    return [];
  }
}

export function findPersonaById(personas: PersonaData[], id: string): PersonaData | null {
  return personas.find(persona => persona.id === id) || null;
}

export function formatPersonaForPrompt(persona: PersonaData, site?: string): string {
  const isGHA = site === 'gha';
  
  // Safe field access helper
  const safeJoin = (arr: any[] | undefined, separator = ', ') => arr ? arr.join(separator) : 'Non spécifié';
  const safeGet = (field: any, fallback = 'Non spécifié') => field || fallback;
  
  // Build the base profile
  let profileText = `
Tu es ${persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}, ${persona.identite_profil.age} ans, ${persona.identite_profil.statut}.

PROFIL COMPLET:
- Identité: ${safeGet(persona.identite_profil.situation)}
- Canaux utilisés: ${safeJoin(persona.pratiques_et_indicateurs?.canaux)}
- Pratiques: ${safeJoin(persona.pratiques_et_indicateurs?.pratiques)}
- Fréquence: ${safeGet(persona.pratiques_et_indicateurs?.frequence_intensite)}
- Valeurs: ${safeJoin(persona.valeurs)}
- Besoins: ${safeJoin(persona.besoins_freins_jtbd?.jobs)}
- Motivations: ${safeJoin(persona.motivations)}
- Sujets d'intérêt: ${safeJoin(persona.enjeux_communication?.sujets)}
- Leviers: ${safeJoin(persona.enjeux_communication?.leviers)}
- Services recherchés: ${safeJoin(persona.services_offres)}
- Tonalité: ${safeGet(persona.tonalite_et_eviter?.ton)}
- À éviter: ${safeJoin(persona.tonalite_et_eviter?.a_eviter)}
- Langage: ${safeGet(persona.accessibilite_inclusion?.langage)}
- Formats préférés: ${safeJoin(persona.accessibilite_inclusion?.formats)}
- Fenêtre d'attention: ${safeGet(persona.fenetre_attention || persona.fenetre_attention_sante)}
- Contraintes: ${safeJoin(persona.contraintes_pratiques || persona.contraintes_pratiques_sante)}
- Objections: ${safeJoin(persona.objections_cles || persona.objections_cles_sante)}
- Profil d'apprentissage: ${safeGet(persona.learner_profile?.label || persona.learner_profile_sante?.label)} - ${safeGet(persona.learner_profile?.tagline || persona.learner_profile_sante?.tagline)}
- Points de contact préférés: ${safeJoin(persona.preferred_contact_points || persona.preferred_contact_points_sante)}
- Confiance par canal: ${safeJoin(persona.confiance_par_canal?.map(c => `${c.canal}: ${c.niveau}`) || persona.confiance_par_canal_sante?.map(c => `${c.canal}: ${c.niveau}`))}
- Temps par canal: RS ${safeGet(persona.parts_temps_par_canal?.reseaux_sociaux || persona.parts_temps_par_canal_sante?.reseaux_sociaux)}, Sites ${safeGet(persona.parts_temps_par_canal?.sites_actu || persona.parts_temps_par_canal_sante?.sites_actu)}, TV/Radio ${safeGet(persona.parts_temps_par_canal?.tv_radio || persona.parts_temps_par_canal_sante?.tv_radio)}, Messageries ${safeGet(persona.parts_temps_par_canal?.messageries || persona.parts_temps_par_canal_sante?.messageries)}
- Motto: "${safeGet(persona.motto || persona.motto_sante)}"`;

  // Add theme-specific fields
  if (isGHA) {
    // GHA theme specific fields
    if (persona.rapport_sante) {
      profileText += `
- Rapport à la santé: ${safeGet(persona.rapport_sante.litteratie_sante)}
- Perception de la médecine: ${safeGet(persona.rapport_sante.perception_medecine)}
- Confiance envers les institutions de santé: ${safeGet(persona.rapport_sante.confiance_institutions_sante)}`;
    }
    
    if (persona.connaissances_medicales) {
      profileText += `
- Niveau de connaissances médicales: ${safeGet(persona.connaissances_medicales.niveau_base)}
- Concepts clés: ${safeJoin(persona.connaissances_medicales.concepts_cles)}
- Idées fausses courantes: ${safeJoin(persona.connaissances_medicales.misconceptions)}`;
    }
    
    if (persona.role_sante_societe) {
      profileText += `
- Rôle de la santé dans la société: ${persona.role_sante_societe}`;
    }
    
    if (persona.vigilance_desinformation_sante) {
      profileText += `
- Vigilance face à la désinformation santé: ${persona.vigilance_desinformation_sante.niveau} - ${persona.vigilance_desinformation_sante.illustration}`;
    }
    
    if (persona.attitude_ia_sante) {
      profileText += `
- Attitude envers l'IA en santé: ${persona.attitude_ia_sante.favorable} - Risques: ${persona.attitude_ia_sante.risques_top.join(', ')}`;
    }
    
    if (persona.attentes_transparence_sante) {
      profileText += `
- Attentes de transparence en santé: ${persona.attentes_transparence_sante.join(', ')}`;
    }
    
    if (persona.mode_socialisation_sante) {
      profileText += `
- Mode de socialisation de l'information santé: ${persona.mode_socialisation_sante}`;
    }
  } else {
    // Info theme specific fields
    if (persona.systeme_croyances) {
      profileText += `
- Système de croyances: ${persona.systeme_croyances.rapport_information}
- Perception des médias: ${persona.systeme_croyances.perception_medias}
- Liberté d'expression/désinfo: ${persona.systeme_croyances.liberte_expression_désinfo}`;
    }
    
    if (persona.role_democratique_percu) {
      profileText += `
- Rôle démocratique perçu: ${persona.role_democratique_percu}`;
    }
    
    if (persona.vigilance_desinformation) {
      profileText += `
- Vigilance désinformation: ${persona.vigilance_desinformation.niveau} - ${persona.vigilance_desinformation.illustration}`;
    }
    
    if (persona.attitude_ia_medias) {
      profileText += `
- Attitude IA médias: ${persona.attitude_ia_medias.favorable} - Risques: ${persona.attitude_ia_medias.risques_top.join(', ')}`;
    }
    
    if (persona.attentes_transparence_medias) {
      profileText += `
- Attentes transparence médias: ${persona.attentes_transparence_medias.join(', ')}`;
    }
    
    if (persona.mode_socialisation_info) {
      profileText += `
- Mode de socialisation info: ${persona.mode_socialisation_info}`;
    }
  }

  // Add language preferences if available
  if (persona.language_preferences && persona.language_preferences.length > 0) {
    profileText += `
- Langues parlées: ${persona.language_preferences.join(', ')}`;
  }

  // Add final instructions
  profileText += `

INSTRUCTIONS:
- Réponds toujours en restant fidèle à ce profil
- Utilise le ton et le style appropriés à l'âge et au statut
- Respecte la fenêtre d'attention (${persona.fenetre_attention})
- Évite les éléments listés dans "À éviter"
- Sois cohérent avec les valeurs et motivations
- Utilise le langage approprié (niveau ${persona.accessibilite_inclusion.langage})
- Reste dans le caractère du persona à tout moment
- Si l'utilisateur demande dans quelle langue tu parles, réponds selon tes préférences linguistiques
- Réponds de manière naturelle et conversationnelle`;

  return profileText;
}