import test from 'node:test';
import assert from 'node:assert/strict';
import { parseTemplate, SafetydeckError } from '../dist/index.js';

const item = {
  id: 'mfa',
  title: 'Enable MFA',
  why: 'Stops basic takeover.',
  action: 'Enable MFA.',
  risk: 'critical',
  effort: 'quick',
  tags: ['mfa']
};

test('parseTemplate accepts a valid template', () => {
  const template = parseTemplate({ id: 'base', title: 'Base', version: '1', items: [item] });
  assert.equal(template.items[0].id, 'mfa');
});

test('parseTemplate rejects duplicate item ids', () => {
  assert.throws(() => parseTemplate({ id: 'base', title: 'Base', version: '1', items: [item, item] }), SafetydeckError);
});


test('parseTemplate rejects non-kebab item ids', () => {
  assert.throws(() => parseTemplate({ id: 'base', title: 'Base', version: '1', items: [{ ...item, id: 'Not Good' }] }), SafetydeckError);
});
