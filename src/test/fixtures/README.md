# Fixtures

Vraies réponses de l'API ClinicalTrials.gov v2, récupérées le 9 nov. 2026.

| Fichier | Requête |
|---|---|
| `search-melanoma.json` | `GET /studies?query.cond=melanoma&filter.overallStatus=RECRUITING&pageSize=3&countTotal=true&sort=LastUpdatePostDate:desc&fields=…` |
| `study-NCT06246916.json` | `GET /studies/NCT06246916`, allégée : 10 centres sur 113, sans contacts ni `derivedSection` |

Pour en ajouter une, enregistre la vraie réponse avec `curl` plutôt que de l'écrire à la main.
