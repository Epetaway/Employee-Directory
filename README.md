# Employee Directory – Performance & Resiliency Demo

A full‑stack demo showcasing modern front‑end patterns (debounced search, skeleton loading, retries, error boundaries) and a typed API layer with Express + Drizzle + Zod.

## Tech
- React, TypeScript, Vite, Tailwind, shadcn/ui, TanStack Query
- Express (Node), Drizzle ORM, Zod
- Single server serves API + client

## Quick Start
```bash
npm i
npm run dev         # Dev server (API + Vite)
```

## Production
```bash
npm run build       # Builds client + bundles server
npm start           # Serves dist/index.js on PORT (default 5000)
```

## Scripts
- `dev` – TSX dev server + Vite
- `build` – `vite build` then bundle server with esbuild
- `start` – run built server
- `check` – TypeScript check
- `db:push` – Drizzle migration push (optional)
- `browserslist:update` – refresh caniuse DB (used in CI)

## Env
Copy `.env.example` to `.env`.

| Key           | Example       | Notes                               |
|---------------|---------------|-------------------------------------|
| PORT          | `5000`        | API + static app port               |
| DATABASE_URL  | `postgres://` | If swapping to a real DB (optional) |

## API
- `GET /api/employees` (`search`, `department`, `status`)
- `GET /api/employees/:id`
- `POST /api/employees`
- `DELETE /api/employees/:id`
- `GET /api/metrics`
- `POST /api/simulate-loading`
- `POST /api/simulate-error`

## License
MIT – see [LICENSE](./LICENSE).
