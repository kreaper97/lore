#!/usr/bin/env bash
# Install the AI knowledge framework into any project (new or existing).
# Usage: lore init [dir] ["Project Name"] [--force]
#   - Project name defaults to the target folder name.
#   - Detects whether the target already has code and tells you to run /lore-adopt or /lore-kickoff.
set -euo pipefail

SRC="$(cd "$(dirname "$0")/.." && pwd)/template"
FORCE=""
ARGS=()
for a in "$@"; do [[ "$a" == "--force" ]] && FORCE="--force" || ARGS+=("$a"); done
TARGET="${ARGS[0]:?usage: lore init <target-dir> [\"Project Name\"] [--force]}"

mkdir -p "$TARGET"
TARGET="$(cd "$TARGET" && pwd)"
NAME="${ARGS[1]:-$(basename "$TARGET")}"

if [[ -e "$TARGET/AGENTS.md" || -e "$TARGET/ai" ]] && [[ -z "$FORCE" ]]; then
  echo "AGENTS.md or ai/ already exists in $TARGET. Re-run with --force to overwrite." >&2
  exit 1
fi

# Existing project? (any file other than VCS/meta files, before we add ours)
EXISTING=$(find "$TARGET" -mindepth 1 -maxdepth 2 \
  -not -path "*/.git*" -not -name ".DS_Store" -not -name "README*" -not -name "LICENSE*" \
  -not -name ".gitignore" | head -1)

copy() {
  local rel="$1"
  if [[ -e "$TARGET/$rel" && -z "$FORCE" ]]; then
    echo "skip (exists): $rel"
  else
    mkdir -p "$(dirname "$TARGET/$rel")"
    cp -R "$SRC/$rel" "$TARGET/$rel"
    echo "added: $rel"
  fi
}

copy AGENTS.md
copy ai
copy CLAUDE.md
copy .cursor/rules/agents.mdc
copy .github/copilot-instructions.md

# Slash-command adapters: one-line pointers to ai/commands/<name>.md (single source of truth)
# Claude Code: .claude/commands/  ·  pi: .pi/prompts/  ·  Cursor: .cursor/commands/  ·  Copilot: .github/prompts/
write_adapter() {
  local path="$1" name="$2" desc="$3" args="$4"
  [[ -e "$TARGET/$path" && -z "$FORCE" ]] && { echo "skip (exists): $path"; return; }
  mkdir -p "$(dirname "$TARGET/$path")"
  {
    echo "---"
    echo "description: \"$desc\""
    [[ -n "$args" ]] && echo "argument-hint: \"$args\""
    echo "---"
    echo "Follow \`ai/commands/$name.md\` exactly (read \`AGENTS.md\` first if you haven't). Arguments: \$ARGUMENTS"
  } > "$TARGET/$path"
}

while IFS='|' read -r name desc args; do
  write_adapter ".claude/commands/lore-$name.md"       "$name" "$desc" "$args"
  write_adapter ".pi/prompts/lore-$name.md"            "$name" "$desc" "$args"
  write_adapter ".cursor/commands/lore-$name.md"       "$name" "$desc" "$args"
  write_adapter ".github/prompts/lore-$name.prompt.md" "$name" "$desc" "$args"
done <<'EOF'
resume|Session start: load board, journal and coverage; propose next step|
adopt|Existing codebase: generate all knowledge docs the code can prove|[focus area]
kickoff|New project: short interview, docs grow from each decision|[idea]
idea|Capture and triage an idea|<idea>
decide|Run the decision protocol, write the ADR, propagate to docs|<question>
sync-docs|Audit ai/knowledge against the code and fix drift|[area]
wrap|Session end: journal entry, board and docs up to date|
EOF
echo "added: slash-command adapters (.claude/commands, .pi/prompts, .cursor/commands, .github/prompts)"

# Fill the project name (escape sed special chars)
ESC_NAME=$(printf '%s' "$NAME" | sed 's/[&/\]/\\&/g')
sed -i.bak "s/{{PROJECT_NAME}}/$ESC_NAME/g" "$TARGET/AGENTS.md" && rm -f "$TARGET/AGENTS.md.bak"

echo
if [[ -n "$EXISTING" ]]; then
  echo "Existing code detected. Next: open your agent in $TARGET and run /lore-adopt"
else
  echo "Empty project. Next: open your agent in $TARGET and run /lore-kickoff \"<your idea>\""
fi
echo "(Agents without slash commands: just say \"adopt\" / \"kickoff\". Every later session starts with /lore-resume.)"
