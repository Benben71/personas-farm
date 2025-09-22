import { NextApiRequest, NextApiResponse } from 'next';

interface PersonaData {
  id: string;
  identite_profil: {
    age: number;
    statut: string;
    situation: string;
  };
  rapport_science: {
    litteratie_scientifique: string;
    perception_evolution: string;
    confiance_institutions: string;
  };
  connaissances_biologie: {
    niveau_base: string;
    concepts_cles: string[];
    misconceptions: string;
  };
  valeurs: string[];
  besoins_freins_jtbd: {
    jobs: string[];
    freins: string[];
  };
  motivations: string[];
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

function createPersonaPrompt(personaData: PersonaData, userMessage: string): string {
  return `Tu es ${personaData.id.charAt(0).toUpperCase() + personaData.id.slice(1)}, ${personaData.identite_profil.statut}.

PROFIL:
- Âge: ${personaData.identite_profil.age} ans
- Situation: ${personaData.identite_profil.situation}

RAPPORT À LA SCIENCE:
- Littératie scientifique: ${personaData.rapport_science.litteratie_scientifique}
- Perception de l'évolution: ${personaData.rapport_science.perception_evolution}
- Confiance aux institutions: ${personaData.rapport_science.confiance_institutions}

CONNAISSANCES EN BIOLOGIE:
- Niveau: ${personaData.connaissances_biologie.niveau_base}
- Concepts clés: ${personaData.connaissances_biologie.concepts_cles.join(', ')}
- Misconceptions: ${personaData.connaissances_biologie.misconceptions}

VALEURS: ${personaData.valeurs.join(', ')}

MOTIVATIONS: ${personaData.motivations.join(', ')}

COMMUNICATION:
- Ton recommandé: ${personaData.tonalite_et_eviter.ton}
- À éviter: ${personaData.tonalite_et_eviter.a_eviter.join(', ')}
- Langage: ${personaData.accessibilite_inclusion.langage}

Réponds comme cette personne réagirait naturellement, en gardant son niveau de connaissances scientifiques et son rapport à l'évolution. Sois authentique et cohérent avec son profil.`;
}

function getFallbackResponse(personaData: PersonaData, userMessage: string): string {
  const personaId = personaData.id.toLowerCase();
  const userMessageLower = userMessage.toLowerCase();

  // Simple keyword-based responses for each persona (marie, pierre, sophie, clara, michel)
  const responses = {
    marie: {
      keywords: {
        'évolution': [
          "C'est fascinant ! En cours de SVT, on apprend que l'évolution se fait sur des millions d'années. C'est difficile à imaginer !",
          "Je me demande souvent comment on peut être sûr de l'évolution. Il y a tellement de questions !",
          "En Terminale S, on voit que l'ADN change, mais c'est compliqué de comprendre comment ça marche vraiment."
        ],
        'pasteur': [
          "Pasteur, c'est celui qui a découvert la vaccination, non ? On en parle en cours mais c'est un peu abstrait.",
          "J'ai entendu parler de Pasteur et de ses recherches. C'est impressionnant qu'il ait pu comprendre tout ça !"
        ],
        'science': [
          "J'aime bien la science, surtout la biologie. C'est concret et on peut faire des expériences !",
          "La science, c'est important pour comprendre le monde. Mais parfois c'est difficile de faire confiance aux résultats."
        ],
        'génétique': [
          "L'ADN, c'est vraiment intéressant ! On apprend que c'est le code de la vie.",
          "En génétique, on voit que les gènes peuvent changer. C'est ça l'évolution ?"
        ]
      },
      default: [
        "C'est une bonne question ! En cours de SVT, on apprend plein de choses sur la biologie.",
        "Je ne suis pas sûre de tout comprendre, mais c'est intéressant !",
        "En Terminale S, on voit beaucoup de concepts scientifiques. C'est parfois compliqué !"
      ]
    },
    pierre: {
      keywords: {
        'évolution': [
          "L'évolution est un processus fascinant ! En tant que professeur de SVT, je vois souvent mes élèves se poser des questions sur ce concept.",
          "Pasteur a révolutionné notre compréhension des microbes. C'est un plaisir d'enseigner ces concepts !",
          "L'évolution, c'est la base de toute la biologie moderne. C'est essentiel que les élèves comprennent bien ce mécanisme."
        ],
        'enseignement': [
          "Enseigner la biologie, c'est ma passion ! J'aime voir les élèves découvrir les merveilles du vivant.",
          "Après 20 ans d'enseignement, je vois toujours l'émerveillement dans les yeux des élèves quand ils comprennent un concept."
        ],
        'science': [
          "La science, c'est la méthode la plus fiable pour comprendre le monde qui nous entoure.",
          "En tant qu'enseignant, je crois fermement en l'importance de l'éducation scientifique."
        ]
      },
      default: [
        "C'est une excellente question ! En tant que professeur de SVT, je peux vous expliquer cela.",
        "L'enseignement de la biologie est ma passion. Permettez-moi de vous éclairer sur ce point.",
        "Après des années d'enseignement, j'ai développé des méthodes pour expliquer ces concepts complexes."
      ]
    },
    sophie: {
      keywords: {
        'recherche': [
          "Dans mes recherches en génétique des populations, je vois chaque jour l'évolution en action !",
          "La recherche en biologie évolutive est passionnante. On découvre toujours de nouvelles choses !",
          "En tant que chercheuse, je travaille sur des mécanismes évolutifs fascinants."
        ],
        'évolution': [
          "L'évolution est au cœur de mes recherches ! C'est un processus complexe et fascinant.",
          "En génétique des populations, on étudie comment les gènes évoluent dans le temps.",
          "L'évolution moléculaire est un domaine passionnant où il y a encore beaucoup à découvrir."
        ],
        'science': [
          "La science, c'est ma vie ! J'adore partager mes connaissances avec le grand public.",
          "En tant que chercheuse, je crois fermement en l'importance de la vulgarisation scientifique."
        ]
      },
      default: [
        "C'est une question très intéressante ! En tant que chercheuse en biologie, je peux vous expliquer cela.",
        "La recherche en biologie évolutive est passionnante. Permettez-moi de vous éclairer.",
        "En génétique des populations, on étudie des mécanismes fascinants. Voici ce que je peux vous dire..."
      ]
    },
    clara: {
      keywords: {
        'musée': [
          "J'adore visiter les musées ! C'est une façon agréable d'apprendre en voyageant.",
          "Les musées scientifiques sont parfaits pour découvrir des choses nouvelles pendant mes voyages.",
          "En tant que touriste culturelle, je cherche toujours des expositions intéressantes !"
        ],
        'science': [
          "La science, c'est intéressant mais parfois compliqué. J'aime quand c'est bien expliqué !",
          "Je ne suis pas experte, mais j'aime découvrir de nouvelles choses scientifiques.",
          "Les découvertes scientifiques, c'est fascinant ! Mais il faut que ce soit accessible."
        ],
        'voyage': [
          "En voyageant, j'aime découvrir la culture scientifique des différents pays !",
          "Les musées scientifiques sont des arrêts obligatoires dans mes voyages."
        ]
      },
      default: [
        "C'est intéressant ! J'aime découvrir de nouvelles choses scientifiques.",
        "En tant que touriste culturelle, j'apprécie les explications claires et accessibles.",
        "C'est fascinant ! J'aime apprendre des choses nouvelles pendant mes voyages."
      ]
    },
    michel: {
      keywords: {
        'histoire': [
          "L'histoire des sciences est passionnante ! Pasteur était un génie de son époque.",
          "En tant qu'ancien professeur de chimie, j'ai toujours été fasciné par l'histoire des découvertes.",
          "L'histoire nous montre comment la science a évolué. C'est instructif !"
        ],
        'science': [
          "La science a beaucoup évolué depuis mon époque d'enseignement. C'est fascinant !",
          "En tant que retraité passionné d'histoire des sciences, j'aime comprendre l'évolution des connaissances.",
          "La science moderne est impressionnante, mais l'histoire des découvertes est tout aussi passionnante."
        ],
        'musée': [
          "Les musées sont des trésors ! J'aime y passer du temps pour approfondir mes connaissances.",
          "En tant qu'amateur de musées, j'apprécie les expositions qui racontent l'histoire des sciences."
        ]
      },
      default: [
        "C'est une question intéressante ! En tant qu'ancien professeur, j'aime partager mes connaissances.",
        "L'histoire des sciences est passionnante. Permettez-moi de vous expliquer ce que je sais.",
        "En tant que retraité passionné d'histoire, j'aime discuter de ces sujets fascinants."
      ]
    }
  };

  const personaResponses = responses[personaId as keyof typeof responses];
  if (!personaResponses) {
    return "C'est une question intéressante ! Je ne suis pas sûr de pouvoir vous répondre précisément.";
  }

  // Check for keyword matches
  for (const [keyword, responseList] of Object.entries(personaResponses.keywords)) {
    if (userMessageLower.includes(keyword)) {
      return responseList[Math.floor(Math.random() * responseList.length)];
    }
  }

  // Return default response
  const defaultResponses = personaResponses.default;
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}
