# lore — AI-ready project knowledge framework

A drop-in folder structure + instructions that give any AI coding agent (Claude Code, Cursor, Copilot, pi, Codex…) the context it needs to be effective in a codebase — and a **team of specialized agent personas** that take an idea from napkin to production with clear decisions, handoffs and always-up-to-date docs.

## What you get

| Piece | Purpose |
|---|---|
| `AGENTS.md` | Single entry point every agent reads first. Personality, ground rules, map of the knowledge base. |
| `ai/knowledge/` | The project's living memory: product, architecture, patterns, flows, security, UX/UI, data, ops. |
| `ai/commands/` | Entry points: `/lore-resume`, `/lore-adopt`, `/lore-kickoff`, `/lore-idea`, `/lore-decide`, `/lore-sync-docs`, `/lore-wrap` (agent-agnostic; slash adapters generated for Claude Code, pi, Cursor, Copilot). |
| `ai/agents/` | Specialist personas (Orchestrator, Product, Architect, Engineer, Security, UX, QA, DevOps, Docs Keeper). |
| `ai/workflows/` | The lifecycle (idea → deploy → learn), decision protocol, handoffs, doc-sync rules. |
| `ai/work/` | Work in flight: ideas, specs, tasks, decisions — the paper trail. |
| `ai/templates/` | Artifact templates (idea, spec, task, ADR, review, release notes). |
| Adapters | `CLAUDE.md`, `.cursor/rules/`, `.github/copilot-instructions.md` + slash commands in `.claude/commands/`, `.pi/prompts/`, `.cursor/commands/`, `.github/prompts/` — thin pointers. |

## Layout

```
bin/lore.js          ← CLI (Node ≥18, zero deps): init / update / version / help
template/            ← what gets installed into a project
package.json         ← npm package @kreaper97/lore (bin: lore)
```

## Install & quick start

One-off, no install (any package manager):

```bash
npx @kreaper97/lore init          # npm
pnpm dlx @kreaper97/lore init     # pnpm
yarn dlx @kreaper97/lore init     # yarn
bunx @kreaper97/lore init         # bun
```

Or pin it in the project so the whole team gets the same version and can upgrade:

```bash
pnpm add -D @kreaper97/lore       # or npm i -D / yarn add -D / bun add -d
pnpm lore init
# later, after bumping the version:
pnpm lore update                  # refreshes commands, agents, workflows, templates, adapters
```

Before it's on the npm registry, install straight from GitHub: `pnpm add -D github:kreaper97/lore` (or `npx github:kreaper97/lore init`).

`lore init [dir] ["Project Name"] [--force]` · `lore update [dir]` never touches `AGENTS.md`, `ai/knowledge/` or `ai/work/` — those are yours.

Non-JS project? `npx`/`pnpm dlx` only needs Node on the machine; nothing is added to your project besides the docs.

Slash commands are prefixed `lore-` so they never clash with built-ins (e.g. Claude Code's `/resume`). Agents without slash commands understand the plain words ("adopt", "kickoff", "resume"…).

The script detects which case you're in:

| Case | Command | What happens |
|---|---|---|
| **Existing codebase** | `/lore-adopt [focus]` | Deep read-only scan (code, config, CI, schema, git history) → fills every doc the code can prove, with file citations; retro-ADRs; one batch of questions; coverage report in `ai/knowledge/INDEX.md`. |
| **New project** | `/lore-kickoff [idea]` | Short interview → writes only what's decided. Every later `/lore-decide`, spec or merged task grows the docs (`stub → partial → verified`). |
| **Every session** | `/lore-resume` … `/lore-wrap` | Resume reads board + journal + git drift and proposes the next step; wrap leaves the journal, board and docs consistent. |

## Principles

1. **One entry point** (`AGENTS.md`), progressive disclosure: agents load only what the task needs.
2. **Docs are code**: every change that alters behavior, structure or decisions updates `ai/knowledge/` in the same PR.
3. **Decisions are explicit**: non-trivial choices go through the decision protocol and land as ADRs.
4. **Specialists with opinions**: personas disagree on purpose; the protocol resolves it.
5. **Human stays in charge** of irreversible, costly or ambiguous calls.
