'use client';

import { useState } from 'react';
import { PersonaPageProps } from '@/types';
import TalkWithPersonaButton from './TalkWithPersonaButton';
import Header from './Header';
import PersonaChat from './PersonaChat';

export default function PersonaPage(props: PersonaPageProps & { allPersonas: any[] }) {
  const { site, theme, persona, allPersonas } = props;
  const [imageError, setImageError] = useState(false);
  const [isMuseeOpen, setIsMuseeOpen] = useState(false);
  const [isOffreOpen, setIsOffreOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background-light)]">
      <Header site={site} personas={allPersonas} />

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 px-4 sm:px-6 lg:px-8 py-12">
        <main className="col-span-12 lg:col-span-8 space-y-8">
          {/* Hero Section */}
          <div className="bg-[var(--card-light)] rounded-2xl overflow-hidden border border-[var(--border-light)]">
            <div className="h-80 bg-cover bg-center" style={{backgroundImage: `url(/${site}-personas/${persona.id}.png)`}}>
            </div>
            <div className="p-8">
              <h1 className="text-4xl font-bold text-[var(--text-primary-light)]">{persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}</h1>
              <p className="text-lg text-[var(--text-secondary-light)] mt-1">{persona.identite_profil.age} ans • {persona.identite_profil.statut}</p>
            </div>
            </div>

          {/* Quote Section */}
          <div className="bg-[var(--card-light)] rounded-2xl p-8 border border-[var(--border-light)]">
            <p className="text-2xl font-medium text-center text-[var(--text-primary-light)] leading-relaxed">
              "{persona.motto || persona.systeme_croyances?.rapport_information || 'Découvrez mon profil...'}"
            </p>
          </div>

          {/* PORTRAIT */}
          <div className="bg-[var(--card-light)] rounded-2xl p-8 border border-[var(--border-light)]">
            <h1 className="text-3xl font-bold text-[var(--text-primary-light)] mb-8">PORTRAIT</h1>
            
            {/* Valeurs & Motivations */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-[var(--text-primary-light)] mb-4">Valeurs & Motivations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="font-semibold text-[var(--text-primary-light)] mb-3">Valeurs principales</p>
                  <div className="flex flex-wrap gap-2">
                    {persona.valeurs?.map((valeur, index) => (
                      <span key={index} className="text-sm font-medium bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                        {valeur}
                      </span>
                    )) || (
                      <span className="text-sm text-gray-500">Non spécifié</span>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="font-semibold text-[var(--text-primary-light)] mb-3">Motivations principales</p>
                  <ul className="space-y-2 text-[var(--text-secondary-light)]">
                    {persona.motivations?.map((motivation, index) => (
                      <li key={index} className="flex items-center">
                        <span className="material-symbols-outlined text-[var(--primary-accent)] text-lg mr-2">check_circle</span>
                        {motivation}
                      </li>
                    )) || (
                      <li className="text-sm text-gray-500">Non spécifié</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Rapport sur le sujet */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-[var(--text-primary-light)] mb-4">Rapport sur le sujet</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {persona.systeme_croyances?.rapport_information && (
                  <div className="bg-red-50/50 rounded-xl p-5 border border-red-100">
                    <p className="font-semibold text-red-800 mb-1">Relation à l'information</p>
                    <p className="text-red-700">{persona.systeme_croyances.rapport_information}</p>
                      </div>
                    )}

                    {persona.systeme_croyances?.perception_medias && (
                  <div className="bg-green-50/50 rounded-xl p-5 border border-green-100">
                    <p className="font-semibold text-green-800 mb-1">Vision des médias</p>
                    <p className="text-green-700">{persona.systeme_croyances.perception_medias}</p>
                      </div>
                    )}

                    {persona.role_democratique_percu && (
                  <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100">
                    <p className="font-semibold text-blue-800 mb-1">Rôle démocratique</p>
                    <p className="text-blue-700">{persona.role_democratique_percu}</p>
                      </div>
                    )}

                    {persona.systeme_croyances?.liberte_expression_désinfo && (
                  <div className="bg-yellow-50/50 rounded-xl p-5 border border-yellow-100">
                    <p className="font-semibold text-yellow-800 mb-1">Liberté vs désinformation</p>
                    <p className="text-yellow-700">{persona.systeme_croyances.liberte_expression_désinfo}</p>
                      </div>
                    )}

                    {persona.attitudes_envers_journalistes && (
                  <div className="bg-cyan-50/50 rounded-xl p-5 border border-cyan-100">
                    <p className="font-semibold text-cyan-800 mb-1">Attitude envers les journalistes</p>
                    <p className="text-cyan-700">{persona.attitudes_envers_journalistes}</p>
                      </div>
                    )}

                    {persona.attitudes_envers_institutions && (
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <p className="font-semibold text-gray-800 mb-1">Attitude envers les institutions</p>
                    <p className="text-gray-700">{persona.attitudes_envers_institutions || 'N/A'}</p>
                      </div>
                    )}
                  </div>
                </div>

            {/* Identité & Profil */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-[var(--text-primary-light)] mb-4">Identité & Profil</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <p className="font-semibold text-[var(--text-primary-light)]">Identité</p>
                  <p>{persona.identite_profil.age} ans • {persona.identite_profil.statut}</p>
                  <p>{persona.identite_profil.situation}</p>
                  {persona.language_preferences && persona.language_preferences.length > 0 && (
                    <div>
                      <p className="font-medium text-gray-500 mb-1">Langues parlées</p>
                      <div className="flex flex-wrap gap-1">
                        {persona.language_preferences.map((lang, index) => (
                          <span key={index} className="font-bold bg-gray-200 text-gray-700 px-2.5 py-1 rounded-md">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-6">
                  <div className="bg-teal-50/50 rounded-xl p-5 border border-teal-100">
                    <p className="font-semibold text-teal-800 mb-1">Profil d'apprentissage</p>
                    <p className="text-teal-700">
                      <span className="font-bold">{persona.learner_profile?.label || 'Non défini'}</span>
                      {persona.learner_profile?.tagline && (
                        <>
                          <br/>{persona.learner_profile.tagline}
                        </>
                      )}
                    </p>
                  </div>
                  {persona.astuce_activation && (
                    <div className="bg-amber-50/50 rounded-xl p-5 border border-amber-100">
                      <p className="font-semibold text-amber-800 mb-1">Comment l'activer</p>
                      <p className="text-amber-700">{persona.astuce_activation}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enjeu stratégique */}
            {persona.conclusion && (
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-[var(--text-primary-light)] mb-4">Enjeu stratégique</h2>
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-[var(--text-tertiary-light)] italic">{persona.conclusion}</p>
                </div>
              </div>
            )}
          </div>

          {/* MUSÉOLOGIE & MÉDIATION */}
          <div className="bg-[var(--card-light)] rounded-2xl p-8 border border-[var(--border-light)]">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-[var(--text-primary-light)]">MUSÉOLOGIE & MÉDIATION</h1>
              <button
                onClick={() => setIsMuseeOpen(!isMuseeOpen)}
                className="flex items-center space-x-2 text-[var(--text-secondary-light)] hover:text-[var(--text-primary-light)] transition-colors"
              >
                <span className="text-sm font-medium">
                  {isMuseeOpen ? 'Masquer' : 'Afficher'}
                </span>
                <span className="material-symbols-outlined transform transition-transform duration-200">
                  {isMuseeOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>
            </div>

            {isMuseeOpen && (
              <>
                {/* Visite / Expérience muséale */}
                {((persona as any)["Motivation de la visite"] || (persona as any)["Contexte de la visite"] || (persona as any)["Fréquence de visite"] || (persona as any)["Expériences préférées"] || (persona as any)["Freins à la visite"] || (persona as any)["Attentes vis-à-vis de l'information"] || (persona as any)["Besoins en langues"] || (persona as any)["Engagement après la visite"]) && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-[var(--text-primary-light)] mb-4">Expérience de visite</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {(persona as any)["Motivation de la visite"] && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-[var(--text-primary-light)] mb-2">Motivation de la visite</h4>
                        <p className="text-[var(--text-secondary-light)] text-sm">{(persona as any)["Motivation de la visite"]}</p>
                      </div>
                    )}

                    {(persona as any)["Contexte de la visite"] && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-[var(--text-primary-light)] mb-2">Contexte de la visite</h4>
                        <p className="text-[var(--text-secondary-light)] text-sm">{(persona as any)["Contexte de la visite"]}</p>
                      </div>
                    )}

                    {(persona as any)["Fréquence de visite"] && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-[var(--text-primary-light)] mb-2">Fréquence de visite</h4>
                        <p className="text-[var(--text-secondary-light)] text-sm">{(persona as any)["Fréquence de visite"]}</p>
                      </div>
                    )}

                    {(persona as any)["Expériences préférées"] && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-[var(--text-primary-light)] mb-2">Expériences préférées</h4>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray((persona as any)["Expériences préférées"]) ?
                            (persona as any)["Expériences préférées"].map((exp: string, index: number) => (
                              <span key={index} className="text-sm font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                {exp}
                              </span>
                            )) : (
                              <p className="text-[var(--text-secondary-light)] text-sm">{(persona as any)["Expériences préférées"]}</p>
                            )
                          }
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {(persona as any)["Freins à la visite"] && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-[var(--text-primary-light)] mb-2">Freins à la visite</h4>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray((persona as any)["Freins à la visite"]) ?
                            (persona as any)["Freins à la visite"].map((frein: string, index: number) => (
                              <span key={index} className="text-sm font-medium bg-red-100 text-red-800 px-3 py-1 rounded-full">
                                {frein}
                              </span>
                            )) : (
                              <p className="text-[var(--text-secondary-light)] text-sm">{(persona as any)["Freins à la visite"]}</p>
                            )
                          }
                        </div>
                      </div>
                    )}

                    {(persona as any)["Attentes vis-à-vis de l'information"] && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-[var(--text-primary-light)] mb-2">Attentes vis-à-vis de l'information</h4>
                        <p className="text-[var(--text-secondary-light)] text-sm">{(persona as any)["Attentes vis-à-vis de l'information"]}</p>
                      </div>
                    )}

                    {(persona as any)["Besoins en langues"] && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-[var(--text-primary-light)] mb-2">Besoins en langues</h4>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray((persona as any)["Besoins en langues"]) ?
                            (persona as any)["Besoins en langues"].map((lang: string, index: number) => (
                              <span key={index} className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                {lang}
                              </span>
                            )) : (
                              <p className="text-[var(--text-secondary-light)] text-sm">{(persona as any)["Besoins en langues"]}</p>
                            )
                          }
                        </div>
                      </div>
                    )}

                    {(persona as any)["Engagement après la visite"] && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-[var(--text-primary-light)] mb-2">Engagement après la visite</h4>
                        <p className="text-[var(--text-secondary-light)] text-sm">{(persona as any)["Engagement après la visite"]}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Besoins et Freins */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text-primary-light)] mb-4">Besoins & Obstacles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-[var(--text-primary-light)] mb-3">Tâches à accomplir</h4>
                  <ul className="space-y-2">
                    {persona.besoins_freins_jtbd?.jobs?.map((job, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[var(--primary-accent)] text-lg mt-0.5">check_circle</span>
                        <span className="text-[var(--text-secondary-light)] text-sm">{job}</span>
                      </li>
                    )) || (
                      <li className="text-sm text-gray-500">Non spécifié</li>
                    )}
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-[var(--text-primary-light)] mb-3">Freins principaux</h4>
                  <ul className="space-y-2">
                    {persona.besoins_freins_jtbd?.freins?.map((frein, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-red-500 text-lg mt-0.5">cancel</span>
                        <span className="text-[var(--text-secondary-light)] text-sm">{frein}</span>
                      </li>
                    )) || (
                      <li className="text-sm text-gray-500">Non spécifié</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

                {/* Accessibilité & Inclusion */}
                <div>
                  <h2 className="text-xl font-semibold text-[var(--text-primary-light)] mb-4">Accessibilité & Inclusion</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-semibold text-[var(--text-primary-light)] mb-2">Langage adapté</h4>
                      <p className="text-[var(--text-secondary-light)] text-sm">{persona.accessibilite_inclusion?.langage || 'Non spécifié'}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-semibold text-[var(--text-primary-light)] mb-2">Formats accessibles</h4>
                      <div className="flex flex-wrap gap-2">
                        {persona.accessibilite_inclusion?.formats?.map((format, index) => (
                          <span key={index} className="text-sm font-medium bg-teal-100 text-teal-800 px-3 py-1 rounded-full">
                            {format}
                          </span>
                        )) || (
                          <span className="text-sm text-gray-500">Non spécifié</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* OFFRE NUMÉRIQUE & COMMUNICATION */}
          <div className="bg-[var(--card-light)] rounded-2xl p-8 border border-[var(--border-light)]">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-[var(--text-primary-light)]">OFFRE NUMÉRIQUE & COMMUNICATION</h1>
              <button
                onClick={() => setIsOffreOpen(!isOffreOpen)}
                className="flex items-center space-x-2 text-[var(--text-secondary-light)] hover:text-[var(--text-primary-light)] transition-colors"
              >
                <span className="text-sm font-medium">
                  {isOffreOpen ? 'Masquer' : 'Afficher'}
                </span>
                <span className="material-symbols-outlined transform transition-transform duration-200">
                  {isOffreOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>
            </div>

            {isOffreOpen && (
              <>
                {/* Pratiques digitales */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-[var(--text-primary-light)] mb-4">Pratiques Digitales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-[var(--text-primary-light)] mb-2">Canaux préférés</h4>
                    <div className="flex flex-wrap gap-2">
                      {persona.pratiques_et_indicateurs?.canaux?.map((canal, index) => (
                        <span key={index} className="text-sm font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                          {canal}
                        </span>
                      )) || (
                        <span className="text-sm text-gray-500">Non spécifié</span>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-[var(--text-primary-light)] mb-2">Appareils utilisés</h4>
                    <div className="flex flex-wrap gap-2">
                      {persona.pratiques_et_indicateurs?.devices?.map((device, index) => (
                        <span key={index} className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                          {device}
                        </span>
                      )) || (
                        <span className="text-sm text-gray-500">Non spécifié</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-[var(--text-primary-light)] mb-2">Pratiques</h4>
                    <div className="flex flex-wrap gap-2">
                      {persona.pratiques_et_indicateurs?.pratiques?.map((pratique, index) => (
                        <span key={index} className="text-sm font-medium bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                          {pratique}
                        </span>
                      )) || (
                        <span className="text-sm text-gray-500">Non spécifié</span>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-[var(--text-primary-light)] mb-2">Fréquence et intensité</h4>
                    <p className="text-[var(--text-secondary-light)] text-sm">{persona.pratiques_et_indicateurs?.frequence_intensite || 'Non spécifié'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stratégie de communication */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--text-primary-light)] mb-4">Stratégie de Communication</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-[var(--text-primary-light)] mb-2">Sujets d'intérêt</h4>
                    <div className="flex flex-wrap gap-2">
                      {persona.enjeux_communication?.sujets?.map((sujet, index) => (
                        <span key={index} className="text-sm font-medium bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                          {sujet}
                        </span>
                      )) || (
                        <span className="text-sm text-gray-500">Non spécifié</span>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-[var(--text-primary-light)] mb-2">Leviers d'engagement</h4>
                    <div className="flex flex-wrap gap-2">
                      {persona.enjeux_communication?.leviers?.map((levier, index) => (
                        <span key={index} className="text-sm font-medium bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                          {levier}
                        </span>
                      )) || (
                        <span className="text-sm text-gray-500">Non spécifié</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-[var(--text-primary-light)] mb-2">Ton recommandé</h4>
                    <p className="text-[var(--text-secondary-light)] text-sm">{persona.tonalite_et_eviter?.ton || 'Non spécifié'}</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-[var(--text-primary-light)] mb-2">À éviter absolument</h4>
                    <div className="flex flex-wrap gap-2">
                      {persona.tonalite_et_eviter?.a_eviter?.map((item, index) => (
                        <span key={index} className="text-sm font-medium bg-red-100 text-red-800 px-3 py-1 rounded-full">
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
                    <h2 className="text-xl font-semibold text-[var(--text-primary-light)] mb-4">Posture IA & Personnalisation</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-semibold text-[var(--text-primary-light)] mb-2">Usage de l'IA</h4>
                        <p className="text-[var(--text-secondary-light)] text-sm">{persona.posture_ia_personnalisation.usage}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-semibold text-[var(--text-primary-light)] mb-2">Limites acceptées</h4>
                        <p className="text-[var(--text-secondary-light)] text-sm">{persona.posture_ia_personnalisation.limites}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Parcours et Triggers */}
                {persona.parcours_triggers && persona.parcours_triggers.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--text-primary-light)] mb-4">Parcours & Triggers</h2>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="space-y-2">
                        {persona.parcours_triggers.map((trigger, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="mt-1 h-2 w-2 rounded-full bg-indigo-500 flex-shrink-0"></div>
                            <span className="text-[var(--text-secondary-light)] text-sm">{trigger}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>

        <aside className="col-span-12 lg:col-span-4">
          <div className="sticky top-12 space-y-8">
            {/* Parler avec la Persona */}
            <div className="bg-[var(--card-light)] rounded-2xl border border-[var(--border-light)] p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-[var(--primary-accent-light)] mb-5">
                <span className="material-symbols-outlined text-[var(--primary-accent)] text-4xl">chat_bubble</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary-light)]">Parler avec {persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}</h3>
              <p className="mt-2 mb-6 text-[var(--text-secondary-light)]">Testez vos stratégies de communication en discutant directement avec cette persona.</p>
                  <button 
                    onClick={() => setIsChatOpen(true)}
                    className="w-full flex items-center justify-center space-x-2 bg-[var(--primary-accent)] text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <span>Parler avec {persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
            </div>

            {/* Méta-information */}
            {(persona.date_derniere_mise_a_jour || persona.niveau_preuve) && (
              <div className="bg-[var(--card-light)] rounded-2xl border border-[var(--border-light)] p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="material-symbols-outlined text-[var(--text-tertiary-light)]">info</span>
                  <h3 className="text-xl font-semibold text-[var(--text-primary-light)]">Méta-information</h3>
                </div>
                <div className="space-y-4 text-sm">
                  {persona.date_derniere_mise_a_jour && (
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--text-tertiary-light)]">Dernière mise à jour</span>
                      <span className="font-medium text-[var(--text-primary-light)]">{persona.date_derniere_mise_a_jour}</span>
                    </div>
                  )}
                  {persona.niveau_preuve && (
                    <div className="flex justify-between items-start">
                      <span className="text-[var(--text-tertiary-light)] shrink-0 mr-4">Niveau de preuve</span>
                      <span className="font-medium text-[var(--text-primary-light)] text-right">{persona.niveau_preuve}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Popup du Chatbot */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col">
            {/* Header du popup */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-[var(--primary-accent-light)] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[var(--primary-accent)] text-2xl">chat_bubble</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Conversation avec {persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}</h2>
                  <p className="text-sm text-gray-500">Testez vos stratégies de communication</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-gray-500">close</span>
              </button>
            </div>

            {/* Contenu du chat */}
            <div className="flex-1 overflow-hidden">
              <PersonaChat 
                persona={persona} 
                site={site}
                onClose={() => setIsChatOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}