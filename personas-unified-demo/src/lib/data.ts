import { infoTheme } from '@/themes/info-theme';
import { pasteurTheme } from '@/themes/pasteur-theme';
import { ghaTheme } from '@/themes/gha-theme';
import { Persona, Theme } from '@/types';
// TODO: Ideally, we would use a shared data module to avoid duplication,
// but Next.js has issues with dynamic imports during build time.
// For now, we're using local JSON files, but in the future, we should
// consider implementing a better solution to avoid data duplication.
import infoPersonasData from '@/data/info-personas.json';
import pasteurPersonasData from '@/data/pasteur-personas.json';
import ghaPersonasData from '@/data/gha-personas.json';

const themes: Record<string, Theme> = {
  info: infoTheme,
  pasteur: pasteurTheme,
  gha: ghaTheme
};

const personasData: Record<string, any[]> = {
  info: infoPersonasData,
  pasteur: pasteurPersonasData,
  gha: ghaPersonasData
};

export function getTheme(site: string): Theme {
  // Normalize site to lowercase for case-insensitive matching
  const normalizedSite = (site || '').toLowerCase();
  console.log('Getting theme for site:', normalizedSite);
  
  const theme = themes[normalizedSite];
  if (!theme) {
    console.error(`Theme not found for site: ${normalizedSite}, defaulting to info`);
    return themes['info']; // Default to info theme if not found
  }
  return theme;
}

export function getPersonas(site: string): Persona[] {
  // Normalize site to lowercase for case-insensitive matching
  const normalizedSite = (site || '').toLowerCase();
  console.log('Getting personas for site:', normalizedSite);
  
  const personas = personasData[normalizedSite];
  if (!personas) {
    console.error(`Personas not found for site: ${normalizedSite}, defaulting to info`);
    return getPersonas('info'); // Default to info personas if not found
  }

  // Add image field to all personas
  return personas.map(persona => ({
    ...persona,
    image: `/${normalizedSite}-personas/${persona.id}.png`
  })) as Persona[];
}

export function getPersona(site: string, personaId: string): Persona | null {
  // Normalize site to lowercase for case-insensitive matching
  const normalizedSite = (site || '').toLowerCase();
  console.log('Getting persona for site:', normalizedSite, 'personaId:', personaId);
  
  const personas = getPersonas(normalizedSite);
  return personas.find(persona => persona.id === personaId) || null;
}

export function getValidSites(): string[] {
  return Object.keys(themes);
}
