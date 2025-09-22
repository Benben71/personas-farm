import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import TalkWithPersonaButton from './TalkWithPersonaButton';

interface Persona {
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
  // ✅ Image path constructed from persona ID
  image: string;
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
}

interface PersonaPageWithCommentsProps {
  persona: Persona;
}

export default function PersonaPageWithComments({ persona }: PersonaPageWithCommentsProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content - Left side (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Large 3:2 Image Section */}
          <div className="card p-0 overflow-hidden">
            <div className="relative w-full">
              <div className="aspect-[3/2] w-full relative">
                <img
                  src={persona.image}
                  alt={`Photo de profil de ${persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                          <span class="text-white font-bold text-6xl">${persona.id.charAt(0).toUpperCase()}</span>
                        </div>
                      `;
                    }
                  }}
                />
                
                {/* Text Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h1 className="text-white text-4xl font-bold mb-2 drop-shadow-lg">
                      {persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}
                    </h1>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {persona.identite_profil.age} ans
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  persona.identite_profil.segments.includes('pro') 
                    ? 'bg-blue-500/80 text-white' 
                    : 'bg-green-500/80 text-white'
                }`}>
                  {persona.identite_profil.segments.includes('pro') ? 'Profil pro' : 'Profil public'}
                </span>
                <span className="text-white/90 text-lg font-medium">
                  {persona.identite_profil.statut}
                </span>
              </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Positionnement par rapport à l’information */}
          <div className="card p-8">
            <h1 className="text-4xl font-extrabold italic text-center text-neutral-900 leading-tight">
              "{persona.motto || persona.systeme_croyances.rapport_information}"
            </h1>
          </div>

          {/* Belief System */}
          <div className="card p-8">
            <h2 className="h2 text-neutral-900 mb-6">Rapport aux médias et à la désinformation</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Rapport à l'information</h3>
                <p className="text-base text-neutral-700 leading-relaxed">{persona.systeme_croyances.rapport_information}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Perception des médias</h3>
                <p className="text-base text-neutral-700 leading-relaxed">{persona.systeme_croyances.perception_medias}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Liberté d'expression & désinformation</h3>
                <p className="text-base text-neutral-700 leading-relaxed">{persona.systeme_croyances.liberte_expression_désinfo}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Valeurs</h3>
                <div className="flex flex-wrap gap-2">
                  {persona.valeurs.map((value, index) => (
                    <span key={index} className="chip">{value}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Digital Practices */}
          <div className="card p-8">
            <h2 className="h2 text-neutral-900 mb-6">Habitudes informationnelles</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Canaux</h3>
                <div className="flex flex-wrap gap-2">
                  {persona.pratiques_et_indicateurs.canaux.map((canal, index) => (
                    <span key={index} className="chip bg-neutral-50 text-neutral-700 border-neutral-200">{canal}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Pratiques</h3>
                <div className="flex flex-wrap gap-2">
                  {persona.pratiques_et_indicateurs.pratiques.map((pratique, index) => (
                    <span key={index} className="chip bg-brand-50 text-brand-700 border-brand-200">{pratique}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Fréquence & intensité</h3>
                <p className="text-base text-neutral-700 leading-relaxed">{persona.pratiques_et_indicateurs.frequence_intensite}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Devices utilisés</h3>
                <div className="flex flex-wrap gap-2">
                  {persona.pratiques_et_indicateurs.devices.map((device, index) => (
                    <span key={index} className="chip bg-blue-50 text-blue-700 border-blue-200">{device}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Indicateurs</h3>
                <div className="space-y-3">
                  {persona.pratiques_et_indicateurs.indicateurs.map((indicateur, index) => (
                    <div key={index} className="p-3 bg-neutral-50 rounded-lg">
                      <div className="font-medium text-neutral-800">{indicateur.intitule}</div>
                      <div className="text-sm text-neutral-600">{indicateur.valeur}</div>
                      <div className="text-xs text-neutral-500 italic">{indicateur.source}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Objectifs, freins, motivations */}
          <div className="card p-8">
            <h2 className="h2 text-neutral-900 mb-6">Pourquoi il/elle s’informe, obstacles et motivations</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">À quoi sert l’information pour lui/elle</h3>
                <ul className="space-y-2">
                  {persona.besoins_freins_jtbd.jobs.map((job, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-brand-500 flex-shrink-0"></div>
                      <span className="text-base text-neutral-700">{job}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Obstacles rencontrés</h3>
                <ul className="space-y-2">
                  {persona.besoins_freins_jtbd.freins.map((frein, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></div>
                      <span className="text-base text-neutral-700">{frein}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Ce qui le/la pousse à s’informer</h3>
                <ul className="space-y-2">
                  {persona.motivations.map((motivation, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-brand-500 flex-shrink-0"></div>
                      <span className="text-base text-neutral-700">{motivation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>


          {/* Triggers & AI Posture */}
          <div className="card p-8">
            <h2 className="h2 text-neutral-900 mb-6">Situations d'engagement & rapport à l'IA</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Situations qui déclenchent l'intérêt</h3>
                <ul className="space-y-2">
                  {persona.parcours_triggers.map((trigger, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                      <span className="text-base text-neutral-700">{trigger}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Attentes vis-à-vis de l'IA</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-md font-medium text-neutral-800 mb-1">Usage accepté</h4>
                    <p className="text-sm text-neutral-600">{persona.posture_ia_personnalisation.usage}</p>
                  </div>
                  <div>
                    <h4 className="text-md font-medium text-neutral-800 mb-1">Limites</h4>
                    <p className="text-sm text-neutral-600">{persona.posture_ia_personnalisation.limites}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* New v3 Fields - Comprehensive Analysis */}
          <div className="card p-8">
            <h2 className="h2 text-neutral-900 mb-6">Analyse approfondie</h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Confidence & Fatigue Indicators */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Indices de confiance</h3>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">{persona.indice_confiance_info.valeur}</p>
                    <p className="text-xs text-blue-600 mt-1">{persona.indice_confiance_info.source}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Fatigue informationnelle</h3>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-800 font-medium">{persona.indice_fatigue_ou_evitement.valeur}</p>
                    <p className="text-xs text-orange-600 mt-1">{persona.indice_fatigue_ou_evitement.source}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Vigilance désinformation</h3>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">Niveau: {persona.vigilance_desinformation.niveau}</p>
                    <p className="text-xs text-green-600 mt-1">{persona.vigilance_desinformation.illustration}</p>
                  </div>
                </div>
              </div>

              {/* Time Distribution & Channel Confidence */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Répartition du temps par canal</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-neutral-50 rounded">
                      <span className="text-sm text-neutral-700">Réseaux sociaux</span>
                      <span className="text-sm font-medium text-neutral-800">{persona.parts_temps_par_canal.reseaux_sociaux}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-neutral-50 rounded">
                      <span className="text-sm text-neutral-700">Sites d'actualité</span>
                      <span className="text-sm font-medium text-neutral-800">{persona.parts_temps_par_canal.sites_actu}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-neutral-50 rounded">
                      <span className="text-sm text-neutral-700">TV/Radio</span>
                      <span className="text-sm font-medium text-neutral-800">{persona.parts_temps_par_canal.tv_radio}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-neutral-50 rounded">
                      <span className="text-sm text-neutral-700">Messageries</span>
                      <span className="text-sm font-medium text-neutral-800">{persona.parts_temps_par_canal.messageries}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Confiance par canal</h3>
                  <div className="space-y-2">
                    {persona.confiance_par_canal.map((canal, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-neutral-50 rounded">
                        <span className="text-sm text-neutral-700">{canal.canal}</span>
                        <span className={`text-sm font-medium px-2 py-1 rounded text-xs ${
                          canal.niveau === 'élevé' ? 'bg-green-100 text-green-800' :
                          canal.niveau === 'moyen' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {canal.niveau}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar - Right side (1/3) */}
        <aside className="space-y-6">
          {/* Talk with Persona Feature */}
          <TalkWithPersonaButton persona={persona} variant="page" />

          {/* Communication & Formats */}
          <div className="card p-6">
            <h2 className="h2 text-neutral-900 mb-6">Comment lui parler & formats adaptés</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Tonalité recommandée</h3>
                <p className="text-sm text-neutral-700 leading-relaxed mb-3">{persona.tonalite_et_eviter.ton}</p>
                <h4 className="text-md font-medium text-neutral-800 mb-2">Pièges à éviter</h4>
                <ul className="space-y-1">
                  {persona.tonalite_et_eviter.a_eviter.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-500">×</span>
                      <span className="text-xs text-neutral-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Formats accessibles</h3>
                <p className="text-sm text-neutral-700 leading-relaxed mb-3">Niveau de langage: {persona.accessibilite_inclusion.langage}</p>
                <h4 className="text-md font-medium text-neutral-800 mb-2">Formats recommandés</h4>
                <div className="flex flex-wrap gap-2">
                  {persona.accessibilite_inclusion.formats.map((format, index) => (
                    <span key={index} className="chip bg-green-50 text-green-700 border-green-200 text-xs">{format}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Learning Profile & Engagement */}
          <div className="card p-6">
            <h2 className="h2 text-neutral-900 mb-6">Profil d'apprentissage & engagement</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Profil d'apprenant</h3>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-800 font-medium">{persona.learner_profile.label}</p>
                  <p className="text-xs text-purple-600 mt-1">{persona.learner_profile.tagline}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Fenêtre d'attention</h3>
                <p className="text-sm text-neutral-600">{persona.fenetre_attention}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Mode de socialisation info</h3>
                <p className="text-sm text-neutral-600">{persona.mode_socialisation_info}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Astuce d'activation</h3>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">{persona.astuce_activation}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Contraintes pratiques</h3>
                <ul className="space-y-2">
                  {persona.contraintes_pratiques.map((contrainte, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></div>
                      <span className="text-sm text-neutral-700">{contrainte}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Objections clés</h3>
                <ul className="space-y-2">
                  {persona.objections_cles.map((objection, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-orange-500 flex-shrink-0"></div>
                      <span className="text-sm text-neutral-700">{objection}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Points de contact préférés</h3>
                <div className="flex flex-wrap gap-2">
                  {persona.preferred_contact_points.map((point, index) => (
                    <span key={index} className="chip bg-blue-50 text-blue-700 border-blue-200 text-xs">{point}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Comment blocks deactivated */}
          {/* 
          <section className="card p-6">
            <h2 className="h2">Commentaires</h2>
            <CommentsList slug={persona.id} />
          </section>

          <section className="card p-6">
            <h2 className="h2">Ajouter un commentaire</h2>
            <p className="muted text-sm mt-1">
              Partagez vos réflexions et vos commentaires sur ce persona.
            </p>
            <CommentForm slug={persona.id} />
          </section>
          */}

          {/* Strategic Conclusion - Moved to sidebar */}
          {persona.conclusion && (
            <section className="card p-6 bg-gradient-to-br from-neutral-50 to-neutral-100">
              <h2 className="h2 text-neutral-900 mb-4">Enjeu stratégique</h2>
              <p className="text-base text-neutral-700 leading-relaxed font-medium">
                {persona.conclusion}
              </p>
            </section>
          )}

          {/* Communication */}
          <div className="card p-8">
            <h2 className="h2 text-neutral-900 mb-6">Enjeux de communication</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Sujets</h3>
                <div className="flex flex-wrap gap-2">
                  {persona.enjeux_communication.sujets.map((sujet, index) => (
                    <span key={index} className="chip bg-blue-50 text-blue-700 border-blue-200">{sujet}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Leviers</h3>
                <div className="flex flex-wrap gap-2">
                  {persona.enjeux_communication.leviers.map((levier, index) => (
                    <span key={index} className="chip bg-purple-50 text-purple-700 border-purple-200">{levier}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Lien avec le lieu physique</h3>
                <p className="text-base text-neutral-700 leading-relaxed">{persona.enjeux_communication.lien_lieu_physique}</p>
              </div>
            </div>
          </div>

          {/* Services activables - Moved to sidebar below Communication */}
          <div className="card p-8">
            <h2 className="h2 text-neutral-900 mb-6">Services activables</h2>
            <ul className="space-y-4">
              {persona.services_offres.map((service, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></div>
                  <span className="text-base text-neutral-700">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}