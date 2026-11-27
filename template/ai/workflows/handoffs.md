# Handoffs

Owner: Orchestrator · A handoff is a short, structured message. Any agent receiving work must be able to start without asking.

## Handoff note
```md
**From → To:** Product → Architect
**Item:** SPEC-012 (stage 1 → 2)
**Done:** problem, stories, AC 1–5
**Needs from you:** design options for recurring events; data model impact
**Open questions:** Q1 (owner: human), Q2 (owner: UX)
**Read:** ai/work/specs/SPEC-012-*.md, ai/knowledge/data/model.md
```

## Routing table
| Stage → | Default next owner |
|---|---|
| 0 → 1 | Product |
| 1 → 2 | Architect (lead), UX, Security, QA, DevOps |
| 2 → 3 | Orchestrator |
| 3 → 4 | Orchestrator |
| 4 → 5 | Engineer(s) |
| 5 → 6 | Reviewers per lifecycle §6 |
| 6 → 7 | QA |
| 7 → 8 | DevOps |
| 8 → 9 | Product + Docs Keeper |

## Multi-agent execution
- Orchestrator = main session. Specialists = subagents, each given: its persona file, the work item, the handoff note, and the list of knowledge docs to read.
- Parallelize only tasks with no `depends_on` between them and disjoint file areas.
- Subagents return: summary, files changed, docs changed, open questions. The Orchestrator updates BOARD.
