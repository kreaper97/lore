# /lore-resume — pick up where we left off

Lead: Orchestrator. Run at the start of every session (cheap: read, don't scan the whole repo).

1. Read `ai/work/JOURNAL.md` (last 3 entries), `ai/work/BOARD.md`, `ai/knowledge/INDEX.md`.
2. Check reality: `git status`, `git log --oneline -15`, current branch. Note commits made since the last journal entry (someone/something worked outside the agent) and which docs they may have invalidated (doc-sync matrix).
3. If INDEX.md is all `stub`: there is code → recommend `/lore-adopt`; no code → recommend `/lore-kickoff`. Stop there.
4. Reply in ≤ 12 lines:
   - **Where we are:** items in flight with stage.
   - **Since last time:** new commits / drift detected.
   - **Waiting on you:** open human questions.
   - **Next step I propose:** one concrete action (+ 1 alternative).
