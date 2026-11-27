# Doc-sync: keeping ai/knowledge true

Owner: Docs Keeper · **Rule:** the change that alters reality updates the doc, in the same commit/PR.

## Matrix — if you change… update…
| Change | Docs |
|---|---|
| New/changed dependency, tool, script, command | `knowledge/stack.md`, `AGENTS.md` §Commands |
| New module/service/boundary, integration | `architecture/overview.md`, `architecture/components.md`, `architecture/integrations.md` |
| Non-trivial technical decision | new ADR + `architecture/decisions/README.md` index |
| New convention or pattern | `patterns/*` |
| API endpoint / contract / event | `patterns/api.md` + API reference/OpenAPI |
| DB schema, migration, retention | `data/model.md`, `data/rules.md` |
| User-visible flow | `flows/*`, `ux-ui/*` if new component/pattern |
| Auth, permissions, PII, secrets, new external input | `security/*` (threat model + checklist) |
| UI component / token / copy rule | `ux-ui/design-system.md`, `ux-ui/content.md` |
| Env, config, CI/CD, infra, alert | `operations/*` |
| New domain term, business rule | `product/glossary.md`, `product/business-rules.md` |
| Any decision (ADR, answered question) | every doc it affects + `knowledge/INDEX.md` status |

After updating a doc, set its row in `knowledge/INDEX.md` (`stub → partial → verified`).

## Doc rules
- Present tense, describes current reality. Future → roadmap/specs.
- Header on every doc: `Owner: <persona> · Last verified: YYYY-MM-DD`.
- Unknowns: `TODO(verify): …` — never invent.
- One truth per fact: link instead of duplicating.
- Prefer tables, bullet lists and mermaid over prose. Keep docs < ~300 lines.

## "sync docs" audit (run periodically or on request)
1. List docs whose `Last verified` > 30 days or whose owned code changed since (`git log --since`).
2. For each: compare with code, fix, bump date.
3. Grep for `TODO(verify)` and resolve what you can.
4. Report: fixed, still unknown, suggestions.
