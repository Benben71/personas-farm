import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import PersonaPage from '@/components/PersonaPage';
import { getTheme, getPersona, getPersonas } from '@/lib/data';

interface PersonaPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ site?: string }>;
}

export default async function Page({ params, searchParams }: PersonaPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const site = resolvedSearchParams.site;
  const personaId = resolvedParams.id;

  // Vérifier que le site est spécifié et valide
  if (!site || !['info', 'pasteur'].includes(site)) {
    notFound();
  }

  try {
    const theme = getTheme(site);
    const persona = getPersona(site, personaId);
    const allPersonas = getPersonas(site);

    if (!persona) {
      notFound();
    }

    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <PersonaPage site={site} theme={theme} persona={persona} allPersonas={allPersonas} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error loading persona:', error);
    notFound();
  }
}
