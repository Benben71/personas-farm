import Link from 'next/link';
import Layout from '../components/Layout';
import projectData from '../data/project.json';

export default function Custom500() {
  return (
    <Layout projectData={projectData}>
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-neutral-900 mb-4">500</h1>
          <h2 className="text-2xl font-semibold text-neutral-700 mb-6">
            Erreur serveur
          </h2>
          <p className="text-neutral-600 mb-8">
            Une erreur interne s'est produite. Veuillez réessayer plus tard.
          </p>
          <Link 
            href="/"
            className="inline-block bg-brand-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-600 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </Layout>
  );
}
