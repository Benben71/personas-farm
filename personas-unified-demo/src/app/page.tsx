import SiteSelector from '@/components/SiteSelector';
import HomePage from '@/components/HomePage';
import { getTheme, getPersonas } from '@/lib/data';

interface PageProps {
  searchParams: Promise<{ site?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  let site = resolvedParams.site;

  // Get site and normalize to lowercase
  if (site) {
    site = site.toLowerCase();
  }

  // Si pas de site spécifié, utiliser 'info' par défaut
  if (!site) {
    const theme = getTheme('info');
    const personas = getPersonas('info');
    return <HomePage site="info" theme={theme} personas={personas} />;
  }

  // Vérifier que le site est valide (case-insensitive)
  if (!['info', 'pasteur', 'gha'].includes(site as string)) {
    // Rediriger vers 'info' si site invalide
    const theme = getTheme('info');
    const personas = getPersonas('info');
    return <HomePage site="info" theme={theme} personas={personas} />;
  }

  try {
    const theme = getTheme(site);
    const personas = getPersonas(site);
    return <HomePage site={site} theme={theme} personas={personas} />;
  } catch (error) {
    console.error('Error loading site data:', error);
    return <SiteSelector currentSite="error" />;
  }
}