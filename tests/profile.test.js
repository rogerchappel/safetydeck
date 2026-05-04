import test from 'node:test';
import assert from 'node:assert/strict';
import { parseProfile, SafetydeckError } from '../dist/index.js';

test('parseProfile accepts a minimal valid profile', () => {
  const profile = parseProfile({ name: 'Home lab', stage: 'personal', assets: ['laptop'] });
  assert.equal(profile.name, 'Home lab');
  assert.equal(profile.stage, 'personal');
});

test('parseProfile rejects missing assets', () => {
  assert.throws(() => parseProfile({ name: 'Broken', stage: 'solo' }), SafetydeckError);
});
