#!/usr/bin/env node
// lore — AI-ready project knowledge framework CLI (zero dependencies, cross-platform)
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'template');
const { version: VERSION } = require(path.join(ROOT, 'package.json'));

// Files the user owns after init (never touched by `update`)
const USER_OWNED = ['AGENTS.md', 'ai/knowledge', 'ai/work'];
// Framework files: installed by init, refreshed by update
const FRAMEWORK = ['ai/README.md', 'ai/commands', 'ai/agents', 'ai/workflows', 'ai/templates',
  'CLAUDE.md', '.cursor/rules/agents.mdc', '.github/copilot-instructions.md'];

const COMMANDS = [
  ['resume', 'Session start: load board, journal and coverage; propose next step', ''],
  ['adopt', 'Existing codebase: generate all knowledge docs the code can prove', '[focus area]'],
  ['kickoff', 'New project: short interview, docs grow from each decision', '[idea]'],
  ['idea', 'Capture and triage an idea', '<idea>'],
  ['decide', 'Run the decision protocol, write the ADR, propagate to docs', '<question>'],
  ['sync-docs', 'Audit ai/knowledge against the code and fix drift', '[area]'],
  ['wrap', 'Session end: journal entry, board and docs up to date', ''],
];
// Claude Code · pi · Cursor · Copilot
const ADAPTER_PATHS = (n) => [`.claude/commands/lore-${n}.md`, `.pi/prompts/lore-${n}.md`,
  `.cursor/commands/lore-${n}.md`, `.github/prompts/lore-${n}.prompt.md`];

function usage() {
  console.log(`lore ${VERSION} — give any repo a knowledge base and agent crew

Usage:
  lore init [dir] ["Project Name"] [--force]   Install lore into dir (default: .)
  lore update [dir]                            Refresh framework files (commands, agents,
                                               workflows, templates, adapters); never touches
                                               AGENTS.md, ai/knowledge or ai/work
  lore version | help

Run without installing:  npx @kreaper97/lore init  ·  pnpm dlx @kreaper97/lore init
Or as a dev dependency:  pnpm add -D @kreaper97/lore  →  pnpm lore update

After init, open your agent in the project and run:
  /lore-adopt     existing codebase → document everything the code proves
  /lore-kickoff   new project → short interview, docs grow with each decision
  /lore-resume    start of every later session · /lore-wrap at the end`);
}

const exists = (p) => fs.existsSync(p);

function copy(target, rel, overwrite) {
  const dst = path.join(target, rel);
  if (exists(dst) && !overwrite) return console.log(`skip (exists): ${rel}`);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.cpSync(path.join(SRC, rel), dst, { recursive: true, force: true });
  console.log(`${overwrite && exists(dst) ? 'updated' : 'added'}: ${rel}`);
}

function writeAdapters(target, overwrite) {
  for (const [name, desc, args] of COMMANDS) {
    const body = ['---', `description: "${desc}"`, ...(args ? [`argument-hint: "${args}"`] : []), '---',
      `Follow \`ai/commands/${name}.md\` exactly (read \`AGENTS.md\` first if you haven't). Arguments: $ARGUMENTS`, ''].join('\n');
    for (const rel of ADAPTER_PATHS(name)) {
      const dst = path.join(target, rel);
      if (exists(dst) && !overwrite) { console.log(`skip (exists): ${rel}`); continue; }
      fs.mkdirSync(path.dirname(dst), { recursive: true });
      fs.writeFileSync(dst, body);
    }
  }
  console.log('slash-command adapters: .claude/commands, .pi/prompts, .cursor/commands, .github/prompts');
}

function hasExistingCode(target) {
  const ignore = (n) => n.startsWith('.git') || n === '.DS_Store' || /^(README|LICENSE)/.test(n) || n === '.gitignore';
  return fs.readdirSync(target).some((n) => !ignore(n));
}

function init(args) {
  const force = args.includes('--force');
  const pos = args.filter((a) => a !== '--force');
  const target = path.resolve(pos[0] || '.');
  fs.mkdirSync(target, { recursive: true });
  const name = pos[1] || path.basename(target);

  if ((exists(path.join(target, 'AGENTS.md')) || exists(path.join(target, 'ai'))) && !force) {
    console.error(`AGENTS.md or ai/ already exists in ${target}. Use 'lore update' to refresh framework files, or --force to overwrite everything.`);
    process.exit(1);
  }
  const existing = hasExistingCode(target);

  for (const rel of ['AGENTS.md', 'ai', ...FRAMEWORK.filter((f) => !f.startsWith('ai/'))]) copy(target, rel, force);
  writeAdapters(target, force);

  const agents = path.join(target, 'AGENTS.md');
  fs.writeFileSync(agents, fs.readFileSync(agents, 'utf8').split('{{PROJECT_NAME}}').join(name));

  console.log('');
  console.log(existing
    ? `Existing code detected. Next: open your agent in ${target} and run /lore-adopt`
    : `Empty project. Next: open your agent in ${target} and run /lore-kickoff "<your idea>"`);
  console.log('(Agents without slash commands: just say "adopt" / "kickoff". Every later session starts with /lore-resume.)');
}

function update(args) {
  const target = path.resolve(args[0] || '.');
  if (!exists(path.join(target, 'AGENTS.md'))) {
    console.error(`No lore install found in ${target}. Run 'lore init' first.`);
    process.exit(1);
  }
  for (const rel of FRAMEWORK) copy(target, rel, true);
  writeAdapters(target, true);
  console.log(`\nFramework updated to lore ${VERSION}. Untouched: ${USER_OWNED.join(', ')}.`);
  console.log('Review with `git diff`; compare template/AGENTS.md upstream if you want new rules.');
}

const [cmd = 'help', ...rest] = process.argv.slice(2);
switch (cmd) {
  case 'init': init(rest); break;
  case 'update': update(rest); break;
  case 'version': case '-v': case '--version': console.log(`lore ${VERSION}`); break;
  case 'help': case '-h': case '--help': usage(); break;
  default: console.error(`lore: unknown command '${cmd}'`); usage(); process.exit(1);
}
