import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import projectData from '../data/project.json';

interface StrategieProps {
  projectData: typeof projectData;
}

export default function Strategie({ projectData }: StrategieProps) {
  return (
    <Layout projectData={projectData}>
      <main className="flex-1 px-10 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-secondary-950 mb-6">
              Stratégie Numérique
            </h1>
          </div>
          {/* Blocks removed as requested */}
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
