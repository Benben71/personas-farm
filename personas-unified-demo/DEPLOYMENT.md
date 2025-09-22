# Guide de Déploiement - Personas Unified Demo

## 🚀 Déploiement sur Vercel

### 1. Préparation du Repository

```bash
# Cloner le repository (si pas déjà fait)
git clone <votre-repo-url>
cd personas-unified-demo

# Vérifier que tout fonctionne localement
npm install
npm run build
npm run dev
```

### 2. Configuration Vercel

#### A. Via l'interface Vercel
1. Connecter votre compte GitHub à Vercel
2. Importer le repository `personas-unified-demo`
3. Configurer les paramètres de build :
   - **Framework Preset** : Next.js
   - **Root Directory** : `.` (racine)
   - **Build Command** : `npm run build`
   - **Output Directory** : `.next`
   - **Install Command** : `npm install`

#### B. Variables d'environnement
Configurer dans Vercel Dashboard > Settings > Environment Variables :

```
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_BASE_URL=https://votre-app.vercel.app
NEXT_PUBLIC_THEME_INFO_ENABLED=true
NEXT_PUBLIC_THEME_PASTEUR_ENABLED=true
```

### 3. Déploiement

```bash
# Option 1: Déploiement automatique via Git
git add .
git commit -m "Initial deployment"
git push origin main

# Option 2: Déploiement manuel via CLI
npm install -g vercel
vercel --prod
```

## 🌐 URLs de Production

Après déploiement, votre application sera accessible via :

- **Sélecteur de thème** : `https://votre-app.vercel.app`
- **Thème Info** : `https://votre-app.vercel.app?site=info`
- **Thème Pasteur** : `https://votre-app.vercel.app?site=pasteur`
- **Persona individuel** : `https://votre-app.vercel.app/persona/[id]?site=[theme]`

## 📱 Exemples d'URLs

```
https://personas-demo.vercel.app
https://personas-demo.vercel.app?site=info
https://personas-demo.vercel.app?site=pasteur
https://personas-demo.vercel.app/persona/nina?site=info
https://personas-demo.vercel.app/persona/clara?site=pasteur
```

## 🔧 Configuration Avancée

### Domaine Personnalisé
1. Dans Vercel Dashboard > Settings > Domains
2. Ajouter votre domaine personnalisé
3. Configurer les DNS selon les instructions Vercel

### Optimisations
- **Images** : Optimisation automatique via Next.js Image
- **Performance** : Lazy loading et code splitting
- **SEO** : Meta tags dynamiques par thème

## 🧪 Tests Post-Déploiement

```bash
# Tester les URLs de production
curl -I https://votre-app.vercel.app
curl -I "https://votre-app.vercel.app?site=info"
curl -I "https://votre-app.vercel.app?site=pasteur"
```

## 📊 Monitoring

- **Vercel Analytics** : Activé par défaut
- **Performance** : Monitoring automatique
- **Erreurs** : Logs disponibles dans Vercel Dashboard

## 🔄 Mises à Jour

Pour mettre à jour l'application :

1. Modifier le code localement
2. Tester avec `npm run dev`
3. Commiter et pusher vers GitHub
4. Vercel déploie automatiquement

```bash
git add .
git commit -m "Update personas data"
git push origin main
```

## 🆘 Dépannage

### Erreurs Communes

1. **Build Failed** : Vérifier les dépendances dans `package.json`
2. **404 sur les personas** : Vérifier les fichiers JSON dans `src/data/`
3. **Images manquantes** : Vérifier les chemins dans `public/`

### Logs
- Vercel Dashboard > Functions > View Function Logs
- Ou via CLI : `vercel logs`

## 📞 Support

- **Documentation Vercel** : https://vercel.com/docs
- **Documentation Next.js** : https://nextjs.org/docs
- **Issues GitHub** : Créer une issue dans le repository
