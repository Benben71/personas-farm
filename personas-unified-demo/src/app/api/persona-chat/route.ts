import { NextRequest, NextResponse } from 'next/server';

// Function to generate contextual responses based on message content
function generateContextualResponse(personaId: string, message: string, personaData: any): string {
  const lowerMessage = message.toLowerCase();
  
  // Define persona-specific response patterns
  const personaResponses = {
    nina: {
      // Services en ligne / médias
      services: [
        "Oh, des services en ligne pour comprendre les médias ? Ça m'intéresse ! Moi j'aimerais bien quelque chose de fun, pas trop scolaire. Genre des vidéos courtes qui expliquent comment les journalistes travaillent, ou des jeux pour apprendre à repérer les fake news. TikTok c'est mon truc, alors si c'est dans ce style, je suis partante !",
        "Pour comprendre la fabrique de l'info ? Hmm, moi j'aime bien quand c'est interactif ! Peut-être des quiz sur les sources, ou des vidéos qui montrent les coulisses d'un journal. Mais faut que ce soit pas trop long, sinon je décroche. Et si on pouvait partager nos découvertes avec nos amis, ce serait encore mieux !",
        "Des services pour comprendre les médias ? Cool ! Moi j'aimerais quelque chose qui me montre comment vérifier si une info est vraie. Genre des outils simples que je peux utiliser sur mon téléphone. Et si c'est présenté de façon marrante, avec des exemples concrets, je pense que ça m'aiderait beaucoup !"
      ],
      // Expositions / musées
      expositions: [
        "Des expos ? J'aime bien quand c'est interactif et pas trop sérieux ! Genre des trucs où on peut toucher, tester, prendre des photos. Les expos sur les réseaux sociaux ou sur l'histoire d'internet, ça m'intéresse. Mais faut que ce soit pas trop long, sinon je m'ennuie. Et si on peut y aller avec des amis, c'est encore mieux !",
        "Les expos que j'aime ? Celles où on apprend en s'amusant ! Genre des trucs sur la technologie, les médias, ou l'histoire récente. J'aime bien quand on peut participer, pas juste regarder. Et si c'est lié à ce que je vois sur les réseaux sociaux, ça me parle encore plus !",
        "Pour les expos, moi j'aime quand c'est moderne et connecté ! Des trucs sur l'évolution des médias, ou sur comment l'info circule aujourd'hui. Si on peut utiliser nos téléphones pendant la visite, ou si c'est présenté de façon originale, je suis partante !"
      ],
      // Réseaux sociaux / TikTok
      reseaux: [
        "TikTok c'est vraiment mon truc ! J'y passe beaucoup de temps avec mes amis. On se partage des vidéos marrantes, mais parfois on tombe sur des trucs bizarres. C'est là que je me demande si c'est vrai ou pas. Ça serait bien d'avoir des outils pour vérifier directement depuis l'app !",
        "Sur les réseaux, moi je suis surtout sur TikTok et Instagram. On partage beaucoup de trucs avec mes potes, mais parfois on se demande si ce qu'on voit est vrai. Genre les vidéos qui font peur ou qui semblent trop belles pour être vraies. C'est compliqué de faire le tri !",
        "Les réseaux sociaux, c'est mon quotidien ! Mais parfois je me demande si ce que je vois est vraiment vrai. Genre les infos qui circulent, ou les vidéos qui semblent suspectes. Ça serait bien d'apprendre à mieux vérifier tout ça !"
      ],
      // Général / autres questions
      general: [
        "C'est une bonne question ! Moi j'aime bien apprendre des trucs nouveaux, surtout si c'est présenté de façon fun. Qu'est-ce que tu veux savoir exactement ?",
        "Intéressant ! Moi j'aime bien quand on peut discuter de plein de trucs. Tu veux qu'on parle de quoi ?",
        "Cool ! Moi j'aime bien découvrir de nouvelles choses. Qu'est-ce qui t'intéresse ?"
      ]
    },
    alex: {
      // Services en ligne / médias
      services: [
        "Des services en ligne pour comprendre les médias ? Hmm, je suis méfiant. Les médias traditionnels sont contrôlés par les puissants. Moi je préfère les sources alternatives, les groupes Facebook et Telegram où on peut vraiment débattre sans censure.",
        "Pour comprendre la fabrique de l'info ? Franchement, je pense qu'il faut surtout apprendre à se méfier des médias dominants. Ils nous cachent la vérité. Moi je préfère chercher dans les groupes de discussion où les gens partagent vraiment ce qui se passe.",
        "Des services pour comprendre les médias ? Je suis sceptique. Les vrais médias libres sont sur les réseaux sociaux alternatifs. Facebook et Telegram, c'est là qu'on trouve les vraies infos, pas dans les journaux contrôlés par le système."
      ],
      // Expositions / musées
      expositions: [
        "Des expos sur les médias ? Si c'est pour nous faire croire que les médias traditionnels sont fiables, je passe. Moi je préfère les ateliers où on peut vraiment débattre et remettre en question ce qu'on nous raconte.",
        "Les expos que j'aime ? Celles qui montrent la vraie face des médias, pas la version officielle. Il faut qu'on puisse voir comment on nous manipule et qu'on nous donne les outils pour résister.",
        "Pour les expos, moi je veux de la transparence. Montrez-nous les coulisses, les sources cachées, les manipulations. Pas de la propagande pour nous faire croire que tout va bien."
      ],
      // Réseaux sociaux / sources alternatives
      reseaux: [
        "Facebook et Telegram, c'est là que je trouve les vraies infos ! Les médias traditionnels sont tous contrôlés. Dans les groupes de discussion, on peut vraiment débattre et partager ce qui se passe vraiment.",
        "Les réseaux sociaux alternatifs, c'est mon truc ! Là on peut dire ce qu'on pense sans être censuré. Les médias dominants nous mentent, mais dans nos groupes on partage la vérité.",
        "Moi je fais confiance aux groupes Facebook et Telegram. Là on peut vraiment discuter et vérifier les infos entre nous. Les médias traditionnels sont trop contrôlés par le système."
      ],
      // Général / autres questions
      general: [
        "C'est une bonne question ! Moi je préfère toujours vérifier par moi-même plutôt que de croire ce que disent les médias dominants.",
        "Intéressant ! Moi j'aime bien débattre et remettre en question ce qu'on nous raconte. Tu veux qu'on parle de quoi exactement ?",
        "Cool ! Moi je suis toujours méfiant face aux discours officiels. Qu'est-ce qui t'intéresse ?"
      ]
    },
    // Add other personas as needed...
  };

  // Get persona-specific responses
  const persona = personaResponses[personaId as keyof typeof personaResponses];
  if (!persona) {
    return "Intéressant ! Peux-tu me dire plus sur ce que tu penses ?";
  }

  // Analyze message content and select appropriate response category
  if (lowerMessage.includes('service') || lowerMessage.includes('en ligne') || lowerMessage.includes('médias') || lowerMessage.includes('information')) {
    return persona.services[Math.floor(Math.random() * persona.services.length)];
  } else if (lowerMessage.includes('expo') || lowerMessage.includes('musée') || lowerMessage.includes('visite')) {
    return persona.expositions[Math.floor(Math.random() * persona.expositions.length)];
  } else if (lowerMessage.includes('réseau') || lowerMessage.includes('tiktok') || lowerMessage.includes('instagram') || lowerMessage.includes('social')) {
    return persona.reseaux[Math.floor(Math.random() * persona.reseaux.length)];
  } else {
    return persona.general[Math.floor(Math.random() * persona.general.length)];
  }
}

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
        "Salut ! Je suis Alex, j'ai 46 ans et je suis plutôt sceptique face aux médias traditionnels. Je préfère chercher ma propre vérité.",
        "Les médias dominants ne disent pas toujours la vérité. Moi je préfère me fier aux sources alternatives et aux groupes de discussion.",
        "J'aime bien débattre et remettre en question ce qu'on nous raconte. Il faut toujours vérifier par soi-même.",
        "Facebook et Telegram, c'est là que je trouve les vraies infos. Les médias traditionnels sont trop contrôlés.",
        "Je suis très attaché à la liberté d'expression. Chacun doit pouvoir dire ce qu'il pense sans censure."
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

    // Generate contextual response based on message content and persona
    const contextualResponse = generateContextualResponse(personaId, message, personaData);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const response = {
      response: contextualResponse,
      fallback: true,
      personaId,
      timestamp: new Date().toISOString()
    };
    
    console.log('Persona chat response:', { personaId, responseLength: contextualResponse.length });
    
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
