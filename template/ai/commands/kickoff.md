# /kickoff — start a new project from zero

Lead: Orchestrator · Helpers: Product, Architect, Security, UX · Args: optional one-line idea.
Principle: **docs are born from decisions**. Don't fill templates with guesses; create/fill a doc only when something about it has been decided.

## 1. Interview (short; one batch, ≤ 8 questions, offer options with a recommendation)
- Problem & target users? What does success look like in 3 months?
- Type of product (web, mobile, API, CLI, data…) and must-have constraints (budget, deadline, compliance, team skills, hosting).
- Top 3 features for a first usable version.
- Any tech already decided or forbidden?

## 2. Write only what was decided
| Answer about… | Goes to |
|---|---|
| Problem, users, success | `product/vision.md`, `product/personas.md` |
| Domain words | `product/glossary.md` |
| Features & order | `product/roadmap.md` + one `ai/work/ideas/IDEA-xxx.md` each |
| Constraints | `product/vision.md` §Constraints, `security/model.md` (if compliance) |
| Tech choices | `/decide` → ADR → `stack.md`, `architecture/overview.md` |

Docs nobody has decided anything about stay `stub` in `ai/knowledge/INDEX.md`. That is fine and expected.

## 3. First decisions
Propose (don't impose) the minimum set needed to start building: stack, architecture style, hosting. Run each through `/decide`.
Humans approve one-way doors.

## 4. Close
- Board: ideas triaged, next item at stage 1.
- INDEX.md updated, JOURNAL entry, open questions listed.

## Growing the docs afterwards
Every later `/decide`, spec, merged task or incident updates the matching doc (`ai/workflows/doc-sync.md`) and flips its status in INDEX.md `stub → partial → verified`.
