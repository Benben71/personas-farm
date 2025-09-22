// Core personas package exports
export * from './types';
export * from './lib/generator';
export * from './lib/section-registry';
export * from './lib/export-engines';

// Re-export schema
export { default as personaSchema } from '../schema/persona.schema.json';

// Core utilities
export class PersonasCore {
  private generator: any;
  private sectionRegistry: any;
  private exportEngines: any;

  constructor() {
    this.generator = null; // Will be initialized with schema
    this.sectionRegistry = null;
    this.exportEngines = null;
  }

  /**
   * Initialize the core with schema and configuration
   */
  async initialize(schema: any, config?: any) {
    // Initialize components
    this.generator = new (await import('./lib/generator')).PersonaGenerator(schema);
    this.sectionRegistry = new (await import('./lib/section-registry')).DefaultSectionRegistry();
    this.exportEngines = await import('./lib/export-engines');
    
    return this;
  }

  /**
   * Get the persona generator
   */
  getGenerator() {
    return this.generator;
  }

  /**
   * Get the section registry
   */
  getSectionRegistry() {
    return this.sectionRegistry;
  }

  /**
   * Get export engines
   */
  getExportEngines() {
    return this.exportEngines;
  }
}

// Default instance
export const personasCore = new PersonasCore();

