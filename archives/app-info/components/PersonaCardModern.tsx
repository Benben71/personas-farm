import Link from 'next/link';
import { CheckCircle, Compass, Users, MessageSquare } from 'lucide-react';
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
  // ✅ Image path constructed from persona ID
  image: string;
}

interface PersonaCardModernProps {
  persona: Persona;
}

export default function PersonaCardModern({ persona }: PersonaCardModernProps) {
  return (
    <div className="group">
      <Link href={`/persona/${persona.id}`}>
        <div className="card p-8 hover:shadow-lg transition-all duration-300 cursor-pointer">
          {/* Header with Avatar and Basic Info */}
          <div className="flex flex-col gap-6 mb-6">
            <div className="relative w-full">
              <div className="aspect-[3/2] w-full rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow border border-neutral-200 relative">
                <img
                  src={persona.image}
                  alt={`Photo de profil de ${persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initial if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                          <span class="text-white font-bold text-4xl">${persona.id.charAt(0).toUpperCase()}</span>
                        </div>
                      `;
                    }
                  }}
                />
                
                {/* Text Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-lg font-bold mb-1 drop-shadow-lg">
                      {persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}
                    </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold">
                            {persona.identite_profil.age} ans
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            persona.identite_profil.segments.includes('pro') 
                              ? 'bg-blue-500/80 text-white' 
                              : 'bg-green-500/80 text-white'
                          }`}>
                            {persona.identite_profil.segments.includes('pro') ? 'Profil pro' : 'Profil public'}
                          </span>
                        </div>
                    <p className="text-white/90 text-xs leading-relaxed line-clamp-2">
                      {persona.identite_profil.statut}
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center z-10">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>
            
            {/* Profile Stats Below Image */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Profil en bref</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center gap-3 text-neutral-700 bg-white px-3 py-2 rounded-lg border border-neutral-200 shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-brand-500 flex-shrink-0"></div>
                  <span className="text-sm font-medium">{persona.besoins_freins_jtbd.jobs.length} jobs</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-700 bg-white px-3 py-2 rounded-lg border border-neutral-200 shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-brand-500 flex-shrink-0"></div>
                  <span className="text-sm font-medium">{persona.pratiques_et_indicateurs.canaux.length} canaux</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-700 bg-white px-3 py-2 rounded-lg border border-neutral-200 shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-brand-500 flex-shrink-0"></div>
                  <span className="text-sm font-medium">{persona.services_offres.length} services</span>
                </div>
              </div>
            </div>
          </div>

          {/* Situation */}
          <div className="mb-6">
            <blockquote className="border-l-4 border-brand-500 pl-4 italic text-neutral-600 text-sm">
              "{persona.identite_profil.situation}"
            </blockquote>
          </div>

          {/* Quick Preview of Key Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Jobs Preview */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-brand-500" />
                <h3 className="font-semibold text-neutral-900">Jobs</h3>
              </div>
              <ul className="space-y-2">
                {persona.besoins_freins_jtbd.jobs.slice(0, 2).map((job, index) => (
                  <li key={index} className="text-sm text-neutral-600 flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500 mt-2 flex-shrink-0"></span>
                    <span className="line-clamp-2">{job}</span>
                  </li>
                ))}
                {persona.besoins_freins_jtbd.jobs.length > 2 && (
                  <li className="text-xs text-neutral-500">
                    +{persona.besoins_freins_jtbd.jobs.length - 2} autres jobs
                  </li>
                )}
              </ul>
            </div>

            {/* Canaux Preview */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-brand-500" />
                <h3 className="font-semibold text-neutral-900">Canaux</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {persona.pratiques_et_indicateurs.canaux.slice(0, 3).map((canal, index) => (
                  <span key={index} className="chip bg-brand-50 text-brand-700 border-brand-200 text-xs">
                    {canal}
                  </span>
                ))}
                {persona.pratiques_et_indicateurs.canaux.length > 3 && (
                  <span className="text-xs text-neutral-500 px-2 py-1">
                    +{persona.pratiques_et_indicateurs.canaux.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Services Preview */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-brand-500" />
                <h3 className="font-semibold text-neutral-900">Services</h3>
              </div>
              <ul className="space-y-2">
                {persona.services_offres.slice(0, 2).map((service, index) => (
                  <li key={index} className="text-sm text-neutral-600 flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500 mt-2 flex-shrink-0"></span>
                    <span className="line-clamp-2">{service}</span>
                  </li>
                ))}
                {persona.services_offres.length > 2 && (
                  <li className="text-xs text-neutral-500">
                    +{persona.services_offres.length - 2} autres services
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Action Hint */}
          <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between">
            <span className="text-sm text-neutral-500">
              Cliquez pour voir le profil complet
            </span>
            <MessageSquare className="h-4 w-4 text-neutral-400 group-hover:text-brand-500 transition-colors" />
          </div>
        </div>
      </Link>
      
      {/* Talk with Persona Button */}
      <TalkWithPersonaButton persona={persona} variant="card" />
    </div>
  );
}