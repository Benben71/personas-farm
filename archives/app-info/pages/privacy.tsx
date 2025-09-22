import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import projectData from '../data/project.json';

interface PrivacyProps {
  projectData: typeof projectData;
}

export default function Privacy({ projectData }: PrivacyProps) {
  return (
    <Layout projectData={projectData}>
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-secondary-950 mb-8">
            Politique de Confidentialité
          </h1>

          <div className="bg-white rounded-lg border border-secondary-200 p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-secondary-950 mb-4">
                Collecte et Utilisation des Données
              </h2>
              <p className="text-secondary-700 leading-relaxed">
                Ce site utilise un système de commentaires participatif qui stocke vos contributions 
                dans un dépôt Git public. Les données collectées incluent uniquement votre prénom 
                et votre message, ainsi que des métadonnées techniques (date de création, navigateur utilisé).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-secondary-950 mb-4">
                Finalité du Traitement
              </h2>
              <p className="text-secondary-700 leading-relaxed">
                Vos commentaires sont utilisés dans le cadre d'un projet participatif visant à 
                améliorer la compréhension des personas et des besoins utilisateurs. Ils contribuent 
                à l'enrichissement collectif de la connaissance et à l'amélioration des services proposés.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-secondary-950 mb-4">
                Stockage et Sécurité
              </h2>
              <p className="text-secondary-700 leading-relaxed">
                Les commentaires sont stockés sous forme de fichiers JSON dans un dépôt Git public. 
                Bien que ce système soit transparent et auditable, veuillez noter que vos contributions 
                seront visibles publiquement. Nous recommandons de ne pas partager d'informations 
                personnelles sensibles dans vos commentaires.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-secondary-950 mb-4">
                Durée de Conservation
              </h2>
              <p className="text-secondary-700 leading-relaxed">
                Les commentaires sont conservés indéfiniment dans le dépôt Git, permettant leur 
                consultation et leur utilisation dans le cadre du projet. Cette conservation 
                permanente fait partie intégrante du système participatif mis en place.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-secondary-950 mb-4">
                Vos Droits
              </h2>
              <p className="text-secondary-700 leading-relaxed mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-secondary-700 space-y-2">
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la portabilité</li>
                <li>Droit d'opposition</li>
              </ul>
              <p className="text-secondary-700 leading-relaxed mt-4">
                Pour exercer ces droits ou pour toute question concernant vos données, 
                contactez-nous à l'adresse : <strong>contact@personas-project.org</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-secondary-950 mb-4">
                Contact
              </h2>
              <p className="text-secondary-700 leading-relaxed">
                Pour toute question relative à cette politique de confidentialité ou pour 
                demander la suppression de vos commentaires, vous pouvez nous contacter à :
              </p>
              <div className="bg-secondary-50 p-4 rounded-lg mt-4">
                <p className="text-secondary-700">
                  <strong>Email :</strong> contact@personas-project.org<br />
                  <strong>Objet :</strong> Demande relative aux données personnelles
                </p>
              </div>
            </section>

            <div className="border-t pt-6">
              <p className="text-sm text-secondary-500">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
        </div>
      </main>
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
