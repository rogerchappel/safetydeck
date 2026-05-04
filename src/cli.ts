#!/usr/bin/env node
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeTextFile } from './io.js';
import { generateMarkdownPlan } from './generate.js';

interface ParsedArgs { command: string; flags: Record<string, string | boolean>; }

const usage = `safetydeck - local-first security checklist plans\n\nUsage:\n  safetydeck generate --profile <profile.json> --template <template.json> [--output plan.md]\n  safetydeck inspect --profile <profile.json> --template <template.json>\n  safetydeck init --output <directory>\n  safetydeck --help\n\nNo network calls are made by safetydeck commands.`;

function parseArgs(argv: string[]): ParsedArgs {
  const [command = '--help', ...rest] = argv;
  const flags: Record<string, string | boolean> = {};
  for (let index = 0; index < rest.length; index += 1) {
    const token = rest[index];
    if (!token?.startsWith('--')) continue;
    const key = token.slice(2);
    const next = rest[index + 1];
    if (next && !next.startsWith('--')) {
      flags[key] = next;
      index += 1;
    } else {
      flags[key] = true;
    }
  }
  return { command, flags };
}

function required(flags: Record<string, string | boolean>, name: string): string {
  const value = flags[name];
  if (typeof value !== 'string') throw new Error(`Missing required --${name}`);
  return value;
}

async function initExample(output: string): Promise<void> {
  await writeTextFile(join(output, 'profile.json'), JSON.stringify({
    name: 'Example workspace',
    owner: 'you',
    stage: 'solo',
    assets: ['github', 'laptop', 'domain'],
    tools: ['password-manager'],
    concerns: ['account-recovery', 'backups'],
    priorityTags: ['mfa', 'recovery']
  }, null, 2) + '\n');
  await writeTextFile(join(output, 'template.json'), JSON.stringify({
    id: 'starter',
    title: 'Starter security baseline',
    version: '1.0.0',
    items: [{
      id: 'mfa-core-accounts',
      title: 'Turn on MFA for core accounts',
      why: 'MFA makes credential reuse and phishing less likely to become account takeover.',
      action: 'Enable app-based or hardware-key MFA for email, GitHub, password manager, and domain registrar.',
      evidence: 'List accounts reviewed and MFA methods enabled.',
      risk: 'critical',
      effort: 'quick',
      tags: ['mfa', 'github', 'domain'],
      stages: ['personal', 'solo', 'team']
    }]
  }, null, 2) + '\n');
}

export async function main(argv = process.argv.slice(2)): Promise<number> {
  const { command, flags } = parseArgs(argv);
  if (command === '--help' || command === '-h' || flags.help) {
    console.log(usage);
    return 0;
  }
  if (command === 'init') {
    await initExample(required(flags, 'output'));
    console.log(`Wrote starter files to ${required(flags, 'output')}`);
    return 0;
  }
  if (command === 'generate' || command === 'inspect') {
    const result = await generateMarkdownPlan({
      profilePath: required(flags, 'profile'),
      templatePath: required(flags, 'template'),
      ...(typeof flags.output === 'string' ? { outputPath: flags.output } : {})
    });
    if (command === 'inspect') {
      console.log(JSON.stringify(result.plan.summary, null, 2));
    } else if (typeof flags.output === 'string') {
      console.log(`Wrote ${flags.output} (${result.plan.summary.todo} open items)`);
    } else {
      process.stdout.write(result.markdown);
    }
    return 0;
  }
  console.error(usage);
  return 1;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
