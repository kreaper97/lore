# /adopt — onboard an existing codebase

Lead: Docs Keeper · Helpers: Architect, Security, UX, DevOps, Product · Args: optional focus area (e.g. `backend`).
Goal: document **everything the code can prove**, ask the human only what it cannot.

## Rules
- **Read-only** on source code. Only write inside `ai/` and `AGENTS.md`.
- Every claim cites evidence (`path/to/file.ts:42`). No evidence → `TODO(verify): …`.
- Big repos: split by area and use subagents (one per area, persona file as instructions), then merge.

## 1. Scan (breadth first)
- Tree (depth 3, ignore vendored/build dirs), README/CONTRIBUTING/existing docs (`docs/`, wikis, ADRs).
- Manifests & lockfiles (package.json, pyproject, go.mod, pom, Gemfile, Cargo…), monorepo config.
- Build/CI/CD (`.github/workflows`, Jenkinsfile, Dockerfile, compose, k8s/helm, terraform), env samples (`.env.example`).
- Entry points, routes/controllers, API specs (OpenAPI/GraphQL schemas), message/event handlers, cron jobs.
- Data: schema/migrations/ORM models.
- UI: component dirs, design tokens/theme, i18n files, storybook.
- Auth/authz middleware, secrets handling, input validation, external calls.
- Tests: frameworks, layout, coverage config.
- **Git history:** `git log --oneline -200`, top-changed files, contributors count, commit conventions; big refactors hint at past decisions.

## 2. Fill (in this order; one real code example per pattern)
1. `stack.md` + `AGENTS.md` §Commands (run install/test/lint only if safe and fast; else mark `TODO(verify)`)
2. `architecture/overview.md`, `components.md`, `integrations.md`
3. `data/model.md`, `data/rules.md`
4. `patterns/*` (coding, api, testing, errors) — describe what the code *does*, flag inconsistencies
5. `flows/*` — the 3–5 most critical flows, as mermaid sequence diagrams
6. `security/model.md`, `threat-model.md` (STRIDE on the critical flows)
7. `ux-ui/*` — tokens, component inventory, a11y state
8. `operations/*`
9. `product/*` — infer from code/README/domain names; the rest goes to questions
10. Retro-ADRs: `ADR-000x` with status `accepted (retroactive)` for major choices found (framework, DB, auth, hosting…)
Fill `AGENTS.md` §4b "Project hot rules" with the 3–7 invariants that would hurt most if broken.

## 3. Ask (one batch, max ~10 questions)
Product vision & users, roadmap, compliance (GDPR/PCI/HIPAA), SLAs, environments the code doesn't reveal, and any contradiction found.
Record pending ones in `ai/work/BOARD.md` → Open questions.

## 4. Report
- Update `ai/knowledge/INDEX.md` (status per doc: stub / partial / verified).
- Summary: coverage table, top 5 risks (security, architecture smells, missing tests), suggested next actions.
- Append a `ai/work/JOURNAL.md` entry.
