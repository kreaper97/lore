# /decide — make and record a decision

Lead: Orchestrator. Args: the question.
1. Classify the door (two-way / one-way / human) — `ai/workflows/decision-protocol.md`.
2. Options (≥ 2, incl. "do nothing" when sensible), relevant personas vote, one rebuttal round.
3. Write `ai/knowledge/architecture/decisions/ADR-xxxx-<slug>.md` + index. Human approval for one-way/human doors.
4. **Propagate:** apply the decision to every affected knowledge doc (stack, architecture, patterns, security, ux-ui, operations…) and flip their INDEX.md status. A decision that lives only in an ADR is not finished.
