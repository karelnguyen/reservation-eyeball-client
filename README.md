# Reservation Eyeball (Frontend)

Small React app to view, create, and confirm reservations against a REST API. Includes a health indicator, loading skeletons, and error boundaries.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- TanStack Router
- ESLint

## Getting Started

1. Install Node.js 20+.
2. Configure environment:
   - Create `.env` with: `VITE_API_BASE_URL="<your-api-base-url>"`
   - Example: `VITE_API_BASE_URL=https://reservation-eyeball.onrender.com`
3. Install deps: `npm install`
4. Start dev server: `npm run dev`
5. Build for prod: `npm run build` (preview with `npm run preview`).

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — typecheck and production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

## API (expected)

- `GET /api/health` — service health
- `GET /api/reservations` — list reservations
- `POST /api/reservations` — create reservation
- `POST /api/reservations/confirm` — confirm by PIN

## Notes

- Client-side routing is enabled; `vercel.json` rewrites all paths to `/` for SPA hosting.
- The app reads `VITE_API_BASE_URL` at build/runtime via Vite envs.
