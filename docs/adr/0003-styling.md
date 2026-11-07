# ADR 0003 — SCSS Modules + design tokens, pas de librairie UI

- **Statut** : accepté
- **Date** : 2026-11-05

## Décision

- Un fichier `Composant.module.scss` à côté de chaque composant.
- Toutes les valeurs passent par les custom properties de `shared/styles/_tokens.scss`.
- Breakpoints et utilitaires via `@use 'shared/styles/mixins' as *;` (le chemin est résolu grâce à `loadPaths` dans `vite.config.ts`).
- Mobile first : styles de base pour mobile, puis `@include up(md) { … }`.
- Pas de MUI, Tailwind, shadcn, etc.

## Pourquoi

L'outil est petit et la maquette est spécifique. Une librairie UI ajouterait du poids et nous ferait lutter contre ses styles. Les custom properties préparent aussi le mode sombre (COH-B2).

## Conséquences

- ⚠️ Les composants accessibles complexes (drawer, tabs, toast) sont à écrire nous-mêmes. Respecte les patterns WAI-ARIA APG.
