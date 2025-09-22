import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import projectData from '../data/project.json';
import supportData from '../data/support.json';

interface SupportOption {
  name: string;
  amount?: string;
  description?: string;
  commitment?: string;
  capacity?: string;
  duration?: string;
  visibility?: string;
  engagement?: string;
  benefits?: string[];
}

interface SupportType {
  type: string;
  title: string;
  description: string;
  options: SupportOption[];
}

interface SupportProps {
  projectData: typeof projectData;
  supportData: typeof supportData;
}

export default function Support({ projectData, supportData }: SupportProps) {
  return (
    <Layout projectData={projectData}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {supportData.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-4xl mx-auto">
              {supportData.description}
            </p>
          </div>
        </div>
      </section>

      {/* Support Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {supportData.waysToSupport.map((supportType, index) => (
              <div key={supportType.type} id={supportType.type}>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{supportType.title}</h2>
                  <p className="text-lg text-gray-700 max-w-3xl mx-auto">{supportType.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {supportType.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="card hover:shadow-xl transition-shadow duration-300">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.name}</h3>
                          {'amount' in option && option.amount && (
                            <p className="text-lg font-bold text-primary-600">{option.amount}</p>
                          )}
                        </div>

                        {'description' in option && option.description && (
                          <p className="text-gray-700">{option.description}</p>
                        )}

                        {'commitment' in option && option.commitment && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Engagement:</h4>
                            <p className="text-sm text-gray-600">{option.commitment}</p>
                          </div>
                        )}

                        {'capacity' in option && option.capacity && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Capacité:</h4>
                            <p className="text-sm text-gray-600">{option.capacity}</p>
                          </div>
                        )}

                        {'duration' in option && option.duration && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Durée:</h4>
                            <p className="text-sm text-gray-600">{option.duration}</p>
                          </div>
                        )}

                        {'visibility' in option && option.visibility && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Visibilité:</h4>
                            <p className="text-sm text-gray-600">{option.visibility}</p>
                          </div>
                        )}

                        {'engagement' in option && option.engagement && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Engagement:</h4>
                            <p className="text-sm text-gray-600">{option.engagement}</p>
                          </div>
                        )}

                        {'benefits' in option && option.benefits && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Avantages:</h4>
                            <ul className="space-y-1">
                              {option.benefits.map((benefit, benefitIndex) => (
                                <li key={benefitIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Support Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Pourquoi Nous Soutenir ?
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Votre soutien contribue à créer un monde plus éclairé et mieux informé
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Impact Direct</h3>
              <p className="text-gray-700">
                Votre contribution finance directement les expériences et outils pédagogiques
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-700">
                Participez à un projet pionnier dans l'éducation aux médias
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Communauté</h3>
              <p className="text-gray-700">
                Rejoignez un réseau d'acteurs engagés pour l'éducation
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Visibilité</h3>
              <p className="text-gray-700">
                Bénéficiez d'une exposition sur nos supports de communication
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Témoignages
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Découvrez pourquoi nos partenaires nous font confiance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Jean Dupont</h4>
                  <p className="text-sm text-gray-600">Directeur, Le Monde</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Un projet essentiel pour former les citoyens de demain à l'esprit critique et à la vérification de l'information."
              </p>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-secondary-600 font-bold">SM</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sophie Martin</h4>
                  <p className="text-sm text-gray-600">Enseignante, Collège Victor Hugo</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Enfin un musée qui comprend les besoins des enseignants et propose des outils adaptés à nos élèves."
              </p>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">PL</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Pierre Leroy</h4>
                  <p className="text-sm text-gray-600">Président, Association MediaCitoyen</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Une initiative qui répond parfaitement aux enjeux de notre époque et aux besoins de notre association."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Contactez-Nous
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Une question ? Un projet de partenariat ? Nous sommes là pour vous accompagner
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="card text-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {supportData.contact.person}
                  </h3>
                  <p className="text-gray-600">Responsable Partenariats</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    <a 
                      href={`mailto:${supportData.contact.email}`}
                      className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                    >
                      <span className="text-xl">📧</span>
                      <span>{supportData.contact.email}</span>
                    </a>
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <a 
                      href={`tel:${supportData.contact.phone}`}
                      className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                    >
                      <span className="text-xl">📞</span>
                      <span>{supportData.contact.phone}</span>
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Nous vous répondrons dans les 48h pour discuter de votre projet
                  </p>
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
            Prêt à Nous Rejoindre ?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-3xl mx-auto">
            Chaque contribution, quelle que soit sa forme, nous rapproche de notre objectif
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`mailto:${supportData.contact.email}`}
              className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
            >
              Nous Contacter
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
      supportData,
    },
  };
};
