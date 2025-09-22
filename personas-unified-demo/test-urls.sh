#!/bin/bash

# Script de test des URLs pour Personas Unified Demo

echo "🧪 Test des URLs Personas Unified Demo"
echo "======================================"

BASE_URL="http://localhost:3000"

# Fonction pour tester une URL
test_url() {
    local url="$1"
    local description="$2"
    
    echo -n "Testing $description... "
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$response" = "200" ]; then
        echo "✅ OK ($response)"
    else
        echo "❌ FAIL ($response)"
    fi
}

echo ""
echo "🔍 Test des pages principales:"

# Test des pages principales
test_url "$BASE_URL" "Page d'accueil (défaut Info)"
test_url "$BASE_URL?site=info" "Thème Info"
test_url "$BASE_URL?site=pasteur" "Thème Pasteur"

echo ""
echo "🔍 Test des pages personas (Info):"

# Test des premières personas Info
test_url "$BASE_URL/persona/nina?site=info" "Persona Nina (Info)"
test_url "$BASE_URL/persona/lucas?site=info" "Persona Lucas (Info)"
test_url "$BASE_URL/persona/mateo?site=info" "Persona Mateo (Info)"

echo ""
echo "🔍 Test des pages personas (Pasteur):"

# Test des premières personas Pasteur
test_url "$BASE_URL/persona/clara?site=pasteur" "Persona Clara (Pasteur)"
test_url "$BASE_URL/persona/karim?site=pasteur" "Persona Karim (Pasteur)"
test_url "$BASE_URL/persona/marie?site=pasteur" "Persona Marie (Pasteur)"

echo ""
echo "🔍 Test des pages de navigation:"

# Test des pages de navigation
test_url "$BASE_URL/vision?site=info" "Vision globale (Info)"
test_url "$BASE_URL/strategie?site=info" "Stratégie numérique (Info)"
test_url "$BASE_URL/vision?site=pasteur" "Vision globale (Pasteur)"
test_url "$BASE_URL/strategie?site=pasteur" "Stratégie numérique (Pasteur)"

echo ""
echo "🔍 Test des cas d'erreur:"

# Test des cas d'erreur
test_url "$BASE_URL?site=invalid" "Site invalide (redirige vers Info)"
test_url "$BASE_URL/persona/inexistant?site=info" "Persona inexistant"

echo ""
echo "✅ Tests terminés !"
echo ""
echo "💡 URLs de démonstration:"
echo "  - Page d'accueil (Info par défaut): $BASE_URL"
echo "  - Info: $BASE_URL?site=info"
echo "  - Pasteur: $BASE_URL?site=pasteur"
