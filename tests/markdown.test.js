import test from 'node:test';
import assert from 'node:assert/strict';
import { generatePlan, renderMarkdown } from '../dist/index.js';

test('renderMarkdown includes safety boundary and checkboxes', () => {
  const plan = generatePlan(
    { name: 'Solo', stage: 'solo', assets: ['email'], completed: [], acceptedRisk: [], tools: [], concerns: [] },
    { id: 't', title: 'Template', version: '1', items: [{ id: 'mfa', title: 'Enable MFA', why: 'why', action: 'act', risk: 'critical', effort: 'quick', tags: ['email'] }] },
    new Date('2026-01-01T00:00:00Z')
  );
  const markdown = renderMarkdown(plan);
  assert.match(markdown, /did not scan accounts/);
  assert.match(markdown, /\[ \] \*\*Enable MFA\*\*/);
});
