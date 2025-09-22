import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import PartnerGrid from '../components/PartnerGrid';
import projectData from '../data/project.json';
import partnersData from '../data/partners.json';

interface Partner {
  name: string;
  logo: string;
  type: string;
  description: string;
}

interface PartnerCategory {
  [key: string]: Partner[];
}

interface PartnersProps {
  projectData: typeof projectData;
  partners: PartnerCategory;
}

export default function Partners({ projectData, partners }: PartnersProps) {
  const totalPartners = Object.values(partners).reduce((total, category) => total + category.length, 0);

  const partnershipBenefits = [
    {
      title: 'Visibilité',
      description: 'Exposition de votre marque sur tous nos supports de communication',
      icon: '👁️'
    },
    {
      title: 'Expertise',
      description: 'Accès à notre réseau d\'experts et à nos ressources pédagogiques',
      icon: '🎓'
    },
    {
      title: 'Innovation',
      description: 'Participation à un projet innovant d\'éducation aux médias',
      icon: '💡'
    },
    {
      title: 'Impact',
      description: 'Contribution à la formation des citoyens de demain',
      icon: '🌟'
    }
  ];

  return (
    <Layout projectData={projectData}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nos Partenaires
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-4xl mx-auto">
              Un écosystème de partenaires engagés pour l'éducation aux médias
            </p>
            <p className="text-lg text-primary-200 max-w-3xl mx-auto">
              {totalPartners} organisations nous accompagnent dans cette aventure innovante
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                {partners.media.length}
              </div>
              <div className="text-gray-600 font-medium">Médias</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                {partners.institutions.length}
              </div>
              <div className="text-gray-600 font-medium">Institutions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                {partners.associations.length}
              </div>
              <div className="text-gray-600 font-medium">Associations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                {partners.technologies.length}
              </div>
              <div className="text-gray-600 font-medium">Technologies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PartnerGrid partners={partners} />
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Avantages du Partenariat
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Rejoignez notre réseau de partenaires et bénéficiez d'avantages exclusifs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <div key={index} className="card text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-700">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Types de Partenariats
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Différentes façons de s'engager avec nous selon vos objectifs et ressources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📺</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Partenariat Média</h3>
                  <p className="text-gray-700 mb-4">
                    Collaboration éditoriale, couverture médiatique et création de contenus éducatifs
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Couverture des événements</li>
                    <li>• Co-création de contenus</li>
                    <li>• Accès aux experts</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🏛️</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Partenariat Institutionnel</h3>
                  <p className="text-gray-700 mb-4">
                    Soutien institutionnel, expertise et ressources pour le développement du projet
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Soutien financier</li>
                    <li>• Expertise métier</li>
                    <li>• Accès aux ressources</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🤝</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Partenariat Associatif</h3>
                  <p className="text-gray-700 mb-4">
                    Collaboration avec les associations pour l'éducation et la sensibilisation
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Programmes éducatifs</li>
                    <li>• Formation des bénévoles</li>
                    <li>• Réseau de diffusion</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💻</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Partenariat Technologique</h3>
                  <p className="text-gray-700 mb-4">
                    Solutions technologiques et outils pour les expériences interactives
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Outils de vérification</li>
                    <li>• Plateformes numériques</li>
                    <li>• Formation aux outils</li>
                  </ul>
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
            Rejoignez Notre Réseau
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-3xl mx-auto">
            Devenez partenaire de notre projet innovant et contribuez à l'éducation aux médias
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/support" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Devenir Partenaire
            </a>
            <a href="mailto:partenaires@personas-museum.org" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
              Nous Contacter
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
      partners: partnersData,
    },
  };
};
