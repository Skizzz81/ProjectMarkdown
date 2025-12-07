# Gestion des Blocs - Documentation

## Vue d'ensemble
Le système de gestion des blocs permet de créer, sauvegarder et insérer rapidement des snippets de markdown réutilisables.

## Fonctionnalités

### 1. Création de blocs
- **Nom** : Identifiant unique pour le bloc (obligatoire)
- **Contenu** : Le code markdown à sauvegarder (obligatoire)
- **Raccourci** : Mot-clé optionnel pour insertion rapide

### 2. Bibliothèque de blocs
- Affichage en grille de tous les blocs sauvegardés
- Actions disponibles par bloc :
  - ✏️ Modifier : éditer le nom, contenu et raccourci
  - 📤 Exporter : sauvegarder un bloc individuel (.part.mdlc)
  - 🗑️ Supprimer : retirer le bloc de la bibliothèque

### 3. Insertion rapide (dans l'éditeur)
Deux méthodes d'insertion :
- **Par raccourci** : taper le raccourci + Entrée dans le champ de saisie
- **Par clic** : cliquer sur le bouton "+ Insérer" du bloc souhaité

### 4. Import/Export
- **Export individuel** : format `.part.mdlc`
- **Export global** : format `.parts.mdlc` (tous les blocs)
- **Import** : accepte les deux formats, ajoute les blocs à la bibliothèque existante

## Structure des fichiers

### Redux
- `src/store/slices/blocks.js` : gestion d'état avec Redux Toolkit
- Actions disponibles :
  - `addBlock(name, content, shortcut)`
  - `updateBlock(id, updates)`
  - `deleteBlock(id)`
  - `clearLibrary()`
  - `importLibrary(blocks)`
  - `loadLibraryFromLocalStorage()`

### Composants
- `BlockLibrary.jsx` : page principale avec CRUD complet
- `BlockCreator.jsx` : formulaire de création/édition
- `BlockInsert.jsx` : sidebar dans l'éditeur pour insertion rapide
- `BlockLibraryPage.jsx` : wrapper de page avec layout

### Persistence
- LocalStorage : clé `markdown-blocks`
- Sauvegarde automatique à chaque modification via middleware Redux

## Format de fichier (.part.mdlc / .parts.mdlc)

```json
[
  {
    "id": 1,
    "name": "En-tête de document",
    "content": "# Titre\n\n## Description\n\nContenu...",
    "shortcut": "header",
    "createdDate": "2024-01-15T10:30:00.000Z"
  }
]
```

## Navigation
- Route : `/blocks`
- Lien NavBar : "Bibliothèque de blocs"
- Sidebar éditeur : composant "Blocs rapides"

## Utilisation recommandée

1. Créer des blocs pour :
   - En-têtes de documents standardisés
   - Snippets de code fréquemment utilisés
   - Templates de tableaux markdown
   - Sections répétitives

2. Définir des raccourcis courts et mémorables :
   - `h1`, `header` pour en-têtes
   - `table`, `tab` pour tableaux
   - `code`, `snippet` pour code

3. Exporter régulièrement la bibliothèque pour backup
