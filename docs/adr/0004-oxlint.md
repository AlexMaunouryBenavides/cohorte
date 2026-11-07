# ADR 0004 — oxlint plutôt qu'ESLint

- **Statut** : accepté
- **Date** : 2026-11-05

## Contexte

Le template Vite actuel génère une config oxlint. Le brief initial mentionnait ESLint.

## Décision

On garde **oxlint** (plugins `react`, `typescript`, `jsx-a11y`, `vitest`, `oxc`), avec `--deny-warnings` : un warning fait échouer la CI.

## Pourquoi

Beaucoup plus rapide, zéro config pour les règles courantes, règles d'accessibilité JSX incluses. Les règles dont on a besoin (`rules-of-hooks`, `exhaustive-deps`, `no-explicit-any`, `no-console`) existent.

## Conséquences

- Extension VS Code recommandée : `oxc.oxc-vscode` (voir `.vscode/extensions.json`).
- Si une règle ESLint indispensable manque, on en reparle.
