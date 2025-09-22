# Personas Unified Demo

Application de démonstration multi-thème pour les personas d'éducation aux médias et d'exposition Pasteur.

## 🚀 Déploiement sur Vercel

### Prérequis
- Compte Vercel
- Repository Git (GitHub, GitLab, Bitbucket)

### Étapes de déploiement

1. **Connecter le repository à Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Cliquer sur "New Project"
   - Importer le repository Git

2. **Configuration automatique**
   - Vercel détectera automatiquement Next.js
   - Les paramètres dans `vercel.json` seront appliqués automatiquement

3. **Variables d'environnement (optionnel)**
   - Si vous souhaitez activer le chat IA, ajouter :
     - `OPENAI_API_KEY` : Votre clé API OpenAI

4. **Déploiement**
   - Cliquer sur "Deploy"
   - L'application sera accessible via l'URL fournie par Vercel

### 🌐 URLs de l'application déployée

- **Page d'accueil (Info par défaut)** : `https://votre-app.vercel.app`
- **Thème Info** : `https://votre-app.vercel.app?site=info`
- **Thème Pasteur** : `https://votre-app.vercel.app?site=pasteur`
- **Persona individuel** : `https://votre-app.vercel.app/persona/[id]?site=[theme]`

### 📊 Analytics

L'application intègre automatiquement Vercel Analytics pour le suivi des visites.

### 🛠️ Structure du projet

```
personas-unified-demo/
├── src/
│   ├── app/                 # Pages Next.js App Router
│   ├── components/          # Composants React
│   ├── data/               # Données des personas
│   ├── lib/                # Utilitaires
│   ├── themes/             # Configuration des thèmes
│   └── types/              # Types TypeScript
├── public/                 # Assets statiques
├── vercel.json            # Configuration Vercel
├── next.config.js         # Configuration Next.js
└── package.json           # Dépendances
```

### 🎯 Fonctionnalités

- ✅ **Multi-thème** : Info (Éducation aux médias) et Pasteur (Exposition)
- ✅ **Navigation dynamique** : Dropdown des personas
- ✅ **Pages personas complètes** : Tous les champs v3 affichés
- ✅ **Chat IA** : Conversation avec les personas (optionnel)
- ✅ **Responsive design** : Mobile-first avec Tailwind CSS
- ✅ **Analytics intégrés** : Suivi automatique avec Vercel Analytics

### 🔧 Développement local

```bash
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

### 📝 Notes

- Les pages "Vision globale" et "Stratégie numérique" sont désactivées dans la navigation
- Le chat IA fonctionne avec des réponses de fallback si l'API OpenAI n'est pas configurée
- L'application est optimisée pour la production avec Next.js 15 et Turbopack