# lore — AI-ready project knowledge framework

A drop-in folder structure + instructions that give any AI coding agent (Claude Code, Cursor, Copilot, pi, Codex…) the context it needs to be effective in a codebase — and a **team of specialized agent personas** that take an idea from napkin to production with clear decisions, handoffs and always-up-to-date docs.

## What you get

| Piece | Purpose |
|---|---|
| `AGENTS.md` | Single entry point every agent reads first. Personality, ground rules, map of the knowledge base. |
| `ai/knowledge/` | The project's living memory: product, architecture, patterns, flows, security, UX/UI, data, ops. |
| `ai/commands/` | Entry points: `/resume`, `/adopt`, `/kickoff`, `/idea`, `/decide`, `/sync-docs`, `/wrap` (agent-agnostic; slash adapters generated for Claude Code, pi, Cursor, Copilot). |
| `ai/agents/` | Specialist personas (Orchestrator, Product, Architect, Engineer, Security, UX, QA, DevOps, Docs Keeper). |
| `ai/workflows/` | The lifecycle (idea → deploy → learn), decision protocol, handoffs, doc-sync rules. |
| `ai/work/` | Work in flight: ideas, specs, tasks, decisions — the paper trail. |
| `ai/templates/` | Artifact templates (idea, spec, task, ADR, review, release notes). |
| Adapters | `CLAUDE.md`, `.cursor/rules/`, `.github/copilot-instructions.md` + slash commands in `.claude/commands/`, `.pi/prompts/`, `.cursor/commands/`, `.github/prompts/` — thin pointers. |

## Layout

```
template/            ← copy into any project (or run scripts/init.sh)
scripts/init.sh      ← installs the template into any repo, new or existing
```

## Quick start

```bash
./scripts/init.sh /path/to/project ["Project Name"]   # name defaults to folder name
```

The script detects which case you're in:

| Case | Command | What happens |
|---|---|---|
| **Existing codebase** | `/adopt [focus]` | Deep read-only scan (code, config, CI, schema, git history) → fills every doc the code can prove, with file citations; retro-ADRs; one batch of questions; coverage report in `ai/knowledge/INDEX.md`. |
| **New project** | `/kickoff [idea]` | Short interview → writes only what's decided. Every later `/decide`, spec or merged task grows the docs (`stub → partial → verified`). |
| **Every session** | `/resume` … `/wrap` | Resume reads board + journal + git drift and proposes the next step; wrap leaves the journal, board and docs consistent. |

## Principles

1. **One entry point** (`AGENTS.md`), progressive disclosure: agents load only what the task needs.
2. **Docs are code**: every change that alters behavior, structure or decisions updates `ai/knowledge/` in the same PR.
3. **Decisions are explicit**: non-trivial choices go through the decision protocol and land as ADRs.
4. **Specialists with opinions**: personas disagree on purpose; the protocol resolves it.
5. **Human stays in charge** of irreversible, costly or ambiguous calls.
