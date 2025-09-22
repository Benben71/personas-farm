import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import Timeline from '../components/Timeline';
import projectData from '../data/project.json';
import timelineData from '../data/timeline.json';

interface TimelineItem {
  id: string;
  year: number;
  month: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
}

interface TimelineProps {
  projectData: typeof projectData;
  timeline: TimelineItem[];
}

export default function TimelinePage({ projectData, timeline }: TimelineProps) {
  const completedItems = timeline.filter(item => item.status === 'completed');
  const inProgressItems = timeline.filter(item => item.status === 'in_progress');
  const pendingItems = timeline.filter(item => item.status === 'pending');

  const stats = [
    { 
      number: completedItems.length, 
      label: 'Étapes Terminées',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    { 
      number: inProgressItems.length, 
      label: 'En Cours',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    { 
      number: pendingItems.length, 
      label: 'À Venir',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    }
  ];

  return (
    <Layout projectData={projectData}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Timeline du Projet
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-4xl mx-auto">
              Suivez l'évolution de notre projet depuis sa conception jusqu'à son ouverture
            </p>
            <p className="text-lg text-primary-200 max-w-3xl mx-auto">
              Découvrez les étapes clés qui jalonnent le développement de notre musée participatif
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-20 h-20 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className={`text-3xl font-bold ${stat.color}`}>
                    {stat.number}
                  </span>
                </div>
                <div className={`font-semibold ${stat.color}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Parcours du Projet
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Chaque étape représente un jalon important dans la construction de notre musée innovant
            </p>
          </div>

          <Timeline items={timeline} />
        </div>
      </section>

      {/* Phases Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Les Grandes Phases
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Notre projet s'articule autour de trois phases principales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phase 1: Conception */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Phase 1: Conception</h3>
              <p className="text-gray-700 mb-4">
                Définition des personas, conception de l'exposition et développement des partenariats
              </p>
              <div className="text-sm text-green-600 font-medium">
                {completedItems.length} étapes terminées
              </div>
            </div>

            {/* Phase 2: Développement */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🔨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Phase 2: Développement</h3>
              <p className="text-gray-700 mb-4">
                Prototypage, tests utilisateurs et finalisation des expériences interactives
              </p>
              <div className="text-sm text-yellow-600 font-medium">
                {inProgressItems.length} étape en cours
              </div>
            </div>

            {/* Phase 3: Ouverture */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Phase 3: Ouverture</h3>
              <p className="text-gray-700 mb-4">
                Inauguration du musée et lancement des programmes éducatifs et numériques
              </p>
              <div className="text-sm text-gray-600 font-medium">
                {pendingItems.length} étapes à venir
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Prochaines Étapes
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Découvrez ce qui nous attend dans les mois à venir
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {inProgressItems.concat(pendingItems.slice(0, 2)).map((item, index) => (
              <div key={item.id} className="card">
                <div className="flex items-start space-x-4">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    item.status === 'in_progress' ? 'bg-yellow-500' : 'bg-gray-300'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        item.status === 'in_progress' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status === 'in_progress' ? 'En cours' : 'À venir'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.month} {item.year}</p>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Suivez Notre Progression
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-3xl mx-auto">
            Restez informé de l'avancement du projet et participez aux étapes importantes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/support" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Nous Soutenir
            </a>
            <a href="/partners" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
              Devenir Partenaire
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      projectData,
      timeline: timelineData,
    },
  };
};
