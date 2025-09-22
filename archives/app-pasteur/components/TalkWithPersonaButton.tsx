'use client';

import { useState } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import PersonaChat from './PersonaChat';

interface TalkWithPersonaButtonProps {
  persona: {
    id: string;
    identite_profil: {
      age: number;
      statut: string;
      situation: string;
    };
    rapport_science: {
      litteratie_scientifique: string;
      perception_evolution: string;
      confiance_institutions: string;
    };
    connaissances_biologie: {
      niveau_base: string;
      concepts_cles: string[];
      misconceptions: string;
    };
    valeurs: string[];
    besoins_freins_jtbd: {
      jobs: string[];
      freins: string[];
    };
    motivations: string[];
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
}

export default function TalkWithPersonaButton({ persona, variant = 'page' }: TalkWithPersonaButtonProps) {
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
          className="w-full mt-4 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">Parler avec {persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}</span>
          <Sparkles className="w-4 h-4 opacity-80" />
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
      <div className="card p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Parler avec {persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}
            </h3>
            <p className="text-sm text-neutral-600 mb-4">
              Testez vos stratégies de communication scientifique en discutant directement avec ce persona. 
              Il répondra selon son profil, ses connaissances en biologie et ses motivations scientifiques.
            </p>
            <button
              onClick={handleOpenChat}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="font-medium">Commencer la conversation</span>
              <Sparkles className="w-4 h-4 opacity-80" />
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
