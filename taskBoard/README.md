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