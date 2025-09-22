import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import PersonaCardModern from '../components/PersonaCardModern';
import projectData from '../data/project.json';
import { Persona, getPersonas } from '../src/lib/personas';


interface PersonasProps {
  projectData: typeof projectData;
  personas: Persona[];
}

export default function Personas({ projectData, personas }: PersonasProps) {
  return (
    <Layout projectData={projectData}>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Nos Personas</h1>
          <p className="text-lg text-neutral-600 max-w-3xl">
            Découvrez les profils représentatifs de notre audience cible. 
            Chaque persona a été créé à partir de recherches approfondies et de données comportementales.
          </p>
        </div>
        
        <div className="space-y-8">
          {personas.map((persona, index) => (
            <PersonaCardModern key={persona.id} persona={persona} />
          ))}
        </div>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      projectData,
      personas: getPersonas(),
    },
  };
};
