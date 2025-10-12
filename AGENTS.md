# Repository Guidelines

## Project Structure & Module Organization
- Two TypeScript workspaces: React client `client/`, Express API `server/`.
- Client layout: `src/components` (pages/layout), `src/api` (services), `src/redux` (slices), `src/hooks`, `src/theme`, and `src/assets`.
- Server layout: `api/` routers, `models/`, `config/` env + rate limiting, `util/`, all wired by `DependencyInjector.ts`.
- Deployment flows through `heroku-build.sh`; keep build outputs and env expectations compatible.

## Build, Test, and Development Commands
- `npm run start:dev` (root) lints both projects, then runs client and server together via concurrently.
- `npm run client:dev` launches the React dev server on port 3000.
- `npm run server:dev` hot-reloads the API with `nodemon` + `tsx`.
- `npm run lint` or `npm run lint:fix` runs TypeScript-aware ESLint in both workspaces.
- `cd client && npm run test` executes the React Testing Library suite in watch mode.
- `cd server && npm run build` compiles TypeScript to `server/dist` for production checks.

## Coding Style & Naming Conventions
- ESLint (`client/eslint.config.js`, `server/eslint.config.js`) applies the TypeScript stylistic presets; run lint before pushing.
- Stick to 4-space indentation, single quotes, semicolons, and explicit async return types.
- Components/providers/slices use PascalCase, hooks use `useThing`, utilities stay camelCase with named exports.
- Avoid `any`; clear lint warnings and group imports by origin to keep diffs tidy.

### 1) Principles

* Code must be **self-explanatory**. **No inline comments**; if explanation seems needed, improve names/structure or extract functions instead.
* **Names are explanations.** Use fully descriptive, pronounceable names that reveal purpose and context.
* **Ban:** 1–3 character identifiers for variables, parameters, or functions unless a well-established pattern (e.g., `tx`, `req`, `res`, `i`).

### 2) Types & Contracts

* Prefer precise domain models and validated data shapes over ad-hoc structures.
* Public APIs must define explicit contracts (inputs, outputs, errors).
* Extract magic numbers/strings into named constants or configuration.

### 3) Functions

* Do **one thing** at one level of abstraction.
* Parameters: **0–3 ideal**; 4–5 acceptable; **≥5 →** use a named parameter object with an explicit type/shape.
* Avoid hidden state; prefer pure functions where reasonable.

### 4) State & Side Effects

* Keep state local; default to immutability; isolate necessary mutation behind small, well-named APIs.
* Make side effects explicit at boundaries (I/O, network, storage); never hide them in generic utilities.

### 5) Errors & Boundaries

* Validate early; **fail fast** with precise, domain-specific errors.
* Translate errors at boundaries (e.g., HTTP/UI) rather than leaking transport concerns into domain code.

### 6) Architecture

* High cohesion, low coupling; prefer composition over inheritance.
* Apply SOLID pragmatically; Single Responsibility takes priority.
* Eliminate temporal coupling by enforcing ordering internally and exposing higher-level operations.

### 7) Readability & Formatting

* Group related statements; separate distinct concepts with blank lines.
* Prefer early returns over deep nesting.
* Never add *eslint-disable* before asking first. Prefer to fix the root cause.

### 8) DRY

* Keep each rule, algorithm, or constant in a single authoritative place; share common schemas and enums across packages.



## Testing Guidelines
- CRA bundles Jest + React Testing Library; keep `*.test.tsx` beside components or in feature `__tests__`.
- Prioritize user flows, mocked axios calls, and accessibility; run `cd client && npm run test` before submitting UI work.
- The API lacks a harness; if you add one, use `server/src/__tests__` with `tsx` or `vitest` and cover auth, validation, and error paths.

## Commit & Pull Request Guidelines
- Use concise, imperative commit subjects (e.g., `Add resume auth guard`) and keep related changes together.
- PRs need a problem statement, bullet summary, linked issues, and before/after visuals for UI updates; flag config or migration steps.
- Verify lint, build, and test commands before review, and note trade-offs or follow-ups in the description.

## Configuration & Security Notes
- Environment variables load from `server/.env`; mirror new keys in `server/.envExample` with safe defaults.
- Keep secrets out of Git by using the shared vault or deployment configuration.
- Reuse helpers in `server/src/config`; update `heroku-build.sh` and highlight deploy-impacting changes in PRs.
