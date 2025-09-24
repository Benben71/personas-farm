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

            {/* Hero Section with Image */}
            <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 flex items-center justify-center relative">
                {!imageError ? (
                  <img
                    src={`/${site}-personas/${persona.id}.png`}
                    alt={`Photo de ${persona.id}`}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">👤</div>
                    <h1 className="text-2xl font-bold mb-2">{persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}</h1>
                  </div>
                )}
                <div className="absolute bottom-6 left-6 text-white">
                  <h1 className="text-4xl font-bold mb-2">{persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}</h1>
                  <p className="text-xl opacity-90">{persona.identite_profil.age} ans • {persona.identite_profil.statut}</p>
                </div>
              </div>
            </div>

            {/* Motto */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-4xl font-extrabold italic text-center text-gray-900 leading-tight">
                "{persona.motto || persona.systeme_croyances?.rapport_information || 'Découvrez mon profil...'}"
              </h1>
            </div>

            {/* PORTRAIT */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-8 border-l-4 border-blue-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                PORTRAIT
              </h2>

              {/* Valeurs & Motivations */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-indigo-600">⭐</span> Valeurs & Motivations
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white/60 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Valeurs fondamentales</h4>
                    <div className="flex flex-wrap gap-2">
                      {persona.valeurs?.map((valeur, index) => (
                        <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                          {valeur}
                        </span>
                      )) || (
                        <span className="text-xs text-gray-500">Non spécifié</span>
                      )}
                    </div>
                  </div>
                  <div className="bg-white/60 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Motivations principales</h4>
                    <div className="space-y-1">
                      {persona.motivations?.map((motivation, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
                          <p className="text-sm text-gray-700">{motivation}</p>
                        </div>
                      )) || (
                        <p className="text-sm text-gray-500">Non spécifié</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rapport au sujet */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-green-600">🎯</span> Rapport au sujet
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {persona.systeme_croyances?.rapport_information && (
                    <div className="bg-purple-50 p-4 rounded border-l-2 border-purple-300">
                      <h4 className="text-sm font-medium text-purple-800 mb-2">Rapport à l'information</h4>
                      <p className="text-sm text-gray-700">{persona.systeme_croyances.rapport_information}</p>
                    </div>
                  )}

                  {persona.systeme_croyances?.perception_medias && (
                    <div className="bg-green-50 p-4 rounded border-l-2 border-green-300">
                      <h4 className="text-sm font-medium text-green-800 mb-2">Vision des médias</h4>
                      <p className="text-sm text-gray-700">{persona.systeme_croyances.perception_medias}</p>
                    </div>
                  )}

                  {persona.role_democratique_percu && (
                    <div className="bg-blue-50 p-4 rounded border-l-2 border-blue-300">
                      <h4 className="text-sm font-medium text-blue-800 mb-2">Rôle démocratique</h4>
                      <p className="text-sm text-gray-700">{persona.role_democratique_percu}</p>
                    </div>
                  )}

                  {persona.systeme_croyances?.liberte_expression_désinfo && (
                    <div className="bg-amber-50 p-4 rounded border-l-2 border-amber-300">
                      <h4 className="text-sm font-medium text-amber-800 mb-2">Liberté vs désinformation</h4>
                      <p className="text-sm text-gray-700">{persona.systeme_croyances.liberte_expression_désinfo}</p>
                    </div>
                  )}

                  {persona.attitudes_envers_journalistes && (
                    <div className="bg-cyan-50 p-4 rounded border-l-2 border-cyan-300">
                      <h4 className="text-sm font-medium text-cyan-800 mb-2">Attitude envers les journalistes</h4>
                      <p className="text-sm text-gray-700">{persona.attitudes_envers_journalistes}</p>
                    </div>
                  )}

                  {persona.attitudes_envers_institutions && (
                    <div className="bg-rose-50 p-4 rounded border-l-2 border-rose-300">
                      <h4 className="text-sm font-medium text-rose-800 mb-2">Attitude envers les institutions</h4>
                      <p className="text-sm text-gray-700">{persona.attitudes_envers_institutions}</p>
                    </div>
                  )}

                  {persona.attitudes_envers_fact_checkers && (
                    <div className="bg-emerald-50 p-4 rounded border-l-2 border-emerald-300">
                      <h4 className="text-sm font-medium text-emerald-800 mb-2">Attitude envers les fact-checkers</h4>
                      <p className="text-sm text-gray-700">{persona.attitudes_envers_fact_checkers}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Identité & Profil */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-teal-600">👤</span> Identité & Profil
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white/60 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Identité</h4>
                    <div className="text-sm text-gray-600 space-y-2">
                      <div className="flex gap-2">
                        <span className="font-medium">{persona.identite_profil.age} ans</span>
                        <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">{persona.identite_profil.statut}</span>
                      </div>
                      <p>{persona.identite_profil.situation}</p>
                      {persona.language_preferences && persona.language_preferences.length > 0 && (
                        <div className="mt-2">
                          <h5 className="text-xs font-medium text-gray-700 mb-1">Langues parlées</h5>
                          <div className="flex flex-wrap gap-1">
                            {persona.language_preferences.map((lang, index) => (
                              <span key={index} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white/60 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Profil d'apprentissage</h4>
                    <div className="bg-teal-50 p-3 rounded">
                      <p className="text-sm font-medium text-teal-800">
                        {persona.learner_profile?.label || 'Non défini'}
                      </p>
                      {persona.learner_profile?.tagline && (
                        <p className="text-sm text-teal-600 mt-1">{persona.learner_profile.tagline}</p>
                      )}
                    </div>
                    {persona.astuce_activation && (
                      <div className="mt-3">
                        <h5 className="text-sm font-medium text-gray-800 mb-1">Comment l'activer</h5>
                        <div className="bg-yellow-50 p-2 rounded border-l-2 border-yellow-300">
                          <p className="text-sm text-gray-700">{persona.astuce_activation}</p>
                        </div>
                      </div>
                    )}

                    {/* Note sur la neutralité intégrée */}
                    {persona.note_neutralite && (
                      <div className="mt-3">
                        <h5 className="text-sm font-medium text-gray-800 mb-1">Note sur la neutralité</h5>
                        <div className="bg-orange-50 p-2 rounded border-l-2 border-orange-300">
                          <p className="text-sm text-gray-700">{persona.note_neutralite}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Enjeu stratégique */}
              {persona.conclusion && (
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-red-600">🎯</span> Enjeu stratégique
                  </h4>
                  <p className="text-sm text-gray-700 bg-red-50 p-4 rounded-lg border-l-4 border-red-200 italic">
                    {persona.conclusion}
                  </p>
                </div>
              )}
            </div>

            {/* MUSÉOLOGIE & MÉDIATION */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg shadow-lg p-8 border-l-4 border-amber-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                MUSÉOLOGIE & MÉDIATION
              </h2>

              {/* Visite / Expérience muséale */}
              {((persona as any)["Motivation de la visite"] || (persona as any)["Contexte de la visite"] || (persona as any)["Fréquence de visite"] || (persona as any)["Expériences préférées"] || (persona as any)["Freins à la visite"] || (persona as any)["Attentes vis-à-vis de l'information"] || (persona as any)["Besoins en langues"] || (persona as any)["Engagement après la visite"]) && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-green-600">🎫</span> Expérience de visite
                  </h3>
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="space-y-4">
                      {(persona as any)["Motivation de la visite"] && (
                        <div className="bg-white/60 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2">Motivation de la visite</h4>
                          <p className="text-gray-700 text-sm">{(persona as any)["Motivation de la visite"]}</p>
                        </div>
                      )}

                      {(persona as any)["Contexte de la visite"] && (
                        <div className="bg-white/60 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2">Contexte de la visite</h4>
                          <p className="text-gray-700 text-sm">{(persona as any)["Contexte de la visite"]}</p>
                        </div>
                      )}

                      {(persona as any)["Fréquence de visite"] && (
                        <div className="bg-white/60 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2">Fréquence de visite</h4>
                          <p className="text-gray-700 text-sm">{(persona as any)["Fréquence de visite"]}</p>
                        </div>
                      )}

                      {(persona as any)["Expériences préférées"] && (
                        <div className="bg-white/60 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2">Expériences préférées</h4>
                          <div className="flex flex-wrap gap-2">
                            {Array.isArray((persona as any)["Expériences préférées"]) ?
                              (persona as any)["Expériences préférées"].map((exp: string, index: number) => (
                                <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                  {exp}
                                </span>
                              )) : (
                                <p className="text-gray-700 text-sm">{(persona as any)["Expériences préférées"]}</p>
                              )
                            }
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {(persona as any)["Freins à la visite"] && (
                        <div className="bg-white/60 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2">Freins à la visite</h4>
                          <div className="flex flex-wrap gap-2">
                            {Array.isArray((persona as any)["Freins à la visite"]) ?
                              (persona as any)["Freins à la visite"].map((frein: string, index: number) => (
                                <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                                  {frein}
                                </span>
                              )) : (
                                <p className="text-gray-700 text-sm">{(persona as any)["Freins à la visite"]}</p>
                              )
                            }
                          </div>
                        </div>
                      )}

                      {(persona as any)["Attentes vis-à-vis de l'information"] && (
                        <div className="bg-white/60 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2">Attentes vis-à-vis de l'information</h4>
                          <p className="text-gray-700 text-sm">{(persona as any)["Attentes vis-à-vis de l'information"]}</p>
                        </div>
                      )}

                      {(persona as any)["Besoins en langues"] && (
                        <div className="bg-white/60 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2">Besoins en langues</h4>
                          <div className="flex flex-wrap gap-2">
                            {Array.isArray((persona as any)["Besoins en langues"]) ?
                              (persona as any)["Besoins en langues"].map((lang: string, index: number) => (
                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                  {lang}
                                </span>
                              )) : (
                                <p className="text-gray-700 text-sm">{(persona as any)["Besoins en langues"]}</p>
                              )
                            }
                          </div>
                        </div>
                      )}

                      {(persona as any)["Engagement après la visite"] && (
                        <div className="bg-white/60 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2">Engagement après la visite</h4>
                          <p className="text-gray-700 text-sm">{(persona as any)["Engagement après la visite"]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}


              {/* Besoins et Freins */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-indigo-600">🎯</span> Besoins & Obstacles
                </h3>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="bg-white/60 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-3">Jobs to be Done</h4>
                    <ul className="space-y-2">
                      {persona.besoins_freins_jtbd.jobs.map((job, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{job}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white/60 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-3">Freins principaux</h4>
                    <ul className="space-y-2">
                      {persona.besoins_freins_jtbd.freins.map((frein, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="mt-1 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{frein}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Accessibilité & Inclusion */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-teal-600">♿</span> Accessibilité & Inclusion
                </h3>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="bg-white/60 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Langage adapté</h4>
                    <p className="text-gray-700 text-sm">{persona.accessibilite_inclusion?.langage || 'Non spécifié'}</p>
                  </div>
                  <div className="bg-white/60 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Formats accessibles</h4>
                    <div className="flex flex-wrap gap-2">
                      {persona.accessibilite_inclusion?.formats?.map((format, index) => (
                        <span key={index} className="px-2 py-1 bg-teal-100 text-teal-700 rounded text-xs">
                          {format}
                        </span>
                      )) || (
                        <span className="text-sm text-gray-500">Non spécifié</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* OFFRE NUMÉRIQUE & COMMUNICATION */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg shadow-lg p-8 border-l-4 border-cyan-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                OFFRE NUMÉRIQUE & COMMUNICATION
              </h2>

              {/* Pratiques digitales */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">📱</span> Pratiques Digitales
                </h3>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div className="bg-white/60 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Canaux préférés</h4>
                      <div className="flex flex-wrap gap-2">
                        {persona.pratiques_et_indicateurs?.canaux?.map((canal, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {canal}
                          </span>
                        )) || (
                          <span className="text-sm text-gray-500">Non spécifié</span>
                        )}
                      </div>
                    </div>

                    <div className="bg-white/60 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Appareils utilisés</h4>
                      <div className="flex flex-wrap gap-2">
                        {persona.pratiques_et_indicateurs?.devices?.map((device, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            {device}
                          </span>
                        )) || (
                          <span className="text-sm text-gray-500">Non spécifié</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/60 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Pratiques</h4>
                      <div className="flex flex-wrap gap-2">
                        {persona.pratiques_et_indicateurs?.pratiques?.map((pratique, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                            {pratique}
                          </span>
                        )) || (
                          <span className="text-sm text-gray-500">Non spécifié</span>
                        )}
                      </div>
                    </div>

                    <div className="bg-white/60 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Fréquence et intensité</h4>
                      <p className="text-gray-700 text-sm">{persona.pratiques_et_indicateurs?.frequence_intensite || 'Non spécifié'}</p>
                    </div>
                  </div>
                </div>
              </div>


              {/* Stratégie de communication */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-green-600">💬</span> Stratégie de Communication
                </h3>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div className="bg-white/60 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Sujets d'intérêt</h4>
                      <div className="flex flex-wrap gap-2">
                        {persona.enjeux_communication?.sujets?.map((sujet, index) => (
                          <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
                            {sujet}
                          </span>
                        )) || (
                          <span className="text-sm text-gray-500">Non spécifié</span>
                        )}
                      </div>
                    </div>

                    <div className="bg-white/60 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Leviers d'engagement</h4>
                      <div className="flex flex-wrap gap-2">
                        {persona.enjeux_communication?.leviers?.map((levier, index) => (
                          <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                            {levier}
                          </span>
                        )) || (
                          <span className="text-sm text-gray-500">Non spécifié</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/60 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Ton recommandé</h4>
                      <p className="text-gray-700 text-sm">{persona.tonalite_et_eviter?.ton || 'Non spécifié'}</p>
                    </div>

                    <div className="bg-white/60 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">À éviter absolument</h4>
                      <div className="flex flex-wrap gap-2">
                        {persona.tonalite_et_eviter?.a_eviter?.map((item, index) => (
                          <span key={index} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                            {item}
                          </span>
                        )) || (
                          <span className="text-sm text-gray-500">Non spécifié</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Posture IA et Personnalisation */}
              {persona.posture_ia_personnalisation && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-purple-600">🤖</span> Posture IA & Personnalisation
                  </h3>
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="bg-white/60 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Usage de l'IA</h4>
                      <p className="text-gray-700 text-sm">{persona.posture_ia_personnalisation.usage}</p>
                    </div>
                    <div className="bg-white/60 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Limites acceptées</h4>
                      <p className="text-gray-700 text-sm">{persona.posture_ia_personnalisation.limites}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Parcours et Triggers */}
              {persona.parcours_triggers && persona.parcours_triggers.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-indigo-600">🎯</span> Parcours & Triggers
                  </h3>
                  <div className="bg-white/60 p-4 rounded-lg">
                    <div className="space-y-2">
                      {persona.parcours_triggers.map((trigger, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="mt-1 h-2 w-2 rounded-full bg-indigo-500 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{trigger}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>


          </div>

          {/* Sidebar - Right side (1/3) */}
          <aside className="space-y-6">
            {/* Talk with Persona */}
            <TalkWithPersonaButton persona={persona} variant="page" site={site} />



            {/* Méta-informations - FOOTER */}
            {(persona.global_vs_local_identity || persona.language_preferences || persona.preferred_contact_points || persona.possible_barriers_to_engagement || persona.date_derniere_mise_a_jour || persona.niveau_preuve) && (
              <div className="bg-gray-100 rounded-lg shadow-sm p-6 border-t-2 border-gray-300">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <span className="text-gray-500">📋</span> Méta-informations
                </h2>
                <div className="space-y-4">
                  {persona.date_derniere_mise_a_jour && (
                    <div>
                      <h3 className="text-md font-medium text-gray-800 mb-1">Dernière mise à jour</h3>
                      <p className="text-xs text-gray-600">{persona.date_derniere_mise_a_jour}</p>
                    </div>
                  )}

                  {persona.niveau_preuve && (
                    <div>
                      <h3 className="text-md font-medium text-gray-800 mb-1">Niveau de preuve</h3>
                      <p className="text-xs text-gray-600">{persona.niveau_preuve}</p>
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