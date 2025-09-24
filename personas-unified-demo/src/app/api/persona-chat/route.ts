import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { loadPersonaData, findPersonaById, formatPersonaForPrompt, PersonaData } from '@/lib/persona-data';

// Function to detect if message is in English
function isEnglish(message: string): boolean {
  // Check for French words first to avoid false positives
  const frenchWords = ["qu'est-ce", "concrètement", "mais", "fais", "quoi", "pourquoi", "comment", "où", "quand", "qui", "est-ce", "dans", "avec", "pour", "sur", "sous", "dans", "par", "de", "du", "des", "le", "la", "les", "un", "une", "je", "tu", "il", "elle", "nous", "vous", "ils", "elles"];
  const lowerMessage = message.toLowerCase();
  
  if (frenchWords.some(word => lowerMessage.includes(word))) {
    return false;
  }

  const englishWords = ['what', 'how', 'who', 'where', 'when', 'why', 'is', 'are', 'do', 'does', 'can', 'could', 'will', 'would', 'should', 'job', 'work', 'speak', 'language', 'concretely', 'actually', 'really'];
  return englishWords.some(word => lowerMessage.includes(word));
}

// Function to generate contextual responses based on persona data
function generateContextualResponse(personaId: string, message: string, site: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Load persona data for context
  const personas = loadPersonaData(site);
  const persona = findPersonaById(personas, personaId);
  
  if (!persona) {
    return "Désolé, je ne trouve pas mon profil. Pouvez-vous réessayer ?";
  }

  const age = persona.identite_profil.age;
  const statut = persona.identite_profil.statut;
  const situation = persona.identite_profil.situation;
  const valeurs = persona.valeurs.join(', ');
  const motivations = persona.motivations.join(', ');
  const tonalite = persona.tonalite_et_eviter.ton;
  const canaux = persona.pratiques_et_indicateurs.canaux.join(', ');
  const jobs = persona.besoins_freins_jtbd.jobs.join(', ');
  const pratiques = persona.pratiques_et_indicateurs.pratiques.join(', ');
  
  // Detect language and respond accordingly
  const isUserSpeakingEnglish = isEnglish(message);
  const personaLanguages = persona.language_preferences && persona.language_preferences.length > 0 ? persona.language_preferences : ["fr"];
  
  // Handle detailed job/work questions (follow-up questions)
  if (lowerMessage.includes('concrètement') || lowerMessage.includes('concretely') || lowerMessage.includes('qu\'est-ce que tu fais') || lowerMessage.includes('what do you do') || lowerMessage.includes('dans la pratique') || lowerMessage.includes('en pratique')) {
    if (isUserSpeakingEnglish && personaLanguages.includes('en')) {
      return `Concretely, my main tasks are: ${jobs}. I work on ${pratiques} and use platforms like ${canaux}. I'm motivated by: ${motivations}.`;
    } else {
      return `Concrètement, mes principales tâches sont : ${jobs}. Je travaille sur ${pratiques} et j'utilise des plateformes comme ${canaux}. Je suis motivée par : ${motivations}.`;
    }
  }
  
  // Handle job/work questions
  if (lowerMessage.includes('job') || lowerMessage.includes('work') || lowerMessage.includes('travail') || lowerMessage.includes('métier') || lowerMessage.includes('profession')) {
    if (isUserSpeakingEnglish && personaLanguages.includes('en')) {
      return `I'm a ${statut}. ${situation}. My main motivations are: ${motivations}.`;
    } else {
      return `Je suis ${statut}. ${situation}. Mes principales motivations sont : ${motivations}.`;
    }
  }
  
  // Handle basic questions like language, greetings, etc.
  if (lowerMessage.includes("anglais") || lowerMessage.includes("english") || lowerMessage.includes("speak") || lowerMessage.includes("langue") || lowerMessage.includes("language")) {
    const languages = persona.language_preferences && persona.language_preferences.length > 0 ? persona.language_preferences.join(", ") : "français";
    if (isUserSpeakingEnglish && personaLanguages.includes('en')) {
      return `Yes, I speak ${languages}. How can I help you?`;
    } else {
      return `Oui, je parle ${languages}. Comment puis-je t'aider ?`;
    }
  }
  
  if (lowerMessage.includes("salut") || lowerMessage.includes("bonjour") || lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    if (isUserSpeakingEnglish && personaLanguages.includes('en')) {
      return `Hello! I'm ${personaId.charAt(0).toUpperCase() + personaId.slice(1)}. How are you?`;
    } else {
      return `Salut ! Je suis ${personaId.charAt(0).toUpperCase() + personaId.slice(1)}. Comment ça va ?`;
    }
  }
  
  if ((lowerMessage.includes("comment") && lowerMessage.includes("va")) || lowerMessage.includes("how are you")) {
    if (isUserSpeakingEnglish && personaLanguages.includes('en')) {
      return `I'm doing well, thank you! I'm ${statut} and I'm ${age} years old. How about you?`;
    } else {
      return `Ça va bien, merci ! Je suis ${statut} et j'ai ${age} ans. Et toi ?`;
    }
  }
  
  // Generate contextual responses based on message content and persona profile
  if (lowerMessage.includes('présenter') || lowerMessage.includes('présente') || lowerMessage.includes('qui es-tu') || lowerMessage.includes('who are you')) {
    if (isUserSpeakingEnglish && personaLanguages.includes('en')) {
      return `Hello! I'm ${personaId.charAt(0).toUpperCase() + personaId.slice(1)}, I'm ${age} years old and I'm ${statut}. ${situation}. My main values are: ${valeurs}. I'm motivated by: ${motivations}.`;
    } else {
      return `Salut ! Je suis ${personaId.charAt(0).toUpperCase() + personaId.slice(1)}, j'ai ${age} ans et je suis ${statut}. ${situation}. Mes valeurs principales sont : ${valeurs}. Je suis motivé par : ${motivations}.`;
    }
  }
  
  if (lowerMessage.includes('service') || lowerMessage.includes('en ligne') || lowerMessage.includes('médias') || lowerMessage.includes('information')) {
    const responses = [
      `En tant que ${statut}, je cherche des outils qui correspondent à mon profil. J'utilise principalement ${canaux} et j'aime quand c'est présenté de façon ${tonalite}.`,
      `Pour comprendre les médias, j'ai besoin de quelque chose qui respecte mes valeurs : ${valeurs}. Je préfère les formats adaptés à mon âge et à ma situation.`,
      `Des services en ligne ? Ça m'intéresse ! Mais il faut que ce soit en phase avec mes motivations : ${motivations}. Je veux quelque chose d'accessible et de fiable.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Handle museum visit questions with new visit-specific data
  if (lowerMessage.includes('expo') || lowerMessage.includes('musée') || lowerMessage.includes('visite') || lowerMessage.includes('exposition') || lowerMessage.includes('aimes') || lowerMessage.includes('aime')) {
    // Use specific visit data if available
    const motivation = (persona as any)["Motivation de la visite"];
    const contexte = (persona as any)["Contexte de la visite"];
    const frequence = (persona as any)["Fréquence de visite"];
    const experiences = (persona as any)["Expériences préférées"];
    const freins = (persona as any)["Freins à la visite"];
    const engagement = (persona as any)["Engagement après la visite"];

    // If we have visit-specific data, use it
    if (motivation || experiences || frequence) {
      const responses = [];

      if (motivation) {
        responses.push(`Ma motivation pour visiter un musée, c'est ${motivation}. ${contexte ? `Je viens généralement ${contexte}.` : ''}`);
      }

      if (experiences) {
        const experiencesList = Array.isArray(experiences) ? experiences.join(', ') : experiences;
        responses.push(`J'adore les ${experiencesList}. ${frequence ? `Je visite ${frequence}.` : ''}`);
      }

      if (freins) {
        const freinsList = Array.isArray(freins) ? freins.join(', ') : freins;
        responses.push(`Parfois j'hésite à cause de ${freinsList}, mais quand c'est bien fait, j'apprécie vraiment.`);
      }

      if (engagement) {
        responses.push(`Après une visite, j'aime bien ${engagement}. C'est important pour moi de prolonger l'expérience.`);
      }

      if (responses.length > 0) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }

    // Fallback to general responses if no specific visit data
    const responses = [
      `J'aime les expositions qui correspondent à mes centres d'intérêt. En tant que ${statut}, je cherche des expériences qui respectent mes valeurs : ${valeurs}.`,
      `Pour les expos, je préfère quand c'est présenté de façon ${tonalite}. Ça doit être adapté à mon âge et à ma situation de ${situation}.`,
      `Les expositions m'intéressent si elles touchent à mes motivations : ${motivations}. J'aime quand c'est interactif et accessible.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Handle specific visit context questions
  if (lowerMessage.includes('pourquoi tu viens') || lowerMessage.includes('motivation') || lowerMessage.includes('qu\'est-ce qui t\'amène')) {
    const motivation = (persona as any)["Motivation de la visite"];
    const contexte = (persona as any)["Contexte de la visite"];

    if (motivation) {
      return `${motivation}. ${contexte ? `D'habitude je viens ${contexte}.` : ''}`;
    }
    return `Je viens au musée pour des raisons liées à mes motivations : ${motivations}.`;
  }

  // Handle visit frequency questions
  if (lowerMessage.includes('souvent') || lowerMessage.includes('fréquence') || lowerMessage.includes('combien de fois')) {
    const frequence = (persona as any)["Fréquence de visite"];

    if (frequence) {
      return `Je visite ${frequence}. Ça correspond bien à mon rythme de vie.`;
    }
    return `Ma fréquence de visite dépend de mes disponibilités et de ma situation de ${statut}.`;
  }

  // Handle what they like in museums
  if (lowerMessage.includes('qu\'est-ce que tu préfères') || lowerMessage.includes('tes préférées') || lowerMessage.includes('activités')) {
    const experiences = (persona as any)["Expériences préférées"];

    if (experiences) {
      const experiencesList = Array.isArray(experiences) ? experiences.join(', ') : experiences;
      return `J'adore ${experiencesList}. C'est ce qui correspond le mieux à mon profil et à mes valeurs.`;
    }
    return `Je préfère les activités qui correspondent à mes valeurs : ${valeurs} et mes motivations : ${motivations}.`;
  }
  
  if (lowerMessage.includes('réseau') || lowerMessage.includes('tiktok') || lowerMessage.includes('instagram') || lowerMessage.includes('social') || lowerMessage.includes('youtube') || lowerMessage.includes('twitch')) {
    const responses = [
      `Je suis très actif sur ${canaux}. Ces plateformes correspondent à mes valeurs : ${valeurs}. J'y trouve des contenus qui me motivent.`,
      `Les réseaux sociaux, c'est mon quotidien ! J'utilise principalement ${canaux} et j'aime quand le contenu respecte mes valeurs : ${valeurs}.`,
      `Sur les réseaux, je cherche des contenus qui correspondent à mes motivations : ${motivations}. Je préfère ${canaux} car ça correspond à mon profil.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // General responses - try to match user language
  if (isUserSpeakingEnglish && personaLanguages.includes('en')) {
    const generalResponses = [
      `That's a good question! As a ${statut}, I find that interesting. My values are: ${valeurs}.`,
      `Interesting! That touches on my motivations: ${motivations}. I'm ${situation} and that speaks to me.`,
      `Cool! That matches my profile. I'm ${age} years old, I'm ${statut} and my values are: ${valeurs}.`
    ];
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  } else {
    const generalResponses = [
      `C'est une bonne question ! En tant que ${statut}, je trouve ça intéressant. Mes valeurs sont : ${valeurs}.`,
      `Intéressant ! Ça touche à mes motivations : ${motivations}. Je suis ${situation} et ça me parle.`,
      `Cool ! Ça correspond à mon profil. J'ai ${age} ans, je suis ${statut} et mes valeurs sont : ${valeurs}.`
    ];
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  }
}

// Function to generate dynamic responses using OpenAI (when available)
async function generateDynamicResponse(personaId: string, message: string, site: string): Promise<string> {
  try {
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    // Initialize OpenAI client only when needed and API key is available
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Load persona data
    const personas = loadPersonaData(site);
    const persona = findPersonaById(personas, personaId);

    if (!persona) {
      return "Désolé, je ne trouve pas mon profil. Pouvez-vous réessayer ?";
    }

    // Format persona data for the prompt
    const personaPrompt = formatPersonaForPrompt(persona, site);

    // Detect user language
    const isUserSpeakingEnglish = isEnglish(message);
    const personaLanguages = persona.language_preferences && persona.language_preferences.length > 0 ? persona.language_preferences : ["fr"];

    // Create language instruction
    let languageInstruction = "";
    if (isUserSpeakingEnglish && personaLanguages.includes('en')) {
      languageInstruction = "IMPORTANT: The user is speaking English. Respond in English if you can, otherwise respond in your preferred language.";
    }

      // Create the complete prompt
      const systemPrompt = `${personaPrompt}

${languageInstruction}

INSTRUCTIONS:
- Réponds de manière naturelle et authentique
- Reste fidèle à ton profil et personnalité
- Réponds directement aux questions posées
- Sois concis (1-2 phrases) sauf si on te demande plus de détails
- Comprends le contexte de la conversation`;

      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 300, // Increased from 150 to allow more natural conversation
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content || "Désolé, je n'ai pas pu générer de réponse.";
      return response;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { personaId, message, site = 'info' } = await request.json();

    if (!personaId || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let response: string;
    let fallback = false;

    try {
      // Try to use OpenAI for dynamic responses
      response = await generateDynamicResponse(personaId, message, site);
    } catch (error) {
      console.log('Falling back to contextual responses:', error);
      // Fall back to contextual responses if OpenAI fails
      response = generateContextualResponse(personaId, message, site);
      fallback = true;
    }

    return NextResponse.json({ 
      response, 
      fallback,
      personaId,
      site 
    });

  } catch (error) {
    console.error('Error in persona chat API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}