# Cohorte

Outil interne Helix Lab pour rechercher, comprendre et présélectionner des essais cliniques, à partir de l'API publique [ClinicalTrials.gov](https://clinicaltrials.gov/data-api/api).

> Projet d'entraînement. Helix Lab est une entreprise fictive.

- 🎨 Maquette : https://claude.ai/artifact/AcT8WraXWdKWExRCgP3zcx
- 📋 Brief : [docs/brief.md](docs/brief.md) · Backlog : [docs/backlog.md](docs/backlog.md) · API : [docs/api.md](docs/api.md)
- 👋 **Nouveau sur le projet ? Commence par [docs/handover.md](docs/handover.md).**

## Démarrer

Prérequis : Node 24+ (voir `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Script | Rôle |
|---|---|
| `npm run dev` | Serveur de dev Vite |
| `npm run build` | Typecheck + build de production dans `dist/` |
| `npm run preview` | Sert le build de production |
| `npm run lint` | oxlint (les warnings font échouer) |
| `npm run typecheck` | `tsc -b` |
| `npm test` | Vitest en mode watch |
| `npm run test:run` | Vitest une fois (CI) |
| `npm run format` / `format:check` | Prettier |

## Stack

Vite · React 19 · TypeScript (strict) · React Router · TanStack Query · SCSS Modules · Vitest + Testing Library + MSW · oxlint + Prettier · GitHub Actions.

## Structure

```
src/
├── app/                 # shell de l'application
│   ├── App.tsx          # providers (QueryClient, Router)
│   ├── router.tsx       # déclaration des routes
│   ├── paths.ts         # helpers de chemins : paths.study(id)
│   ├── queryClient.ts   # config TanStack Query
│   ├── layout/          # AppLayout, Header
│   └── pages/           # 404, page d'erreur
├── features/            # une feature = un dossier (search, study, shortlist, insights)
├── shared/
│   ├── api/             # client HTTP, types bruts, modèles, mappers, libellés, query keys
│   ├── hooks/           # hooks génériques
│   ├── lib/             # fonctions pures (format, cx)
│   ├── styles/          # tokens, reset, mixins, global
│   └── ui/              # composants génériques (Button, Badge, StatusBadge, PageTitle)
└── test/                # setup Vitest, MSW, fixtures, helpers de rendu
```

## Conventions

Voir [docs/brief.md § Conventions](docs/brief.md#5-conventions) et les décisions d'architecture dans [docs/adr/](docs/adr/).
