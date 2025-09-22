import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import projectData from '../data/project.json';

interface VisionProps {
  projectData: typeof projectData;
}

export default function Vision({ projectData }: VisionProps) {
  return (
    <Layout projectData={projectData}>
      <main className="flex-1 px-10 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-secondary-950 mb-6">
              Vision Globale
            </h1>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              Notre vision pour l'avenir de l'éducation aux médias et à l'information
            </p>
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
