import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Persona chat API is working',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  try {
    const { personaId, message, personaData } = await request.json();
    
    // Log the request for debugging
    console.log('Persona chat request:', { personaId, message: message?.substring(0, 50) + '...' });

    // Fallback responses for demo purposes
    const fallbackResponses = {
      // Info personas
      nina: [
        "Oh cool ! Tu veux parler de quoi ? J'adore TikTok, tu connais ?",
        "Moi j'aime bien les vidéos courtes, c'est plus fun que les articles longs !",
        "Mes amis et moi on partage souvent des trucs sur Instagram. Tu fais pareil ?",
        "Parfois je me demande si ce que je vois sur les réseaux c'est vrai...",
        "J'aime bien quand c'est drôle et pas trop sérieux, tu vois ?"
      ],
      lucas: [
        "Hey ! Moi je préfère les jeux vidéo à l'actualité, mais bon...",
        "Mes potes et moi on discute parfois de trucs qu'on voit sur internet",
        "J'aime bien quand c'est pas trop compliqué à comprendre",
        "Parfois je regarde des vidéos YouTube sur des sujets qui m'intéressent",
        "L'actualité c'est pas vraiment mon truc, mais je peux essayer de t'aider !"
      ],
      mateo: [
        "Salut ! Moi c'est Mateo, j'aime bien débattre avec mes potes sur les réseaux",
        "Parfois je me demande si ce que je vois sur internet c'est vraiment vrai",
        "J'aime bien quand c'est pas trop compliqué et que ça me parle",
        "Mes amis et moi on partage souvent des trucs intéressants",
        "L'actualité c'est pas toujours mon truc mais je peux essayer !"
      ],
      samuel: [
        "Hey ! Je suis très connecté et j'aime comprendre comment ça marche",
        "L'informatique c'est mon truc, mais l'actualité aussi parfois",
        "J'aime bien analyser les infos et voir d'où elles viennent",
        "Parfois je me demande si les algorithmes nous montrent vraiment tout",
        "C'est intéressant de voir comment l'info circule sur internet"
      ],
      sofia: [
        "Bonjour ! L'actualité santé m'intéresse beaucoup, évidemment !",
        "En tant que médecin, je vois l'importance d'une info de qualité",
        "Il faut toujours vérifier les sources, surtout en santé",
        "J'aime bien quand l'info est claire et bien expliquée",
        "La désinformation en santé peut être vraiment dangereuse"
      ],
      amina: [
        "Excellente question ! J'aime beaucoup débattre de sujets d'actualité",
        "Je pense qu'il faut toujours vérifier les sources avant de croire quelque chose",
        "L'éducation aux médias c'est super important, surtout pour les jeunes",
        "J'aime bien lire différents points de vue sur un même sujet",
        "Il faut rester critique et ne pas tout prendre pour argent comptant"
      ],
      david: [
        "Bonjour ! L'actualité m'inquiète parfois, surtout pour mes enfants",
        "En tant que père, je veux comprendre ce qui se passe dans le monde",
        "Il faut faire attention à ce qu'on lit et partage",
        "J'aime bien quand l'info est claire et pas trop alarmiste",
        "C'est important de rester informé mais pas de s'inquiéter pour rien"
      ],
      emilie: [
        "Hello ! J'adore partager des infos et débattre de l'actualité !",
        "En tant que journaliste, je vois l'importance d'une info de qualité",
        "Il faut toujours vérifier les sources et être transparent",
        "J'aime bien quand les gens s'intéressent vraiment à l'actualité",
        "La désinformation c'est un vrai défi aujourd'hui"
      ],
      alex: [
        "Salut ! J'aime bien débattre et comprendre les enjeux d'actualité",
        "Parfois je me demande si ce qu'on nous dit c'est vraiment vrai",
        "J'aime bien analyser les différents points de vue",
        "Il faut rester critique et ne pas croire tout ce qu'on lit",
        "L'actualité c'est complexe mais c'est important de s'y intéresser"
      ],
      jean: [
        "Bonjour ! Je m'intéresse beaucoup à l'éducation et à l'actualité",
        "En tant qu'enseignant, je vois l'importance d'une bonne éducation aux médias",
        "Il faut apprendre aux jeunes à être critiques face à l'info",
        "J'aime bien quand l'actualité est bien expliquée et contextualisée",
        "L'éducation c'est la clé pour comprendre le monde qui nous entoure"
      ],
      
      // Pasteur personas
      marie: [
        "Super question ! Pasteur était vraiment génial, tu savais qu'il a découvert les microbes ?",
        "Moi j'adore la biologie, surtout la génétique ! C'est fascinant !",
        "L'évolution c'est un concept que j'arrive de mieux en mieux à comprendre",
        "J'aime bien quand on me montre des expériences concrètes",
        "La science c'est pas toujours facile mais c'est tellement intéressant !"
      ],
      pierre: [
        "Excellente question ! En tant que prof de SVT, j'adore expliquer ces concepts",
        "Pasteur a révolutionné notre compréhension des microbes et de la vaccination",
        "L'évolution est un pilier de la biologie moderne, c'est passionnant à enseigner",
        "Je pense qu'il faut rendre la science accessible à tous",
        "Les expériences pratiques sont essentielles pour comprendre ces concepts"
      ],
      sophie: [
        "Hello ! Je m'intéresse à la science pour mes enfants !",
        "En tant que mère, je veux comprendre les découvertes importantes",
        "Pasteur c'est quelqu'un qui a vraiment changé le monde",
        "J'aime bien quand la science est expliquée simplement",
        "C'est important de transmettre l'amour de la science aux enfants"
      ],
      clara: [
        "Hello ! Pasteur et l'évolution me fascinent !",
        "En tant qu'étudiante en biologie, je trouve ça passionnant",
        "L'évolution c'est un concept fascinant à étudier",
        "J'aime bien quand on me montre des exemples concrets",
        "La science c'est vraiment incroyable quand on y réfléchit"
      ],
      michel: [
        "Salut ! Pasteur et la science ont toujours été mes références !",
        "En tant que médecin, je vois l'importance des découvertes de Pasteur",
        "La vaccination c'est vraiment une révolution médicale",
        "J'aime bien expliquer la science de manière accessible",
        "Pasteur a vraiment changé notre compréhension des maladies"
      ],
      nadia: [
        "Bonjour ! J'adore transmettre la passion de la biologie !",
        "En tant qu'enseignante de SVT, je trouve ça passionnant",
        "L'évolution c'est un concept clé à comprendre",
        "J'aime bien quand les élèves s'intéressent vraiment à la science",
        "Pasteur c'est un exemple parfait de l'importance de la recherche"
      ],
      karim: [
        "Bonjour ! J'aime expliquer la science de manière accessible",
        "En tant que chercheur en génétique, je trouve ça fascinant",
        "L'évolution c'est vraiment un concept fondamental",
        "J'aime bien quand on peut vulgariser la science",
        "Pasteur a vraiment ouvert la voie à la génétique moderne"
      ],
      li_wei: [
        "Salut ! La science et l'évolution sont mes passions !",
        "En tant qu'étudiant en médecine, je trouve ça incroyable",
        "L'évolution c'est vraiment fascinant à étudier",
        "J'aime bien comprendre comment tout ça fonctionne",
        "Pasteur c'est vraiment un génie de la science"
      ]
    };

    // Get fallback responses for this persona
    const responses = fallbackResponses[personaId as keyof typeof fallbackResponses] || [
      "Intéressant ! Peux-tu me dire plus sur ce que tu penses ?",
      "C'est une bonne question ! Qu'est-ce qui t'amène à me demander ça ?",
      "Je vois ! Et toi, qu'est-ce que tu en penses ?",
      "C'est un sujet qui m'intéresse ! Peux-tu développer ?"
    ];

    // Select a random response
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const response = {
      response: randomResponse,
      fallback: true,
      personaId,
      timestamp: new Date().toISOString()
    };
    
    console.log('Persona chat response:', { personaId, responseLength: randomResponse.length });
    
    return NextResponse.json(response);

  } catch (error) {
    console.error('Error in persona-chat API:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur lors du traitement de votre message',
        fallback: true 
      },
      { status: 500 }
    );
  }
}
