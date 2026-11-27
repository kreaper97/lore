# Decision protocol

Owner: Orchestrator · Used whenever a choice is **non-trivial**: hard to reverse, affects >1 module, adds a dependency, changes a contract/data model, has security/UX/cost impact, or personas disagree.

## Classify first
| Type | Reversibility | Process |
|---|---|---|
| **Two-way door** | cheap to undo | Owner persona decides, notes it in the spec. No round. |
| **One-way door** | costly to undo | Full round + ADR. |
| **Human-only** | money, legal, irreversible data ops, product direction | Prepare a brief, human decides. |

## The round (max 1 round + 1 rebuttal)
1. **Frame** (Orchestrator): question, context, constraints, deadline. Options A/B/(C) — always include "do nothing" when sensible.
2. **Positions** (each relevant persona, ≤5 bullets): preferred option, why, risks, what would change their mind.
3. **Votes:** `approve` · `concern` (can live with it, recorded) · `block` (must give reason + acceptable alternative).
4. **Resolve:**
   - Domain owner has final say in their domain (see persona *Decision rights*).
   - **Security block** = veto; only the human can override (recorded in ADR).
   - Otherwise, no blocks → owner decides. Block outside veto areas → one rebuttal, then Orchestrator tie-breaks.
   - Still deadlocked or low confidence → **escalate to human** with the brief.
5. **Record:** ADR in `ai/knowledge/architecture/decisions/ADR-<nnn>-<slug>.md` (`templates/adr.md`), link from spec, update index.

## Output format (paste into spec or chat)
```md
### Decision: <question>
Type: one-way | two-way | human
Options: A) … B) … C) …
| Persona | Vote | Key point |
|---|---|---|
| Architect | approve A | … |
| Security | concern A | … |
Outcome: A — decided by <persona|human> on <date>. ADR-<nnn>.
Follow-ups: …
```

## Escalation brief (for the human)
- Question (1 line) · Recommendation · Options with cost/risk · What we need from you · Deadline.
