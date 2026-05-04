import type { PlanItem, SafetyPlan } from './types.js';

function checkbox(status: PlanItem['status']): string {
  if (status === 'done') return '[x]';
  if (status === 'accepted-risk') return '[-]';
  return '[ ]';
}

function renderItem(item: PlanItem): string {
  const lines = [
    `- ${checkbox(item.status)} **${item.title}** \`${item.id}\``,
    `  - Risk: ${item.risk}; effort: ${item.effort}; score: ${item.score}`,
    `  - Why: ${item.why}`,
    `  - Action: ${item.action}`
  ];
  if (item.evidence) lines.push(`  - Evidence to capture: ${item.evidence}`);
  if (item.matchedTags.length) lines.push(`  - Profile match: ${item.matchedTags.join(', ')}`);
  if (item.references?.length) lines.push(`  - References: ${item.references.join(', ')}`);
  return lines.join('\n');
}

export function renderMarkdown(plan: SafetyPlan): string {
  const profile = plan.profile;
  return `# ${profile.name} security action plan\n\n` +
    `Generated: ${plan.generatedAt}\n\n` +
    `Template: ${plan.template.title} (${plan.template.id}@${plan.template.version})\n\n` +
    `## Safety boundary\n\n` +
    `Safetydeck generated this file from local profile/template data only. It did not scan accounts, call external APIs, read credentials, or verify live settings. Treat each checkbox as a prompt for human review.\n\n` +
    `## Profile\n\n` +
    `- Stage: ${profile.stage}\n` +
    `- Owner: ${profile.owner ?? 'unspecified'}\n` +
    `- Assets: ${profile.assets.join(', ')}\n` +
    `- Tools: ${(profile.tools ?? []).join(', ') || 'none listed'}\n` +
    `- Concerns: ${(profile.concerns ?? []).join(', ') || 'none listed'}\n\n` +
    `## Progress\n\n` +
    `- Total: ${plan.summary.total}\n` +
    `- Todo: ${plan.summary.todo}\n` +
    `- Done: ${plan.summary.done}\n` +
    `- Accepted risk: ${plan.summary.acceptedRisk}\n` +
    `- Critical open: ${plan.summary.criticalOpen}\n\n` +
    `## Checklist\n\n` +
    `${plan.items.map(renderItem).join('\n\n')}\n\n` +
    `## Notes\n\n` +
    `- Update the profile's completed or acceptedRisk arrays after review, then regenerate this plan.\n` +
    `- Keep secrets out of profile files; use labels such as \"github\" or \"production\" instead.\n`;
}
