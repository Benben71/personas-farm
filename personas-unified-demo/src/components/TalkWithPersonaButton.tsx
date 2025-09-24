'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import PersonaChat from './PersonaChat';

interface TalkWithPersonaButtonProps {
  persona: {
    id: string;
    identite_profil: {
      age: number;
      statut: string;
      situation: string;
    };
    systeme_croyances?: {
      rapport_information: string;
      perception_medias: string;
      liberte_expression_désinfo: string;
    };
    rapport_science?: {
      litteratie_scientifique: string;
      perception_evolution: string;
      confiance_institutions: string;
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
    };
    tonalite_et_eviter: {
      ton: string;
      a_eviter: string[];
    };
    accessibilite_inclusion: {
      langage: string;
      formats: string[];
    };
    conclusion: string;
  };
  variant?: 'card' | 'page';
  site?: string;
}

export default function TalkWithPersonaButton({ persona, variant = 'page', site }: TalkWithPersonaButtonProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  if (variant === 'card') {
    return (
      <Link
        href={`/persona/${persona.id}?site=${site}`}
        className="w-full mt-4 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium">Comprendre {persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}</span>
        <ArrowRight className="w-4 h-4 opacity-80" />
      </Link>
    );
  }

  return (
    <>
      <div className="bg-[var(--card-light)] rounded-2xl border border-[var(--border-light)] p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-[var(--primary-accent-light)] mb-5">
          <span className="material-symbols-outlined text-[var(--primary-accent)] text-4xl">chat_bubble</span>
        </div>
        <h3 className="text-2xl font-bold text-[var(--text-primary-light)]">Parler avec {persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}</h3>
        <p className="mt-2 mb-6 text-[var(--text-secondary-light)]">
          Testez vos stratégies de communication en discutant directement avec ce persona.
        </p>
        <button
          onClick={handleOpenChat}
          className="w-full flex items-center justify-center space-x-2 bg-[var(--primary-accent)] text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <span>Parler avec {persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
      
      <PersonaChat 
        persona={persona} 
        isOpen={isChatOpen} 
        onClose={handleCloseChat}
        site={site}
      />
    </>
  );
}
