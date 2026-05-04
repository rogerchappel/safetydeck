import { assertString, assertStringArray, SafetydeckError } from './errors.js';
import { readJsonFile } from './io.js';
import type { SafetyProfile, TeamStage } from './types.js';

const stages = new Set<TeamStage>(['personal', 'solo', 'team', 'growth', 'enterprise']);

function optionalStringArray(value: unknown, field: string): string[] | undefined {
  if (value === undefined) return undefined;
  assertStringArray(value, field);
  return value;
}

export function parseProfile(input: unknown): SafetyProfile {
  if (typeof input !== 'object' || input === null) {
    throw new SafetydeckError('profile must be an object', 'INVALID_PROFILE');
  }
  const record = input as Record<string, unknown>;
  assertString(record.name, 'profile.name');
  assertString(record.stage, 'profile.stage');
  if (!stages.has(record.stage as TeamStage)) {
    throw new SafetydeckError(`profile.stage must be one of ${Array.from(stages).join(', ')}`, 'INVALID_PROFILE');
  }
  assertStringArray(record.assets, 'profile.assets');
  if (new Set(record.assets.map((asset) => asset.toLowerCase())).size !== record.assets.length) {
    throw new SafetydeckError('profile.assets must not contain duplicates', 'INVALID_PROFILE');
  }

  return {
    name: record.name,
    ...(typeof record.owner === 'string' ? { owner: record.owner } : {}),
    stage: record.stage as TeamStage,
    ...(typeof record.description === 'string' ? { description: record.description } : {}),
    assets: record.assets,
    ...(optionalStringArray(record.tools, 'profile.tools') ? { tools: optionalStringArray(record.tools, 'profile.tools') } : {}),
    ...(optionalStringArray(record.concerns, 'profile.concerns') ? { concerns: optionalStringArray(record.concerns, 'profile.concerns') } : {}),
    ...(optionalStringArray(record.priorityTags, 'profile.priorityTags') ? { priorityTags: optionalStringArray(record.priorityTags, 'profile.priorityTags') } : {}),
    ...(optionalStringArray(record.completed, 'profile.completed') ? { completed: optionalStringArray(record.completed, 'profile.completed') } : {}),
    ...(optionalStringArray(record.acceptedRisk, 'profile.acceptedRisk') ? { acceptedRisk: optionalStringArray(record.acceptedRisk, 'profile.acceptedRisk') } : {})
  };
}

export async function loadProfile(path: string): Promise<SafetyProfile> {
  return parseProfile(await readJsonFile(path));
}
