import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import projectData from '../data/project.json';
import { Persona, getPersonas } from '../src/lib/personas';
// TODO: Ideally, we would use a shared data module to avoid duplication,
// but for now, we're importing directly from app-pasteur
import pasteurPersonasData from '../../app-pasteur/data/personas.json';


interface HomeProps {
  projectData: typeof projectData;
  personas: Persona[];
}

export default function Home({ projectData, personas }: HomeProps) {
  const router = useRouter();
  const [currentPersonas, setCurrentPersonas] = useState(personas);
  const [currentTheme, setCurrentTheme] = useState('info');

  useEffect(() => {
    const site = router.query.site as string;
    if (site === 'pasteur') {
      // Switch to Pasteur theme
      setCurrentTheme('pasteur');
      const pasteurPersonas = pasteurPersonasData.map((persona: any) => ({
        ...persona,
        image: `/personas/${persona.id}.png` // Adjust image path
      }));
      setCurrentPersonas(pasteurPersonas);
    } else {
      // Default to info theme
      setCurrentTheme('info');
      setCurrentPersonas(personas);
    }
  }, [router.query.site, personas]);

  return (
    <Layout projectData={projectData}>
      <main className="container mx-auto flex-grow px-4 py-12 sm:px-6 lg:px-8">
        {/* Unified Personas Section */}
        <section className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight text-secondary-950 sm:text-5xl">
              Découvrez nos Personas {currentTheme === 'pasteur' ? '- Thème Pasteur' : '- Thème Info'}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-secondary-600">
              Cliquez sur un nom pour découvrir l'histoire derrière chaque persona.
            </p>
            {currentTheme === 'pasteur' && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800">
                  🧬 Vous visualisez actuellement le thème Pasteur (Sciences et Recherche)
                </p>
              </div>
            )}
          </div>
          
          {/* Personas Grid */}
          <div className="mb-16">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentPersonas.map((persona) => (
                <Link key={persona.id} href={`/persona/${persona.id}`} className="group">
                  <div className="card p-0 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                    {/* 3:2 Image on top */}
                    <div className="relative w-full">
                      <div className="aspect-[3/2] w-full relative">
                        <Image
                          src={persona.image}
                          alt={`Photo de profil de ${persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `
                                <div class="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                                  <span class="text-white font-bold text-4xl">${persona.id.charAt(0).toUpperCase()}</span>
                                </div>
                              `;
                            }
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Info below */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-secondary-800 mb-2">{persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}</h3>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm font-semibold">
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
                      <p className="text-secondary-600 leading-relaxed">{persona.identite_profil.statut}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Methodology */}
          <div className="card p-8">
            <h3 className="h2 text-neutral-900 mb-6 text-center">Méthodologie</h3>
            <div className="prose max-w-none text-neutral-700 leading-relaxed">
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
        </section>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      projectData,
      personas: getPersonas(),
    },
  };
};
