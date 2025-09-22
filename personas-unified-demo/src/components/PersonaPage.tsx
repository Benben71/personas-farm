'use client';

import { useState } from 'react';
import { PersonaPageProps } from '@/types';
import TalkWithPersonaButton from './TalkWithPersonaButton';
import Header from './Header';

export default function PersonaPage({ site, theme, persona, allPersonas }: PersonaPageProps & { allPersonas: any[] }) {
  const [imageError, setImageError] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Navigation */}
      <Header site={site} personas={allPersonas} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content - Left side (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Large 3:2 Image Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative w-full">
                <div className="aspect-[3/2] w-full relative">
                  {!imageError ? (
                    <img
                      src={persona.image}
                      alt={`Photo de profil de ${persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}`}
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-6xl">
                        {persona.id.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  
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

            {/* Motto */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-4xl font-extrabold italic text-center text-gray-900 leading-tight">
                "{persona.motto || persona.systeme_croyances?.rapport_information || 'Découvrez mon profil...'}"
              </h1>
            </div>

            {/* Identité et Profil */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Identité et Profil</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Situation</h3>
                  <p className="text-gray-700 leading-relaxed">{persona.identite_profil.situation}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Segments</h3>
                  <div className="flex flex-wrap gap-2">
                    {persona.identite_profil.segments.map((segment, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {segment}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Système de Croyances / Rapport à la Science */}
            {(persona.systeme_croyances || persona.rapport_science) && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {persona.systeme_croyances ? 'Système de Croyances' : 'Rapport à la Science'}
                </h2>
                {persona.systeme_croyances ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Rapport à l'information</h3>
                      <p className="text-gray-700">{persona.systeme_croyances.rapport_information}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Perception des médias</h3>
                      <p className="text-gray-700">{persona.systeme_croyances.perception_medias}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Liberté d'expression vs désinformation</h3>
                      <p className="text-gray-700">{persona.systeme_croyances.liberte_expression_désinfo}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Littératie scientifique</h3>
                      <p className="text-gray-700">{persona.rapport_science?.litteratie_scientifique}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Perception de l'évolution</h3>
                      <p className="text-gray-700">{persona.rapport_science?.perception_evolution}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Confiance dans les institutions</h3>
                      <p className="text-gray-700">{persona.rapport_science?.confiance_institutions}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Valeurs */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Valeurs</h2>
              <div className="flex flex-wrap gap-2">
                {persona.valeurs.map((value, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {value}
                  </span>
                ))}
              </div>
            </div>

            {/* Besoins et Freins */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Besoins et Freins</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Jobs to be Done</h3>
                  <ul className="space-y-2">
                    {persona.besoins_freins_jtbd.jobs.map((job, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></div>
                        <span className="text-gray-700">{job}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Freins</h3>
                  <ul className="space-y-2">
                    {persona.besoins_freins_jtbd.freins.map((frein, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></div>
                        <span className="text-gray-700">{frein}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Motivations */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Motivations</h2>
              <div className="flex flex-wrap gap-2">
                {persona.motivations.map((motivation, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {motivation}
                  </span>
                ))}
              </div>
            </div>

            {/* Pratiques et Indicateurs */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pratiques et Indicateurs</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Canaux préférés</h3>
                  <div className="flex flex-wrap gap-2">
                    {persona.pratiques_et_indicateurs?.canaux?.map((canal, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {canal}
                      </span>
                    )) || (
                      <span className="text-sm text-gray-500">Non spécifié</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Pratiques</h3>
                  <div className="flex flex-wrap gap-2">
                    {persona.pratiques_et_indicateurs?.pratiques?.map((pratique, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                        {pratique}
                      </span>
                    )) || (
                      <span className="text-sm text-gray-500">Non spécifié</span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Appareils utilisés</h3>
                  <div className="flex flex-wrap gap-2">
                    {persona.pratiques_et_indicateurs?.devices?.map((device, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {device}
                      </span>
                    )) || (
                      <span className="text-sm text-gray-500">Non spécifié</span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Fréquence et intensité</h3>
                  <p className="text-gray-700">{persona.pratiques_et_indicateurs?.frequence_intensite || 'Non spécifié'}</p>
                </div>

                {/* Indicateurs */}
                {persona.pratiques_et_indicateurs?.indicateurs && persona.pratiques_et_indicateurs.indicateurs.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Indicateurs clés</h3>
                    <div className="space-y-3">
                      {persona.pratiques_et_indicateurs.indicateurs.map((indicateur, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800">{indicateur.intitulé}</h4>
                          <p className="text-sm text-gray-600 mt-1">{indicateur.valeur}</p>
                          <p className="text-xs text-gray-500 mt-1">{indicateur.source}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enjeux de Communication */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Enjeux de Communication</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Sujets d'intérêt</h3>
                  <div className="flex flex-wrap gap-2">
                    {persona.enjeux_communication?.sujets?.map((sujet, index) => (
                      <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                        {sujet}
                      </span>
                    )) || (
                      <span className="text-sm text-gray-500">Non spécifié</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Leviers d'engagement</h3>
                  <div className="flex flex-wrap gap-2">
                    {persona.enjeux_communication?.leviers?.map((levier, index) => (
                      <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        {levier}
                      </span>
                    )) || (
                      <span className="text-sm text-gray-500">Non spécifié</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Lien avec le lieu physique</h3>
                  <p className="text-gray-700">{persona.enjeux_communication?.lien_lieu_physique || 'Non spécifié'}</p>
                </div>
              </div>
            </div>

            {/* Analyse approfondie - Champs v3 */}
            {(persona.role_democratique_percu || persona.indice_confiance_info || persona.indice_fatigue_ou_evitement || persona.vigilance_desinformation || persona.attentes_transparence_medias || persona.attitude_ia_medias || persona.parts_temps_par_canal || persona.confiance_par_canal || persona.mode_socialisation_info || persona.fenetre_attention || persona.contraintes_pratiques || persona.objections_cles || persona.attitudes_envers_journalistes || persona.attitudes_envers_institutions || persona.attitudes_envers_fact_checkers || persona.indicateurs_sources_normes) && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Analyse approfondie</h2>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  {/* Colonne gauche */}
                  <div className="space-y-6">
                    {persona.role_democratique_percu && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Rôle démocratique perçu des médias</h3>
                        <p className="text-gray-700">{persona.role_democratique_percu}</p>
                      </div>
                    )}

                    {persona.indice_confiance_info && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Indice de confiance dans l'information</h3>
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800 font-medium">{persona.indice_confiance_info.valeur}</p>
                          <p className="text-xs text-blue-600 mt-1">{persona.indice_confiance_info.source}</p>
                        </div>
                      </div>
                    )}

                    {persona.indice_fatigue_ou_evitement && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Indice de fatigue ou d'évitement de l'information</h3>
                        <div className="p-4 bg-orange-50 rounded-lg">
                          <p className="text-sm text-orange-800 font-medium">{persona.indice_fatigue_ou_evitement.valeur}</p>
                          <p className="text-xs text-orange-600 mt-1">{persona.indice_fatigue_ou_evitement.source}</p>
                        </div>
                      </div>
                    )}

                    {persona.vigilance_desinformation && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Vigilance face à la désinformation</h3>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-800 font-medium">Niveau: {persona.vigilance_desinformation.niveau}</p>
                          <p className="text-xs text-green-600 mt-1">{persona.vigilance_desinformation.illustration}</p>
                        </div>
                      </div>
                    )}

                    {persona.attentes_transparence_medias && persona.attentes_transparence_medias.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Attentes en matière de transparence des médias</h3>
                        <ul className="space-y-2">
                          {persona.attentes_transparence_medias.map((attente, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                              <span className="text-gray-700 text-sm">{attente}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {persona.attitude_ia_medias && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Attitude envers l'IA dans les médias</h3>
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <p className="text-sm text-purple-800 font-medium mb-2">Favorable: {persona.attitude_ia_medias.favorable}</p>
                          <div>
                            <p className="text-xs text-purple-600 font-medium">Risques identifiés:</p>
                            <ul className="mt-1 space-y-1">
                              {persona.attitude_ia_medias.risques_top.map((risque, index) => (
                                <li key={index} className="text-xs text-purple-600">• {risque}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Colonne droite */}
                  <div className="space-y-6">
                    {persona.parts_temps_par_canal && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Parts de temps par canal</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-700">Réseaux sociaux</span>
                            <span className="text-sm font-medium text-gray-800">{persona.parts_temps_par_canal.reseaux_sociaux}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-700">Sites d'actualité</span>
                            <span className="text-sm font-medium text-gray-800">{persona.parts_temps_par_canal.sites_actu}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-700">TV/Radio</span>
                            <span className="text-sm font-medium text-gray-800">{persona.parts_temps_par_canal.tv_radio}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-700">Messageries</span>
                            <span className="text-sm font-medium text-gray-800">{persona.parts_temps_par_canal.messageries}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {persona.confiance_par_canal && persona.confiance_par_canal.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Confiance par canal</h3>
                        <div className="space-y-2">
                          {persona.confiance_par_canal.map((canal, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span className="text-sm text-gray-700">{canal.canal}</span>
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
                    )}

                    {persona.mode_socialisation_info && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Mode de socialisation à l'information</h3>
                        <p className="text-gray-700">{persona.mode_socialisation_info}</p>
                      </div>
                    )}

                    {persona.fenetre_attention && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Fenêtre d'attention</h3>
                        <p className="text-gray-700">{persona.fenetre_attention}</p>
                      </div>
                    )}

                    {persona.contraintes_pratiques && persona.contraintes_pratiques.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Contraintes pratiques</h3>
                        <ul className="space-y-2">
                          {persona.contraintes_pratiques.map((contrainte, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="mt-1 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></div>
                              <span className="text-gray-700 text-sm">{contrainte}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {persona.objections_cles && persona.objections_cles.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Objections clés</h3>
                        <ul className="space-y-2">
                          {persona.objections_cles.map((objection, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="mt-1 h-2 w-2 rounded-full bg-orange-500 flex-shrink-0"></div>
                              <span className="text-gray-700 text-sm">{objection}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {persona.attitudes_envers_journalistes && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Attitudes envers les journalistes</h3>
                        <p className="text-gray-700 text-sm">{persona.attitudes_envers_journalistes}</p>
                      </div>
                    )}

                    {persona.attitudes_envers_institutions && persona.attitudes_envers_institutions !== 'N/A' && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Attitudes envers les institutions</h3>
                        <p className="text-gray-700 text-sm">{persona.attitudes_envers_institutions}</p>
                      </div>
                    )}

                    {persona.attitudes_envers_fact_checkers && persona.attitudes_envers_fact_checkers !== 'N/A' && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Attitudes envers les fact-checkers</h3>
                        <p className="text-gray-700 text-sm">{persona.attitudes_envers_fact_checkers}</p>
                      </div>
                    )}

                    {persona.indicateurs_sources_normes && persona.indicateurs_sources_normes.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Indicateurs, sources et normes</h3>
                        <div className="space-y-3">
                          {persona.indicateurs_sources_normes.map((item, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-lg">
                              <div className="font-medium text-gray-800 text-sm">{item.intitule}</div>
                              <div className="text-sm text-gray-600 mt-1">{item.valeur}</div>
                              <div className="text-xs text-gray-500 mt-1 italic">{item.source}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Parcours et Triggers */}
            {persona.parcours_triggers && persona.parcours_triggers.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Parcours et Triggers</h2>
                <div className="space-y-3">
                  {persona.parcours_triggers.map((trigger, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-indigo-500 flex-shrink-0"></div>
                      <span className="text-gray-700">{trigger}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Posture IA et Personnalisation */}
            {persona.posture_ia_personnalisation && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Posture IA et Personnalisation</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Usage de l'IA</h3>
                    <p className="text-gray-700">{persona.posture_ia_personnalisation.usage}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Limites acceptées</h3>
                    <p className="text-gray-700">{persona.posture_ia_personnalisation.limites}</p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Sidebar - Right side (1/3) */}
          <aside className="space-y-6">
            {/* Talk with Persona */}
            <TalkWithPersonaButton persona={persona} variant="page" site={site} />

            {/* Communication & Formats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Comment lui parler</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Tonalité recommandée</h3>
                  <p className="text-sm text-gray-700 mb-3">{persona.tonalite_et_eviter?.ton || 'Non spécifié'}</p>
                  <h4 className="text-md font-medium text-gray-800 mb-2">À éviter</h4>
                  <ul className="space-y-1">
                    {persona.tonalite_et_eviter?.a_eviter?.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-500">×</span>
                        <span className="text-xs text-gray-600">{item}</span>
                      </li>
                    )) || (
                      <li className="text-xs text-gray-500">Non spécifié</li>
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Formats accessibles</h3>
                  <p className="text-sm text-gray-700 mb-3">Langage: {persona.accessibilite_inclusion?.langage || 'Non spécifié'}</p>
                  <div className="flex flex-wrap gap-2">
                    {persona.accessibilite_inclusion?.formats?.map((format, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        {format}
                      </span>
                    )) || (
                      <span className="text-xs text-gray-500">Non spécifié</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Enjeu stratégique */}
            {persona.conclusion && (
              <div className="bg-white rounded-lg shadow-md p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Enjeu stratégique</h2>
                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  {persona.conclusion}
                </p>
              </div>
            )}

            {/* Services */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Services activables</h2>
              <ul className="space-y-3">
                {persona.services_offres?.map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{service}</span>
                  </li>
                )) || (
                  <li className="text-sm text-gray-500">Non spécifié</li>
                )}
              </ul>
            </div>

            {/* Profil d'apprentissage & engagement */}
            {persona.learner_profile && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Profil d'apprentissage & engagement</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{persona.learner_profile.label}</h3>
                    <p className="text-sm text-gray-700">{persona.learner_profile.tagline}</p>
                  </div>
                  {persona.astuce_activation && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Astuce d'activation</h3>
                      <p className="text-sm text-gray-700">{persona.astuce_activation}</p>
                    </div>
                  )}
                  {persona.note_neutralite && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Note sur la neutralité</h3>
                      <p className="text-sm text-gray-700">{persona.note_neutralite}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Informations complémentaires */}
            {(persona.global_vs_local_identity || persona.language_preferences || persona.preferred_contact_points || persona.possible_barriers_to_engagement || persona.date_derniere_mise_a_jour || persona.niveau_preuve) && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Informations complémentaires</h2>
                <div className="space-y-4">
                  {persona.global_vs_local_identity && persona.global_vs_local_identity !== 'N/A' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Identité globale vs locale</h3>
                      <p className="text-sm text-gray-700">{persona.global_vs_local_identity}</p>
                    </div>
                  )}
                  
                  {persona.language_preferences && persona.language_preferences.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Préférences linguistiques</h3>
                      <div className="flex flex-wrap gap-2">
                        {persona.language_preferences.map((lang, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {persona.preferred_contact_points && persona.preferred_contact_points.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Points de contact préférés</h3>
                      <div className="flex flex-wrap gap-2">
                        {persona.preferred_contact_points.map((contact, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                            {contact}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {persona.possible_barriers_to_engagement && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Freins possibles à l'engagement</h3>
                      <p className="text-sm text-gray-700">{persona.possible_barriers_to_engagement}</p>
                    </div>
                  )}

                  {persona.date_derniere_mise_a_jour && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Date de dernière mise à jour</h3>
                      <p className="text-sm text-gray-700">{persona.date_derniere_mise_a_jour}</p>
                    </div>
                  )}

                  {persona.niveau_preuve && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Niveau de preuve</h3>
                      <p className="text-sm text-gray-700">{persona.niveau_preuve}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}