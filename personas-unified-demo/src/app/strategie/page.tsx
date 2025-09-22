import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { getTheme, getPersonas } from '@/lib/data';

interface StrategiePageProps {
  searchParams: Promise<{ site?: string }>;
}

export default async function StrategiePage({ searchParams }: StrategiePageProps) {
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
              Stratégie numérique
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              Notre approche stratégique pour {theme.name.toLowerCase()} dans l'ère numérique.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Stratégie de contenu
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Notre stratégie de contenu est adaptée aux besoins spécifiques de chaque persona,
                  garantissant une expérience personnalisée et engageante.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Contenus adaptés par segment de public</li>
                  <li>Formats multi-canal optimisés</li>
                  <li>Messages personnalisés selon les personas</li>
                  <li>Approche data-driven</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Canaux de diffusion
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Nous utilisons une approche multi-canal pour toucher nos publics là où ils se trouvent,
                  avec des messages adaptés à chaque plateforme.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Réseaux sociaux ciblés</li>
                  <li>Site web optimisé</li>
                  <li>Email marketing personnalisé</li>
                  <li>Partenariats stratégiques</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Mesure et optimisation
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Notre approche se base sur des données concrètes et des métriques claires pour
                  mesurer l'efficacité de nos stratégies et les optimiser continuellement.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">KPI</div>
                    <p className="text-sm text-gray-600">Indicateurs de performance clés</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">A/B</div>
                    <p className="text-sm text-gray-600">Tests d'optimisation</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">ROI</div>
                    <p className="text-sm text-gray-600">Retour sur investissement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error loading strategie page:', error);
    notFound();
  }
}