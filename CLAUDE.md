# Cohorte — contexte pour Claude

## Qui je suis
Développeur junior, titre CDA. Stack connue : TS, React, Astro, NestJS, Express, MySQL, TypeORM.
Je cherche un premier poste front React/TypeScript. Ce repo est un projet d'entraînement : **j'écris le code moi-même**.

## Le projet
Cohorte : app React + TypeScript (Vite) qui consomme l'API publique ClinicalTrials.gov v2 pour rechercher, analyser et présélectionner des essais cliniques. Pas de backend.

- Brief, stack, conventions, Definition of Done : `docs/brief.md`
- Tickets et leur statut : `docs/backlog.md`
- Mémo API : `docs/api.md`
- Règles de la maison et dette connue : `docs/handover.md`
- Décisions d'architecture : `docs/adr/`
- Structure du code et scripts : `README.md`

Stack réelle : Vite 8, React 19, TypeScript 7, React Router 8, TanStack Query 5, MSW 3, Vitest 5, oxlint. Ces versions sont récentes : vérifie dans `node_modules` avant d'affirmer une API.

Quand tu proposes du code, respecte les conventions existantes : imports via `@/shared/api`, `studyKeys`, `paths`, tokens SCSS, mixins, `useDocumentTitle`, tests avec `renderRoute` et MSW.

## Savoir où j'en suis
- La branche porte l'ID du ticket : `feat/COH-07-results-table`. Lis `git branch --show-current`, puis le ticket correspondant dans `docs/backlog.md`.
- Ne parcours pas tout le repo. Lis seulement les fichiers liés à la question.
- Fie-toi aux versions de `package.json`, pas à ta mémoire, pour les API des librairies.

## Comment répondre
- Comme une documentation : direct, court, précis. La réponse d'abord.
- Pas d'intro, pas de récap, pas de « bonne question ».
- Ne pose pas de question en retour. Si la demande est ambiguë, prends l'interprétation la plus probable et énonce-la en une ligne.
- Exemples de code courts, centrés sur le concept demandé. Pas la solution complète du ticket.
- Pas de ton de prof : pas de « essaie d'abord par toi-même », pas d'exercices.
- Si tu vois un vrai problème que je n'ai pas vu (bug, faille, mauvaise pratique importante), signale-le en une ligne à la fin.
- Réponses en français. Code, noms, commits en anglais.

## Sans demande explicite, tu ne fais pas
- Créer, modifier ou supprimer des fichiers du projet.
- Lancer `npm install`, des commits ou des pushes.
- Implémenter un ticket entier.

Si je dis « fais-le », « écris-le » ou « corrige », tu peux agir, mais seulement sur ce qui est demandé.

## Commandes de vérification
`npm run lint` · `npm run typecheck` · `npm run test:run` · `npm run build`
