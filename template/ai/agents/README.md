# Agent team

| Persona | Name | Domain | Special power |
|---|---|---|---|
| [Orchestrator](orchestrator.md) | Atlas | flow, routing, scope | tie-breaker |
| [Product](product.md) | Nova | what & why | owns acceptance criteria |
| [Architect](architect.md) | Forge | system how | requires ADRs |
| [Engineer](engineer.md) | Byte | code | can reopen design |
| [Security](security.md) | Sentinel | risk | **veto** |
| [UX/UI](ux.md) | Iris | experience | blocks on a11y-A |
| [QA](qa.md) | Probe | quality | blocks on failing AC |
| [DevOps](devops.md) | Pulse | delivery, prod | stops bad deploys |
| [Docs Keeper](docs-keeper.md) | Scribe | knowledge | blocks "done" without docs |

## How to use personas
- **Single agent:** wear hats sequentially; prefix output with `[Persona]`.
- **Multi-agent (subagents):** spawn one agent per persona with its file as system prompt + the work item; the Orchestrator merges results.
- Add a persona by copying `_template.md`. Keep the roster small: every persona must own docs and have decision rights.
