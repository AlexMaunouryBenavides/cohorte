# Notes de passation

> **De** : Sami, dev front (réaffecté sur un autre projet Helix Lab)
> **Pour** : la personne qui reprend Cohorte
> **Date** : 9 nov. 2026

Salut ! Le socle est en place et la suite du backlog est à toi. Voici ce qu'il faut savoir.

## Ce qui est fait

| Ticket | Contenu |
|---|---|
| COH-01 | Vite + React 19 + TS strict, oxlint, Prettier, scripts npm |
| COH-02 | Vitest + Testing Library + MSW, fixtures réelles, helper `renderRoute` |
| COH-03 | CI GitHub Actions : lint, format, typecheck, tests, build |
| COH-04 | Tokens, reset, layout, header, routes, 404, skip link |
| COH-05 | Couche API complète : `searchStudies`, `getStudy`, mappers, libellés FR, query keys |

`npm run test:run` → 38 tests verts.

## Lire en priorité (30 min)

1. `src/shared/api/index.ts` : tout ce que l'API expose au reste de l'app.
2. `src/shared/api/studies.ts` : comment les filtres deviennent des paramètres d'URL de l'API.
3. `src/app/router.tsx` et `src/app/paths.ts`
4. `src/test/render.tsx` et `src/app/App.test.tsx` : comment on teste une page.
5. `docs/adr/` : les décisions déjà prises. Ne les remets pas en cause sans en parler (ou sans écrire un nouvel ADR).

## Règles de la maison

- **Les composants n'importent jamais `shared/api/types.ts`**. Ils utilisent les modèles (`StudySummary`, `StudyDetail`) via `@/shared/api`.
- **Query keys** : toujours `studyKeys.*`, jamais un tableau écrit à la main.
- **Chemins** : `paths.study(id)`, jamais `` `/studies/${id}` ``.
- **Styles** : uniquement des tokens (`var(--space-4)`, `var(--color-primary)`…). Mixins dans `shared/styles/_mixins.scss` (`up(md)`, `container`, `visually-hidden`).
- **Libellés** : statuts et phases en FR dans `shared/api/labels.ts`. N'écris pas « Phase 2 » à la main.
- **Formatage** : dates et nombres via `shared/lib/format.ts`.
- **Titre d'onglet** : chaque page appelle `useDocumentTitle`.
- **Imports** : alias `@/` pour sortir de la feature, chemins relatifs à l'intérieur.
- **Tests** : `screen.getByRole` en priorité. Aucun appel réseau réel : MSW fait échouer tout appel non mocké.
- **Un composant partagé** n'entre dans `shared/ui/` que s'il sert à au moins deux features. Sinon, il reste dans la feature.

## Ce qui n'est pas fait / dette connue

- `apiGet` ne distingue pas l'erreur 429 (limite de débit). Il faudrait un message dédié (TODO dans `client.ts`).
- `staleTime` à 60 s, mis un peu au hasard (TODO COH-17 dans `queryClient.ts`).
- Pas de composant `Spinner` / `Skeleton` / `ErrorMessage` / `EmptyState` : à créer quand tu en auras besoin (COH-07).
- Le header n'a pas encore de badge pour la shortlist (TODO COH-12).
- Le parsing des critères d'éligibilité n'existe pas. `StudyDetail.eligibilityCriteria` est le texte brut.
- Le mode sombre n'est pas prévu dans les tokens (COH-B2).
- Les React Query Devtools s'affichent en bas à gauche en dev (automatiquement retirées du build de prod).

## Pour COH-06 (ton premier ticket)

- La page existe déjà : `src/features/search/SearchPage.tsx`.
- L'API est prête : `searchStudies({ condition })`.
- Lis l'ADR 0001 avant de commencer : l'état de recherche vit dans l'URL.
- Un handler MSW renvoie déjà une vraie réponse « melanoma » pour `GET /studies`.

Bon courage !
