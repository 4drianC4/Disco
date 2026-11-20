# Discoteca

Sistema interno de gestión de discoteca. Monolito Next.js 16 con **arquitectura vertical**: cada módulo vive en `src/features/<modulo>/` con `backend/` + `frontend/` unidos por un contrato Zod puro.

## Requisitos

- Node.js 22
- Docker (para la base de datos local)

## Puesta en marcha

```bash
cp .env.example .env          # define secretos locales
npm install
docker compose up -d db       # PostgreSQL local
npm run db:generate
npm run db:migrate            # crea y aplica la migración
npm run db:seed               # admin de demo + datos de prueba
npm run dev                   # http://localhost:3000
```

Credenciales de seed (solo local): `admin@example.test` / `admin1234`.

## Scripts

| Comando | Acción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | `prisma generate` + build de producción |
| `npm run lint` | ESLint con las fronteras de imports |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest (unitarios) |
| `npm run test:e2e` | Playwright |
| `npm run db:migrate` / `db:deploy` / `db:seed` / `db:generate` | Prisma |

## Arquitectura

- `src/app/` solo enruta: `route.ts` re-exporta controladores, `page.tsx` compone componentes. Cero lógica de negocio.
- `src/features/<modulo>/backend/` controladores (`requireRoles` + `requireSameOrigin` + zod) → servicio → Prisma.
- `src/features/<modulo>/frontend/` componentes cliente → contrato + `fetch`.
- `src/features/<modulo>/<entidad>.schema.ts` contrato Zod puro compartido por ambos lados.
- `src/shared/lib/` infraestructura transversal (`prisma`, `access`, `api-error`, `api-client`, …).
- `src/generated/prisma/` cliente Prisma generado (ignorado por git).

Flujo de dependencias (unidireccional): `route.ts → controller → service → Prisma`; UI: `page → componente → contrato + fetch`. El frontend nunca importa backend (los archivos backend arrancan con `import "server-only"`). Las fronteras se imponen con `no-restricted-imports` en `eslint.config.mjs`.

## Módulos

| Módulo | API |
| --- | --- |
| `users` | `/api/users` |
| `events` | `/api/events` |
| `admissions` | `/api/admissions` |
| `drinks` | `/api/categories`, `/api/drinks` |
| `bar-sales` | `/api/bar-sales` |
| `reservations` | `/api/tables`, `/api/reservations` |

`events` está implementado completo como referencia. El resto quedan como esqueleto (listado). Genera un módulo nuevo con `bash scripts/new-slice.sh <modulo> <entidad>`.

## CI

`.github/workflows/ci.yml` ejecuta lint, typecheck, tests y build. Los tests E2E necesitan PostgreSQL de test en un job aparte.
