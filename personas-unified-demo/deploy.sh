#!/bin/bash

# Script de déploiement pour Personas Unified Demo

echo "🚀 Déploiement Personas Unified Demo"
echo "====================================="

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé. Exécutez ce script depuis le répertoire du projet."
    exit 1
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Build de l'application
echo "🔨 Build de l'application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi !"
    echo ""
    echo "🌐 URLs de test:"
    echo "  - Sélecteur: http://localhost:3000"
    echo "  - Thème Info: http://localhost:3000?site=info"
    echo "  - Thème Pasteur: http://localhost:3000?site=pasteur"
    echo ""
    echo "📱 Pour déployer sur Vercel:"
    echo "  1. Connectez le repo à Vercel"
    echo "  2. Configurez les variables d'environnement"
    echo "  3. Déployez automatiquement"
    echo ""
    echo "🎯 URLs de production (après déploiement):"
    echo "  - https://votre-app.vercel.app"
    echo "  - https://votre-app.vercel.app?site=info"
    echo "  - https://votre-app.vercel.app?site=pasteur"
else
    echo "❌ Erreur lors du build"
    exit 1
fi
