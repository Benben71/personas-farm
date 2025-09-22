import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import projectData from '../data/project.json';
// TODO: Ideally, we would use a shared data module to avoid duplication,
// but for now, we're importing directly from the local file
import pasteurPersonasData from '../data/personas.json';
import { buildAssetPath } from '../lib/asset-path';

interface Persona {
  id: string;
  identite_profil: {
    age: number;
    statut: string;
    situation: string;
    segments: string[];
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
  image: string;
}

interface HomeProps {
  projectData: typeof projectData;
  personas: Persona[];
}

export default function Home({ projectData, personas }: HomeProps) {
  return (
    <Layout projectData={projectData}>
      <main className="container mx-auto flex-grow px-4 py-12 sm:px-6 lg:px-8">
        {/* Unified Personas Section */}
        <section className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight text-secondary-950 sm:text-5xl">
              Découvrez nos Personas
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-secondary-600">
              Cliquez sur un nom pour découvrir l'histoire derrière chaque persona.
            </p>
          </div>
          
          {/* Personas Grid */}
          <div className="mb-16">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {personas.map((persona) => (
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
                                <div class="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
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
                          persona.identite_profil.segments.includes('professionnel') 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {persona.identite_profil.segments.includes('professionnel') ? 'Profil pro' : 'Profil public'}
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
  // Add image field to all personas and respect the deployment base path
  const personasWithImages = pasteurPersonasData.map((persona) => ({
    ...persona,
    image: buildAssetPath(`/personas/${persona.id}.png`),
  }));

  return {
    props: {
      projectData,
      personas: personasWithImages,
    },
  };
};
