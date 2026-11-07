# Cohorte — Brief projet

> **De** : Lead front, Helix Lab
> **À** : Dev front junior
> **Objet** : premier projet, outil interne de veille d'essais cliniques
> *(Helix Lab est une entreprise fictive, créée pour l'exercice.)*

## 1. Contexte

Helix Lab est une startup en oncologie de précision. Nos attachés de recherche clinique (ARC) cherchent chaque jour sur clinicaltrials.gov des essais où orienter des patients. Le site est lent à parcourir, les fiches sont longues et ils tiennent leurs présélections dans Excel.

On veut un outil interne, **Cohorte**, qui leur permette de :
1. trouver vite les essais pertinents (recherche + filtres) ;
2. comprendre un essai en 30 secondes (fiche lisible) ;
3. tenir une **shortlist annotée** (retenu / écarté / à évaluer) et l'exporter ;
4. avoir une vue d'ensemble chiffrée d'une pathologie (phases, statuts, pays).

## 2. Utilisatrice principale

**Claire, ARC, 34 ans.** Pas technique. Travaille sur un écran de portable 14", parfois sur tablette en réunion. Lit l'anglais médical (les données de l'API sont en anglais, l'interface est en français). Elle veut de la densité d'information sans fouillis, et ne veut jamais perdre ses filtres en revenant en arrière.

## 3. Périmètre v1

| Module | Route | Résumé |
|---|---|---|
| Recherche | `/` | Recherche par pathologie, filtres, tableau de résultats paginé |
| Fiche essai | `/studies/:nctId` | Détail lisible d'un essai |
| Shortlist | `/shortlist` | Essais sauvegardés, statut de revue, notes, export CSV |
| Analyse | `/insights` | KPIs et graphiques sur une pathologie |

**Hors périmètre :** authentification, backend, synchronisation entre utilisateurs.

## 4. Stack imposée

| Besoin | Choix |
|---|---|
| Build | Vite + React + TypeScript (`strict: true`) |
| Routing | React Router (l'état des filtres vit dans l'URL) |
| Données serveur | TanStack Query |
| Styles | SCSS Modules + custom properties CSS. **Pas de librairie UI** (MUI, Tailwind, shadcn…) : on veut voir ton CSS. |
| Graphiques | Recharts (ou SVG fait main si tu préfères) |
| Tests | Vitest + Testing Library + MSW |
| Qualité | oxlint + Prettier (voir ADR 0004) |
| CI / déploiement | GitHub Actions, Netlify ou Vercel |

## 5. Conventions

- **Une branche par ticket :** `feat/COH-07-results-table`, `fix/COH-07-empty-state`.
- **Commits :** Conventional Commits en anglais. Exemple : `feat(search): add phase filter`.
- **Une PR par ticket**, avec ce modèle :
  ```
  ## What
  ## Why
  ## How to test
  ## Screenshots
  ```
  Relis ton diff sur GitHub avant de merger.
- **Langues :** code en anglais, UI en français.
- **Arborescence par feature :**
  ```
  src/
  ├── app/            # routes, providers, layout
  ├── features/
  │   ├── search/
  │   ├── study/
  │   ├── shortlist/
  │   └── insights/
  └── shared/
      ├── api/        # client ClinicalTrials.gov, types, mappers
      ├── ui/         # Button, Badge, Table, Drawer…
      └── styles/     # tokens, reset, mixins
  ```
- Les composants ne manipulent jamais la réponse brute de l'API. Ils reçoivent des modèles internes (`StudySummary`, `StudyDetail`) produits par des mappers testés.

## 6. Definition of Done (pour chaque ticket)

- [ ] Critères d'acceptation remplis
- [ ] `npm run lint`, `npm run typecheck`, `npm run test:run` passent ; CI verte
- [ ] États chargement / erreur / vide gérés
- [ ] Utilisable au clavier, focus visible
- [ ] Correct de 360 px à 1440 px de large
- [ ] Pas de `any`, pas de `console.log` oubliés
- [ ] PR décrite avec capture d'écran

## 7. Règle IA

Tu codes toi-même. Claude sert de documentation pour des questions ponctuelles (voir `CLAUDE.md`). Désactive l'autocomplétion IA dans l'éditeur.

## 8. Planning indicatif (temps plein)

| Sprint | Durée | Tickets |
|---|---|---|
| 0 — Setup | 2 j | COH-01 → 04 |
| 1 — Recherche | 1 sem. | COH-05 → 10 |
| 2 — Fiche & shortlist | 1 sem. | COH-11 → 14 |
| 3 — Analyse & qualité | 1 sem. | COH-15 → 19 |
| Bonus | — | COH-B* |

Si tu prends du retard, ce n'est pas grave. Ce qui compte, c'est la qualité de ce qui est livré.

## 9. Maquette

Maquette haute fidélité : https://claude.ai/artifact/AcT8WraXWdKWExRCgP3zcx

7 planches : Recherche, Fiche essai, Shortlist, Analyse, Recherche mobile, Drawer filtres mobile, Design tokens.
Les couleurs, typos, espacements et rayons de la planche « Design tokens » deviennent tes custom properties (COH-04).
Les états chargement / erreur / vide ne sont pas dessinés : conçois-les dans le même style.
