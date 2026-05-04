import test from 'node:test';
import assert from 'node:assert/strict';
import { generatePlan } from '../dist/index.js';

test('generatePlan filters by stage and prioritizes open critical matches', () => {
  const profile = { name: 'Solo', stage: 'solo', assets: [' GitHub '], priorityTags: ['mfa'], completed: ['done'], acceptedRisk: [], tools: [], concerns: [] };
  const template = {
    id: 't', title: 'T', version: '1', items: [
      { id: 'done', title: 'Done', why: 'w', action: 'a', risk: 'low', effort: 'quick', tags: ['misc'] },
      { id: 'mfa', title: 'MFA', why: 'w', action: 'a', risk: 'critical', effort: 'quick', tags: ['mfa', 'github'] },
      { id: 'enterprise-only', title: 'Enterprise', why: 'w', action: 'a', risk: 'critical', effort: 'quick', tags: ['mfa'], stages: ['enterprise'] }
    ]
  };
  const plan = generatePlan(profile, template, new Date('2026-01-01T00:00:00Z'));
  assert.equal(plan.items.length, 2);
  assert.equal(plan.items[0].id, 'mfa');
  assert.equal(plan.summary.criticalOpen, 1);
  assert.equal(plan.summary.done, 1);
});
