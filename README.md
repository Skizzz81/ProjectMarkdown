# ProjectMarkdown

Groupe:
Zbiri Mountasir 
Sireyjol Victor
Valentin

###  Important - Premier lancement
Si vous rencontrez des problèmes au démarrage, videz le localStorage de votre navigateur 

## Description
Éditeur Markdown avec gestion de fichiers, bibliothèque d'images et bibliothèque de blocs réutilisables.

## Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

## Installation

1. Cloner le repository
```bash
git clone https://github.com/Skizzz81/ProjectMarkdown.git
cd ProjectMarkdown
```

2. Installer les dépendances
```bash
npm install
```

## Lancer le projet

### Mode développement
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:5173/`

### Build de production
```bash
npm run build
```

### Prévisualiser le build
```bash
npm run preview
```

## Fonctionnalités

- **Éditeur Markdown** : Édition en temps réel avec prévisualisation
- **Gestion de fichiers** : Créer, éditer, supprimer des fichiers et dossiers
- **Bibliothèque d'images** : Upload, gestion et insertion d'images en Base64
- **Bibliothèque de blocs** : Créer et réutiliser des snippets markdown
- **Import/Export** : Sauvegarde des fichiers (.md), images (.imgs.mdlc) et blocs (.part.mdlc/.parts.mdlc)
- **Persistence** : Sauvegarde automatique dans localStorage


