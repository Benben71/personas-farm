import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import TalkWithPersonaButton from '../../components/TalkWithPersonaButton';
import projectData from '../../data/project.json';
// TODO: Ideally, we would use a shared data module to avoid duplication,
// but for now, we're importing directly from the local file
import pasteurPersonasData from '../../data/personas.json';
import Image from 'next/image';
import { buildAssetPath } from '../../lib/asset-path';

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

interface PersonaPageProps {
  projectData: typeof projectData;
  persona: Persona;
}

export default function PersonaPage({ projectData, persona }: PersonaPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout projectData={projectData}>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content - Left side (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Large 3:2 Image Section */}
            <div className="card p-0 overflow-hidden">
              <div className="relative w-full">
                <div className="aspect-[3/2] w-full relative">
                  <Image
                    src={persona.image}
                    alt={`Photo de profil de ${persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                            <span class="text-white font-bold text-6xl">${persona.id.charAt(0).toUpperCase()}</span>
                          </div>
                        `;
                      }
                    }}
                  />
                  
                  {/* Text Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h1 className="text-white text-4xl font-bold mb-2 drop-shadow-lg">
                        {persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}
                      </h1>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {persona.identite_profil.age} ans
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          persona.identite_profil.segments.includes('professionnel') 
                            ? 'bg-blue-500/80 text-white' 
                            : 'bg-green-500/80 text-white'
                        }`}>
                          {persona.identite_profil.segments.includes('professionnel') ? 'Profil pro' : 'Profil public'}
                        </span>
                        <span className="text-white/90 text-lg font-medium">
                          {persona.identite_profil.statut}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Section */}
            <div className="card p-8">
              <h1 className="text-4xl font-extrabold italic text-center text-neutral-900 leading-tight">
                "{persona.identite_profil.situation}"
              </h1>
            </div>

            {/* Science Relationship */}
            <div className="card p-8">
              <h2 className="h2 text-neutral-900 mb-6">Rapport à la science et à l'évolution</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Littératie scientifique</h3>
                  <p className="text-base text-neutral-700 leading-relaxed">{persona.rapport_science.litteratie_scientifique}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Perception de l'évolution</h3>
                  <p className="text-base text-neutral-700 leading-relaxed">{persona.rapport_science.perception_evolution}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Confiance aux institutions</h3>
                  <p className="text-base text-neutral-700 leading-relaxed">{persona.rapport_science.confiance_institutions}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Valeurs</h3>
                  <div className="flex flex-wrap gap-2">
                    {persona.valeurs.map((value, index) => (
                      <span key={index} className="chip">{value}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Biology Knowledge */}
            <div className="card p-8">
              <h2 className="h2 text-neutral-900 mb-6">Connaissances en biologie</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Niveau de base</h3>
                  <p className="text-base text-neutral-700 leading-relaxed">{persona.connaissances_biologie.niveau_base}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Concepts clés</h3>
                  <div className="flex flex-wrap gap-2">
                    {persona.connaissances_biologie.concepts_cles.map((concept, index) => (
                      <span key={index} className="chip bg-brand-50 text-brand-700 border-brand-200">{concept}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Misconceptions</h3>
                  <p className="text-base text-neutral-700 leading-relaxed">{persona.connaissances_biologie.misconceptions}</p>
                </div>
              </div>
            </div>

            {/* Goals, obstacles, motivations */}
            <div className="card p-8">
              <h2 className="h2 text-neutral-900 mb-6">Pourquoi il/elle s'intéresse à la science, obstacles et motivations</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">À quoi sert la science pour lui/elle</h3>
                  <ul className="space-y-2">
                    {persona.besoins_freins_jtbd.jobs.map((job, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-primary-500 flex-shrink-0"></div>
                        <span className="text-base text-neutral-700">{job}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Obstacles rencontrés</h3>
                  <ul className="space-y-2">
                    {persona.besoins_freins_jtbd.freins.map((frein, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></div>
                        <span className="text-base text-neutral-700">{frein}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Ce qui le/la pousse à s'intéresser à la science</h3>
                  <ul className="space-y-2">
                    {persona.motivations.map((motivation, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-primary-500 flex-shrink-0"></div>
                        <span className="text-base text-neutral-700">{motivation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Communication */}
            <div className="card p-8">
              <h2 className="h2 text-neutral-900 mb-6">Comment lui parler & formats adaptés</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Tonalité recommandée</h3>
                  <p className="text-base text-neutral-700 leading-relaxed mb-3">{persona.tonalite_et_eviter.ton}</p>
                  <h4 className="text-md font-medium text-neutral-800 mb-2">Pièges à éviter</h4>
                  <ul className="space-y-1">
                    {persona.tonalite_et_eviter.a_eviter.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-500">×</span>
                        <span className="text-sm text-neutral-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">Formats accessibles</h3>
                  <p className="text-base text-neutral-700 leading-relaxed mb-3">Niveau de langage: {persona.accessibilite_inclusion.langage}</p>
                  <h4 className="text-md font-medium text-neutral-800 mb-2">Formats recommandés</h4>
                  <div className="flex flex-wrap gap-2">
                    {persona.accessibilite_inclusion.formats.map((format, index) => (
                      <span key={index} className="chip bg-green-50 text-green-700 border-green-200">{format}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right side (1/3) */}
          <aside className="space-y-6">
            {/* Talk with Persona Feature */}
            <TalkWithPersonaButton persona={persona} variant="page" />

            {/* Strategic Conclusion */}
            {persona.conclusion && (
              <section className="card p-6 bg-gradient-to-br from-neutral-50 to-neutral-100">
                <h2 className="h2 text-neutral-900 mb-4">Enjeu stratégique</h2>
                <p className="text-base text-neutral-700 leading-relaxed font-medium">
                  {persona.conclusion}
                </p>
              </section>
            )}
          </aside>
        </div>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = pasteurPersonasData.map((persona) => ({
    params: { id: persona.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const persona = pasteurPersonasData.find((p) => p.id === params?.id);

  if (!persona) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      projectData,
      persona: {
        ...persona,
        image: buildAssetPath(`/personas/${persona.id}.png`),
      },
    },
  };
};
