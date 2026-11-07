# ADR 0002 — Couche API : types bruts → mappers → modèles

- **Statut** : accepté
- **Date** : 2026-11-06

## Contexte

La réponse de ClinicalTrials.gov est profondément imbriquée (`protocolSection.statusModule.startDateStruct.date`), et n'importe quel champ peut manquer. Si les composants lisent cette structure directement, ils se remplissent de `?.` et de valeurs par défaut incohérentes.

## Décision

```
API JSON ──▶ types.ts (Raw*) ──▶ mappers.ts ──▶ models.ts (StudySummary, StudyDetail) ──▶ composants
```

- `types.ts` : forme brute, tout optionnel. **Privé** à `shared/api`.
- `mappers.ts` : fonctions pures, testées, qui produisent des modèles plats avec des valeurs par défaut explicites (`null`, `[]`).
- Les fonctions `searchStudies` / `getStudy` renvoient directement des modèles.

## Conséquences

- ✅ Les composants sont simples et les cas limites sont testés à un seul endroit.
- ✅ Si l'API change, seul le mapper est à modifier.
- ⚠️ Pour afficher un nouveau champ, il faut : l'ajouter dans `SUMMARY_FIELDS` (si c'est une recherche), puis dans le type brut, le modèle, le mapper et le test.
