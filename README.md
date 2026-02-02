# JSONPlaceholder Explorer

A Next.js App Router UI for browsing users, posts, and todos from JSONPlaceholder. Includes full testing (unit, integration with MSW, and Playwright E2E), Docker packaging, and CI that builds/pushes images to GHCR.

## Stack
- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS (v4 tooling)
- Tests: Jest + Testing Library + MSW (unit/integration) and Playwright (E2E)
- API: JSONPlaceholder (override with `NEXT_PUBLIC_API_BASE_URL`)

## Getting Started
Prereqs: Node 20+ and npm.

```bash
npm ci
npm run dev
# open http://localhost:3000
```

## Scripts
- `npm run dev` — start Next dev server
- `npm run lint` — ESLint
- `npm run test` — unit + integration + E2E
  - `npm run test:unit`
  - `npm run test:integration`
  - `npm run test:e2e`
- `npm run test:coverage` — Jest coverage (`coverage/lcov-report/index.html`)
- `npm run build` / `npm start` — production build & run

### E2E tests
Install browsers once:
```bash
npx playwright install chromium
```
Run:
```bash
npm run test:e2e
```
E2E uses a local mock API (see `e2e/webserver.mjs`) via `NEXT_PUBLIC_API_BASE_URL`, so tests don’t hit the live service.

## Docker
Build and run:
```bash
docker build -t jsonplaceholder-app .
docker run -p 3000:3000 jsonplaceholder-app
```
Uses a multi-stage build and runs the Next standalone output (see `Dockerfile`).

## CI (GitHub Actions)
Workflow: `.github/workflows/ci.yml`
- Runs lint, unit/integration/E2E tests, and `npm run build`.
- Builds and (on push) publishes Docker images to GHCR:
  - `ghcr.io/<owner>/<repo>:sha-<sha>`
  - `ghcr.io/<owner>/<repo>:latest`

## Configuration
- `NEXT_PUBLIC_API_BASE_URL` (optional): override JSONPlaceholder base URL (E2E points to the mock API).



