# Cohorte — Backlog

> Sprint 0 et COH-05 livrés par Sami (voir `docs/handover.md`). Ton premier ticket : **COH-06**.

Statuts : `À faire` · `En cours` · `En review` · `Fait`. **Mets à jour la colonne quand tu changes de ticket.**
Estimations en points : 1 = quelques heures, 2 = une demi-journée à une journée, 3 = 1 à 2 jours, 5 = 2 à 3 jours.

| ID | Titre | Pts | Statut |
|---|---|---|---|
| COH-01 | Initialiser le projet | 1 | Fait |
| COH-02 | Mettre en place les tests | 2 | Fait |
| COH-03 | CI GitHub Actions | 1 | Fait |
| COH-04 | Layout, routing et design tokens | 3 | Fait |
| COH-05 | Client API typé et mappers | 3 | Fait |
| COH-06 | Recherche par pathologie | 2 | À faire |
| COH-07 | Tableau de résultats | 3 | À faire |
| COH-08 | Pagination | 2 | À faire |
| COH-09 | Filtres | 5 | À faire |
| COH-10 | Tri | 1 | À faire |
| COH-11 | Fiche essai | 5 | À faire |
| COH-12 | Ajouter à la shortlist | 2 | À faire |
| COH-13 | Page shortlist et revue | 3 | À faire |
| COH-14 | Export CSV | 2 | À faire |
| COH-15 | Vue Analyse | 5 | À faire |
| COH-16 | Audit accessibilité | 3 | À faire |
| COH-17 | Performance | 2 | À faire |
| COH-18 | Déploiement | 1 | À faire |
| COH-19 | README pour les recruteurs | 1 | À faire |
| COH-B1 | i18n FR / EN / ES | 3 | Bonus |
| COH-B2 | Mode sombre | 2 | Bonus |
| COH-B3 | Comparateur d'essais | 3 | Bonus |
| COH-B4 | Tests E2E Playwright | 3 | Bonus |
| COH-B5 | BFF Express ou NestJS | 5 | Bonus |

---

## Sprint 0 — Setup

### COH-01 · Initialiser le projet
**En tant que** dev, **je veux** un projet propre et outillé **afin de** démarrer sur de bonnes bases.

Critères d'acceptation :
- [ ] App Vite React TS créée à la racine du repo, `strict: true`
- [ ] ESLint (avec règles React Hooks) et Prettier configurés
- [ ] Scripts : `dev`, `build`, `lint`, `typecheck`, `format`, `test`
- [ ] Repo GitHub créé, `.gitignore` correct, premier commit sur `main`
- [ ] README minimal : nom, une phrase de pitch, commande de lancement

### COH-02 · Mettre en place les tests
Critères d'acceptation :
- [ ] Vitest + jsdom + Testing Library + `@testing-library/jest-dom`
- [ ] MSW configuré pour les tests, avec un handler `GET /studies` qui renvoie une fixture JSON réaliste (copie une vraie réponse de l'API dans `src/test/fixtures/`)
- [ ] Un test de composant d'exemple passe
- [ ] `npm test` en mode CI (sans watch) disponible

### COH-03 · CI GitHub Actions
Critères d'acceptation :
- [ ] Un workflow sur chaque PR et push sur `main` : install, lint, typecheck, test, build
- [ ] Cache npm activé
- [ ] `main` protégée : merge seulement par PR avec CI verte

### COH-04 · Layout, routing et design tokens
Critères d'acceptation :
- [ ] Tokens de la maquette en custom properties CSS : couleurs, typo, espacements, rayons, ombres
- [ ] Reset CSS et styles globaux
- [ ] Header : logo « Cohorte », navigation (Recherche, Shortlist, Analyse), lien actif visible
- [ ] Routes `/`, `/studies/:nctId`, `/shortlist`, `/insights` (pages vides pour l'instant) et page 404
- [ ] Lien « Aller au contenu » pour la navigation clavier
- [ ] Header utilisable sur mobile (360 px)

---

## Sprint 1 — Recherche

### COH-05 · Client API typé et mappers
Critères d'acceptation :
- [ ] `shared/api` expose `searchStudies(params)` et `getStudy(nctId)`
- [ ] Types TS pour le sous-ensemble de la réponse utilisé (champs optionnels)
- [ ] Modèles internes `StudySummary` et `StudyDetail`, plats et propres. Exemple : `phases: Phase[]`, `startDate: string | null`, `countries: string[]` dédoublonnés
- [ ] Les erreurs HTTP sont transformées en erreur typée (statut, message)
- [ ] Tests unitaires des mappers, y compris avec des champs manquants
- [ ] Libellés FR des statuts et phases centralisés (`RECRUITING` → « Recrutement en cours »)

### COH-06 · Recherche par pathologie
**En tant que** Claire, **je veux** taper une pathologie **afin de** voir les essais correspondants.

Critères d'acceptation :
- [ ] Champ de recherche + bouton, soumission avec Entrée
- [ ] La recherche est dans l'URL (`/?cond=melanoma`). Recharger la page ou partager l'URL redonne le même résultat.
- [ ] Aucune requête si le champ est vide
- [ ] Nombre total affiché : « 1 747 essais »
- [ ] Ce compteur est annoncé aux lecteurs d'écran (`aria-live`)
- [ ] Données chargées avec TanStack Query

### COH-07 · Tableau de résultats
Critères d'acceptation :
- [ ] Colonnes : NCT ID, Titre, Statut (badge coloré), Phase, Début, Effectif, Pays (premier pays + « +N »)
- [ ] Le titre mène à la fiche
- [ ] Chargement : skeleton de 5 lignes
- [ ] Erreur : message + bouton « Réessayer »
- [ ] Aucun résultat : message + suggestion de retirer des filtres
- [ ] Sous 768 px, le tableau devient une liste de cartes
- [ ] Vrai `<table>` sémantique en desktop

### COH-08 · Pagination
Critères d'acceptation :
- [ ] 20 résultats par page
- [ ] Navigation entre pages malgré la pagination par curseur (`nextPageToken`). Choisis entre « Précédent / Suivant » (pile de tokens) et « Charger plus » (`useInfiniteQuery`), et **justifie ton choix dans la PR**.
- [ ] Indication « 21–40 sur 1 747 » ou équivalent
- [ ] Changer de recherche ou de filtre ramène au début

### COH-09 · Filtres
**En tant que** Claire, **je veux** filtrer par statut, phase et pays **afin de** ne voir que les essais exploitables.

Critères d'acceptation :
- [ ] Statut : cases à cocher. Par défaut aucune case n'est cochée (pas de filtre).
- [ ] Phase : cases à cocher
- [ ] Pays : champ texte (`query.locn`)
- [ ] Tous les filtres sont dans l'URL. Le bouton Précédent du navigateur fonctionne.
- [ ] Badge du nombre de filtres actifs + bouton « Réinitialiser »
- [ ] Desktop : panneau latéral. Mobile : drawer avec piège de focus et fermeture par Échap.
- [ ] Tests : changer un filtre met à jour l'URL et relance la requête

### COH-10 · Tri
Critères d'acceptation :
- [ ] Select : « Mis à jour récemment » (défaut), « Date de début », « Effectif »
- [ ] Tri dans l'URL

---

## Sprint 2 — Fiche & shortlist

### COH-11 · Fiche essai
**En tant que** Claire, **je veux** comprendre un essai en 30 secondes.

Critères d'acceptation :
- [ ] En-tête : titre, NCT ID, badges statut et phase, sponsor, dates, effectif
- [ ] Résumé
- [ ] Critères d'éligibilité séparés en deux listes, **Inclusion** et **Exclusion**, à partir du texte brut. Fonction de parsing pure et testée. Repli sur le texte brut si le format est inattendu. ⚠️ Lis la section « Pièges » de `docs/api.md` : teste au moins 3 vrais essais au format différent.
- [ ] Âge, sexe
- [ ] Interventions
- [ ] Centres groupés par pays, avec un champ pour filtrer par ville ou pays
- [ ] Lien externe vers la page clinicaltrials.gov
- [ ] « Retour aux résultats » revient à la recherche **avec ses filtres**
- [ ] NCT ID inexistant : page « Essai introuvable »
- [ ] Le titre de l'onglet (`document.title`) reprend le titre de l'essai

### COH-12 · Ajouter à la shortlist
Critères d'acceptation :
- [ ] Bouton-icône sur chaque ligne du tableau et dans la fiche, avec `aria-pressed` et un libellé accessible
- [ ] Persistance en `localStorage` via un hook `useShortlist`
- [ ] On stocke un instantané (titre, statut, phase), pas seulement l'ID
- [ ] Compteur dans le lien « Shortlist » du header
- [ ] Hook testé

### COH-13 · Page shortlist et revue
Critères d'acceptation :
- [ ] Liste des essais sauvegardés avec date d'ajout
- [ ] Statut de revue par essai : À évaluer (défaut) / Retenu / Écarté
- [ ] Note libre, sauvegardée automatiquement
- [ ] Onglets de filtre par statut de revue, avec compteurs
- [ ] Suppression avec toast « Annuler » pendant 5 s
- [ ] État vide qui renvoie vers la recherche

### COH-14 · Export CSV
Critères d'acceptation :
- [ ] Bouton « Exporter » → téléchargement `cohorte-shortlist-AAAA-MM-JJ.csv`
- [ ] Colonnes : NCT ID, titre, statut de l'essai, phase, statut de revue, note, date d'ajout, URL
- [ ] Échappement correct des guillemets, virgules et retours à la ligne
- [ ] Le fichier s'ouvre correctement dans Excel avec les accents (BOM UTF-8)
- [ ] Fonction de génération pure et testée

---

## Sprint 3 — Analyse & qualité

### COH-15 · Vue Analyse
**En tant que** Claire, **je veux** une vue chiffrée d'une pathologie **afin de** préparer une réunion.

Critères d'acceptation :
- [ ] Recherche par pathologie (même champ que COH-06, partagé)
- [ ] Récupère jusqu'à 1000 essais avec des `fields` minimaux. Si `totalCount > 1000`, affiche « Calculé sur un échantillon de 1 000 essais ».
- [ ] KPIs : total, % en recrutement, effectif médian, nombre de pays
- [ ] Graphiques : répartition par phase (barres), par statut, top 10 pays (barres horizontales), essais par année de début (barres)
- [ ] Tous les calculs dans des fonctions pures testées (`features/insights/stats.ts`)
- [ ] Chaque graphique a une alternative texte : tableau masquable ou `aria-label` descriptif

### COH-16 · Audit accessibilité
Critères d'acceptation :
- [ ] Parcours complet au clavier seul : recherche → filtre → fiche → shortlist → export
- [ ] Parcours testé avec NVDA (ou un autre lecteur d'écran)
- [ ] axe DevTools : 0 erreur critique
- [ ] Lighthouse Accessibilité ≥ 95 sur les 4 pages
- [ ] Contrastes AA
- [ ] Rapport court dans `docs/a11y.md` : problèmes trouvés et corrigés

### COH-17 · Performance
Critères d'acceptation :
- [ ] Routes chargées en lazy (`React.lazy`)
- [ ] `staleTime` réfléchi et justifié en commentaire
- [ ] Prefetch de la fiche au survol ou au focus d'un titre
- [ ] Lighthouse Performance ≥ 90 sur `/` (build de prod)

### COH-18 · Déploiement
Critères d'acceptation :
- [ ] Déployé sur Netlify ou Vercel depuis `main`
- [ ] Rewrite SPA : recharger `/studies/NCT...` ne renvoie pas de 404
- [ ] URL publique dans le README et dans la description du repo GitHub

### COH-19 · README pour les recruteurs
Le README est en anglais : c'est ta vitrine.

Critères d'acceptation :
- [ ] Pitch en 2 lignes + lien démo + GIF ou captures
- [ ] Stack et **choix techniques avec leurs compromis** (pagination, état dans l'URL, pas de lib UI…)
- [ ] Lancer le projet en local
- [ ] Ce que je ferais avec plus de temps

---

## Bonus

### COH-B1 · i18n FR / EN / ES
Interface en 3 langues, sélecteur dans le header, langue mémorisée. Les données de l'API restent en anglais.

### COH-B2 · Mode sombre
Respecte `prefers-color-scheme`, avec un toggle qui force clair ou sombre. Tokens dédiés, pas de filtres CSS.

### COH-B3 · Comparateur d'essais
Sélectionner 2 ou 3 essais de la shortlist, puis les comparer côte à côte (phase, effectif, critères d'âge, pays, interventions).

### COH-B4 · Tests E2E Playwright
Parcours principal : rechercher « melanoma », filtrer en phase 2, ouvrir un essai, l'ajouter à la shortlist, le marquer « Retenu ». API mockée.

### COH-B5 · BFF Express ou NestJS
Petit backend-for-frontend qui proxifie l'API, met en cache et précalcule les stats de la vue Analyse. Réutilise ta stack CDA. C'est un argument direct pour les offres qui mentionnent une architecture BFF.
