import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { getTheme, getPersonas } from '@/lib/data';

interface VisionPageProps {
  searchParams: Promise<{ site?: string }>;
}

export default async function VisionPage({ searchParams }: VisionPageProps) {
  const resolvedSearchParams = await searchParams;
  const site = resolvedSearchParams.site;

  // Vérifier que le site est spécifié et valide
  if (!site || !['info', 'pasteur'].includes(site)) {
    notFound();
  }

  try {
    const theme = getTheme(site);
    const personas = getPersonas(site);

    return (
      <div className="min-h-screen bg-gray-50">
        <Header site={site} personas={personas} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Vision globale
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              Découvrez notre vision stratégique pour {theme.name.toLowerCase()}.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Notre approche
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Notre vision pour {theme.name} repose sur une compréhension approfondie des besoins et des comportements de nos publics cibles.
                À travers nos personas, nous développons des stratégies adaptées et personnalisées.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Objectifs stratégiques
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Améliorer l'engagement des publics cibles</li>
                <li>Personnaliser l'expérience utilisateur</li>
                <li>Optimiser les canaux de communication</li>
                <li>Développer des contenus adaptés</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Méthodologie
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Nos personas sont construits à partir de données réelles et d'analyses comportementales approfondies.
                Ils nous permettent de prendre des décisions éclairées et d'adapter nos stratégies aux besoins spécifiques de chaque segment de public.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error loading vision page:', error);
    notFound();
  }
}