import { Persona, PersonaGeneratorInput, PersonaGeneratorOutput } from '../types';

export class PersonaGenerator {
  private schema: any;

  constructor(schema: any) {
    this.schema = schema;
  }

  /**
   * Generate a persona from input context, goals, barriers, and evidence
   */
  async generate(input: PersonaGeneratorInput): Promise<PersonaGeneratorOutput> {
    // Core persona generation logic
    const persona = this.buildPersonaFromInput(input);
    const confidence = this.calculateConfidence(input, persona);
    const reasoning = this.generateReasoning(input, persona);

    return {
      persona,
      confidence,
      reasoning
    };
  }

  /**
   * Build persona structure from input data
   */
  private buildPersonaFromInput(input: PersonaGeneratorInput): Persona {
    // Extract key insights from evidence
    const evidenceInsights = this.extractEvidenceInsights(input.evidence);
    
    // Build persona based on context and goals
    const persona: Persona = {
      id: this.generatePersonaId(input.context),
      identite_profil: {
        age: this.inferAge(input.context, input.evidence),
        statut: this.inferStatus(input.context, input.goals),
        situation: this.inferSituation(input.context, input.barriers),
        segments: this.inferSegments(input.context, input.evidence)
      },
      valeurs: this.inferValues(input.goals, input.evidence),
      besoins_freins_jtbd: {
        jobs: input.goals,
        freins: input.barriers
      },
      motivations: this.inferMotivations(input.goals, input.evidence),
      tonalite_et_eviter: {
        ton: this.inferTone(input.context, input.evidence),
        a_eviter: this.inferAvoidances(input.barriers, input.evidence)
      },
      accessibilite_inclusion: {
        langage: this.inferLanguage(input.context, input.evidence),
        formats: this.inferFormats(input.context, input.evidence)
      },
      conclusion: this.generateConclusion(input, evidenceInsights)
    };

    return persona;
  }

  /**
   * Extract insights from evidence data
   */
  private extractEvidenceInsights(evidence: PersonaGeneratorInput['evidence']) {
    return {
      demographics: this.analyzeDemographics(evidence),
      behaviors: this.analyzeBehaviors(evidence),
      preferences: this.analyzePreferences(evidence),
      painPoints: this.analyzePainPoints(evidence)
    };
  }

  /**
   * Calculate confidence score based on input quality
   */
  private calculateConfidence(input: PersonaGeneratorInput, persona: Persona): number {
    let score = 0;
    
    // Evidence quality (0-40 points)
    const evidenceScore = Math.min(40, input.evidence.length * 10);
    score += evidenceScore;
    
    // Context completeness (0-30 points)
    const contextScore = input.context.length > 100 ? 30 : input.context.length / 100 * 30;
    score += contextScore;
    
    // Goals clarity (0-20 points)
    const goalsScore = input.goals.length > 0 ? 20 : 0;
    score += goalsScore;
    
    // Barriers identification (0-10 points)
    const barriersScore = input.barriers.length > 0 ? 10 : 0;
    score += barriersScore;
    
    return Math.min(100, score);
  }

  /**
   * Generate reasoning for the persona generation
   */
  private generateReasoning(input: PersonaGeneratorInput, persona: Persona): string {
    const evidenceCount = input.evidence.length;
    const confidence = this.calculateConfidence(input, persona);
    
    return `Generated persona based on ${evidenceCount} evidence sources with ${confidence}% confidence. ` +
           `Context: ${input.context.substring(0, 100)}... ` +
           `Key goals: ${input.goals.join(', ')}. ` +
           `Main barriers: ${input.barriers.join(', ')}.`;
  }

  // Helper methods for persona inference
  private generatePersonaId(context: string): string {
    const words = context.toLowerCase().split(' ').slice(0, 3);
    return words.join('-').replace(/[^a-z-]/g, '');
  }

  private inferAge(context: string, evidence: PersonaGeneratorInput['evidence']): number {
    // Simple age inference logic - can be enhanced with ML
    const ageKeywords = {
      'teen': 16, 'adolescent': 16, 'student': 20, 'young': 25,
      'adult': 35, 'professional': 40, 'senior': 65, 'elderly': 75
    };
    
    const contextLower = context.toLowerCase();
    for (const [keyword, age] of Object.entries(ageKeywords)) {
      if (contextLower.includes(keyword)) {
        return age;
      }
    }
    
    return 30; // Default age
  }

  private inferStatus(context: string, goals: string[]): string {
    const statusKeywords = {
      'student': 'Étudiant(e)',
      'professional': 'Professionnel(le)',
      'teacher': 'Enseignant(e)',
      'parent': 'Parent',
      'senior': 'Retraité(e)'
    };
    
    const contextLower = context.toLowerCase();
    for (const [keyword, status] of Object.entries(statusKeywords)) {
      if (contextLower.includes(keyword)) {
        return status;
      }
    }
    
    return 'Citoyen(ne)';
  }

  private inferSituation(context: string, barriers: string[]): string {
    return `Contexte: ${context.substring(0, 50)}...`;
  }

  private inferSegments(context: string, evidence: PersonaGeneratorInput['evidence']): string[] {
    const segments = ['public'];
    
    // Add age-based segments
    const age = this.inferAge(context, evidence);
    if (age < 18) segments.push('15-19');
    else if (age < 25) segments.push('20-24');
    else if (age < 35) segments.push('25-34');
    else if (age < 50) segments.push('35-49');
    else segments.push('50+');
    
    return segments;
  }

  private inferValues(goals: string[], evidence: PersonaGeneratorInput['evidence']): string[] {
    const valueMap: Record<string, string[]> = {
      'apprendre': ['Apprentissage', 'Curiosité'],
      'comprendre': ['Compréhension', 'Clarté'],
      'partager': ['Partage', 'Communauté'],
      'créer': ['Créativité', 'Innovation'],
      'aider': ['Bienveillance', 'Solidarité']
    };
    
    const values = new Set<string>();
    goals.forEach(goal => {
      Object.entries(valueMap).forEach(([keyword, valueList]) => {
        if (goal.toLowerCase().includes(keyword)) {
          valueList.forEach(v => values.add(v));
        }
      });
    });
    
    return Array.from(values).length > 0 ? Array.from(values) : ['Authenticité', 'Respect'];
  }

  private inferMotivations(goals: string[], evidence: PersonaGeneratorInput['evidence']): string[] {
    return goals.map(goal => `Atteindre: ${goal}`);
  }

  private inferTone(context: string, evidence: PersonaGeneratorInput['evidence']): string {
    return 'Professionnel et accessible';
  }

  private inferAvoidances(barriers: string[], evidence: PersonaGeneratorInput['evidence']): string[] {
    return barriers.map(barrier => `Éviter: ${barrier}`);
  }

  private inferLanguage(context: string, evidence: PersonaGeneratorInput['evidence']): string {
    return 'Français simple et clair';
  }

  private inferFormats(context: string, evidence: PersonaGeneratorInput['evidence']): string[] {
    return ['Texte', 'Images', 'Vidéos courtes'];
  }

  private generateConclusion(input: PersonaGeneratorInput, insights: any): string {
    return `Persona généré à partir de ${input.evidence.length} sources d'évidence. ` +
           `Contexte: ${input.context.substring(0, 100)}... ` +
           `Objectifs principaux: ${input.goals.join(', ')}.`;
  }

  // Analysis helper methods
  private analyzeDemographics(evidence: PersonaGeneratorInput['evidence']) {
    return { totalSources: evidence.length };
  }

  private analyzeBehaviors(evidence: PersonaGeneratorInput['evidence']) {
    return { patterns: [] };
  }

  private analyzePreferences(evidence: PersonaGeneratorInput['evidence']) {
    return { preferences: [] };
  }

  private analyzePainPoints(evidence: PersonaGeneratorInput['evidence']) {
    return { painPoints: [] };
  }
}

