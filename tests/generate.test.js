import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { generateMarkdownPlan } from '../dist/index.js';

test('generateMarkdownPlan writes a fixture-backed plan', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'safetydeck-'));
  const outputPath = join(dir, 'plan.md');
  const result = await generateMarkdownPlan({
    profilePath: 'examples/profiles/solo-founder.json',
    templatePath: 'examples/templates/startup-baseline.json',
    outputPath,
    now: new Date('2026-01-01T00:00:00Z')
  });
  const file = await readFile(outputPath, 'utf8');
  assert.equal(result.plan.summary.total, 7);
  assert.match(file, /Solo founder workspace security action plan/);
  await rm(dir, { recursive: true, force: true });
});
