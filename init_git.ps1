# Script d'initialisation Git pour Ssadik Thérapie
# Ce script doit être exécuté dans un terminal PowerShell local disposant de Git.

Clear-Host
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Initialisation de Git - Ssadik Thérapie Landing Page    " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Vérifier si git est installé localement
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "[ERREUR] Git n'est pas installé sur cette machine." -ForegroundColor Red
    Write-Host "Veuillez installer Git depuis https://git-scm.com et réessayez." -ForegroundColor Yellow
    Read-Host "Appuyez sur Entrée pour quitter..."
    exit
}

# 2. Initialiser le dépôt
if (!(Test-Path ".git")) {
    Write-Host "-> Initialisation du dépôt Git local..." -ForegroundColor Green
    git init
} else {
    Write-Host "-> Dépôt Git local déjà existant." -ForegroundColor Yellow
}

# 3. Ajouter les fichiers et créer le commit
Write-Host "-> Ajout des fichiers au commit..." -ForegroundColor Green
git add .
git commit -m "Initialisation Landing Page Ssadik Therapie"
git branch -M main

# 4. Demander l'URL du dépôt GitHub distant
Write-Host ""
Write-Host "Veuillez créer un dépôt vide sur votre compte GitHub." -ForegroundColor Yellow
$repoUrl = Read-Host "Entrez l'URL HTTPS de votre dépôt GitHub (ex: https://github.com/username/repo.git)"

if ($repoUrl) {
    # Nettoyer l'URL
    $repoUrl = $repoUrl.Trim()
    
    # Supprimer l'ancien remote origin s'il existe
    git remote remove origin 2>$null
    
    # Ajouter le nouveau remote et pousser
    Write-Host "-> Liaison avec le dépôt distant..." -ForegroundColor Green
    git remote add origin $repoUrl
    
    Write-Host "-> Envoi du code vers GitHub (branche main)..." -ForegroundColor Green
    Write-Host "Une fenêtre d'authentification GitHub peut s'ouvrir, veuillez vous connecter." -ForegroundColor Yellow
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "==========================================================" -ForegroundColor Green
        Write-Host "  Succès ! Le code a été poussé sur GitHub.               " -ForegroundColor Green
        Write-Host "  Le déploiement automatique sur Firebase va démarrer.    " -ForegroundColor Green
        Write-Host "==========================================================" -ForegroundColor Green
    } else {
        Write-Host "[ERREUR] Échec de l'envoi du code. Vérifiez vos permissions ou l'URL." -ForegroundColor Red
    }
} else {
    Write-Host "-> Aucune URL saisie. Dépôt configuré localement uniquement." -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Appuyez sur Entrée pour fermer cette fenêtre..."
