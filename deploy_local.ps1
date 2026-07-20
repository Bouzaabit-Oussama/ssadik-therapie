# Script de déploiement local Firebase pour Ssadik Thérapie
# Ce script utilise la version portable de Node.js présente dans le projet.

Clear-Host
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Déploiement Local Firebase - Ssadik Thérapie            " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Configurer le PATH temporaire pour inclure Node.js portable et Git portable
$scriptDir = $PSScriptRoot
if (!$scriptDir) {
    $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
}

if (Test-Path "$scriptDir\node-portable") {
    $env:PATH = "$scriptDir\node-portable;$env:PATH"
    Write-Host "-> Utilisation de Node.js portable détecté." -ForegroundColor Yellow
}
if (Test-Path "$scriptDir\mingit") {
    $env:PATH = "$scriptDir\mingit\cmd;$env:PATH"
    Write-Host "-> Utilisation de Git portable détecté." -ForegroundColor Yellow
}

# 2. Vérifier si Node.js est disponible
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[ERREUR] Node.js n'a pas été trouvé." -ForegroundColor Red
    Write-Host "Veuillez télécharger et installer Node.js depuis https://nodejs.org/ pour continuer." -ForegroundColor Yellow
    Read-Host "Appuyez sur Entrée pour quitter..."
    exit
}

# 3. Installation des dépendances
Write-Host "-> Installation des modules du projet (npm install)..." -ForegroundColor Green
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERREUR] L'installation des dépendances a échoué." -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour fermer..."
    exit
}

# 4. Compilation du projet
Write-Host ""
Write-Host "-> Compilation du site en production (npm run build)..." -ForegroundColor Green
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERREUR] La compilation du projet a échoué." -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour fermer..."
    exit
}

# 5. Connexion Firebase
Write-Host ""
Write-Host "-> Connexion à votre compte Google Firebase (firebase login)..." -ForegroundColor Green
# Utilise npx pour lancer firebase-tools de manière interactive
npx -y firebase-tools login

# 6. Déploiement
Write-Host ""
Write-Host "-> Déploiement en cours sur Firebase Hosting (firebase deploy)..." -ForegroundColor Green
npx -y firebase-tools deploy

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host "  Succès ! Votre site est en ligne sur vos domaines.     " -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Green
} else {
    Write-Host "[ERREUR] Le déploiement a échoué. Veuillez vérifier les logs ci-dessus." -ForegroundColor Red
}

Write-Host ""
Read-Host "Appuyez sur Entrée pour fermer cette fenêtre..."
