# Système de Chatbot Hybride

## 🎯 Vue d'ensemble

Le chatbot utilise maintenant un **système hybride intelligent** qui fonctionne avec ou sans clé API OpenAI :

1. **Avec clé API OpenAI** : Réponses générées dynamiquement par GPT-4o-mini
2. **Sans clé API OpenAI** : Réponses contextuelles intelligentes basées sur les données réelles des personas

## 🔧 Fonctionnement du Système

### Mode OpenAI (Recommandé)
- Utilise GPT-4o-mini pour générer des réponses naturelles
- Respecte parfaitement le profil et la personnalité du persona
- Réponses fluides et contextuelles
- Coût : ~$0.01 par conversation

### Mode Fallback (Intelligent)
- Utilise les données réelles des personas (âge, statut, valeurs, motivations)
- Génère des réponses contextuelles basées sur le contenu du message
- Fonctionne sans clé API
- Gratuit et toujours disponible

## 📊 Exemples de Réponses

### Jean (74 ans, retraité)
**Question :** "Peux-tu te présenter ?"
**Réponse :** "Salut ! Je suis Jean, j'ai 74 ans et je suis Retraité engagé. Ancien professeur HG, suit l'actualité mais se sent dépassé par la vitesse. Mes valeurs principales sont : Vérité historique, Transmission, Stabilité. Je suis motivé par : Rester connecté, Aider ses petits-enfants."

### Nina (14 ans, collégienne)
**Question :** "Peux-tu te présenter ?"
**Réponse :** "Salut ! Je suis Nina, j'ai 14 ans et je suis Collégienne (3e). Urbain, forte sociabilité en ligne. Mes valeurs principales sont : Authenticité, Amitié, Créativité, Expression. Je suis motivé par : Partager avec ses amis, Se sentir actrice, Apprendre en s'amusant."

## 🎨 Catégories de Réponses Contextuelles

Le système détecte automatiquement le type de question et adapte la réponse :

### 1. Présentation
- **Mots-clés :** "présenter", "présente", "qui es-tu"
- **Réponse :** Profil complet avec âge, statut, valeurs, motivations

### 2. Services en ligne / Médias
- **Mots-clés :** "service", "en ligne", "médias", "information"
- **Réponse :** Préférences basées sur le profil et les canaux utilisés

### 3. Expositions / Musées
- **Mots-clés :** "expo", "musée", "visite", "exposition", "aimes", "aime"
- **Réponse :** Intérêts basés sur les valeurs et motivations

### 4. Réseaux sociaux
- **Mots-clés :** "réseau", "tiktok", "instagram", "social", "youtube", "twitch"
- **Réponse :** Usage des plateformes selon le profil

### 5. Questions générales
- **Réponse :** Générique mais personnalisée avec les données du persona

## 🔄 Transition Automatique

Le système bascule automatiquement entre les deux modes :

```typescript
// Vérification de la clé API
if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('test-key-placeholder')) {
  // Mode fallback intelligent
  return generateContextualResponse(personaId, message, site);
} else {
  // Mode OpenAI
  return await generateDynamicResponse(personaId, message, site);
}
```

## 📈 Avantages du Système Hybride

### ✅ Toujours Fonctionnel
- Le chatbot fonctionne même sans clé API OpenAI
- Pas de panne en cas de problème avec l'API
- Déploiement possible sans configuration externe

### ✅ Réponses Personnalisées
- Utilise les vraies données des personas
- Âge, statut, valeurs, motivations corrects
- Cohérence avec le profil réel

### ✅ Évolutif
- Facile d'ajouter de nouveaux personas
- Pas de maintenance des réponses pré-écrites
- Système automatique et intelligent

### ✅ Économique
- Mode fallback gratuit
- Mode OpenAI optionnel et économique
- Pas de coûts cachés

## 🚀 Configuration

### Pour utiliser le mode OpenAI :
1. Obtenir une clé API sur [platform.openai.com](https://platform.openai.com/)
2. Créer `.env.local` :
   ```bash
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```
3. Redémarrer le serveur

### Pour utiliser le mode fallback :
- Aucune configuration nécessaire
- Fonctionne immédiatement
- Utilise les données locales des personas

## 🎯 Résultat

**Avant :** Messages de bienvenue incorrects (ex: Jean disait "45 ans, enseignant")
**Maintenant :** Messages corrects basés sur les vraies données (Jean : "74 ans, retraité engagé")

Le système est maintenant **robuste, intelligent et toujours fonctionnel** !
