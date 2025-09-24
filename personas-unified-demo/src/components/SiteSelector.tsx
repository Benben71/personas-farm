'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SiteSelectorProps {
  currentSite?: string;
}

export default function SiteSelector({ currentSite }: SiteSelectorProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSiteSelect = async (site: string) => {
    setIsLoading(true);
    router.push(`/?site=${site}`);
  };

  const sites = [
    {
      id: 'info',
      name: 'Éducation aux Médias',
      description: 'Comprendre et naviguer dans l\'écosystème de l\'information',
      icon: '📰',
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-white'
    },
    {
      id: 'pasteur',
      name: 'Exposition Pasteur',
      description: 'Engagement citoyen autour de l\'évolution et de la science',
      icon: '🌱',
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white'
    },
    {
      id: 'gha',
      name: 'Global Health Awareness',
      description: 'Comprendre les enjeux de santé publique mondiale et les défis sanitaires contemporains',
      icon: '🏥',
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Personas Demo
          </h1>
          <p className="text-gray-600">
            Choisissez un thème pour explorer les personas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sites.map((site) => (
            <button
              key={site.id}
              onClick={() => handleSiteSelect(site.id)}
              disabled={isLoading}
              className={`p-6 rounded-lg transition-all duration-200 ${site.color} ${site.textColor} ${
                currentSite === site.id ? 'ring-4 ring-blue-300' : ''
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
            >
              <div className="text-4xl mb-4">{site.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{site.name}</h2>
              <p className="text-sm opacity-90">{site.description}</p>
              {isLoading && (
                <div className="mt-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        {currentSite && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              Thème actuel : <strong>{sites.find(s => s.id === currentSite)?.name}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
