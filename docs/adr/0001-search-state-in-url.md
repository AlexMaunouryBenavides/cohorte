# ADR 0001 — L'état de recherche vit dans l'URL

- **Statut** : accepté
- **Date** : 2026-11-05

## Contexte

Les ARC partagent des recherches entre collègues et reviennent souvent en arrière depuis une fiche essai. Ils ne doivent jamais perdre leurs filtres.

## Décision

La pathologie, les filtres, le tri et la pagination sont stockés dans les **query params** de l'URL (`useSearchParams` de React Router). L'URL est la source de vérité : pas de copie dans un `useState` ni dans un store global.

Exemple : `/?cond=melanoma&status=RECRUITING,NOT_YET_RECRUITING&phase=PHASE2&sort=lastUpdate`

Les noms de paramètres de l'URL de l'app sont **courts et indépendants** de ceux de l'API. La conversion se fait dans la feature `search`, et `buildSearchParams` (`shared/api/studies.ts`) fait la conversion vers l'API.

## Conséquences

- ✅ Partage de lien, rechargement, bouton Précédent : tout fonctionne sans code supplémentaire.
- ✅ La clé TanStack Query dérive de l'URL, donc le cache est naturellement partagé.
- ⚠️ Il faut parser et valider les params (une valeur inconnue dans l'URL ne doit pas faire planter la page).
- ⚠️ Un champ texte ne doit pas écrire dans l'URL à chaque frappe. Mettre à jour à la soumission.
