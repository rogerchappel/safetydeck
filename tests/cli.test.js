import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);

test('CLI generate writes markdown from fixtures', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'safetydeck-cli-'));
  const output = join(dir, 'plan.md');
  const { stdout } = await run('node', ['dist/cli.js', 'generate', '--profile', 'examples/profiles/solo-founder.json', '--template', 'examples/templates/startup-baseline.json', '--output', output]);
  const markdown = await readFile(output, 'utf8');
  assert.match(stdout, /Wrote/);
  assert.match(markdown, /Critical open/);
  await rm(dir, { recursive: true, force: true });
});
