// TODO: Ideally, we would use a shared data module to avoid duplication,
// but for now, we're importing directly from the local file
import personasData from '../../data/personas - v3.json';
import { buildAssetPath } from './asset-path';

export interface Persona {
  id: string;
  identite_profil: {
    age: number;
    statut: string;
    situation: string;
    segments: string[];
  };
  systeme_croyances: {
    rapport_information: string;
    perception_medias: string;
    liberte_expression_désinfo: string;
  };
  pratiques_et_indicateurs: {
    canaux: string[];
    pratiques: string[];
    frequence_intensite: string;
    devices: string[];
    indicateurs: Array<{
      intitule: string;
      valeur: string;
      source: string;
    }>;
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
  conclusion: string;
  motto: string;
  // New v3 fields
  role_democratique_percu: string;
  indice_confiance_info: {
    valeur: string;
    source: string;
  };
  indice_fatigue_ou_evitement: {
    valeur: string;
    source: string;
  };
  vigilance_desinformation: {
    niveau: string;
    illustration: string;
  };
  attentes_transparence_medias: string[];
  attitude_ia_medias: {
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
  mode_socialisation_info: string;
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
  attitudes_envers_journalistes: string;
  attitudes_envers_institutions: string;
  attitudes_envers_fact_checkers: string;
  indicateurs_sources_normes: Array<{
    intitule: string;
    valeur: string;
    source: string;
  }>;
  date_derniere_mise_a_jour: string;
  niveau_preuve: string;
  // ✅ Image path constructed from persona ID
  image: string;
}

export function getPersonas(): Persona[] {
  return personasData.map(persona => ({
    ...persona,
    image: buildAssetPath(`/personas/${persona.id}.png`)
  })) as Persona[];
}

export function getPersonaBySlug(slug: string): Persona | null {
  const personas = getPersonas();
  return personas.find(persona => persona.id === slug) || null;
}

export function getAllPersonaSlugs(): string[] {
  return getPersonas().map(persona => persona.id);
}
