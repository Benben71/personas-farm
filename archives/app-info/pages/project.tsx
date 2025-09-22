import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import projectData from '../data/project.json';

interface ProjectProps {
  projectData: typeof projectData;
}

export default function Project({ projectData }: ProjectProps) {
  return (
    <Layout projectData={projectData}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Le Projet
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-4xl mx-auto">
              Un musée innovant dédié à l'éducation aux médias et à la compréhension de l'écosystème de l'information
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {projectData.mission}
              </p>
              <div className="bg-primary-50 p-6 rounded-lg border-l-4 border-primary-500">
                <p className="text-gray-700 italic">
                  "Créer un espace où chaque visiteur peut comprendre et s'approprier les enjeux de l'information dans notre société numérique."
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Mission Centrée</h3>
                  <p className="text-gray-600">Sur l'éducation et l'engagement citoyen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-secondary-100 to-primary-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔮</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Vision d'Avenir</h3>
                  <p className="text-gray-600">Un monde éclairé par l'information</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {projectData.vision}
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Développement de l'esprit critique</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Maîtrise des outils numériques</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Engagement citoyen responsable</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exhibition Concept */}
      <section id="exhibition" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Concept d'Exposition</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              {projectData.exhibitionConcept.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectData.exhibitionConcept.zones.map((zone, index) => (
              <div key={index} className="card hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{zone.name}</h3>
                    <p className="text-gray-700 leading-relaxed">{zone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Goals */}
      <section id="goals" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Objectifs Pédagogiques</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Notre approche éducative vise à développer des compétences essentielles pour naviguer dans l'écosystème de l'information
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectData.educationalGoals.goals.map((goal, index) => (
              <div key={index} className="card text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{goal}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eco-responsibility */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Éco-responsabilité</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {projectData.ecoResponsibility.description}
              </p>
              <div className="space-y-4">
                {projectData.ecoResponsibility.initiatives.map((initiative, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">{initiative}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌱</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Développement Durable</h3>
                  <p className="text-gray-600">Un engagement environnemental fort</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Rejoignez Notre Mission
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-3xl mx-auto">
            Participez à la création d'un musée innovant qui transformera notre rapport à l'information
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/support" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Nous Soutenir
            </a>
            <a href="/timeline" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
              Suivre le Projet
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
    },
  };
};
