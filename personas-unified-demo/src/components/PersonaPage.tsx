'use client';

import { FormEvent, useEffect, useState } from 'react';
import { PersonaPageProps } from '@/types';
import TalkWithPersonaButton from './TalkWithPersonaButton';
import Header from './Header';
import PersonaChat from './PersonaChat';

type CommentVote = 'up' | 'down';

interface FeedbackComment {
  id: string;
  firstName: string;
  message: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
}

export default function PersonaPage(props: PersonaPageProps & { allPersonas: any[] }) {
  const { site, theme, persona, allPersonas } = props;
  const [imageError, setImageError] = useState(false);
  const [isMuseeOpen, setIsMuseeOpen] = useState(false);
  const [isOffreOpen, setIsOffreOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [comments, setComments] = useState<FeedbackComment[]>([]);
  const [userVotes, setUserVotes] = useState<Record<string, CommentVote>>({});
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentMessage, setNewCommentMessage] = useState('');
  const [hasLoadedComments, setHasLoadedComments] = useState(false);
  const [hasLoadedVotes, setHasLoadedVotes] = useState(false);

  const rawAttitudesEnversInstitutions = persona.attitudes_envers_institutions as unknown;
  const attitudesEnversInstitutionsText = typeof rawAttitudesEnversInstitutions === 'string'
    ? rawAttitudesEnversInstitutions
    : Array.isArray(rawAttitudesEnversInstitutions)
      ? rawAttitudesEnversInstitutions
          .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
          .join(' • ')
      : rawAttitudesEnversInstitutions && typeof rawAttitudesEnversInstitutions === 'object'
        ? Object.values(rawAttitudesEnversInstitutions)
            .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
            .join(' • ')
        : '';

  const personaDisplayName = `${persona.id.charAt(0).toUpperCase()}${persona.id.slice(1)}`;
  const personaRole = persona.identite_profil?.statut || 'Profil';
  const ageValue = persona.identite_profil?.age;
  const ageChip = typeof ageValue === 'number' ? `${ageValue} ans` : null;
  const segments = persona.identite_profil?.segments ?? [];
  const profileSegment = segments.find(segment => {
    const normalized = segment.toLowerCase();
    return normalized === 'public' || normalized === 'pro' || normalized.startsWith('profession');
  });
  const profileChip = profileSegment
    ? `profil ${profileSegment.toLowerCase().startsWith('public') ? 'public' : 'pro'}`
    : null;
  const personaHighlightChips = [ageChip, profileChip].filter(Boolean) as string[];
  const personaContactPoints = persona.preferred_contact_points ?? [];
  const feedbackStorageKey = `persona-feedback-${site}-${persona.id}`;
  const votesStorageKey = `persona-feedback-votes-${site}-${persona.id}`;
  const isSubmitDisabled = newCommentName.trim().length === 0 || newCommentMessage.trim().length === 0;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const storedComments = window.localStorage.getItem(feedbackStorageKey);
      if (storedComments) {
        const parsed = JSON.parse(storedComments) as FeedbackComment[];
        if (Array.isArray(parsed)) {
          setComments(parsed);
        }
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error('Impossible de charger les retours persona :', error);
    } finally {
      setHasLoadedComments(true);
    }
  }, [feedbackStorageKey]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const storedVotes = window.localStorage.getItem(votesStorageKey);
      if (storedVotes) {
        const parsed = JSON.parse(storedVotes) as Record<string, CommentVote>;
        if (parsed && typeof parsed === 'object') {
          setUserVotes(parsed);
        }
      } else {
        setUserVotes({});
      }
    } catch (error) {
      console.error('Impossible de charger les votes persona :', error);
    } finally {
      setHasLoadedVotes(true);
    }
  }, [votesStorageKey]);

  useEffect(() => {
    if (!hasLoadedComments || typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(feedbackStorageKey, JSON.stringify(comments));
    } catch (error) {
      console.error('Impossible de sauvegarder les retours persona :', error);
    }
  }, [feedbackStorageKey, comments, hasLoadedComments]);

  useEffect(() => {
    if (!hasLoadedVotes || typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(votesStorageKey, JSON.stringify(userVotes));
    } catch (error) {
      console.error('Impossible de sauvegarder les votes persona :', error);
    }
  }, [userVotes, votesStorageKey, hasLoadedVotes]);

  const handleCommentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = newCommentName.trim();
    const trimmedMessage = newCommentMessage.trim();

    if (!trimmedName || !trimmedMessage) {
      return;
    }

    const commentId = typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const newComment: FeedbackComment = {
      id: commentId,
      firstName: trimmedName,
      message: trimmedMessage,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
    };

    setComments((previous) => [newComment, ...previous]);
    setNewCommentName('');
    setNewCommentMessage('');
  };

  const handleVote = (commentId: string, voteType: CommentVote) => {
    const existingVote = userVotes[commentId];

    setComments((previousComments) =>
      previousComments.map((comment) => {
        if (comment.id !== commentId) {
          return comment;
        }

        let upvotes = comment.upvotes;
        let downvotes = comment.downvotes;

        if (existingVote === voteType) {
          if (voteType === 'up') {
            upvotes = Math.max(0, upvotes - 1);
          } else {
            downvotes = Math.max(0, downvotes - 1);
          }
        } else {
          if (existingVote === 'up') {
            upvotes = Math.max(0, upvotes - 1);
          } else if (existingVote === 'down') {
            downvotes = Math.max(0, downvotes - 1);
          }

          if (voteType === 'up') {
            upvotes += 1;
          } else {
            downvotes += 1;
          }
        }

        return {
          ...comment,
          upvotes,
          downvotes,
        };
      })
    );

    setUserVotes((previousVotes) => {
      const updatedVotes = { ...previousVotes };
      if (existingVote === voteType) {
        delete updatedVotes[commentId];
      } else {
        updatedVotes[commentId] = voteType;
      }
      return updatedVotes;
    });
  };

  const formatCommentDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString('fr-FR', {
        dateStyle: 'short',
        timeStyle: 'short',
      });
    } catch (error) {
      return '';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background-light)]">
      <Header site={site} personas={allPersonas} />

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 px-4 sm:px-6 lg:px-8 py-12">
        <main className="col-span-12 lg:col-span-8 space-y-8">
          <div className="bg-[var(--card-light)] rounded-2xl overflow-hidden border border-[var(--border-light)]">
          <div
            className="relative h-80 sm:h-[26rem] bg-cover bg-center"
            style={{ backgroundImage: `url(/${site}-personas/${persona.id}.png)` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 text-white">
              <div />
              <div className="space-y-3">
                <p className="text-2xl sm:text-3xl font-semibold tracking-[0.12em] text-white/80">
                  {personaDisplayName.toUpperCase()}
                </p>
                {personaHighlightChips.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {personaHighlightChips.map((chip, index) => (
                      <span
                        key={`${chip}-${index}`}
                        className="inline-flex items-center rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs sm:text-xs font-medium backdrop-blur-sm/70"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
                <h1 className="text-3xl sm:text-4xl font-semibold leading-tight text-white">
                  {personaRole}
                </h1>
              </div>
            </div>
          </div>
            <div className="p-8 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--text-tertiary-light)]">
                  Situation
                </p>
                <p className="mt-2 text-lg text-[var(--text-secondary-light)]">
                  {persona.identite_profil?.situation || 'Non spécifié'}
                </p>
              </div>
              {personaContactPoints.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--text-tertiary-light)]">
                    Points de contact privilégiés
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {personaContactPoints.map((channel: string, index: number) => (
                      <span
                        key={`${channel}-${index}`}
                        className="rounded-full bg-[var(--primary-accent-light)] px-3 py-1 text-sm font-medium text-[var(--primary-accent)]"
                      >
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[var(--card-light)] rounded-2xl p-8 border border-[var(--border-light)]">
            <p className="text-2xl font-medium text-center text-[var(--text-primary-light)] leading-relaxed">
              "{persona.motto || persona.systeme_croyances?.rapport_information || 'Découvrez mon profil...'}"
            </p>
          </div>

          <div className="bg-[var(--card-light)] rounded-2xl p-8 border border-[var(--border-light)]">
            <h1 className="text-3xl font-bold text-[var(--text-primary-light)] mb-8">PORTRAIT</h1>

            <div className="mb-10">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--text-primary-light)] mb-4">
                <span className="material-symbols-outlined text-[var(--primary-accent)]">badge</span>
                Identité & Profil
              </h2>
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

            <div className="mb-10">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--text-primary-light)] mb-4">
                <span className="material-symbols-outlined text-[var(--primary-accent)]">favorite</span>
                Valeurs & Motivations
              </h2>
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

            <div className="mb-10">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--text-primary-light)] mb-4">
                <span className="material-symbols-outlined text-[var(--primary-accent)]">insights</span>
                Rapport sur le sujet
              </h2>
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
                    {attitudesEnversInstitutionsText ? (
                      <p className="text-gray-700">{attitudesEnversInstitutionsText}</p>
                    ) : (
                      <p className="text-gray-500">Non spécifié</p>
                    )}
                      </div>
                    )}
                  </div>
                </div>

            {persona.conclusion && (
              <div className="mb-10">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--text-primary-light)] mb-4">
                  <span className="material-symbols-outlined text-[var(--primary-accent)]">flag</span>
                  Enjeu stratégique
                </h2>
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-[var(--text-tertiary-light)] italic">{persona.conclusion}</p>
                </div>
              </div>
            )}
          </div>

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
            <div className="bg-[var(--card-light)] rounded-2xl border border-[var(--border-light)] p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-[var(--primary-accent-light)] mb-5">
                <span className="material-symbols-outlined text-[var(--primary-accent)] text-4xl">chat_bubble</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary-light)]">Parler avec {persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}</h3>
              <p className="mt-2 mb-6 text-[var(--text-secondary-light)]">Discutez avec ce persona, testez vos scénarios, comprenez mieux ses attentes.</p>
                  <button 
                    onClick={() => setIsChatOpen(true)}
                    className="w-full flex items-center justify-center space-x-2 bg-[var(--primary-accent)] text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <span>Parler avec {persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
            </div>

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

            <div className="bg-[var(--card-light)] rounded-2xl border border-[var(--border-light)] p-8">
              <div className="flex items-center space-x-3 mb-6">
                <span className="material-symbols-outlined text-[var(--text-tertiary-light)]">edit_note</span>
                <h3 className="text-xl font-semibold text-[var(--text-primary-light)]">Suggérer des modifications</h3>
              </div>

              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <label htmlFor="suggestion-first-name" className="block text-sm font-medium text-[var(--text-tertiary-light)] mb-2">
                      Prénom
                    </label>
                    <input
                      id="suggestion-first-name"
                      name="firstName"
                      type="text"
                      value={newCommentName}
                      onChange={(event) => setNewCommentName(event.target.value)}
                      placeholder="Votre prénom"
                      className="w-full rounded-lg border border-[var(--border-light)] bg-white px-4 py-2 text-sm text-[var(--text-primary-light)] focus:border-[var(--primary-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent-light)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="suggestion-message" className="block text-sm font-medium text-[var(--text-tertiary-light)] mb-2">
                      Vos suggestions
                    </label>
                    <textarea
                      id="suggestion-message"
                      name="message"
                      value={newCommentMessage}
                      onChange={(event) => setNewCommentMessage(event.target.value)}
                      placeholder="Décrivez les modifications à proposer pour cette persona…"
                      className="w-full rounded-lg border border-[var(--border-light)] bg-white px-4 py-2 text-sm text-[var(--text-primary-light)] focus:border-[var(--primary-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent-light)]"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className="inline-flex items-center rounded-lg bg-[var(--primary-accent)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-[var(--border-light)] disabled:text-[var(--text-tertiary-light)]"
                  >
                    Envoyer ma suggestion
                  </button>
                </div>
              </form>

              {comments.length > 0 ? (
                <div className="mt-6 space-y-4">
                  {comments.map((comment) => {
                    const userVote = userVotes[comment.id];
                    return (
                      <div key={comment.id} className="rounded-xl border border-[var(--border-light)] bg-white/60 p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-semibold text-[var(--text-primary-light)]">{comment.firstName}</p>
                            <p className="text-xs text-[var(--text-tertiary-light)]">{formatCommentDate(comment.createdAt)}</p>
                          </div>
                          <div className="flex items-center gap-2 text-[9px] text-[var(--text-tertiary-light)]">
                            <button
                              type="button"
                              onClick={() => handleVote(comment.id, 'up')}
                              className={`flex items-center gap-1 transition-colors duration-150 ${
                                userVote === 'up'
                                  ? 'text-[var(--primary-accent)]'
                                  : 'hover:text-[var(--text-secondary-light)]'
                              }`}
                              aria-label="Vote positif"
                            >
                              <span className="material-symbols-outlined text-[10px] leading-none">thumb_up</span>
                              <span className="min-w-[0.75rem] text-center">{comment.upvotes}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleVote(comment.id, 'down')}
                              className={`flex items-center gap-1 transition-colors duration-150 ${
                                userVote === 'down'
                                  ? 'text-red-500'
                                  : 'hover:text-[var(--text-secondary-light)]'
                              }`}
                              aria-label="Vote négatif"
                            >
                              <span className="material-symbols-outlined text-[10px] leading-none">thumb_down</span>
                              <span className="min-w-[0.75rem] text-center">{comment.downvotes}</span>
                            </button>
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary-light)] whitespace-pre-line">
                          {comment.message}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-6 text-sm text-[var(--text-tertiary-light)]">
                  Aucun commentaire pour le moment. Partagez vos suggestions !
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>

      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col">
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
