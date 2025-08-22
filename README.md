# Examen ATE 2eme session - 2CE-X75-B

## Déboguer, refactorer une application React qui consomme une API

📅 **Durée totale de l'épreuve :** 3h30

🎯 **Objectif :**
Cet examen évalue votre capacité à déboguer une application React existante, à interagir avec une API RESTful ([Contacts API](https://training-node-express-advanced.onrender.com/api)) en utilisant l'API fetch native, à implémenter de nouvelles fonctionnalités et à gérer proprement votre historique de versionnement avec Git.

## 🎬 1. Contexte de l'application

Vous disposez d'un dépôt Git contenant une application React comportant quelques bugs mineurs, qui est censée permettre la gestion de contacts via une API. Votre mission est d'améliorer cette application, d'y ajouter des fonctionnalités et de démontrer de bonnes pratiques de développement.

### Accès à l'API de contacts

L'application utilise l'API de contacts développée au cours. Vous devrez:

- Indiquer la variable d'environnement qui renseigne l'URL de l'API.

Les identifiants sont les suivants:

- nikolas@efp.be - ********
- david@afp.be - ********

## 📝 2. Instructions détaillées

### 2.1. Préparation (5-10 min)

1. **Commencez par forker le dépôt Git fourni:**

   - URL du dépôt Git

2. **Ajoutez-moi au projet:**

   - Compte Git formateur

3. **Clonez ensuite ce dépôt pour avoir une copie locale:**

   ```bash
   git clone [URL_DU_DEPOT_FOURNI]
   cd [NOM_DU_DEPOT]
   ```

4. **Installez les dépendances:**

   ```bash
   npm install
   ```

5. **Créez une nouvelle branche pour chaque étape de votre travail (debug, feature)**

   C'est sur cette / ces branche(s) que vous effectuerez toutes vos modifications et commits pour les étapes du travail.

   ```bash
   git checkout -b debug/layout-styles
   ```

6. **Démarrez l'application et observez son comportement initial:**

   ```bash
   npm run dev
   ```

### 2.2. Débogage (estimation : 1h)

L'application contient plusieurs bugs qui l'empêchent de fonctionner correctement:

- **Problème fonctionnel :** lorsque l'utilisateur n'a encore renseigné aucun contact, il n'est pas possible d'en ajouter.
- **Problème visuel :** lorsqu'un seul contact est affiché, l'affichage de la card est cassé.

### 2.3. Implémentation de fonctionnalités (estimation : 1h15 - 1h30)

Une fois l'application stable et les bugs corrigés, ajoutez au moins **deux (2)** des fonctionnalités suivantes:

**A. Recherche de contacts :** Ajoutez un champ de recherche et un bouton qui permet de rechercher des contacts via une requête HTTP vers l'API. Le paramètre de requête doit être nommé `search`, et doit contenir une chaîne de caractères.

**C. Ajout de favoris (stockage local) :** Permettez aux utilisateurs de marquer des contacts comme "favoris" et de les sauvegarder dans le localStorage du navigateur. Affichez ces favoris sur une page dédiée.

### 2.4. Finalisation (15-20 min)

1. Assurez-vous que votre application fonctionne correctement et que toutes les exigences sont remplies.
2. Vérifiez l'état de votre dépôt Git: assurez-vous que toutes vos modifications sont commises.

### Exigences Git

- Effectuez des commits atomiques et descriptifs pour chaque bug corrigé. Ex: `fix: corrige l'ajout de contacts`, `fix: corrige l'affichage de la card`.
- Chaque fonctionnalité doit faire l'objet d'un ensemble de commits logiques. Idéalement, une fonctionnalité = une série de commits dédiés.
- Utilisez des messages de commit significatifs : ex: `feat: ajoute la fonctionnalité de recherche de contacts`, `feat: implémente les favoris`.
- N'hésitez pas à faire plusieurs petits commits.
- Ouvrez une PR par branche lorsque vous pensez en avoir terminé avec un sujet.
