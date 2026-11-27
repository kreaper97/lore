# ai/ — project brain

```
ai/
├── commands/         ENTRY POINTS: /resume /adopt /kickoff /idea /decide /sync-docs /wrap
├── knowledge/        WHAT IS TRUE NOW (living docs, always in sync with code)
│   ├── INDEX.md      coverage: status of every doc (stub / partial / verified)
│   ├── product/      vision, users, glossary, roadmap
│   ├── stack.md      tech, repo layout, commands
│   ├── architecture/ overview, components, integrations, decisions/ (ADRs)
│   ├── patterns/     coding, api, testing, error handling
│   ├── flows/        user flows and system flows (mermaid)
│   ├── data/         data model, retention, migrations
│   ├── security/     security model, threat model, checklist
│   ├── ux-ui/        design system, content/voice, accessibility
│   └── operations/   environments, deploy, observability, runbooks
├── agents/           WHO: specialist personas
├── workflows/        HOW: lifecycle, decisions, handoffs, doc-sync
├── work/             WHAT'S IN FLIGHT: BOARD.md, JOURNAL.md, ideas/, specs/, tasks/, reviews/, releases/
└── templates/        artifact templates
```

Rules of thumb:
- `knowledge/` describes the **present**. History lives in ADRs, git and `work/`.
- Keep each doc < ~300 lines. Split when it grows; link, don't duplicate.
- Every doc starts with an `Owner:` persona and `Last verified:` date.
- Unknowns are written as `TODO(verify): …` — never guessed.
- Two ways to grow: **/adopt** (existing code → document what exists) or **/kickoff** (new project → a doc is written when something about it is decided). Stubs are fine; invented content is not.
