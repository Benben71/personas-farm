import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../../components/Layout';
import PersonaPageWithComments from '../../components/PersonaPageWithComments';
import projectData from '../../data/project.json';
import { Persona, getAllPersonaSlugs, getPersonaBySlug } from '../../src/lib/personas';


interface PersonaPageProps {
  projectData: typeof projectData;
  persona: Persona;
}

export default function PersonaPage({ projectData, persona }: PersonaPageProps) {
  return (
    <Layout projectData={projectData}>
      <PersonaPageWithComments persona={persona} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllPersonaSlugs().map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const persona = typeof params?.id === 'string' ? getPersonaBySlug(params.id) : null;

  if (!persona) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      projectData,
      persona,
    },
  };
};
