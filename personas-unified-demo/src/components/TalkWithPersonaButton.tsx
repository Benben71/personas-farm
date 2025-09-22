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
      <>
        <button
          onClick={handleOpenChat}
          className="w-full mt-4 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">Parler avec {persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}</span>
          <ArrowRight className="w-4 h-4 opacity-80" />
        </button>
        
        <PersonaChat 
          persona={persona} 
          isOpen={isChatOpen} 
          onClose={handleCloseChat} 
        />
      </>
    );
  }

  return (
    <>
      <div className="card p-6 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 max-w-md mx-auto">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Parler avec {persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}
            </h3>
            <p className="text-sm text-neutral-600 mb-4">
              Testez vos stratégies de communication en discutant directement avec ce persona. 
              Il répondra selon son profil, ses valeurs et ses motivations.
            </p>
            <button
              onClick={handleOpenChat}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="font-medium">Parler avec {persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}</span>
              <ArrowRight className="w-4 h-4 opacity-80" />
            </button>
          </div>
        </div>
      </div>
      
      <PersonaChat 
        persona={persona} 
        isOpen={isChatOpen} 
        onClose={handleCloseChat} 
      />
    </>
  );
}
