import { assertString, assertStringArray, SafetydeckError } from './errors.js';
import { readJsonFile } from './io.js';
import type { ChecklistItem, ChecklistTemplate, EffortLevel, RiskLevel, TeamStage } from './types.js';

const risks = new Set<RiskLevel>(['low', 'medium', 'high', 'critical']);
const efforts = new Set<EffortLevel>(['quick', 'moderate', 'deep']);
const stages = new Set<TeamStage>(['personal', 'solo', 'team', 'growth', 'enterprise']);

function parseItem(input: unknown, index: number): ChecklistItem {
  if (typeof input !== 'object' || input === null) {
    throw new SafetydeckError(`template.items[${index}] must be an object`, 'INVALID_TEMPLATE');
  }
  const record = input as Record<string, unknown>;
  for (const field of ['id', 'title', 'why', 'action', 'risk', 'effort']) {
    assertString(record[field], `template.items[${index}].${field}`);
  }
  if (!risks.has(record.risk as RiskLevel)) throw new SafetydeckError(`invalid risk for ${record.id}`, 'INVALID_TEMPLATE');
  if (!efforts.has(record.effort as EffortLevel)) throw new SafetydeckError(`invalid effort for ${record.id}`, 'INVALID_TEMPLATE');
  assertStringArray(record.tags, `template.items[${index}].tags`);
  if (record.stages !== undefined) {
    assertStringArray(record.stages, `template.items[${index}].stages`);
    for (const stage of record.stages) {
      if (!stages.has(stage as TeamStage)) throw new SafetydeckError(`invalid stage ${stage} for ${record.id}`, 'INVALID_TEMPLATE');
    }
  }
  if (record.references !== undefined) assertStringArray(record.references, `template.items[${index}].references`);

  return {
    id: record.id as string,
    title: record.title as string,
    why: record.why as string,
    action: record.action as string,
    ...(typeof record.evidence === 'string' ? { evidence: record.evidence } : {}),
    risk: record.risk as RiskLevel,
    effort: record.effort as EffortLevel,
    tags: record.tags,
    ...(record.stages ? { stages: record.stages as TeamStage[] } : {}),
    ...(record.references ? { references: record.references as string[] } : {})
  };
}

export function parseTemplate(input: unknown): ChecklistTemplate {
  if (typeof input !== 'object' || input === null) throw new SafetydeckError('template must be an object', 'INVALID_TEMPLATE');
  const record = input as Record<string, unknown>;
  assertString(record.id, 'template.id');
  assertString(record.title, 'template.title');
  assertString(record.version, 'template.version');
  if (!Array.isArray(record.items) || record.items.length === 0) {
    throw new SafetydeckError('template.items must be a non-empty array', 'INVALID_TEMPLATE');
  }
  const items = record.items.map(parseItem);
  const ids = new Set(items.map((item) => item.id));
  if (ids.size !== items.length) throw new SafetydeckError('template item ids must be unique', 'INVALID_TEMPLATE');
  for (const item of items) {
    if (!/^[a-z0-9][a-z0-9-]*$/.test(item.id)) {
      throw new SafetydeckError(`template item id must be kebab-case: ${item.id}`, 'INVALID_TEMPLATE');
    }
  }
  return {
    id: record.id,
    title: record.title,
    version: record.version,
    ...(typeof record.description === 'string' ? { description: record.description } : {}),
    items
  };
}

export async function loadTemplate(path: string): Promise<ChecklistTemplate> {
  return parseTemplate(await readJsonFile(path));
}
