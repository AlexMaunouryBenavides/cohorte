# Mémo API — ClinicalTrials.gov v2

- Base URL : `https://clinicaltrials.gov/api/v2`
- Doc officielle : https://clinicaltrials.gov/data-api/api
- Pas de clé. CORS ouvert (`Access-Control-Allow-Origin: *`).
- Limite de débit par IP, voir la doc. Évite de lancer une requête à chaque frappe.

## Rechercher des essais

`GET /studies`

| Paramètre | Exemple | Rôle |
|---|---|---|
| `query.cond` | `melanoma` | Pathologie |
| `query.term` | `pembrolizumab` | Texte libre |
| `query.locn` | `France` | Lieu (pays, ville) |
| `filter.overallStatus` | `RECRUITING,NOT_YET_RECRUITING` | Statuts (liste séparée par des virgules) |
| `aggFilters` | `phase:2 3` | Phases, séparées par des espaces. Codes : `0` (précoce 1), `1`…`4`, `NA` |
| `sort` | `LastUpdatePostDate:desc` | Tri |
| `pageSize` | `20` | Résultats par page (max 1000) |
| `pageToken` | *(valeur de `nextPageToken`)* | Page suivante |
| `countTotal` | `true` | Ajoute `totalCount` à la réponse |
| `fields` | `NCTId,BriefTitle,OverallStatus` | Limite les champs renvoyés (beaucoup plus léger) |

Réponse :
```json
{
  "totalCount": 1747,
  "studies": [ { "protocolSection": { ... } } ],
  "nextPageToken": "ZVNj7o2E..."
}
```

⚠️ **La pagination fonctionne par curseur** : pas de numéro de page. Il n'y a pas de `nextPageToken` sur la dernière page.

Exemple vérifié :
```
/studies?query.cond=melanoma&filter.overallStatus=RECRUITING&aggFilters=phase:2&pageSize=20&countTotal=true
```

## Détail d'un essai

`GET /studies/{nctId}` → un objet `{ protocolSection, ... }`. Exemple : `/studies/NCT03729596`.

## Statistiques globales

`GET /stats/field/values?fields=Phase` → répartition sur **toute** la base, pas sur une recherche.
Pour la vue Analyse d'une pathologie, récupère jusqu'à 1000 essais avec des `fields` minimaux et calcule toi-même.

## Champs utiles

| Champ (`fields=`) | Chemin dans `protocolSection` |
|---|---|
| `NCTId` | `identificationModule.nctId` |
| `BriefTitle` | `identificationModule.briefTitle` |
| `OverallStatus` | `statusModule.overallStatus` |
| `StartDate` | `statusModule.startDateStruct.date` (`YYYY-MM` ou `YYYY-MM-DD`) |
| `LastUpdatePostDate` | `statusModule.lastUpdatePostDateStruct.date` |
| `Phase` | `designModule.phases` (tableau, ex. `["PHASE1","PHASE2"]`) |
| `EnrollmentCount` | `designModule.enrollmentInfo.count` |
| `LeadSponsorName` | `sponsorCollaboratorsModule.leadSponsor.name` |
| `Condition` | `conditionsModule.conditions` |
| `InterventionName` | `armsInterventionsModule.interventions[].name` |
| `BriefSummary` | `descriptionModule.briefSummary` |
| `EligibilityCriteria` | `eligibilityModule.eligibilityCriteria` (texte brut, Markdown léger) |
| `MinimumAge`, `MaximumAge`, `Sex` | `eligibilityModule.*` |
| `LocationCountry`, `LocationCity`, `LocationFacility` | `contactsLocationsModule.locations[]` |
| `CentralContactName` | `contactsLocationsModule.centralContacts[]` |

N'importe quel champ peut manquer. Type-les comme optionnels.

## Valeurs d'énumération

- **Statut :** `RECRUITING`, `NOT_YET_RECRUITING`, `ACTIVE_NOT_RECRUITING`, `ENROLLING_BY_INVITATION`, `COMPLETED`, `TERMINATED`, `SUSPENDED`, `WITHDRAWN`, `UNKNOWN`, `AVAILABLE`, `NO_LONGER_AVAILABLE` (les deux derniers concernent l'accès compassionnel)
- **Phase :** `EARLY_PHASE1`, `PHASE1`, `PHASE2`, `PHASE3`, `PHASE4`, `NA`. ⚠️ `phases` est **absent** sur certains essais (environ 16 % sur « melanoma »). Prévois une valeur « Non renseignée ».

## Pièges constatés sur les vraies données

- `eligibilityCriteria` n'a pas de format fixe. On trouve « Inclusion Criteria: », « Key Inclusion Criteria: », des sous-titres (« Medical Conditions: »), des listes en `*` ou en `1.`, et des indentations.
- `locations[]` peut contenir plus de 100 centres. Chacun a son propre `status` (un centre peut être `WITHDRAWN` alors que l'essai recrute).
- Les dates sont au format `YYYY-MM` ou `YYYY-MM-DD`. `startDateStruct.type` vaut `ACTUAL` ou `ESTIMATED`.
