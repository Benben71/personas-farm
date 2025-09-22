# 🔧 Guide de Dépannage - Erreur 404 Vercel

## 🚨 Problème : Erreur 404 NOT_FOUND

### Causes possibles et solutions :

### 1. **Build échoué silencieusement**
**Symptôme** : Erreur 404 immédiate après déploiement
**Solution** :
- Vérifier les logs de build dans le dashboard Vercel
- Aller dans "Functions" → Voir les erreurs de build
- Re-déployer après correction

### 2. **Variables d'environnement manquantes**
**Symptôme** : Application ne démarre pas
**Solution** :
- Vérifier que toutes les variables d'environnement sont définies
- `NEXT_PUBLIC_DEMO_MODE=true` doit être défini

### 3. **Problème de routing Next.js**
**Symptôme** : Pages individuelles retournent 404
**Solution** :
- Vérifier que `src/app/page.tsx` existe
- Vérifier que `src/app/layout.tsx` est correct
- S'assurer que les routes dynamiques sont bien configurées

### 4. **Erreur de dépendances**
**Symptôme** : Build réussi mais runtime error
**Solution** :
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 5. **Problème de types TypeScript**
**Symptôme** : Erreurs de compilation
**Solution** :
- Les types ont été rendus optionnels pour éviter les erreurs
- Si problème persiste, vérifier `src/types/index.ts`

## 🔍 Diagnostic rapide

### Vérifier les logs Vercel :
1. Aller sur dashboard.vercel.com
2. Sélectionner votre projet
3. Onglet "Functions" → Voir les erreurs
4. Onglet "Deployments" → Voir les logs de build

### Test local avant déploiement :
```bash
npm run build
npm start
# Tester http://localhost:3000
```

### Commandes de debug :
```bash
# Vérifier la structure
ls -la src/app/

# Tester le build
npm run build

# Vérifier les types
npx tsc --noEmit
```

## ✅ Checklist de déploiement

- [ ] `npm run build` fonctionne localement
- [ ] `npm start` fonctionne localement  
- [ ] Tous les fichiers nécessaires sont commités
- [ ] `vercel.json` est présent
- [ ] Variables d'environnement définies sur Vercel
- [ ] Pas d'erreurs dans les logs de build Vercel

## 🆘 Solution d'urgence

Si l'erreur persiste :

1. **Rollback** : Utiliser un déploiement précédent qui fonctionnait
2. **Nouveau déploiement** : Créer un nouveau projet Vercel
3. **Support** : Contacter le support Vercel avec les logs d'erreur

## 📞 Informations utiles pour le support

- **Framework** : Next.js 15.5.3
- **Build tool** : Turbopack
- **Node version** : Compatible avec Vercel
- **Région** : cdg1 (Europe)
- **Analytics** : @vercel/analytics intégré
