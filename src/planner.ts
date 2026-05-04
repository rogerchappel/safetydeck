import type { ChecklistItem, ChecklistTemplate, PlanItem, SafetyPlan, SafetyProfile } from './types.js';

const riskWeight = { low: 1, medium: 2, high: 3, critical: 4 } as const;
const effortWeight = { quick: 2, moderate: 1, deep: 0 } as const;

function matchedTags(profile: SafetyProfile, item: ChecklistItem): string[] {
  const wanted = new Set([...(profile.assets ?? []), ...(profile.tools ?? []), ...(profile.concerns ?? []), ...(profile.priorityTags ?? [])].map((tag) => tag.toLowerCase().trim()));
  return item.tags.filter((tag) => wanted.has(tag.toLowerCase()));
}

function statusFor(profile: SafetyProfile, id: string): PlanItem['status'] {
  if (profile.completed?.includes(id)) return 'done';
  if (profile.acceptedRisk?.includes(id)) return 'accepted-risk';
  return 'todo';
}

function scoreItem(profile: SafetyProfile, item: ChecklistItem): number {
  const tagMatches = matchedTags(profile, item).length;
  const priorityMatches = item.tags.filter((tag) => profile.priorityTags?.includes(tag)).length;
  return riskWeight[item.risk] * 10 + effortWeight[item.effort] + tagMatches * 3 + priorityMatches * 5;
}

export function generatePlan(profile: SafetyProfile, template: ChecklistTemplate, now = new Date()): SafetyPlan {
  const items = template.items
    .filter((item) => !item.stages || item.stages.includes(profile.stage))
    .map((item) => ({
      ...item,
      status: statusFor(profile, item.id),
      score: scoreItem(profile, item),
      matchedTags: matchedTags(profile, item)
    }))
    .sort((a, b) => {
      if (a.status !== b.status) return a.status === 'todo' ? -1 : b.status === 'todo' ? 1 : 0;
      return b.score - a.score || a.id.localeCompare(b.id);
    });

  return {
    profile,
    template,
    generatedAt: now.toISOString(),
    items,
    summary: {
      total: items.length,
      todo: items.filter((item) => item.status === 'todo').length,
      done: items.filter((item) => item.status === 'done').length,
      acceptedRisk: items.filter((item) => item.status === 'accepted-risk').length,
      criticalOpen: items.filter((item) => item.status === 'todo' && item.risk === 'critical').length
    }
  };
}
