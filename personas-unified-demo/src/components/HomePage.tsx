'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HomePageProps } from '@/types';
import TalkWithPersonaButton from './TalkWithPersonaButton';
import Header from './Header';

function PersonaCard({ persona, site }: { persona: any; site: string }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link href={`/persona/${persona.id}?site=${site}`} className="group" prefetch={false}>
        {/* 3:2 Image on top */}
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
                <span className="text-white font-bold text-4xl">
                  {persona.id.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Info below */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}
        </h3>
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
            {persona.identite_profil.age} ans
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            persona.identite_profil.segments.includes('pro')
              ? 'bg-blue-100 text-blue-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {persona.identite_profil.segments.includes('pro') ? 'Profil pro' : 'Profil public'}
          </span>
        </div>
        <p className="text-gray-600 leading-relaxed">{persona.identite_profil.statut}</p>
        <div className="mt-4">
          <TalkWithPersonaButton persona={persona} variant="card" site={site} />
        </div>
      </div>
    </div>
  );
}

export default function HomePage({ site, theme, personas }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Navigation */}
      <Header site={site} personas={personas} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Découvrez nos Personas
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Cliquez sur un nom pour découvrir l'histoire derrière chaque persona.
          </p>
        </div>
        
        {/* Personas Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {personas.map((persona) => (
            <PersonaCard key={persona.id} persona={persona} site={site} />
          ))}
        </div>

        {/* Methodology */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Méthodologie</h3>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4">
              Nous avons adopté une méthode hybride croisant le design UX (Cooper, Goodwin, NN/g), l'UNESCO MIL Framework (accéder, évaluer, créer, participer) et les données sociologiques françaises (Médiamétrie, Arcom, DEPS, INJEP, Verian).
            </p>
            <p className="mb-4">
              Chaque persona est défini selon un canevas structuré : identité, système de croyances, usages, besoins et motivations, points de douleur, enjeux de communication, services pertinents et rôle stratégique.
            </p>
            <p>
              Cette approche garantit des personas à la fois ancrés dans des pratiques réelles, alignés sur les objectifs du projet et opérationnels pour la communication et l'offre en ligne.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
