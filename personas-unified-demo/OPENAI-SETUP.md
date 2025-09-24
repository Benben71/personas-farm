# Configuration OpenAI pour le Chatbot Dynamique

## 🚀 Nouveau Système de Chatbot LLM

Le chatbot utilise maintenant OpenAI GPT-4o-mini pour générer des réponses dynamiques basées sur les données réelles des personas, au lieu d'utiliser des réponses pré-écrites.

## 📋 Configuration Requise

### 1. Obtenir une clé API OpenAI

1. Allez sur [OpenAI Platform](https://platform.openai.com/)
2. Créez un compte ou connectez-vous
3. Allez dans "API Keys" et créez une nouvelle clé
4. Copiez votre clé API

### 2. Configurer la clé API

Créez un fichier `.env.local` dans le dossier `personas-unified-demo/` :

```bash
# OpenAI API Configuration
OPENAI_API_KEY=sk-your-actual-api-key-here

# Modèle OpenAI à utiliser (par défaut: gpt-4o-mini)
OPENAI_MODEL=gpt-4o-mini

# Limite de tokens pour les réponses (par défaut: 150 pour réponses courtes)
OPENAI_MAX_TOKENS=150

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**⚠️ Important :** 
- Remplacez `sk-your-actual-api-key-here` par votre vraie clé API
- Ne commitez jamais ce fichier `.env.local` dans Git
- Le fichier `.env.local` est déjà dans `.gitignore`

**🔧 Configuration avancée :**
- `OPENAI_MODEL` : Choisissez le modèle (gpt-4o-mini, gpt-4o, gpt-3.5-turbo)
- `OPENAI_MAX_TOKENS` : Limite de tokens pour les réponses (150 = réponses très courtes, 300 = réponses courtes, 500+ = réponses longues)

### 3. Redémarrer le serveur

```bash
cd personas-unified-demo
npm run dev
```

## 🎯 Fonctionnalités du Nouveau Système

### Réponses Dynamiques
- Chaque persona répond selon son profil réel (âge, statut, valeurs, motivations)
- Les réponses sont générées en temps réel par GPT-4o-mini
- Cohérence parfaite avec les données du persona

### Données Utilisées
Le système utilise toutes les données du persona :
- Identité et profil (âge, statut, situation)
- Système de croyances et perception des médias
- Pratiques et canaux utilisés
- Valeurs et motivations
- Besoins et freins
- Tonalité et éléments à éviter
- Accessibilité et formats préférés
- Fenêtre d'attention
- Et bien plus...

### Exemple de Prompt Généré
```
Tu es Nina, 14 ans, collégienne.

PROFIL COMPLET:
- Identité: Collégienne connectée, passionnée de TikTok
- Système de croyances: Curieuse mais parfois naïve face à l'info
- Perception des médias: Préfère les formats courts et fun
- Canaux utilisés: TikTok, Instagram, YouTube
- Valeurs: Amitié, authenticité, fun
- Besoins: Comprendre l'info de façon simple et amusante
- Motivations: Rester connectée avec ses amis
- Fenêtre d'attention: Très courte (quelques secondes)
- Tonalité: Décontractée, jeune, enthousiaste
- À éviter: Jargon technique, formats longs, ton sérieux

Réponds à cette question en restant parfaitement fidèle à ton profil...
```

## 🔧 Dépannage

### Erreur "OpenAI API key not configured"
- Vérifiez que le fichier `.env.local` existe
- Vérifiez que la clé API est correcte
- Redémarrez le serveur après avoir ajouté la clé

### Erreur "Missing required fields"
- Vérifiez que le paramètre `site` est passé au composant PersonaChat
- Vérifiez que les données du persona sont chargées correctement

### Réponses génériques
- Vérifiez que les données du persona sont complètes dans le fichier JSON
- Vérifiez que le modèle GPT-4o-mini est disponible sur votre compte OpenAI

## 💰 Coûts

- GPT-4o-mini est très économique (environ $0.00015 par 1K tokens)
- Une conversation typique coûte moins de $0.01
- Surveillez votre utilisation sur le dashboard OpenAI

## 🚀 Avantages du Nouveau Système

1. **Authenticité** : Chaque persona répond selon son vrai profil
2. **Flexibilité** : Pas de réponses pré-écrites limitées
3. **Cohérence** : Respecte parfaitement les données du persona
4. **Évolutivité** : Facile d'ajouter de nouveaux personas
5. **Maintenance** : Plus besoin de maintenir des réponses statiques

## 📝 Notes Techniques

- Modèle utilisé : `gpt-4o-mini`
- Max tokens : 300 (réponses concises)
- Temperature : 0.8 (créativité modérée)
- Timeout : Géré par Next.js
- Cache : Pas de cache pour des réponses toujours fraîches
