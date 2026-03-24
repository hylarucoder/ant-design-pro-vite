# Repository Guidelines

## Project Structure & Module Organization

This project now runs on Vite, with the main app under `src/`.

- `src/main.tsx`: Vite entry.
- `src/app.tsx`: route tree and auth guard.
- `src/pages/`: page-level screens plus reused Ant Design Pro view pieces.
- `src/layout/`: app shell and navigation.
- `src/data/` and `src/services/`: local demo data and lightweight app services.
- `src/components/` and selected files under `src/pages/`: reused visual pieces from the original Ant Design Pro UI.
- `config/defaultSettings.ts`: shared layout settings.
- `docs/plans/`: migration notes and planning docs.

Do not add new runtime code to `.umi`, old Umi config files, or deleted compatibility paths.

## Build, Test, and Development Commands

Use `pnpm` throughout.

- `pnpm dev` or `pnpm start`: run the Vite dev server on port `8000`.
- `pnpm build`: create a production build in `dist/`.
- `pnpm preview`: preview the built app locally.
- `pnpm typecheck`: run TypeScript checks with `tsconfig.vite.json`.
- `pnpm lint`: run `oxfmt`, `oxlint`, and type checking.
- `pnpm test`: run Vitest in jsdom mode; it currently passes when no tests are present.

Before opening a PR, run at least `pnpm typecheck` and `pnpm build`.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Follow the repository formatter and linter setup:

- spaces for indentation
- single quotes in JS/TS
- keep files ASCII unless the file already uses Unicode

Name pages and components in `PascalCase` like `AnalysisPage.tsx`. Keep helpers and data files in `camelCase` like `ruleTable.ts`. Prefer placing new app logic in `src/**`, not legacy or generated folders.

## Testing Guidelines

Vitest is configured with `jsdom`. Place tests as `*.test.tsx` next to the file they cover, or under a nearby feature folder. Favor focused interaction tests for routing, login flow, and page rendering. If you add a new page or guard, add or update a test for the main user path.

## Commit & Pull Request Guidelines

Use Conventional Commits, consistent with the existing history and commitlint setup:

- `feat: add monitor page migration`
- `fix: remove duplicate sidebar branding`
- `chore: clean legacy umi config`

PRs should include a short summary, affected routes or pages, verification steps, and screenshots for visual changes.

## Contributor Notes

Preserve the Ant Design Pro look where possible. The goal of this repo is to keep the original UI feel while replacing the old runtime with Vite.
