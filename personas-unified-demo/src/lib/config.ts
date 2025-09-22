// Configuration de l'application
export const config = {
  // URLs et routing
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE === 'true',
  
  // Thèmes disponibles
  themes: {
    info: {
      enabled: process.env.NEXT_PUBLIC_THEME_INFO_ENABLED !== 'false',
      name: 'Éducation aux Médias',
      slug: 'info'
    },
    pasteur: {
      enabled: process.env.NEXT_PUBLIC_THEME_PASTEUR_ENABLED !== 'false',
      name: 'Exposition Pasteur',
      slug: 'pasteur'
    }
  },
  
  // Configuration des images
  images: {
    defaultAspectRatio: '3/2',
    fallbackColors: {
      info: 'from-blue-500 to-blue-600',
      pasteur: 'from-green-500 to-green-600'
    }
  },
  
  // Configuration de l'interface
  ui: {
    maxPersonasPerRow: 3,
    defaultPageSize: 12,
    animationDuration: 300
  }
};

// Types pour la configuration
export type Config = typeof config;
export type ThemeConfig = typeof config.themes[keyof typeof config.themes];
