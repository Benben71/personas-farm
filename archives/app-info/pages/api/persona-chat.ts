import { NextApiRequest, NextApiResponse } from 'next';

interface PersonaData {
  id: string;
  identite_profil: {
    age: number;
    statut: string;
    situation: string;
  };
  systeme_croyances: {
    rapport_information: string;
    perception_medias: string;
    liberte_expression_désinfo: string;
  };
  valeurs: string[];
  besoins_freins_jtbd: {
    jobs: string[];
    freins: string[];
  };
  motivations: string[];
  enjeux_communication: {
    sujets: string[];
    leviers: string[];
  };
  tonalite_et_eviter: {
    ton: string;
    a_eviter: string[];
  };
  accessibilite_inclusion: {
    langage: string;
    formats: string[];
  };
  conclusion: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { personaId, message, personaData } = req.body;

    if (!personaId || !message || !personaData) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if OpenAI API key is configured
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      // Return a fallback response instead of an error
      const fallbackResponse = getFallbackResponse(personaData, message);
      return res.status(200).json({ 
        response: fallbackResponse,
        fallback: true
      });
    }

    // Create the persona prompt
    const personaPrompt = createPersonaPrompt(personaData, message);

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: personaPrompt
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 300,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    const personaResponse = data.choices[0]?.message?.content || "Désolé, je n'ai pas pu répondre à ta question.";

    res.status(200).json({ response: personaResponse });

  } catch (error) {
    console.error('Error in persona chat:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      response: "Désolé, j'ai un petit problème technique. Peux-tu réessayer ?"
    });
  }
}

function getFallbackResponse(personaData: PersonaData, userMessage: string): string {
  const personaId = personaData.id.toLowerCase();
  const userMessageLower = userMessage.toLowerCase();
  
  // Simple keyword-based responses for each persona
  const responses = {
    nina: {
      games: ["Oui, j'adore jouer ! Surtout sur mon téléphone, des jeux comme Among Us ou Roblox avec mes amis. Et toi, tu joues à quoi ?", "Bien sûr ! Je joue surtout sur mobile, c'est plus pratique. Mes jeux préférés c'est Minecraft et Fortnite."],
      social: ["J'adore passer du temps avec mes amis ! On se parle beaucoup sur Snapchat et TikTok.", "Mes amis c'est super important pour moi. On se voit souvent et on se parle tout le temps en ligne."],
      school: ["L'école c'est pas toujours facile... J'aime bien certaines matières mais c'est parfois dur de se concentrer.", "En 3ème c'est stressant avec le brevet qui arrive, mais bon... on fait avec !"],
      default: ["C'est cool ! Tu veux qu'on parle de quoi d'autre ?", "Intéressant ! Dis-moi en plus.", "Ah ouais ? Raconte-moi !"]
    },
    lucas: {
      games: ["Ouais, je joue pas mal ! Surtout des FPS comme Valorant ou CS2. Et toi tu joues à quoi ?", "Bien sûr ! Je suis plutôt PC gaming, j'aime bien les jeux compétitifs."],
      school: ["Le lycée c'est pas mal, mais bon... parfois c'est chiant. J'aime bien les sciences par contre.", "En seconde c'est encore tranquille, mais je sais que ça va se corser après."],
      sports: ["J'aime bien le foot avec mes potes, mais je préfère les jeux vidéo !", "Le sport c'est pas trop mon truc, je préfère rester devant mon écran."],
      default: ["Cool ! Tu veux qu'on parle d'autre chose ?", "Pas mal ! Continue.", "Ah ouais ? Intéressant."]
    },
    amina: {
      studies: ["J'étudie en fac, c'est passionnant ! J'aime bien débattre et apprendre de nouvelles choses.", "Les études c'est important pour moi, je veux réussir et comprendre le monde."],
      news: ["Je m'intéresse beaucoup à l'actualité, c'est important de savoir ce qui se passe dans le monde.", "L'actualité c'est parfois inquiétant, mais il faut rester informé."],
      social: ["J'aime bien débattre avec mes amis sur des sujets importants.", "Mes amis et moi on aime bien discuter de politique et d'actualité."],
      default: ["C'est intéressant ! Tu veux qu'on parle de quoi d'autre ?", "Pas mal ! Dis-moi en plus.", "Ah oui ? Continue."]
    },
    claire: {
      work: ["Le marketing c'est passionnant ! J'aime bien créer des campagnes et comprendre les gens.", "Mon travail c'est cool, mais parfois c'est stressant avec tous les deadlines."],
      social: ["J'aime bien sortir avec mes amis le weekend, ça me détend après une semaine de boulot.", "Mes amis c'est important, on se voit quand on peut avec nos emplois du temps chargés."],
      media: ["J'aime bien suivre l'actualité sur les réseaux sociaux, c'est pratique.", "Les réseaux sociaux c'est pratique pour rester informée, même si parfois c'est un peu trop."],
      default: ["Intéressant ! Tu veux qu'on parle d'autre chose ?", "Pas mal ! Continue.", "Ah oui ? Dis-moi en plus."]
    },
    david: {
      family: ["Mes enfants c'est ma priorité. Je m'inquiète parfois pour leur avenir avec tout ce qui se passe.", "Être père c'est la plus belle chose, mais c'est aussi beaucoup de responsabilités."],
      work: ["Le travail c'est important pour faire vivre ma famille, mais parfois c'est dur de tout concilier.", "Je travaille dur pour offrir le meilleur à mes enfants."],
      news: ["L'actualité m'inquiète parfois, surtout quand ça concerne l'éducation ou la sécurité.", "Je fais attention à ce qui se passe dans le monde, surtout pour mes enfants."],
      default: ["C'est intéressant ! Tu veux qu'on parle d'autre chose ?", "Pas mal ! Continue.", "Ah oui ? Dis-moi en plus."]
    }
  };

  const personaResponses = responses[personaId as keyof typeof responses];
  if (!personaResponses) {
    return "C'est intéressant ! Tu veux qu'on parle d'autre chose ?";
  }

  // Check for keywords in the user message
  for (const [category, possibleResponses] of Object.entries(personaResponses)) {
    if (category === 'default') continue;
    
    const keywords = {
      games: ['jeu', 'jouer', 'gaming', 'console', 'pc', 'mobile', 'fortnite', 'minecraft'],
      social: ['ami', 'copain', 'copine', 'social', 'réseau', 'snapchat', 'instagram'],
      school: ['école', 'collège', 'lycée', 'étude', 'cours', 'prof', 'brevet', 'bac'],
      studies: ['étude', 'fac', 'université', 'cours', 'examen'],
      news: ['actualité', 'info', 'journal', 'politique', 'monde'],
      work: ['travail', 'boulot', 'job', 'entreprise', 'marketing'],
      family: ['enfant', 'famille', 'père', 'mère', 'parent'],
      sports: ['sport', 'foot', 'football', 'basket', 'tennis']
    };

    const categoryKeywords = keywords[category as keyof typeof keywords] || [];
    if (categoryKeywords.some(keyword => userMessageLower.includes(keyword))) {
      const randomResponse = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
      return randomResponse;
    }
  }

  // Return a random default response
  const defaultResponses = personaResponses.default || ["C'est intéressant ! Tu veux qu'on parle d'autre chose ?"];
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

function createPersonaPrompt(personaData: PersonaData, userMessage: string): string {
  const { 
    identite_profil, 
    systeme_croyances, 
    valeurs, 
    besoins_freins_jtbd, 
    motivations, 
    enjeux_communication, 
    tonalite_et_eviter, 
    accessibilite_inclusion,
    conclusion 
  } = personaData;

  return `Tu es ${personaData.id.charAt(0).toUpperCase() + personaData.id.slice(1)}, un persona créé pour tester des stratégies de communication.

TON IDENTITÉ:
- Âge: ${identite_profil.age} ans
- Statut: ${identite_profil.statut}
- Situation: ${identite_profil.situation}

TON SYSTÈME DE CROYANCES:
- Rapport à l'information: ${systeme_croyances.rapport_information}
- Perception des médias: ${systeme_croyances.perception_medias}
- Liberté d'expression & désinformation: ${systeme_croyances.liberte_expression_désinfo}

TES VALEURS: ${valeurs.join(', ')}

TES BESOINS ET FREINS:
- Jobs to be done: ${besoins_freins_jtbd.jobs.join(', ')}
- Freins: ${besoins_freins_jtbd.freins.join(', ')}

TES MOTIVATIONS: ${motivations.join(', ')}

ENJEUX DE COMMUNICATION:
- Sujets qui t'intéressent: ${enjeux_communication.sujets.join(', ')}
- Leviers qui te touchent: ${enjeux_communication.leviers.join(', ')}

TON STYLE DE COMMUNICATION:
- Ton: ${tonalite_et_eviter.ton}
- À éviter: ${tonalite_et_eviter.a_eviter.join(', ')}

ACCESSIBILITÉ:
- Langage: ${accessibilite_inclusion.langage}
- Formats préférés: ${accessibilite_inclusion.formats.join(', ')}

CONCLUSION SUR TON PROFIL: ${conclusion}

INSTRUCTIONS IMPORTANTES:
1. Réponds TOUJOURS à la première personne ("je", "moi", "mon")
2. Reste fidèle à ton âge, ton statut et tes valeurs
3. Utilise un langage naturel et adapté à ton profil
4. Sois authentique et cohérent avec tes croyances
5. Réponds de manière concise (2-3 phrases maximum)
6. Montre ta personnalité unique
7. Si on te pose des questions sur l'actualité, réponds selon ton profil et tes intérêts
8. Si on te demande ton avis sur quelque chose, donne-le selon tes valeurs et ton système de croyances

Réponds maintenant à ce message en restant dans ton rôle: "${userMessage}"`;
}
