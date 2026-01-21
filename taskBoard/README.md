# TaskBoard

commandes :

ng new taskboard --routing --style=scss
ng g c home
ng g n about

routing : 
path: 'home', component: Home
path: 'about', component: About


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

## Building

To build the project run:

```bash
ng build
```

## Séquence 2 - Logique réactive du flux de données
### 1. Structure du flux
- Le service TaskService utilise un **BehaviorSubject** pour stocker et diffuser la liste des tâches.
- Le composant 'Home s'abonne à ce flux via 'tasks$' et le **pipe async**.
### 2. Mise à jour des données
- La méthode addTask() ajoute une tâche puis appelle next() pour émettre la nouvelle liste.
- La méthode removeTask()* supprime une tâche puis émet à nouveau la liste mise à jour.
- La vue est automatiquement réactualisée sans rechargement.
### 3. Points clés retenus
- Pas besoin d'appeler. getTasks() à chaque fois : la donnée est **vivante**.
-'| async' gère l'abonnement et le désabonnement automatiquement.
Le flux reste cohérent entre le service et la vue.

## Séquence 3 — Lazy Loading & Composants dynamiques

### Lazy Loading
Le Lazy Loading (chargement paresseux) permet de charger certaines parties de l’application (modules ou routes) uniquement lorsque l’utilisateur en a besoin. Cela accélère le chargement initial de l’application et améliore les performances.

Dans Angular, on structure l’application avec un dossier `features/` qui contient les différentes fonctionnalités (ex : `features/tasks`, `features/about`). Chaque feature peut avoir ses propres routes et être chargée dynamiquement via `loadChildren` dans le routeur principal.

### Composant dynamique
Un composant dynamique est un composant Angular qui n’est pas présent statiquement dans le template, mais qui est créé et inséré à la volée dans le DOM, selon les besoins de l’utilisateur.

Pour cela, on utilise `ViewContainerRef` et la méthode `createComponent()` :
- `ViewContainerRef` est une référence à un conteneur dans le template (souvent via `@ViewChild`).
- `createComponent()` permet d’instancier dynamiquement un composant et de l’injecter dans ce conteneur.

Cela permet d’afficher des composants à la demande, comme une mise en avant de tâche ou une modale.

## Séquence 4 — Tests Unitaires Angular

### 📚 Ce que j'ai appris

#### 1. Pourquoi tester ?
- Les tests permettent de garantir que le code fonctionne comme attendu, d’éviter les régressions et de faciliter la maintenance.
- Sans tests, le risque est d’introduire des bugs lors de modifications ou d’ajouts de fonctionnalités, sans s’en rendre compte.
- Exemple concret : Lors de l’ajout de la suppression de tâche, un test m’a permis de voir qu’une tâche n’était pas bien retirée du tableau, ce qui aurait pu passer inaperçu sans test.

#### 2. Outils utilisés
- **Jasmine** : Framework de tests pour écrire des specs (tests unitaires) en JavaScript/TypeScript.
- **Karma** : Lanceur de tests qui exécute les specs dans un navigateur et affiche les résultats.
- **TestBed** : Outil Angular pour configurer et injecter des dépendances dans les tests de composants/services.

#### 3. Concepts clés maîtrisés
- **AAA Pattern** : Arrange (préparer), Act (agir), Assert (vérifier le résultat). Structure claire pour chaque test.
- **Mocks** : Fausse version d’un service ou d’une dépendance, pour isoler le test du composant/service réel.
- **Spies** : Fonctions espions pour vérifier qu’une méthode a bien été appelée, avec quels arguments, etc.
- **Fixture & detectChanges()** : Permettent de manipuler et de rafraîchir le DOM d’un composant lors des tests.

---

### Liste des tests utilisés

- **task.spec.ts**
  - Création du service Task
  - Ajout d’une tâche (vérifie que la tâche est bien ajoutée)
  - Suppression d’une tâche (vérifie que la tâche est bien supprimée)
  - Utilisation d’un mock service pour tester le composant TasksPage sans dépendre du vrai service

- **task-highlight.simple.spec.ts**
  - Vérifie que le composant TaskHighlight initialise bien la propriété `title` à une chaîne vide

- **tasks-page.component.html / tasks-page.component.ts**
  - Test de l’input de saisie de tâche : vérifie que l’utilisateur peut saisir un titre, soumettre le formulaire, que l’input se vide et que la tâche apparaît dans la liste.

### Commande pour lancer les tests

```bash
ng test
```

Pour cibler un seul fichier de test (Angular CLI >= 12) :
```bash
ng test --include=src/app/features/tasks/task-highlight/task-highlight.simple.spec.ts
```

### Résultats
- Tous les tests passent avec succès (création, ajout, suppression, mock, initialisation de composant).
- Les tests m’ont permis de corriger des erreurs de logique et d’assurer la robustesse de l’application.